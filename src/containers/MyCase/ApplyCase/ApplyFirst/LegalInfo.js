import React, {Component} from 'react'
import { Icon, Form, Input, Button, Radio, message, Upload } from 'antd'

import ajax,{baseURL} from '../../../../utils/ajax'
import cache from '../../../../utils/cache'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()

export default class LegalInfo extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     showFlag:true
        // }
    }
    checkIdenyify=(e)=>{
        const {prevName,currentRole} = this.props;
        if(currentRole==2 && prevName=='applicant'){
            const idNum = e.target.value;
            const reg = /(^[a-zA-Z0-9]{18}$)|(^[a-zA-Z0-9]{15}$)/;
            let socialFlag = false;
            if(reg.test(idNum)){
                ajax({
                    url:`agent/author/${idNum}/enterpriseAuthorValid`,
                    method:'post',
                    data:{
                        unifiedSocialCode:idNum
                    }
                }).then(()=>{
                    this.props.btnShow();
                    socialFlag = true;
                    this.props.unifiedSocialCode(socialFlag)
                    console.log()
                }).catch((data)=>{
                    socialFlag = false;
                    this.props.unifiedSocialCode(socialFlag)
                    if(data.retCode == '4038'){ 
                        this.props.tipOpen();
                    }
                })
            }
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        // const token = cache.getItem('token');
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            }
        };
        const formItemLayout4 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 7 },
            }
        };
        // const props = {
        //     name:'uploadFile',
        //     action: `${baseURL}public/file/uploads?access_token=${token}`,
        //     data:{
        //         buzzType:'S_0022'
        //     }
        // };
        const {prevName,role,disable,chooseRole,legalInfo} = this.props;
        // const {showFlag} = this.state;
        return (
            <Form>
                <FormItem
                    {...formItemLayout1}
                    label="申请人属性"
                >
                    {getFieldDecorator(prevName+'Type', {
                        initialValue:role*1
                    })(
                        <RadioGroup disabled={disable} onChange={chooseRole}>
                            <Radio value={0} keyWord={prevName}>自然人</Radio>
                            <Radio value={1} keyWord={prevName}>法人</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout4}
                    label="名称"
                >
                    {getFieldDecorator(prevName+'Name', {
                        rules: [{
                            required: true, message: '请输入名称',
                        }],
                        initialValue:legalInfo[prevName+'Name']
                    })(
                        <Input disabled={disable} type="text" placeholder="请与营业执照一致" maxLength="50" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout4}
                    label="统一社会信用代码/注册号"
                >
                    {getFieldDecorator(prevName+'UnifiedSocialCode', {
                        rules: [
                            { required: true, message: '请输入18位统一社会信用代码/15位注册号' },
                            { pattern:/(^[a-zA-Z0-9]{18}$)|(^[a-zA-Z0-9]{15}$)/,message:'请输入正确的社会信用代码/注册号' }
                        ],
                        initialValue:legalInfo[prevName+'UnifiedSocialCode']
                    })(
                        <Input disabled={disable} onChange={this.checkIdenyify} type="text" placeholder="请与营业执照一致" maxLength="18" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout4}
                    label="住址/经营场所"
                >
                    {getFieldDecorator(prevName+'Address', {
                        rules: [{
                            required: true, message: '请输入住址/经营场所',
                        }],
                        initialValue:legalInfo[prevName+'Address']
                    })(
                        <Input disabled={disable} type="text" placeholder="请与营业执照一致" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout4}
                    label="法定代表人姓名/营业者姓名"
                >
                    {getFieldDecorator(prevName+'CertName', {
                        rules: [{
                            required: true, message: '请输入法定代表人姓名/营业者姓名',
                        }],
                        initialValue:legalInfo[prevName+'CertName']
                    })(
                        <Input disabled={disable} type="text" placeholder="请与营业执照一致" />
                    )}
                </FormItem>
                {prevName=="beApplicant"&&<FormItem
                    {...formItemLayout4}
                    label="法定代表人手机号/营业者手机号"
                >
                    {getFieldDecorator(prevName+'Phone', {
                        rules: [{
                            required: true, message: '请输入法定代表人手机号/营业者手机号',
                        },{
                            pattern:/^1[0-9]{10}$/,message:'请输入正确的手机号码'
                        }],
                        initialValue:legalInfo[prevName+'Phone']
                    })(
                        <Input disabled={disable} type="tel" placeholder="请输入法定代表人手机号/营业者手机号" maxLength="11" />
                    )}
                </FormItem>}
                <FormItem
                    {...formItemLayout4}
                    label="法定代表人职务（个体工商户可不填）"
                >
                    {getFieldDecorator(prevName+'CertDuties', {
                        rules: [{
                            required: false, message: '请输入法定代表人职务',
                        }],
                        initialValue:legalInfo[prevName+'CertDuties']
                    })(
                        <Input disabled={disable} type="text" placeholder="请输入法定代表人职务" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout4}
                    label="送达电子邮箱"
                >
                    {getFieldDecorator(prevName+'Email', {
                        rules: [{
                            type: 'email', message: '送达电子邮箱格式错误',
                        }, {
                            required: true, message: '请输入送达电子邮箱',
                        }],
                        initialValue:legalInfo[prevName+'Email']
                    })(
                        <Input disabled={disable} type="text" placeholder="example@qq.com" />
                    )}
                </FormItem>
                {/* {prevName=="beApplicant"&&<div className="upload-wrapper">
                    <FormItem
                        {...formItemLayout4}
                        label="认证信息"
                    >
                        {getFieldDecorator('indentifyInfo', {
                            rules: [
                                { required: true, message: '请上传营业执照/工商登记查询信息' },
                            ],
                        })(
                            <Upload {...props} onChange={this.licenseUpload} style={{"display":showFlag?'inline-block':'none'}}>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">请上传营业执照/工商登记查询信息</span>
                            </Upload>
                        )}
                    </FormItem>
                </div>} */}
            </Form>
        )
    }
}