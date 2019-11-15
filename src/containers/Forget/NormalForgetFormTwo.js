import React, {Component} from 'react'
import { Form, Input, Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;

@Form.create()
export default class NormalForgetFormTwo extends Component {
    constructor(props){
        super(props);
        this.state={
            confirmDirty:false
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changePassword(values.password);
            }
        });
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
    render() {
        const { getFieldDecorator } = this.props.form;
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
                    offset: 5,
                }
            }
        };
        return (
            <Form onSubmit={this.handleSubmit} className="forget-form ant-col-16 ant-col-offset-4">
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
                            pattern:/^[0-9a-zA-Z,./_]{6,32}$/,message:'密码是6-32位数字、字母以及",./_"组合'
                        },{
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" placeholder="请与上方输入密码保持一致" maxLength="32" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" className="btn-next">下一步</Button>
                </FormItem>
            </Form>
        );
    }
}
