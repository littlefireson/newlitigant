import React,{Component} from 'react'
import { Icon, Form, Input, Button, Radio, Upload, message, Modal } from 'antd'
import cache from '../../../../utils/cache'
import {baseURL} from '../../../../utils/ajax'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const fileSrc = require('../../../../assets/images/upload-file.png');

@Form.create()
class AgentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            nowType:props.agentType || 2,
            upLawFirm:'',
            upAgreementOfAgencySrc:''
        }
        // console.log(props);
    }
    chooseIdentity=(e)=>{
        const {form} = this.props;
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
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    upLawFirmSrc:this.isImage(info.file.type)?imageUrl:fileSrc
                }));
            }else{
                message.error(info.file.response.head.msg);
            }
            
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    }
    upAgreementOfAgency=(info)=>{
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    upAgreementOfAgencySrc:this.isImage(info.file.type)?imageUrl:fileSrc
                }));
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    }
    isImage=(type)=>{
        if(type.indexOf('image/') != -1){
            return true;
        }else{
            return false;
        }
    }
    getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    infoInput=(props)=>{
        const {lawFirm,lawerCertificate} = props;
        const token = cache.getItem('token');
        if(lawFirm&&lawerCertificate){
            this.setState({
                upLawFirmSrc:`${baseURL}public/file/downloads?id=${lawFirm}&access_token=${token}`,
                upAgreementOfAgencySrc:`${baseURL}public/file/downloads?id=${lawerCertificate}&access_token=${token}`
            })
        }
    }
    componentWillReceiveProps(props){
        this.infoInput(props);
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
                sm: { span: 5 },
            }
        };
        const formItemLayout2 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            }
        };
        const props = {
            name: 'uploadFile',
            //action: baseURL+'public/uploadDoc',
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'C_0002'
            },
            showUploadList:false,
            accept:"image/jpeg,image/png,image/jpg",
        };
        const {chooseIdentity,whriteEntrust,lawFirm,lawerCertificate,agentStyle,agentType,caseType,duties} = this.props;
        const {getFieldDecorator,getFieldValue} = this.props.form;
        const {upLawFirmSrc,upAgreementOfAgencySrc} = this.state;

        getFieldDecorator('keys', { initialValue: agentStyle!=0?['1']:[] });
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
                            initialValue:duties
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
                            initialValue:lawFirm || ''
                        })(
                            <Upload {...props} onChange={this.upLawFirm}>
                                {upLawFirmSrc?<img src={upLawFirmSrc}/>:
                                <Button>
                                    <Icon type="upload"/>上传
                                </Button>}
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout1}
                        label="律师证"
                    >
                        {getFieldDecorator('lawerCertificate', {
                            rules: [{
                                required: true, message: '请上传律师证',
                            }],
                            initialValue:lawerCertificate || ''
                        })(
                            <Upload {...props} onChange={this.upAgreementOfAgency}>
                                {upAgreementOfAgencySrc?<img src={upAgreementOfAgencySrc}/>:
                                <Button>
                                    <Icon type="upload"/>上传
                                </Button>}
                            </Upload>
                        )}
                    </FormItem>
                </div>
            )
        })
        return(
            <Form ref="info" className="agent-apply">
                <FormItem
                    {...formItemLayout2}
                    label="代理人身份"
                    className="no-content"
                >
                    {getFieldDecorator('agentStyle', {
                        initialValue:agentStyle==0?0:1
                    })(
                        <RadioGroup onChange={this.chooseIdentity}>
                            <Radio value={1} keyWord={'prevName'}>律师</Radio>
                            <Radio value={0} keyWord={'prevName'}>公民</Radio>
                            <Radio value={2} keyWord={'prevName'} disabled>其他组织</Radio>
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
                            initialValue: agentType==1? 1 : 2
                        })(
                            <RadioGroup onChange={this.changeType}>
                                <Radio value={1}>一般权限</Radio>
                                <Radio value={2}>特别权限</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {this.getAuthority()}
                </div>
                {/* <FormItem
                    {...formItemLayout1}
                    label="案由"
                >
                    {getFieldDecorator('caseType', {
                        rules: [{
                            required: true, message: '请填写案由',
                        }],
                        initialValue: caseType || ''
                    })(
                        <Input type="text" placeholder="请填写案由" />
                    )}
                </FormItem> */}
            </Form>
        )
    }
}


export default class AgentContent extends Component{
    constructor(props){
        super(props);
        this.state={
            nowIndex:1,
        }
    }
    render(){
        const {evidences,agentStyle} = this.props;
        return(
            <div>
                {evidences.filingType==1&&<section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>委托代理人</span><em></em></p>
                    <div className="my-case-agent">
                        <AgentForm {...this.props} wrappedComponentRef={(inst) => this.info = inst}/>
                    </div>
                </section>}
            </div>
        )
    }
}