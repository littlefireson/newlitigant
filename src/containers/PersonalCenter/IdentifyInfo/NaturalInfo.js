import React, {Component} from 'react'
import { Icon, Form, Input, Button, Radio, Upload, message, Row, Col } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import {TimeBtn} from '../../../components'
import {userChange} from '../../../actions'
import ajax,{baseURL} from '../../../utils/ajax'
import cache from '../../../utils/cache'

@Form.create()
export default class NaturalInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            frontImg:'',
            backIma:'',
            firstSendCode:true
        }
    }
    positiveUpload=(info)=>{
        if (info.file && info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){ 
                message.success(`上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    frontImg:imageUrl,
                }));   
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`上传失败`);
        }
    };
    negativeUpload=(info)=>{
        if (info.file && info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){ 
                message.success(`上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    backImg:imageUrl
                }));   
            }else{
                message.error(info.file.response.head.msg);
            }
            
        } else if (info.file.status === 'error') {
            message.error(`上传失败`);
        }
    };
    checkIdCard = (rule, value, callback) => {
        //该方法由佚名网友提供;
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;
        if(value){
            if (value.length == 15) {
                return isValidityBrithBy15IdCard(value);
            } else if (value.length == 18) {
                var a_idCard = value.split(""); // 得到身份证数组
                if (isValidityBrithBy18IdCard(value) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                    callback();
                }
                callback('请输入正确的身份证号');
            }
            callback('请输入正确的身份证号');
        }else{
            callback();
        }

        function isTrueValidateCodeBy18IdCard(a_idCard) {
            var sum = 0; // 声明加权求和变量
            if (a_idCard[17].toLowerCase() == 'x') {
                a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
            }
            for (var i = 0; i < 17; i++) {
                sum += Wi[i] * a_idCard[i]; // 加权求和
            }
            var valCodePosition = sum % 11; // 得到验证码所位置
            if (a_idCard[17] == ValideCode[valCodePosition]) {
                return true;
            }
            return false;
        }
        function isValidityBrithBy18IdCard(idCard18) {
            var year = idCard18.substring(6, 10);
            var month = idCard18.substring(10, 12);
            var day = idCard18.substring(12, 14);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day), 1, 0, 0);

            // 这里用getFullYear()获取年份，避免千年虫问题
            if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                return false;
            }
            return true;
        }

        function isValidityBrithBy15IdCard(idCard15) {
            var year = idCard15.substring(6, 8);
            var month = idCard15.substring(8, 10);
            var day = idCard15.substring(10, 12);
            var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
            // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
            if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                callback('请输入正确的身份证号');
            }
            callback();
        }
    };
    handelSubmit=()=>{
        const form = this.props.form;
        const {dispatch} = this.props;
        form.validateFieldsAndScroll((err, values)=>{
            if(!err){
                values.cardImageFront = values.cardImageFront.file.response.body ||  '';
                values.cardImageCon = values.cardImageCon.file.response.body ||  '';
                ajax({
                    url:'/sys/user/elementVerify',
                    method:'post',
                    data:values
                }).then((data)=>{
                    let {userInfo} = this.props;
                    if(data){
                        userInfo.realAuth = 1;
                    }
                    userInfo.verifyStatus = 0;
                    userInfo.realName = values.name;
                    dispatch(userChange(userInfo));
                    this.props.history.push('/personal/1');
                })
            }
        })
    };
    getCode=()=>{
        const form = this.props.form;
        let phone = form.getFieldValue('phone');
        let reg = /^1[0-9]{10}$/;
        let _state = this.refs.timeBtn;
        if(reg.test(phone)){
            _state.changeDisableCode('正在获取验证码');
            ajax({
                url:`/public/sms/elementFour/send?phone=${phone}`,
                method:'post',
            }).then(()=>{
                message.success('验证码已发送至手机');
                _state.timer();
                this.setState({firstSendCode:false});
            }).catch(()=>{
                _state.changeAbleCode(this.state.firstSendCode?'获取验证码':'重发获取验证码');
            })
        }else{
            message.error('请输入正确的手机号');
        }
    };
    getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const token = cache.getItem('token');
        const {frontImg,backImg} = this.state;
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
            accept:"image/jpeg,image/jpg,image/png",
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'S_0022'
            },
            beforeUpload:(file)=>{
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
        const helpHtml  = <div style={{"color":"red"}}>请填写带有银联<span style={{"padding":"0 24px","position":"relative"}}><img style={{"top":0,"left":"10px","position":"absolute","height":"16px"}} src={require('../../../assets/images/yinlian.png')} /></span>标志的银行卡卡号，此卡号仅用于当事人身份认证，不作其它用途</div>
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                >
                    {getFieldDecorator('name', {
                    rules: [
                        { required: true, message: '请输入姓名' },
                    ],
                })(
                    <Input placeholder="请输入姓名"/>
                )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="民族"
                >
                    {getFieldDecorator('ethnic', {
                        rules: [{
                            required: true, message: '请输入民族',
                        }],
                    })(
                        <Input placeholder="请输入民族" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                >
                    {getFieldDecorator('sex', {
                        rules: [
                            { required: true, message: '请选择性别' },
                        ],
                        initialValue:0
                    })(
                        <RadioGroup>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="身份证号"
                >
                    {getFieldDecorator('cardId', {
                        rules: [
                            { required: true, message: '请输入身份证号' },
                            { validator: this.checkIdCard}
                        ],
                    })(
                        <Input placeholder="请输入身份证号" maxLength="18"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="银行卡号" 
                    extra={helpHtml}
                >
                    {getFieldDecorator('bankCardId', {
                        rules: [
                            { required: true, message: '请输入银行卡号' },
                            {pattern:/[0-9]{13,19}/,message:'请输入正确的银行卡号'}
                        ],
                    })(
                        <Input placeholder="请输入银行卡号" maxLength="19"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="银行预留手机号"
                >
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, message: '请输入银行预留手机号' },
                            {pattern:/^1[0-9]{10}$/,message:'请输入正确的手机号码'}
                        ],
                    })(
                        <Input placeholder="请输入银行预留手机号" maxLength="11"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机验证码"
                >
                    <Row gutter={8}>
                        <Col span={18}>
                            {getFieldDecorator('phoneCode', {
                                rules: [
                                    { required: true, message: '请输入手机验证码' },
                                ],
                            })(
                                <Input className="ant-input-lg" placeholder="请输入手机验证码" maxLength="6"/>
                            )}
                        </Col>
                        <Col span={6}>
                            {/* <Button onClick={this.getCode} className="get-code">获取验证码</Button> */}
                            <TimeBtn thisClick={this.getCode} thisClass="get-code" thisTime={180} txt="获取验证码" ref="timeBtn"/>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="住址"
                >
                    {getFieldDecorator('address', {
                        rules: [
                            { required: true, message: '请输入住址' },
                        ],
                    })(
                        <Input placeholder="请输入住址"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="送达电子邮箱"
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请输入正确的电子邮箱',
                        }, {
                            required: true, message: '请输入送达电子邮箱',
                        }],
                    })(
                        <Input placeholder="example@qq.com" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="身份证正面照"
                >
                    {getFieldDecorator('cardImageFront', {
                        rules: [
                            { required: true, message: '请上传身份证正面照' },
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
                    label="身份证反面照"
                >
                    {getFieldDecorator('cardImageCon', {
                        rules: [
                            { required: true, message: '请输上传身份证反面照' },
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
                <div className="personal-center-content-btn-box">
                    <Button onClick={this.handelSubmit} type="primary">提交</Button>
                </div>
            </Form>
        )
    }
}