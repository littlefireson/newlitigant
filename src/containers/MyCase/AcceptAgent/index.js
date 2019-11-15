import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Icon, Form, Input, Button, Radio, message, Upload, Modal } from 'antd'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import cache from '../../../utils/cache'
import ajax,{baseURL} from '../../../utils/ajax'



import {ArbitrationPreview} from '../../../components'
@Form.create()
@connect(
    state=>({
        userInfo:state.userInfo,
    })
)

class AgentForm extends Component{
    constructor(props){
        super(props)
        this.state={
            nowType:2,
            upLawFirm:false,
            upAgreementOfAgency:false
        }
    }
    changeRole=(e)=>{
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
    changeType=(e)=>{
        this.setState({
            nowType: e.target.value
        });
    }
    getAuthority=()=>{
        const {nowType} = this.state;
        const authorityList = {
            1:<div className="authority-tips">
                <p>除特别授权外的其他程序性事项</p>
            </div>,
            2:<div className="authority-tips">
                <p>代为提起、变更、放弃仲裁请求</p>
                <p>代为提起、变更、放弃仲裁反请求</p>
                <p>代为和解</p>
                <p>代为承认对方仲裁请求</p>
                <p>代为签收调解书</p>
            </div>
        }
        return authorityList[nowType];
    }
    upLawFirm=(info)=>{
        if(info.fileList.length>0){
            this.setState({
                upLawFirm:true
            })
        }else{
            this.setState({
                upLawFirm:false
            })
        }
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    }
    upAgreementOfAgency=(info)=>{
        if(info.fileList.length>0){
            this.setState({
                upAgreementOfAgency:true
            })
        }else{
            this.setState({
                upAgreementOfAgency:false
            })
        }
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
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
    render(){
        const formItemLayout1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            }
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 2 },
            }
        };
        const formItemLayout3 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 5 },
            }
        };
        const formItemLayout4 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 20 },
                sm: { span: 7 },
            }
        };
        const token = cache.getItem('token');
        const props = {
            name: 'uploadFile',
            //action: baseURL+'public/uploadDoc',
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'C_0001'
            },
            onChange:this.onChange
        };
        const prevName = 'beAgent';
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const {upLawFirm,upAgreementOfAgency} = this.state;

        getFieldDecorator('keys', { initialValue: ['1'] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k,index)=>{
            return(
                <div key={index}>
                    <FormItem
                        {...formItemLayout1}
                        label="律师所名称"
                    >
                        {getFieldDecorator('duties', {
                            rules: [{
                                required: true, message: '律师所名称不能为空',
                            }],
                            // initialValue:evidences['lawFirm']
                        })(
                            <Input type="text" placeholder="请填写律师所名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout1}
                        label="所函"
                    >
                        {getFieldDecorator('lawFirm', {
                            rules: [{
                                required: true, message: '请上传所函',
                            }],
                            // initialValue:evidences['lawFirm']
                        })(
                            <Upload {...props} onChange={this.upLawFirm} style={{"display":upLawFirm?"none":"inline-block"}}>
                                <Button>
                                    <Icon type="upload"/>上传
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout1}
                        label="律师证"
                    >
                        {getFieldDecorator('lawyerCertificate', {
                            rules: [{
                                required: true, message: '请上传律师证',
                            }],
                            // initialValue:evidences['agreementOfAgency']
                        })(
                            <Upload {...props} onChange={this.upAgreementOfAgency} style={{"display":upAgreementOfAgency?"none":"inline-block"}}>
                                <Button>
                                    <Icon type="upload"/>上传
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                </div>
            )
        })
        return(
            <Form>
                <FormItem
                    {...formItemLayout1}
                    label="被代理方身份"
                    colon={true}
                    className="no-content"
                >
                    {getFieldDecorator('ApplyRole', {
                        initialValue: 0
                    })(
                        <RadioGroup>
                            <Radio value={0}>申请人</Radio>
                            <Radio value={1}>被申请人</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="被代理方姓名"
                    colon={false}
                >
                    {getFieldDecorator('accpetName', {
                        rules:[{
                            required:true,message:'被代理方姓名不能为空'
                        }]
                    })(
                        <Input type="text" placeholder="请输入被代理方姓名"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="被代理方身份证号"
                    colon={false}
                >
                    {getFieldDecorator('accpetCardId', {
                        rules:[{
                            required:true,message:'被代理方身份证号不能为空'
                        },{
                            validator: this.checkIdCard
                        }],
                    })(
                        <Input type="text" placeholder="请输入被代理方身份证号" onChange={this.checkIdenyify}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="立案号"
                    colon={false}
                >
                    {getFieldDecorator('caseNo', {
                        rules:[{
                            required:true,message:'立案号不能为空'
                        }]
                    })(
                        <Input type="text" placeholder="请输入立案号"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="代理人身份"
                    colon={false}
                >
                    {getFieldDecorator('agentStyle', {
                        initialValue: 0
                    })(
                        <RadioGroup onChange={this.changeRole}>
                            <Radio value={0}>律师</Radio>
                            <Radio value={1}>公民</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                {formItems}
                <div className="authority-wrapper">
                    <FormItem
                        {...formItemLayout1}
                        label="代理人权限"
                        colon={true}
                    >
                        {getFieldDecorator('agentType', {
                            initialValue: 2
                        })(
                            <RadioGroup onChange={this.changeType}>
                                <Radio value={1}>一般权限</Radio>
                                <Radio value={2}>特别权限</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {this.getAuthority()}
                </div>
            </Form>
        )
    }
}

@withRouter
export default class AcceptAgent extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            visible:false,
            sendLoading:false,
            tipVisible:false,
            submitFlag:false,
            whriteEntrustVisible:true,
            info:{},
            nowIndex:0,
            codePhone:'',
            name:''
        }
        this.caseInfo = {};
        this.businessCode = 2;//businessCode  2代理人主动请求申请人委托   3代理人主动请求被申请委托
    }
    whriteEntrust=()=>{
        this.refs.accept.validateFieldsAndScroll((err,values)=>{
            if(!err){
                this.caseInfo.businessCode = this.businessCode+values.ApplyRole*1;
                values.lawFirm = values.lawFirm?values.lawFirm.file.response.body:'';
                values.lawyerCertificate = values.lawyerCertificate?values.lawyerCertificate.file.response.body:'';
                Object.assign(this.caseInfo,values);
                ajax({
                    url:'agent/author/preview',
                    method:'post',
                    data:this.caseInfo
                }).then((data)=>{
                    if(data.clientele.cardId == data.caseDocAgent.cardId){
                        message.warning('代理人与委托人不能是同一个人')
                    }else{
                        this.setState({
                            info:data,
                            visible:true
                        })
                    }
                })
            }
        })
        
    }
    ModalClose=()=>{
        this.setState({visible:false});
    };
    sendCase=()=>{
        this.setState({
            sendLoading:true
        });
        ajax({
            url:'agent/author/authorMsg',
            method:'post',
            data:this.caseInfo,
        }).then((data)=>{
            this.caseInfo.messagePhone = data.phone;
            this.setState({
                codePhone:data.phone,
                name:data.name,
                nowIndex:1,
                visible:false
            })
        }).finally(()=>{
            this.setState({
                sendLoading:false
            });
        })
    };
    tipOpen=()=>{
        this.setState({
            tipVisible:true,
            whriteEntrustVisible:false
        })
    }
    tipClose=()=>{
        this.setState({
            tipVisible:false
        })
    }
    btnShow=()=>{
        this.setState({
            whriteEntrustVisible:true
        })
    }
    codeInput=(e)=>{
        this.caseInfo.messageCode = e.target.value;
    }
    codeSubmit=()=>{
        this.setState({
            submitFlag:true
        })
        
        ajax({
            url:'agent/author/author',
            method:'post',
            data:this.caseInfo
        }).then((data)=>{
            this.props.history.push('/myCase');
        }).finally(()=>{
            this.setState({
                submitFlag:false
            })
        })
    }
    getDom=()=>{
        const {whriteEntrustVisible,nowIndex,name,codePhone,submitFlag} = this.state;
        const domList={
            0:<div>
                <div className="my-case-agent ant-row">
                    <p className="my-case-agent-title">被代理方当事人必须是我平台注册认证用户</p>
                    <AgentForm tipOpen={this.tipOpen} btnShow={this.btnShow} ref="accept" />
                </div>
                <div className="my-case-buttons agent-box">
                    {whriteEntrustVisible?<Button type="primary" onClick={this.whriteEntrust}>预览授权委托书</Button>:''}
                </div>
            </div>,
            1:<div className="show-status-wrapper bg-white">
                <Icon type="clock-circle-o" />
                <p>验证码已发送到{name}手机号({codePhone.toString().substring(0,3)}****{codePhone.toString().substring(8)})上，请输入验证码进行验证</p>
                <p className="code-wrapper"><label>手机验证码</label><Input placeholder="请输入验证码" maxLength="6" onChange={this.codeInput}/>
                
                </p>
                <div className="my-case-buttons agent-box">
                    <Button type="primary" onClick={this.codeSubmit}>提交</Button>
                </div>
            </div>
        }
        return domList[nowIndex];
    }
    render(){
        const {sendLoading,visible,tipVisible,info} = this.state;

        return (
            <section className="my-case ant-row-layout clearfix">
                {this.getDom()}
                <Modal className="preview-modal"
                       title=""
                       width="auto"
                       onCancel={this.ModalClose}
                       footer={[
                        <Button onClick={this.ModalClose}>取消</Button>,  
                        <Button type="primary" loading={sendLoading} onClick={this.sendCase}>提交委托书</Button>
                       ]}
                       visible={visible}>
                    <ArbitrationPreview info={info} caseType={info.caseType} sendData={this.caseInfo} type="entrust"/>
                </Modal>
                <Modal
                       title=""
                       onCancel={this.tipClose}
                       closable={false}
                       footer={[
                        <Button type="primary" onClick={this.tipClose}>确定</Button>,
                       ]}
                       visible={tipVisible}>
                       <div className="register-tip">
                           <p>被代理方当事人必须是我平台注册认证用户，请先通知当事人注册认证后再进行代理操作。</p>
                       </div>
                </Modal>
            </section>
        )
    }
}