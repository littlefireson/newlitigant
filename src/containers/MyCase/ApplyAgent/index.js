import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Icon, Form, Input, Button, Radio, message, Upload, Modal ,Row,Col } from 'antd'
import {withRouter} from 'react-router-dom'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import cache from '../../../utils/cache'
import ajax,{baseURL} from '../../../utils/ajax'

import {ArbitrationPreview,CodeCheck} from '../../../components'
import {TimeBtn} from '../../../components'

@Form.create()
class AgentForm extends Component{
    constructor(props){
        super(props);
        const {userInfo} = props;
        this.state={
            nowIndex:1,
            nowType:2,
            upLawFirm:false,
            upAgreementOfAgency:false,
            upLawFirmImgUrl:'',
            upAgreementOfAgencyImgUrl:''
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
        if(idNum && this.checkIdCardNormal(idNum)){
            ajax({
                url:`agent/author/${idNum}/elementVerify`,
                method:'post',
                data:{
                    cardId:idNum,
                }
            }).then((data)=>{

            })
        }
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
    changeRole=(e)=>{
        const { form } = this.props;
        if(e.target.value === 1){
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
    getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    upLawFirm=(info)=>{
        // if(info.file.type=='image/jpeg' || info.file.type=='image/jpg' || info.file.type=='image/png' || info.file.type=='application/png'){
        //     if(info.fileList.length>0){
        //         this.setState({
        //             upLawFirm:true
        //         })
        //     }else{
        //         this.setState({
        //             upLawFirm:false
        //         })
        //     }
            
        // }else{
        //     this.setState({
        //         upLawFirm:false
        //     })
        // }
      
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    upLawFirmImgUrl:imageUrl
                }));  
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    }
    beforeUpload = (file)=>{
        const isJPG = file.type === 'image/jpeg';
        const isJPEG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isApplicationPng = file.type === 'application/png';
        if (!(isJPG||isJPEG||isPNG||isApplicationPng)) {
            message.error('请上传jpg,jpeg,png格式的文件');
        }
       
        return (isJPG||isJPEG||isPNG||isApplicationPng)
    }
    upAgreementOfAgency=(info)=>{
        // if(info.file.type=='image/jpeg' || info.file.type=='image/jpg' || info.file.type=='image/png' || info.file.type=='application/png'){
        //     if(info.fileList.length>0){
        //         this.setState({
        //             upAgreementOfAgency:true
        //         })
        //     }else{
        //         this.setState({
        //             upAgreementOfAgency:false
        //         })
        //     }
        // }else{
        //     this.setState({
        //         upAgreementOfAgency:false
        //     })
        // }
        
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    upAgreementOfAgencyImgUrl:imageUrl
                }));  
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    }

    render(){
        const token = cache.getItem('token');
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
        const props = {
            name: 'uploadFile',
            //action: baseURL+'public/uploadDoc',
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'S_0022'
            },
            onChange:this.onChange,
            accept:"image/jpeg,image/png,image/jpg",
            showUploadList:false
        };
        const prevName = 'agent';
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const {userInfo} = this.props;
        getFieldDecorator('keys', { initialValue: ['1'] });
        const keys = getFieldValue('keys');
        const {upLawFirmImgUrl,upAgreementOfAgencyImgUrl} = this.state;
        const formItems = keys.map((k, index) => {
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
                            
                            <Upload {...props} beforeUpload={this.beforeUpload}  onChange={this.upLawFirm}>
                                {upLawFirmImgUrl?<img src={upLawFirmImgUrl}/>:
                                <div>
                                    <Button>
                                        <Icon type="upload"/>上传
                                    </Button>
                                    <span className="tips">支持图片格式</span>
                                </div>}
                            
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
                            <Upload {...props} beforeUpload={this.beforeUpload} onChange={this.upAgreementOfAgency}>
                                {upAgreementOfAgencyImgUrl?<img src={upAgreementOfAgencyImgUrl}/>:
                                <div>
                                    <Button>
                                        <Icon type="upload"/>上传
                                    </Button>
                                    <span className="tips">支持图片格式</span>
                                </div>}
                            </Upload>
                        )}
                    </FormItem>
                </div>
            )
        })
        return(
            <Form>
                <FormItem
                    {...formItemLayout4}
                    label="代理人身份"
                    colon={false}
                    className="no-content"
                >
                    {getFieldDecorator('agentStyle', {
                        initialValue: 1
                    })(
                        <RadioGroup onChange={this.changeRole}>
                            <Radio value={1}>律师</Radio>
                            <Radio value={0}>公民</Radio>
                            <Radio disabled value={2}>其他组织</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout1}
                    label="代理人姓名"
                    colon={false}
                >
                    {getFieldDecorator('accpetName', {
                        rules: [{
                            required: true, message: '请输入代理人姓名',
                        }],
                        // initialValue:naturalInfo[prevName+'CardId']
                    })(
                        <Input type="text" placeholder="请输入代理人姓名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout3}
                    label="代理人身份证号"
                    colon={false}
                >
                    {getFieldDecorator('accpetCardId', {
                        rules: [{
                            required: true, message: '请输入代理人身份证号',
                        },{
                            validator: this.checkIdCard
                        }],
                        // initialValue:naturalInfo[prevName+'CardId']
                    })(
                        <Input type="tel" placeholder="请输入代理人身份证号" maxLength="18" onChange={this.checkIdenyify} />
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
                <FormItem
                    {...formItemLayout1}
                    label="案由"
                >
                <Row gutter={8}>
                      <Col span={12}>
                    {getFieldDecorator('caseType', {
                        rules: [{
                            required: true, message: '请填写案由',
                        }],
                    })(
                        <Input type="text" placeholder="请填写案由" />
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


class ChangeAgent extends Component{
    constructor(props){
        super(props)
        this.state={
            agentType:2
        }
    }
    changeType=(e)=>{
        this.setState({
            agentType: e.target.value
        });
    }
    getAuthority=()=>{
        const {agentType} = this.state;
        const authorityList = {
            2:<div className="authority-tips">
                <p>代为提起、变更、放弃仲裁请求</p>
                <p>代为提起、变更、放弃仲裁反请求</p>
                <p>代为和解</p>
                <p>代为承认对方仲裁请求</p>
                <p>代为签收调解书</p>
            </div>,
            1:<div className="authority-tips">
                <p>除特别授权外的其他程序性事项</p>
            </div>
        }
        return authorityList[agentType];
    }
    componentDidMount(){
        const {caseId} = this.props;
        ajax.post(`agent/author/${caseId}/getAgentType`,{caseId}).then((agentType)=>{
            this.setState({
                agentType:agentType*1
            })
        })
    }
    render(){
        const token = cache.getItem('token');
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
        const props = {
            name: 'uploadFile',
            //action: baseURL+'public/uploadDoc',
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'C_0001'
            },
            onChange:this.onChange
        };
        const {whriteEntrust} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {agentType} = this.state;
        return(
            <Form>
                <div className="authority-wrapper">
                    <FormItem
                        {...formItemLayout1}
                        label="代理人权限"
                        colon={true}
                    >
                        {getFieldDecorator('agentType', {
                            initialValue: agentType
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
ChangeAgent = Form.create()(ChangeAgent);


@connect(
    state=>({
        userInfo:state.userInfo,
    })
)
@withRouter
export default class ApplyAgent extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            visible:false,
            sendLoading:false,
            getCodeLoading:false,
            tipVisible:false,
            submitFlag:false,
            whriteEntrustVisible:true,
            info:{},
            nowIndex:0,
            type:0,
            codePhone:'',
            name:'',
            phoneNo:'',
            codeName:''
        }
        this.caseInfo = {};
        this.businessCode = 0;
    }
    whriteEntrust=()=>{
        const {userInfo} = this.props;
        const {type} = this.state;
        let url = 'agent/author/preview';
        if(type == 1){
            url = 'agent/author/changePreview';
        }

        this.refs.apply.validateFieldsAndScroll((err,values)=>{
            if(!err){
                this.caseInfo.caseId = this.props.match.params.caseId;
                if(type==0){
                    this.caseInfo.businessCode = this.businessCode+userInfo.role*1;
                    values.lawFirm = values.lawFirm?values.lawFirm.file.response.body:'';
                    values.lawyerCertificate = values.lawyerCertificate?values.lawyerCertificate.file.response.body:'';
                }
                Object.assign(this.caseInfo,values);
                ajax({
                    url,
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
        const {type} = this.state;
        let url = 'agent/author/authorMsg';
        this.setState({
            sendLoading:true
        });
        if(type==1){
            url = 'agent/author/authorChangeMsg'
        }
        ajax({
            url,
            method:'post',
            data:this.caseInfo,
        }).then((data)=>{
            this.caseInfo.messagePhone = data.phone;
            this.setState({
                codePhone:data.phone,
                name:data.name,
                nowIndex:2,
                visible:false
            })
        }).finally(()=>{
            this.setState({
                sendLoading:false,
                codeFlag:false
            });
        })
    };
    tipOpen=()=>{
        this.setState({
            tipVisible:true,
            whriteEntrustVisible:false
        })
    };

    tipClose=()=>{
        this.setState({
            tipVisible:false
        })
    };
    btnShow=()=>{
        this.setState({
            whriteEntrustVisible:true
        })
    };
    codeInput=(e)=>{
        this.caseInfo.messageCode = e.target.value;
    };
    codeSubmit=()=>{
        const {type,codePhone} = this.state;
        this.setState({
            submitFlag:true
        });
        let url = 'agent/author/author';
        let data = this.caseInfo;
        if(type==1){
            url = 'agent/author/changeAuthor';
        }
        ajax.post(url,data).then((data)=>{
            this.props.history.push('/myCase');
        }).finally(()=>{
            this.setState({
                submitFlag:false
            })
        })
    };
    getCode=(e)=>{
      let data = this.caseInfo;
        e.refs.timeBtn.changeDisableCode('正在发送验证码');
      ajax({
        url:'agent/author/authorMsg',
        method:'post',
        data:data,
      }).then((data)=>{
          e.refs.timeBtn.timer();
      }).catch(()=>{
          e.refs.timeBtn.changeAbleCode('重新获取验证码');
      })
    };
    getDom=()=>{
        const {whriteEntrustVisible,nowIndex,name,codePhone,submitFlag} = this.state;
        const {caseId} = this.props.match.params;
        const domList={
            0:<div>
                <div className="my-case-agent ant-row">
                    <p className="my-case-agent-title">代理人必须是我平台注册认证用户</p>
                    <AgentForm tipOpen={this.tipOpen} btnShow={this.btnShow} userInfo={this.props.userInfo} ref="apply" />
                </div>
                <div className="my-case-buttons agent-box">
                    {whriteEntrustVisible?<Button type="primary" onClick={this.whriteEntrust}>预览授权委托书</Button>:''}
                </div>
            </div>,
            2:<div className="show-status-wrapper bg-white">
                <Icon className="icon-error" type="clock-circle-o" />
                <p>验证码已发送到{name}手机({codePhone.toString().substring(0,3)}****{codePhone.toString().substring(8)})上，请输入验证码进行验证</p>
                <p className="code-wrapper"><label>手机验证码</label><Input placeholder="请输入验证码" maxLength="6" onChange={this.codeInput}/>
                <span className=" time-btn-wrapper"><TimeBtn thisClass="" thisClick={this.getCode.bind(null,this)} thisTime={60} ref="timeBtn" txt="获取短信验证码" hasSend={true}/></span>
                </p>
                <div className="my-case-buttons agent-box">
                    <Button type="primary" onClick={this.codeSubmit} loading={submitFlag} >提交</Button>
                </div>
            </div>,
            1:<div>
                <div className="my-case-agent ant-row">
                    <p className="my-case-agent-title">代理人必须是我平台注册认证用户</p>
                    <ChangeAgent tipOpen={this.tipOpen} btnShow={this.btnShow} userInfo={this.props.userInfo} ref="apply" caseId={caseId} />
                </div>
                <div className="my-case-buttons agent-box">
                    {<Button type="primary" onClick={this.whriteEntrust}>预览授权委托书</Button>}
                </div>
            </div>,
        }
        return domList[nowIndex];
    }
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1015;
        this.setState({
            getCodeLoading:true
        })
        ajax.get('litigant/case/validSms',{params:{caseId:caseId.split('/')[0],tplId,tplType:2}}).then((data)=>{
            this.setState({
                phoneNo:data.phone,
                codeName:data.name,
                codeFlag:true
            })
        }).finally(()=>{
            this.setState({
                getCodeLoading:false
            })
        })
    }
    codeClose=()=>{
        this.setState({
            codeFlag:false
        })
    }
    componentDidMount(){
        const {type} = this.props.match.params;
        this.setState({
            nowIndex:type*1,
            type
        })
    }
    render(){
        const {sendLoading,visible,tipVisible,info,codeFlag,getCodeLoading,phoneNo,codeName} = this.state;
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1015;
        return (
            <section className="my-case ant-row-layout clearfix">
                {this.getDom()}
                <Modal className="preview-modal"
                       title=""
                       width="auto"
                       onCancel={this.ModalClose}
                       footer={[
                        <Button onClick={this.ModalClose}>取消</Button>,
                        <Button type="primary" loading={getCodeLoading} onClick={this.codeShow}>提交委托书</Button>
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
                           <p>代理人必须是我平台注册认证用户，请先通知代理人注册认证后再进行代理操作。</p>
                       </div>
                </Modal>
                <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={sendLoading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
            </section>
        )
    }
}
