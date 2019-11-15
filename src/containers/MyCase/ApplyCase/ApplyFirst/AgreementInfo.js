import React,{Component} from 'react'
import { Icon, Form, Input, Button, Radio, Upload, message, Modal, DatePicker, Row, Col ,InputNumber} from 'antd'
import moment from 'moment'
import cache from '../../../../utils/cache'
import {baseURL} from '../../../../utils/ajax'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {ArbitrationPreview} from '../../../../components'

@Form.create()
export default class AgreementInfo extends Component{
    constructor(props){
        super(props);
    }
    chooseIdentity=(e)=>{
        const {form} = this.props;
        if(e.target.value === 0){
            form.setFieldsValue({
                keys: ['1'],
            });
        }else{
            form.setFieldsValue({
                keys: [],
            });
        }
    }
    render(){
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            }
        };
        // const {evidences} = this.props.userInfo;
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const {arbiProtocolSignMode,protocolName,signTime,caseType,caseAmount} = this.props;
        getFieldDecorator('keys', { initialValue: arbiProtocolSignMode!=1?['1']:[] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k,index)=>{
            return(
                <div key={index}>
                    <FormItem
                        {...formItemLayout1}
                        label="合同名称"
                    >
                        {getFieldDecorator('protocolName', {
                            rules: [{
                                required: true, message: '合同名称不能为空',
                            }],
                            initialValue:protocolName || ''
                        })(
                            <Input placeholder="请输入合同名称"/>
                        )}
                    </FormItem>
                </div>
            )
        })
        return(
            <Form ref="info">
                {/* <FormItem
                    {...formItemLayout1}
                    label="仲裁协议签订方式"
                    className="no-content"
                >
                    {getFieldDecorator('arbiProtocolSignMode', {
                        initialValue:arbiProtocolSignMode*1 || 0
                    })(
                        <RadioGroup onChange={this.chooseIdentity}>
                            <Radio value={0} keyWord={'prevName'}>合同约定仲裁条款</Radio>
                            <Radio value={1} keyWord={'prevName'}>单独仲裁协议</Radio>
                        </RadioGroup>
                    )}
                </FormItem> */}
                <FormItem
                    {...formItemLayout1}
                    label="仲裁协议签订方式"
                    className="no-content"
                >
                    {getFieldDecorator('arbiProtocolSignMode', {
                        initialValue:arbiProtocolSignMode*1 || 0
                    })(
                        <RadioGroup onChange={this.chooseIdentity}>
                            <Radio value={0} keyWord={'prevName'}>合同中订立的仲裁条款</Radio>
                            <Radio value={1} keyWord={'prevName'}>以其他书面方式达成的请求仲裁的协议</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                {formItems}
                <FormItem
                    {...formItemLayout1}
                    label="签订日期"
                >
                    {getFieldDecorator('signTime', {
                        rules: [{
                            required: true, message: '签订日期不能为空',
                        }],
                        initialValue:signTime?moment(signTime):moment()
                    })(
                        <DatePicker allowClear={true} format="YYYY-MM-DD" placeholder="请选择签订日期"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="案由"
                >
                        <Row gutter={8}>
                        <Col span={12}>
                        {getFieldDecorator('caseType', {
                                rules: [{
                                    required: true, message: '案由不能为空',
                                }],
                                initialValue:caseType || ''
                            })(
                                <Input placeholder="请输入案由"/>
                        )}
                        </Col>
                        <Col span={12}>
                        <em style={{color:'#000',fontSize:14}}></em>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="涉案金额"
                >

                    <Row gutter={8}>
                        <Col span={12}>
                        {getFieldDecorator('caseAmount', {
                                rules: [{
                                    required: true, message: '涉案金额不能为空',
                                }],
                                initialValue:caseAmount || ''
                            })(
                                <InputNumber min={0} placeholder="请输入涉案金额"/>
                        )}
                        </Col>
                        <Col span={12}>
                        <em style={{color:'#000',fontSize:14}}></em>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
        )
    }
}
