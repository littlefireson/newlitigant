import React, {Component} from 'react'
import { Icon, Form, Input, Button, Radio, Upload } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import ajax,{baseURL} from '../../../../utils/ajax'
import cache from '../../../../utils/cache'

@Form.create()

export default class NaturalInfo extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     showFlag1:true,
        //     showFlag2:true
        // }
    }
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
                return false;
            }
            return true;
        }
    };


    //代理立案身份证号输入需要进行验证
    checkIdCardNormal=(value)=>{
        //该方法由佚名网友提供;
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;
        if(value){
            if (value.length == 15) {
                return isValidityBrithBy15IdCard(value);
            } else if (value.length == 18) {
                var a_idCard = value.split(""); // 得到身份证数组
                if (isValidityBrithBy18IdCard(value) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                    return true;
                }
                return false;
            }
            return false;
        }else{
            return true;
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
                return false;
            }
            return true;
        }
    }
    checkIdenyify=(e)=>{
        const {prevName,currentRole} = this.props;
        if(currentRole==2 && prevName=='applicant'){
            const idNum = e.target.value;
            if(this.checkIdCardNormal(idNum)){
                ajax({
                    url:`agent/author/${idNum}/elementVerify`,
                    method:'post'
                }).then(()=>{
                    this.props.btnShow();
                }).catch((data)=>{
                    if(data.retCode == '4038'){
                        this.props.tipOpen();
                    }
                })
            }
        }
    }
    // positiveUpload=(info)=>{
    //     if(info.fileList.length>0){
    //         this.setState({
    //             showFlag1:false
    //         })
    //     }else{
    //         this.setState({
    //             showFlag1:true
    //         })
    //     }
    //     if (info.file.status === 'done') {
    //         message.success(`上传成功`);
    //     } else if (info.file.status === 'error') {
    //         message.error(`上传失败`);
    //     }
    // };
    // negativeUpload=(info)=>{
    //     if(info.fileList.length>0){
    //         this.setState({
    //             showFlag2:false
    //         })
    //     }else{
    //         this.setState({
    //             showFlag2:true
    //         })
    //     }
    //     if (info.file.status === 'done') {
    //         message.success(`上传成功`);
    //     } else if (info.file.status === 'error') {
    //         message.error(`上传失败`);
    //     }
    // };
    render(){
        // const token = cache.getItem('token');
        // const {showFlag1,showFlag2} = this.state;
        const { getFieldDecorator } = this.props.form;
        const {prevName,role,disable,chooseRole,naturalInfo} = this.props;
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
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 3 },
            }
        };
        const formItemLayout3 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 5 },
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
        return(
            <Form>
                <FormItem
                    {...formItemLayout1}
                    label={prevName=="applicant"?"申请人属性":"被申请人属性"}
                    className="no-content"
                >
                    {getFieldDecorator(prevName+'Type', {
                        initialValue: role*1
                    })(
                        <RadioGroup disabled={disable} onChange={chooseRole}>
                            <Radio value={0} keyWord={prevName}>自然人</Radio>
                            <Radio value={1} keyWord={prevName}>法人</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="姓名"
                >
                    {getFieldDecorator(prevName+'Name', {
                        rules: [{
                            required: true, message: '请输入姓名',
                        }],
                        initialValue:naturalInfo[prevName+'Name']
                    })(
                        <Input disabled={disable} type="text" placeholder="请输入姓名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="民族"
                >
                    {getFieldDecorator(prevName+'Ethnic', {
                        rules: [{
                            required: false, message: '请输入民族',
                        }],
                        initialValue:naturalInfo[prevName+'Ethnic']
                    })(
                        <Input disabled={disable} type="text" placeholder="请输入民族" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout2}
                    label="性别"
                >
                    {getFieldDecorator(prevName+'Sex', {
                        rules: [{
                            required: false, message: '请输入性别',
                        }],
                        initialValue:naturalInfo[prevName+'Sex']*1 || 0
                    })(
                        <RadioGroup disabled={disable}>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="手机号"
                >
                    {getFieldDecorator(prevName+'Phone', {
                        rules: [{
                            required: true, message: '请输入手机号',
                        },{
                            pattern:/^1[0-9]{10}$/,message:'请输入正确的手机号码'
                        }],
                        initialValue:naturalInfo[prevName+'Phone']
                    })(
                        <Input disabled={disable} type="tel" placeholder="请输入手机号" maxLength="11" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout3}
                    label="身份证号"
                >
                    {getFieldDecorator(prevName+'CardId', {
                        rules: [{
                            required: true, message: '请输入身份证号',
                        },{
                            validator: this.checkIdCard
                        }],
                        initialValue:naturalInfo[prevName+'CardId']
                    })(
                        <Input disabled={disable} type="tel" onChange={this.checkIdenyify} placeholder="请输入身份证号" maxLength="18" />
                    )}
                </FormItem>
                {/* {prevName=="beApplicant"&&<div className="upload-wrapper">
                    <FormItem
                        {...formItemLayout4}
                        label="身份证正面照"
                    >
                        {getFieldDecorator('cardImageFront', {
                            rules: [
                                { required: true, message: '请上传身份证正面照' },
                            ],
                        })(
                            <Upload {...props} onChange={this.positiveUpload} style={{"display":showFlag1?'inline-block':'none'}}>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">支持JPG、JPEG、PDF格式图片，大小不超过1M</span>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout4}
                        label="身份证反面照"
                    >
                        {getFieldDecorator('cardImageCon', {
                            rules: [
                                { required: true, message: '请输上传身份证反面照' },
                            ],
                        })(
                            <Upload {...props} onChange={this.negativeUpload} style={{"display":showFlag2?'inline-block':'none'}}>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">支持JPG、JPEG、PDF格式图片，大小不超过1M</span>
                            </Upload>
                        )}
                    </FormItem>
                </div>} */}
                <FormItem
                    {...formItemLayout3}
                    label="送达电子邮箱"
                >
                    {getFieldDecorator(prevName+'Email', {
                        rules: [{
                            type: 'email', message: '请输入正确的邮箱',
                        }, {
                            required: false, message: '请输入送达电子邮箱',
                        }],
                        initialValue:naturalInfo[prevName+'Email']
                    })(
                        <Input disabled={disable} type="text" placeholder="example@qq.com" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout4}
                    label="住址"
                >
                    {getFieldDecorator(prevName+'Address', {
                        rules: [{
                            required: false, message: '请输入住址',
                        }],
                        initialValue:naturalInfo[prevName+'Address']
                    })(
                        <Input disabled={disable} type="text" placeholder="请输入住址" />
                    )}
                </FormItem>
            </Form>
        )
    }
}
