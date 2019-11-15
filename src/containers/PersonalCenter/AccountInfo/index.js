import React, {Component} from 'react'
import { Icon, Form, Input, Button, Modal, message, Col } from 'antd'
import {withRouter} from 'react-router-dom'
const FormItem = Form.Item;
import ajax, {baseURL} from '../../../utils/ajax'
import {TimeBtn} from '../../../components'

@withRouter
@Form.create()
export default class AccountInfoForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            phoneChange:false,
            passwordChange:false,
            emailChange:false,
            info:props.info,
            codeSrc:'',
        };
    }
    changePwd=()=>{
        this.setState({
            phoneChange:false,
            passwordChange:true,
            emailChange:false
        })
    };
    changeEmail=()=>{
        this.setState({
            phoneChange:false,
            passwordChange:false,
            emailChange:true
        })
    };
    changePhone=()=>{
        this.setState({
            phoneChange:true,
            passwordChange:false,
            emailChange:false
        })
    };
    changeCancel=()=>{
        document.getElementById('email-password').value = '';
        document.getElementById('new-email').value = '';
        document.getElementById('old-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('sure-password').value = '';
        this.setState({
            phoneChange:false,
            passwordChange:false,
            emailChange:false
        })
    };
    submitPhone=()=>{
        let password = document.getElementById('phone-password').value;
        let cardId = document.getElementById('phone-card-id').value;
        let phone = document.getElementById('phone-new').value;
        let msgCode = document.getElementById('phone-code').value;
        console.log(password);
        console.log(cardId);
        console.log(phone);
        console.log(msgCode);
        ajax({
            url:'person/center/modifyPhone',
            method:'post',
            data:{
                password:password,
                cardId:cardId,
                phone:phone,
                msgCode:msgCode,
            }
        }).then(()=>{
            message.success('手机号修改成功');
            this.setState({
                passwordChange:false
            })
            this.props.history.push('/login');
        }).finally(()=>{
        })
    };
    submitPwd=()=>{
        const oldPassword = document.getElementById('old-password').value;
        const newPassword = document.getElementById('new-password').value;
        const surePassword = document.getElementById('sure-password').value;
        const reg = /^[0-9a-zA-Z,./_]{6,32}$/;
        if(!newPassword){
            message.error('请输入密码');
            document.getElementById('new-password').focus();
        }else{
            if(newPassword && !reg.test(newPassword)){
                document.getElementById('new-password').value = '';
                document.getElementById('sure-password').value = '';
                message.error('密码必须是6-32位数字、字母以及",./_"组合');
            }else{
                if(newPassword === surePassword){
                    ajax({
                        url:'person/center/modifyPassword',
                        method:'post',
                        data:{
                            oldPassword,
                            newPassword
                        }
                    }).then(()=>{
                        message.success('密码修改成功');
                        this.setState({
                            passwordChange:false
                        })
                        this.props.history.push('/login');
                    }).finally(()=>{
                        document.getElementById('old-password').value = '';
                        document.getElementById('new-password').value = '';
                        document.getElementById('sure-password').value = '';
                    })
                }else{
                    message.error('请确保两次密码输入一致');
                }
            }
        }
    };
    submitEmail=()=>{
        let password = document.getElementById('email-password').value;
        let email = document.getElementById('new-email').value;
        let {info} = this.state;
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(password != '' && email != ''){
            if(reg.test(email)){
                ajax({
                    url:'person/center/modifyEmail',
                    method:'post',
                    data:{
                        password,
                        email
                    }
                }).then(()=>{
                    message.success('邮箱修改成功');
                    info.email=email;
                    this.setState({
                        emailChange:false,
                        info
                    })
                }).finally(()=>{
                    document.getElementById('email-password').value = '';
                    document.getElementById('new-email').value = '';
                })
            }else{
                document.getElementById('new-email').focus();
                message.error('请输入正确的邮箱地址');
            }
        }
    };
    getCode=()=>{
        let imgCode = this.props.form.getFieldValue('imgCode');
        let phoneNum = document.getElementById('phone-new').value;
        const reg = /^1[0-9]{10}$/;
        const _timeBtn = this.refs.timeBtn;
        if(reg.test(phoneNum)){
            _timeBtn.changeDisableCode('正在获取验证码');
            ajax({
                url:'/public/sms/send',
                method:'post',
                data:{
                    phone:phoneNum,
                    imgCode:imgCode
                }
            }).then(()=>{
                message.success('获取验证码成功');
                _timeBtn.timer();
                this.setState({firstSendCode:false});
            }).catch(()=>{
                this.setState({
                    codeSrc:`${baseURL}public/image/regImgCode?phone=${phoneNum}&${Date.now()}`
                });
                _timeBtn.changeAbleCode(this.state.firstSendCode?'获取短信验证码':'重发获取验证码');
            })
        }else{
            message.error('请输入正确的手机号');
            document.getElementById('phone').focus();
        }
    };
    getImgCode=(e)=>{
        const reg = /^1[0-9]{10}$/;
        if(reg.test(e.target.value)){
            this.setState({
                codeSrc:`${baseURL}public/image/regImgCode?phone=${e.target.value}&${Date.now()}`
            })
        }else{
            this.setState({
                codeSrc:``
            })
        }

    };
    changeImg=()=>{
        const phone = this.props.form.getFieldValue('phone');
        this.setState({
            codeSrc:`${baseURL}public/image/regImgCode?phone=${phone}&${Date.now()}`
        })
    };
    componentWillReceiveProps(props){
        const {info} = props;
        this.setState({
            info
        })
    };
    render(){
        const {phoneChange, passwordChange, emailChange, info, codeSrc}=this.state;
        const {password,email,userName} = info;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout={
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 }
            }
        };
        return (
            <div className="personal-center-content ant-col-20">
                <div className="personal-center-content-main account-info">
                    <div className="account-info-item clearfix">
                        <div className="account-info-item-default clearfix" >
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="手机号"
                                >
                                    <span className="account-info-item-show">{userName}</span>
                                     <Button className="btn-modify" onClick={this.changePhone}>修改</Button>
                                </FormItem>
                            </Form>
                        </div>

                         <div className="account-info-item-modify clearfix" style={{"display":phoneChange?"block":"none"}}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="修改手机号"
                                >
                                    <Input id="phone-password" type="password" placeholder="请输入登录密码"/>
                                    <Input id="phone-card-id" placeholder="请输入身份证号"/>
                                    <Input id="phone-new" placeholder="请输入新手机号" onChange={(e)=>this.getImgCode(e)}/>
                                    {codeSrc?<FormItem
                                            span={24}
                                        >
                                            <Col span={17}>
                                                {getFieldDecorator('imgCode', {
                                                    rules: [{ required: true, message: '图形验证码不能为空' }],
                                                })(
                                                    <Input size="large" placeholder="请输入图形验证码" maxLength="6" />
                                                )}
                                            </Col>
                                            <Col span={7} style={{"paddingLeft":"10px","height":"32px"}}>
                                                <img src={codeSrc} alt="图形验证码" onClick={this.changeImg} style={{"height":"100%","width":"100%","display":"block"}}/>
                                            </Col>
                                        </FormItem>:''}
                                    <p className="code-wrapper">
                                        <Input id="phone-code" className="ant-col-17" placeholder="请输入短信验证码"/>
                                        <TimeBtn thisClass="ant-col-6 btn-modify" style={{"paddingLeft":"10px"}} thisClick={this.getCode} thisTime={180} txt="获取短信验证码" ref="timeBtn"/>
                                    </p>
                                    <p className="btn-wrapper">
                                        <Button onClick={this.changeCancel}>取消</Button>
                                        <Button type="primary" onClick={this.submitPhone}>提交</Button>
                                    </p>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                    <div className="account-info-item clearfix">
                        <div className="account-info-item-default clearfix" style={{"display":!passwordChange?"block":"none"}}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="登录密码"
                                >
                                    <span className="account-info-item-show">{`******`}</span>
                                    <Button className="btn-modify" onClick={this.changePwd}>修改</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div className="account-info-item-modify clearfix" style={{"display":passwordChange?"block":"none"}}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="修改登录密码"
                                >
                                    <Input type="password" id="old-password" placeholder="请输入原登录密码"/>
                                    <Input type="password" id="new-password" placeholder="输入新密码(6-32位数字、字母以及',./_'组合)"/>
                                    <Input type="password" id="sure-password" placeholder="请确认新密码"/>
                                    <p className="btn-wrapper">
                                        <Button onClick={this.changeCancel}>取消</Button>
                                        <Button type="primary" onClick={this.submitPwd}>提交</Button>
                                    </p>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                    <div className="account-info-item clearfix">
                        <div className="account-info-item-default clearfix" style={{"display":!emailChange?"block":"none"}}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="邮箱"
                                >
                                    <span className="account-info-item-show">{email}</span>
                                    <Button className="btn-modify" onClick={this.changeEmail}>修改</Button>
                                </FormItem>
                            </Form>
                        </div>
                        <div className="account-info-item-modify clearfix" style={{"display":emailChange?"block":"none"}}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="修改邮箱"
                                >
                                    <Input type="password" id="email-password" placeholder="请输入登录密码"/>
                                    <Input id="new-email" placeholder="输入新邮箱"/>
                                    <p className="btn-wrapper">
                                        <Button onClick={this.changeCancel}>取消</Button>
                                        <Button type="primary" onClick={this.submitEmail}>提交</Button>
                                    </p>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}