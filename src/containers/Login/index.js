import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom'
import {message} from 'antd'
import axios from 'axios';
import qs from 'qs';
import cache from '../../utils/cache'
import {baseURL} from '../../utils/ajax'
import {tokenUpdate,userChange} from '../../actions'
import { Form, Input, Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;

@withRouter
@connect()
@Form.create()
export default class LoginForm extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            loading:false,
            codeSrc:''
        };
    }
    handleSubmit = () => {
        const {dispatch,history} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                   loading:true
                });
                const baseUrl = baseURL.split('api-core-service')[0];
                debugger;
                axios({
                    method:'post',
                    url:`${baseUrl}uaa/oauth/token`,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded',
                        'Authorization':'Basic YnJvd3Nlcjo='
                    },
                    data:{//参数
                        scope:'ui',
                        username:values.userName,
                        password:values.password,
                        grant_type:'password',
                        user_type:'PARTY',
                        img_code:values.imgCode
                    },
                    transformRequest: [function (data) {
                        return qs.stringify(data);
                    }]
                }).then((response)=>{
                    if(response.data.head){
                        this.setState({
                            codeSrc:`${baseURL}public/image/loginCode?username=${values.userName}&${Date.now()}`
                        })
                        message.error(response.data.head.msg);
                    }
                    let token = response.data.access_token;
                    this.getUserInfo(token,'/');
                }).catch((e)=>{
                    this.setState({
                        codeSrc:`${baseURL}public/image/loginCode?username=${values.userName}&${Date.now()}`
                    })
                    message.error(e.response.data.head.msg);
                }).finally(()=>{
                    this.setState({
                        loading:false
                    });
                });
            }
        });
    };
    getImgCode=(e)=>{
        const reg = /^1[0-9]{10}$/;
        if(reg.test(e.target.value)){
            this.setState({
                codeSrc:`${baseURL}public/image/loginCode?username=${e.target.value}&${Date.now()}`
            })
        }else{
            this.setState({
                codeSrc:``
            })
        }
        
    }
    getUserInfo = (token,url)=>{
        
        const {dispatch,history} = this.props;
        const baseUrl = baseURL.split('api-core-service')[0];
        axios({
            url:`${baseUrl}uaa/users/current/principal`,
            method:'get',
            headers:{
                Authorization:'Bearer '+ token
            }
        }).then((response)=>{
            dispatch(tokenUpdate(token));
            dispatch(userChange({
                role:response.data.currentRole,
                type:response.data.litigantInfoType,
                verifyStatus:response.data.litigantInfoType==0?response.data.elementVerifyStatus:0,
                realAuth:response.data.realAuth,
                realName:response.data.realName
            }));
            let toUrl = '';
            if(!url.split('/')[1]){
                toUrl = url+response.data.currentRole;
            }else{
                toUrl = url;
            };
            cache.setItem('isAuth',true);
            // console.log(toUrl);
            history.push(toUrl);//url   
        })
    }
    withoutLogin=(bindUrl)=>{
        
        const paramsArr = bindUrl.split('&');
        let paramsObj = {};
        paramsArr.map((item,index)=>{
            let keyName,keyvalue;
            if(item){
                keyName = item.split('=')[0];
                keyvalue = item.split('=')[1];
                paramsObj[keyName] = keyvalue;
            }
        })
        let {redirectUrl,token,caseId,userId} = paramsObj;
        if(redirectUrl){
            redirectUrl = redirectUrl.split('#')[1];
        }

        this.setState({
            loading:true
        });
        const baseUrl = baseURL.split('api-core-service')[0];
        axios({
            method:'post',
            url:`${baseUrl}uaa/oauth/token`,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Authorization':'Basic YnJvd3Nlcjo='
            },
            data:{//参数
                scope:'ui',
                username:userId,
                password:token,
                grant_type:'password',
                user_type:'PARTY',
                login_type:'auth_token'
            },
            transformRequest: [function (data) {
                return qs.stringify(data);
            }]
        }).then((response)=>{
            const token = response.data.access_token;
            if(caseId){
                this.getUserInfo(token,`${redirectUrl}/caseDetail/${caseId}`);
            }else{
                this.getUserInfo(token,`${redirectUrl}`);
            }
        }).catch((e)=>{
            message.error(e.response.data.head.msg);
            this.props.history.goBack();
        }).finally(()=>{
            this.setState({
                loading:false
            });
        });
    }
    changeImg=()=>{
        const phone = this.props.form.getFieldValue('userName');
        this.setState({
            codeSrc:`${baseURL}public/image/loginCode?username=${phone}&${Date.now()}`
        })
    }
    componentDidMount(){
        
        cache.clear();
        const bindUrl = location.href.split('?')[1];
        if(bindUrl){
            this.withoutLogin(bindUrl)
        }
        document.addEventListener("keydown",this.handleEnterKey,false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown",this.handleEnterKey,false);
    }
    handleEnterKey=(e)=>{
        if(e.keyCode === 13){
            this.handleSubmit();
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {loginForm} = this.props;
        const {loading,codeSrc} = this.state;
        return (
            <div>
                {loginForm && <Form className="login-form">
                    <FormItem>
                        <p className="login-form-title">账号登录</p>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [
                                { required: true, message: '手机号码不能为空' },
                                {pattern:/^1[0-9]{10}$/,message:'请输入正确的手机号码'}
                            ],
                        })(
                            <Input placeholder="请输入手机号" maxLength="11" onChange={this.getImgCode}/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '密码不能为空' },
                                {pattern:/^[0-9a-zA-Z,./_]{6,32}$/,message:'密码是6-32位数字、字母以及",./_"组合'},
                            ]
                        })(
                            <Input type="password" placeholder="请输入密码" maxLength="32" />
                        )}
                    </FormItem>
                    <FormItem style={{"display":codeSrc?"block":"none"}}>
                        <Col span={16}>
                            {getFieldDecorator('imgCode', {
                                rules: [{ required: true, message: '图形验证码不能为空' }],
                            })(
                                <Input size="large" placeholder="请输入图形验证码" maxLength="4" />
                            )}
                        </Col>
                        <Col span={8} style={{"paddingLeft":"10px","height":"32px"}}>
                            <img src={codeSrc} alt="图形验证码" onClick={this.changeImg} style={{"height":"100%","width":"100%","display":"block"}}/>
                        </Col>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="button" className="login-form-button" onClick={this.handleSubmit} loading={loading}>登录</Button>
                        没有账号？<Link to="/register">用户注册</Link>
                        <Link className="login-form-forgot" to="/forget">忘记密码</Link>
                    </FormItem>
                </Form>}
            </div>
        );
    }
}
// LoginForm = Form.create()(LoginForm);
// export default LoginForm;