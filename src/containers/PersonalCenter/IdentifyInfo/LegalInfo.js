import React, {Component} from 'react'
import { Icon, Form, Input, Button, Radio, Upload, message } from 'antd'
import cache from '../../../utils/cache'
import ajax,{baseURL} from '../../../utils/ajax'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import {userChange} from '../../../actions'

@Form.create()
export default class LegalInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            frontImg:'',
            backImg:'',
            licenseImg:'',
            accessImg:'',
            flag:'',
        }
    }
    getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    positiveUpload=(info)=>{
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    frontImg:imageUrl
                }));    
            }else{
                message.error(info.file.response.head.msg);
            }
            
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    };
    negativeUpload=(info)=>{
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    backImg:imageUrl
                }));   
            }else{
                message.error(info.file.response.head.msg);
            }
            
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    };
    licenseUpload=(info)=>{
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    licenseImg:imageUrl
                }));   
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    };
    accessUpload=(info)=>{
        this.setState({
            flag:'0'
        })
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    accessImg:imageUrl
                }));   
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name}文件上传失败`);
        }
    };
    handelSunmit=()=>{
        const {dispatch} = this.props;
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                values.cardImageFront = values.cardImageFront.file.response.body;
                values.cardImageCon = values.cardImageCon.file.response.body;
                values.threeInOne = values.threeInOne.file.response.body;
                values.creditPublicReport = values.creditPublicReport.file.response.body;
                ajax({
                    url:'/sys/user/enterpriseAuth',
                    method:'post',
                    data:values
                }).then((data)=>{
                    let {userInfo} = this.props;
                    userInfo.realName = values.name;
                    dispatch(userChange(userInfo));
                    this.props.getStatus();
                })
            }
        })
    }
    xBeforeUpload = (file) =>{
        if(file.type!='application/pdf'){
            message.error('请上传pdf格式的文件');
            return false;
        }
        if(file.size/1024/1024 >1){
            message.error('请上传小于1M的文件');
            return false;
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const token = cache.getItem('token');
        const {backImg,frontImg,licenseImg,accessImg} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            }
        };
        const props = {
            name:'uploadFile',
            accept:'image/jpeg,image/jpg,image/png,application/pdf',
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'C_0002'
            },
            beforeUpload:(file)=>{
                console.log(this.label)
                    if(file.type!='image/jpeg' && file.type!='image/jpg' && file.type!='image/png' && file.type!='application/png'){
                        message.error('请上传jpg,jpeg,png格式的文件');
                        return false;
                    }
                    if(file.size/1024/1024 >1){
                        message.error('请上传小于1M的文件');
                        return false;
                    }
                
            },
            showUploadList:false
        };
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="单位类型"
                >
                    {getFieldDecorator('type', {
                        rules: [
                            { required: true, message: '请选择单位类型' },
                        ],
                        initValue:0
                    })(
                        <RadioGroup>
                            <Radio value={0}>企业</Radio>
                            <Radio value={1}>事业单位</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="公司名"
                >
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: '请输入公司名称' },
                        ],
                    })(
                        <Input placeholder="请输入公司名称" maxLength="50"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="统一社会信用代码"
                >
                    {getFieldDecorator('unifiedSocialCode', {
                        rules: [
                            { required: true, message: '请输入18位统一社会信用代码' },
                            { pattern:/^[a-zA-Z0-9]{18}$/,message:'请输入正确的社会信用代码' }
                        ],
                    })(
                        <Input placeholder="请输入18位统一社会信用代码" maxLength="18"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="住所"
                >
                    {getFieldDecorator('address', {
                        rules: [
                            { required: true, message: '请输入住所' },
                        ],
                    })(
                        <Input placeholder="请输入住所"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="法人姓名"
                >
                    {getFieldDecorator('certName', {
                        rules: [{ 
                            required: true, message: '请输入法人姓名' 
                        }],
                    })(
                        <Input placeholder="请输入法人姓名"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="法人职务"
                >
                    {getFieldDecorator('certDuties', {
                        rules: [
                            { required: true, message: '请输入法人职务' },
                        ],
                    })(
                        <Input placeholder="请输入法人职务"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email', message: '请输入正确的电子邮箱',
                            }, { 
                                required: true, message: '请输入邮箱' 
                            },
                        ],
                    })(
                        <Input placeholder="请输入邮箱"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="法人手机号码"
                >
                    {getFieldDecorator('certMobile', {
                        rules: [
                          { pattern:/^1[0-9]{10}$/,message:'请输入正确的手机号码' },
                            { 
                                required: true, message: '请输入手机号码' 
                            },
                        ],
                    })(
                        <Input placeholder="请输入手机号码"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="法人身份证号码"
                >
                    {getFieldDecorator('certIdentityCard', {
                        rules: [
                          {pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,message:'请输入正确的身份证号码'},
                              { 
                                required: true, message: '请输入身份证号码' 
                            },
                        ],
                    })(
                        <Input placeholder="请输入身份证号码"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="法人身份证正面照"
                >
                    {getFieldDecorator('cardImageFront', {
                        rules: [
                            { required: true, message: '请上传法人身份证正面照' },
                        ],
                    })(
                        <Upload {...props} onChange={this.positiveUpload}>
                            {frontImg?<img src={frontImg}/>:
                            <div>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">支持JPG、JPEG、PNG格式图片，大小不超过1M</span>
                            </div>}
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="法人身份证反面照"
                >
                    {getFieldDecorator('cardImageCon', {
                        rules: [
                            { required: true, message: '请上传法人身份证反面照' },
                        ],
                    })(
                        <Upload {...props} onChange={this.negativeUpload}>
                            {backImg?<img src={backImg}/>:
                            <div>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">支持JPG、JPEG、PNG格式图片，大小不超过1M</span>
                            </div>}
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="彩色三证合一营业执照"
                >
                    {getFieldDecorator('threeInOne', {
                        rules: [
                            { required: true, message: '请上传营业执照' },
                        ],
                    })(
                        <Upload {...props} onChange={this.licenseUpload}>
                            {licenseImg?<img src={licenseImg}/>:
                            <div>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">支持JPG、JPEG、PNG格式图片，大小不超过1M</span>
                            </div>}
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="企业信用信息公示报告"
                >
                    {getFieldDecorator('creditPublicReport', {
                        rules: [
                            { required: true, message: '请上传企业信用信息公示报告' },
                        ],
                    })(
                        <Upload {...props} beforeUpload={this.xBeforeUpload} onChange={this.accessUpload}>
                            {accessImg?<img src={accessImg}/>:
                            <div>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">支持PDF格式,大小不超过1M</span>
                            </div>}
                        </Upload>
                    )}
                </FormItem>
                <div className="personal-center-content-btn-box">
                    <Button type="primary" onClick={this.handelSunmit}>提交</Button>
                </div>
            </Form>
        )
    }
}