import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import { Form, Input, Radio, Col, Button, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import ajax,{baseURL} from '../../utils/ajaxWithoutToken'
import {tokenUpdate,userChange} from '../../actions'
import {TimeBtn} from '../../components'

@connect()
@Form.create()

export default class NormalRegisterForm extends Component {
    constructor(props,context){
        super(props,context);
        this.state={
            confirmDirty: false,
            loading2:false,
            codeSrc:'',
            firstSendCode:true
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {toSuccess,dispatch} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {password,phone,smsVerifyCode,type} = values;
                this.setState({
                    loading2:true
                });
                ajax({
                    url:'/sys/user',
                    method:'post',
                    data:{
                        password:password,
                        phone:phone,
                        smsVerifyCode:smsVerifyCode,
                        type:type
                    }
                }).then((bodyData)=>{
                    dispatch(tokenUpdate(bodyData));
                    dispatch(userChange({
                        role:'0',
                        type:type,
                        verifyStatus:'1',
                        realAuth:'0'
                    }));
                    toSuccess();
                    this.setState({
                        loading2:false
                    });
                }).finally(()=>{
                    this.setState({
                        loading2:false
                    });
                })
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

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
                message.error('请输入图形验证码');
            }
        }else{
            message.error('请输入正确的手机号');
            document.getElementById('phone').focus();
        }
    };

    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const {loading2,codeSrc} = this.state;
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
                    span: 14,
                    offset: 6,
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit} className="register-form ant-col-16 ant-col-offset-4">
                <FormItem
                    {...formItemLayout}
                    label=" "
                >
                    {getFieldDecorator('type', {
                        rules: [ {
                            required: true, message: ' ',
                        }],
                        initialValue:0
                    })(
                        <RadioGroup>
                            <Radio value={0}>自然人</Radio>
                            <Radio value={1}>法人机构</Radio>
                            {/* <Radio value={2}>个体工商户</Radio> */}
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机号"
                >
                    {getFieldDecorator('phone', {
                        rules: [ {
                            required: true, message: '手机号不能为空',
                        },{
                            pattern:/^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|16[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}|19[0-9]{9}$/,message:'请输入正确的手机号码'
                        }],
                    })(
                        <Input placeholder="请输入手机号" maxLength="11" onChange={this.getImgCode} />
                    )}
                </FormItem>
                {codeSrc?<FormItem
                    {...formItemLayout}
                    label="图形验证码"
                    className="code-box"
                >
                    <Col span={16}>
                        {getFieldDecorator('imgCode', {
                            rules: [{ required: true, message: '图形验证码不能为空' }],
                        })(
                            <Input size="large" placeholder="请输入图形验证码" maxLength="6" />
                        )}
                    </Col>
                    <Col span={8} style={{"paddingLeft":"10px","height":"32px"}}>
                        <img src={codeSrc} alt="图形验证码" onClick={this.changeImg} style={{"height":"100%","width":"100%","display":"block"}}/>
                    </Col>
                </FormItem>:''}
                <FormItem
                    {...formItemLayout}
                    label="短信验证码"
                    className="code-box"
                >
                    <Col span={16}>
                        {getFieldDecorator('smsVerifyCode', {
                            rules: [{ required: true, message: '短信验证码不能为空' }],
                        })(
                            <Input size="large" placeholder="请输入手机验证码" maxLength="6" />
                        )}
                    </Col>
                    <Col span={8}>
                        {/* <Button size="large" className="get-code ant-col-22" onClick={this.getCode}>获取短信验证码</Button> */}
                        <TimeBtn thisClass="get-code ant-col-22" thisClick={this.getCode.bind(null,this)} thisTime={180} txt="获取短信验证码" ref="timeBtn"/>
                    </Col>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设置登录密码"
                >
                    {getFieldDecorator('password', {
                        rules: [ {
                            required: true, message: '密码不能为空',
                        },{
                            pattern:/^[0-9a-zA-Z,./_]{6,32}$/,message:'密码是6-32位数字、字母以及",./_"组合'
                        },{
                            validator: this.checkConfirm,
                        }]
                    })(
                        <Input type="password" placeholder="密码是6-32位数字、字母、特殊符号组合" maxLength="32" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认登录密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [ {
                            required: true, message: '确认密码不能为空',
                        },{
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" placeholder="请与上方输入密码保持一致" maxLength="32" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" loading={loading2} htmlType="submit" className="btn-submit">提交注册</Button>
                </FormItem>
            </Form>
        );
    }
}