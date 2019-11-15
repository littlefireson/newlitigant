import React, {Component} from 'react'
import { Form, Input, Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {connect} from 'react-redux'

import cache from '../../utils/cache';
import ajax from '../../utils/ajax'

class SuccessRegisterForm extends React.Component {
    constructor(props,context){
        super(props,context);

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ajax({
                    url:'/sys/user/changeRole',
                    method:'post',
                    data:{
                        role:values.role
                    }
                }).then(()=>{
                    this.props.history.push('/'+values.role);
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const {type} = this.props.userInfo;
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 6,
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit} className="register-success-form ant-col-12 ant-col-offset-6">
                <FormItem>
                    <p className="ant-col-14 ant-col-offset-5">选择身份登入</p>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('role', {
                        rules: [{
                            required: true, message: ' ',
                        }],
                        initialValue:0
                    })(
                        <RadioGroup className="ant-col-14 ant-col-offset-5">
                            <Radio className="ant-col-8" value={0}>申请人</Radio>
                            <Radio className="ant-col-8" value={1}>被申请人</Radio>
                            {type==0&&<Radio className="ant-col-8" value={2}>代理人</Radio>}
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" onClick={this.handleSubmit} className="btn-login">登入</Button>
                </FormItem>
            </Form>
        );
    }
}

//注册表单组建
const WrappedSuccessRegisterForm = Form.create()(SuccessRegisterForm);

@connect(state=>({
    userInfo:state.userInfo
}))
export default class RegisterSuccess extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return (
            <section className="register-success ant-row">
                <p className="register-success-title">
                    <Icon type="check-circle" style={{ fontSize: 32, color: '#3DBD7D' }} />
                    <span>恭喜你，注册成功</span>
                </p>
                <WrappedSuccessRegisterForm {...this.props}/>
            </section>
        )
    }
}