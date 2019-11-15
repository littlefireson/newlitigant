import React, {Component} from 'react'
import { Form, Input, Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {withRouter} from 'react-router-dom'
const FormItem = Form.Item;

@Form.create()
@withRouter
export default class NormalForgetFormThree extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.log(this.props);
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
                <FormItem>
                    <p className="forget-success-title">
                        <Icon type="check-circle" style={{ fontSize: 32, color: '#3DBD7D' }} />
                        <span>密码重置成功</span>
                    </p>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" onClick={()=>{this.props.history.push('/login')}} className="btn-next">下一步</Button>
                </FormItem>
            </Form>
        );
    }
}
