import React, {Component} from 'react'
import { Form, Input, Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message } from 'antd';
const FormItem = Form.Item;

import ajax,{baseURL} from '../../utils/ajaxWithoutToken'
import {TimeBtn} from '../../components'

@Form.create()
export default class NormalForgetFormOne extends Component {
    constructor(props){
        super(props);
        // console.log(props);
        this.state={
            codeSrc:'',
            codeSuccess:false,
            firstSendCode:true
        }
    }
    goNext = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ajax({
                    url:'sys/user/lostPwdToken',
                    method:'post',
                    data:{
                        phone:values.phone,
                        smsCode:values.captcha
                    }
                }).then((data)=>{
                    this.props.nextStep(data);
                })
            }
        });
    };
    getImgCode=(e)=>{
        const reg = /^1[0-9]{10}$/;
        if(reg.test(e.target.value)){
            this.setState({
                codeSrc:`${baseURL}public/image/lostPassWordImgCode?phone=${e.target.value}&${Date.now()}`
            })
        }else{
            this.setState({
                codeSrc:``
            })
        }
        
    }
    changeImg=()=>{
        const phone = this.props.form.getFieldValue('phone');
        this.setState({
            codeSrc:`${baseURL}public/image/lostPassWordImgCode?phone=${phone}&${Date.now()}`
        })
    }
    getCode=(e)=>{
        const form = this.props.form;
        const phoneNum = form.getFieldValue('phone');
        const imgCode = form.getFieldValue('imgCode');
        const reg = /^1[0-9]{10}$/;
        const _timeBtn = e.refs.timeBtn;
        if(reg.test(phoneNum)){
            if(imgCode){
                _timeBtn.changeDisableCode('正在获取验证码');
                ajax({
                    url:'public/sms/lost/code',
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
                        codeSrc:`${baseURL}public/image/lostPassWordImgCode?phone=${phoneNum}&${Date.now()}`
                    });
                    _timeBtn.changeAbleCode(this.state.firstSendCode?'获取短信验证码':'重发获取验证码');
                })
            }else{
                message.error('请输入图形验证码');
            }
        }else{
            message.error('请输入正确的手机号');
            document.getElementById('phone').focus();
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {codeSrc,codeSuccess} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 15,
                    offset: 4,
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit} className="forget-form ant-col-16 ant-col-offset-4">
                <FormItem
                    {...formItemLayout}
                    label="手机号"
                >
                    {getFieldDecorator('phone', {
                        rules: [ {
                            required: true, message: '手机号不能为空',
                        }],
                    })(
                        <Input placeholder="请输入手机号" onChange={this.getImgCode} maxLength="11" />
                    )}
                </FormItem>
                {codeSrc?<FormItem
                    {...formItemLayout}
                    label="图形验证码"
                >
                    <Col span={16}>
                        {getFieldDecorator('imgCode', {
                            rules: [{ required: true, message: '图形验证码不能为空' }],
                        })(
                            <Input size="large" placeholder="请输入图形验证码" maxLength="4" />
                        )}
                    </Col>
                    <Col span={8} style={{"paddingLeft":"10px","height":"32px"}}>
                        <img style={{"width":"100%","height":"100%","display":"block"}} src={codeSrc} alt="图形验证码" onClick={this.changeImg}/>
                    </Col>
                </FormItem>:''}
                <FormItem
                    {...formItemLayout}
                    label="短信验证码"
                >
                    <Col span={16}>
                        {getFieldDecorator('captcha', {
                            rules: [{ required: true, message: '短信验证码不能为空' }],
                        })(
                            <Input size="large" placeholder="请输入手机验证码" maxLength="6"/>
                        )}
                    </Col>
                    <Col span={8}>
                        <TimeBtn thisClass="get-code ant-col-22" thisClick={this.getCode.bind(null,this)} thisTime={180} success={codeSuccess} ref="timeBtn" txt="获取短信验证码"/>
                    </Col>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" className="btn-next" onClick={this.goNext}>下一步</Button>
                </FormItem>
            </Form>
        );
    }
}
