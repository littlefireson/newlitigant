import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Icon, Input, Button, message, Modal } from 'antd'
import cache from '../../../../utils/cache'
import ajax from '../../../../utils/ajax'
const { TextArea } = Input;

import {Sample} from '../../../../components'

import ApplySteps from '../ApplySteps'
import NaturalInfo from './NaturalInfo'
import LegalInfo from './LegalInfo'
import AgentContent from './AgentContent'
import AgreementInfo from './AgreementInfo'

class ApplyInfoForm extends Component{
    constructor(props){
        super(props);
    }
    getDom=()=>{
        const domList = {
            0:<NaturalInfo {...this.props} wrappedComponentRef={(inst) => this.info = inst}/>,
            1:<LegalInfo {...this.props}  wrappedComponentRef={(inst) => this.info = inst}/>
        };
        return domList[this.props.role];
    };
    render(){
        return(
            <div>
                {this.getDom()}
            </div>
        )
    }
}

@connect(
    state=>({
        userInfo:state.userInfo,
    })
)

export default class ApplyFirst extends Component{
    constructor(props,context){
        super(props,context);
        const {userInfo} = props;
        this.caseInfo = JSON.parse(cache.getItem('caseInfo')) || {};
        this.caseInfo.agentInfo = this.caseInfo.agentInfo?this.caseInfo.agentInfo:{};
        const {arbiProtocolSignMode,protocolName,signTime,agentType,agentStyle,lawFirm,lawyerCertificate,caseType,caseAmount} = this.caseInfo;
        this.state = {
            showFlag1:true,
            showFlag2:true,
            saveLoading:false, //保存草稿按钮的loading
            tipVisible:false,  //代理人填写申请人身份证时的不存在提示  显示标识
            whriteEntrustVisible:true,  //按钮层展示标识
            sample:false,
            socialFlag:false,
            sampleContent:'',
            // arbClause:this.caseInfo.arbClause?this.caseInfo.arbClause.replace(/<\/p><p>/g, "\n").split('<p>')[1].split('</p>')[0]:'',
            arbClaim:this.caseInfo.arbClaim?this.caseInfo.arbClaim.replace(/<\/p><p>/g, "\n").split('<p>')[1].split('</p>')[0]:'',
            fact:this.caseInfo.fact?this.caseInfo.fact.replace(/<\/p><p>/g, "\n").split('<p>')[1].split('</p>')[0]:'',
            formSettings:{
                form0:{
                    arbiProtocolSignMode,
                    protocolName,
                    signTime,
                    caseType,
                    caseAmount
                },
                form1:{
                    prevName:"applicant",
                    disable:userInfo.role=='2'?false:true,
                    role:userInfo.role=='2'?0:this.caseInfo.applicantType||userInfo.type,
                    naturalInfo:{...this.caseInfo},
                    legalInfo:{...this.caseInfo}
                },
                form2:{
                    prevName:"beApplicant",
                    disable:false,
                    role:this.caseInfo.beApplicantType || 0,
                    naturalInfo:{...this.caseInfo},
                    legalInfo:{...this.caseInfo}
                },
                agent:{
                    agentType,
                    agentStyle,
                    lawFirm,
                    lawyerCertificate,
                    caseType
                }
            }
        };
    }

    initInfo=()=>{
        const caseId = this.props.match.params.id || '';
        const failFlag = this.props.match.params.fail || '';
        const {userInfo} = this.props;
        let form0Info = {};
        let agentInfo = {};
        let form1Info = {
            naturalInfo:{},
            legalInfo:{}
        };
        let form2Info = {
            naturalInfo:{},
            legalInfo:{}
        };

        ajax({
            url:'/public/case/selfCaseApplyInfo',
            method:'get'
        }).then((response)=>{
           
            if(userInfo.role!='2'){
                Object.assign(this.caseInfo,response);
                if(this.caseInfo.applicantType == '0'){
                    Object.assign(form1Info.naturalInfo,this.caseInfo)
                    form1Info.role = 0;
                }else{
                    Object.assign(form1Info.legalInfo,this.caseInfo)
                    form1Info.role = 1;
                    this.setState({ 
                        socialFlag:true 
                    })
                }
                if(this.caseInfo.beApplicantType == '1'){
                    Object.assign(form2Info.legalInfo,this.caseInfo)
                    form2Info.role = 1;
                }else{
                    Object.assign(form2Info.naturalInfo,this.caseInfo)
                    form2Info.role = 0;
                }
                this.setState(()=>{
                    let settings = this.state.formSettings;
                    settings.form1.role = form1Info.role;
                    settings.form1.legalInfo=form1Info.legalInfo;
                    settings.form1.naturalInfo=form1Info.naturalInfo;
                    settings.form2.role = form2Info.role;
                    settings.form2.legalInfo=form2Info.legalInfo;
                    settings.form2.naturalInfo=form2Info.naturalInfo;
                    return({
                        formSettings:settings
                    })
                })
            }else{
                this.caseInfo.agentInfo=response;
            }
        });
        if(caseId && !failFlag){
            ajax({
                url:'/public/case/getCaseApplyDraft',
                method:'post',
                data:{
                    caseId:caseId
                }
            }).then((response)=>{
                Object.assign(this.caseInfo,response);
                if(!this.caseInfo.caseEvidences){
                    this.caseInfo.caseEvidences = [];
                }
                let agentInfo = {};
                const {arbiProtocolSignMode,protocolName,signTime,caseType,agentAuthorVO,caseAmount} = this.caseInfo;
                if(agentAuthorVO){
                    agentInfo = agentAuthorVO;
                    Object.assign(this.caseInfo.agentInfo,agentInfo)
                }
                const {agentType,agentStyle,lawFirm,lawyerCertificate,duties} = agentInfo;
                form0Info={arbiProtocolSignMode,protocolName,signTime,caseType,caseAmount};
                this.caseInfo.duties = duties;
                if(this.caseInfo.applicantType == '0'){
                    Object.assign(form1Info.naturalInfo,this.caseInfo)
                    form1Info.role = 0;
                }else{
                    Object.assign(form1Info.legalInfo,this.caseInfo)
                    form1Info.role = 1;
                }
                if(this.caseInfo.beApplicantType == '0'){
                    Object.assign(form2Info.naturalInfo,this.caseInfo)
                    form2Info.role = 0;
                }else{
                    Object.assign(form2Info.legalInfo,this.caseInfo)
                    form2Info.role = 1;
                }
                this.setState(()=>{
                    let settings = this.state.formSettings;
                    settings.form0 = form0Info;
                    settings.form1.role = form1Info.role;
                    settings.form1.legalInfo=form1Info.legalInfo;
                    settings.form1.naturalInfo=form1Info.naturalInfo;
                    settings.form2.role = form2Info.role;
                    settings.form2.legalInfo=form2Info.legalInfo;
                    settings.form2.naturalInfo=form2Info.naturalInfo;
                    settings.agent=agentInfo;
                    return({
                        formSettings:settings,
                        arbClaim:this.caseInfo.arbClaim?this.caseInfo.arbClaim.replace(/<\/p><p>/g, "\n").split('<p>')[1].split('</p>')[0]:'',
                        fact:this.caseInfo.fact?this.caseInfo.fact.replace(/<\/p><p>/g, "\n").split('<p>')[1].split('</p>')[0]:'',
                        // arbClause:this.caseInfo.arbClause?this.caseInfo.arbClause.replace(/<\/p><p>/g, "\n").split('<p>')[1].split('</p>')[0]:''
                    })
                })
            });
        }else if(caseId && failFlag){
            ajax({
                url:'/public/case/getCaseApplyModify',
                method:'post',
                data:{
                    caseId:caseId
                }
            }).then((response)=>{
                Object.assign(this.caseInfo,response);
                console.log(this.caseInfo)
                if(!this.caseInfo.caseEvidences){
                    this.caseInfo.caseEvidences = [];
                }
                let agentInfo = {};
                const {arbiProtocolSignMode,protocolName,signTime,caseType,agentAuthorVO,caseAmount} = this.caseInfo;
                if(agentAuthorVO){
                    agentInfo = agentAuthorVO;
                    Object.assign(this.caseInfo.agentInfo,agentInfo)
                }
                const {agentType,agentStyle,lawFirm,lawyerCertificate,duties} = agentInfo;
                form0Info={arbiProtocolSignMode,protocolName,signTime,caseType,caseAmount};
                this.caseInfo.duties = duties;
                if(this.caseInfo.applicantType == '0'){
                    Object.assign(form1Info.naturalInfo,this.caseInfo)
                    form1Info.role = 0;
                }else{
                    Object.assign(form1Info.legalInfo,this.caseInfo)
                    form1Info.role = 1;
                }
                if(this.caseInfo.beApplicantType == '0'){
                    Object.assign(form2Info.naturalInfo,this.caseInfo)
                    form2Info.role = 0;
                }else{
                    Object.assign(form2Info.legalInfo,this.caseInfo)
                    form2Info.role = 1;
                }
                this.setState(()=>{
                    let settings = this.state.formSettings;
                    settings.form0 = form0Info;
                    settings.form1.role = form1Info.role;
                    settings.form1.legalInfo=form1Info.legalInfo;
                    settings.form1.naturalInfo=form1Info.naturalInfo;
                    settings.form2.role = form2Info.role;
                    settings.form2.legalInfo=form2Info.legalInfo;
                    settings.form2.naturalInfo=form2Info.naturalInfo;
                    settings.agent=agentInfo;
                    return({
                        formSettings:settings,
                        arbClaim:this.caseInfo.arbClaim?this.caseInfo.arbClaim.replace(/<[^>]+>/g,""):'',
                        fact:this.caseInfo.fact?this.caseInfo.fact.replace(/<[^>]+>/g,""):'',
                        // arbClause:this.caseInfo.arbClause?this.caseInfo.arbClause.replace(/<[^>]+>/g,""):'',
                    })
                })
            });
        }
    }

    showMore1 = () => {
        this.setState({
            showFlag1:this.state.showFlag1?false:true,
        });
    };
    showMore2 = () => {
        this.setState({
            showFlag2:this.state.showFlag2?false:true,
        });
    };
    saveDraft = ()=>{
        let caseId = this.props.match.params.id || '';
        if(this.checkForm()){
            this.setState({
                saveLoading:true
            });
            ajax({
                url:'/public/case/caseApplyDraft',
                method:'post',
                data:{
                    ...this.caseInfo,
                    caseId:caseId
                },
            }).then((bodyData)=>{
                const id = bodyData;
                if(id){
                    this.props.history.push('/myCase/apply/first/'+id);
                }
                return bodyData;
            }).finally(()=>{
                this.setState({
                    saveLoading:false
                })
            })
        }
    };
    nextStep = () => {
        let caseId = this.props.match.params.id || '';
        let failFlag = this.props.match.params.fail || '';
        if(this.checkForm()){
            if(failFlag){
                this.props.history.push('/myCase/apply/second/'+caseId+'/true');
            }else{
                this.props.history.push('/myCase/apply/second/'+caseId);
            }
        }
    };
    chooseRole= (e)=>{
        const formSettings = this.state.formSettings;
        if(e.target.keyWord == 'applicant'){
            const info = this.refs.form1.info.props.form.getFieldsValue();
            if(e.target.value == 0){
                Object.assign(formSettings.form1.legalInfo,info);
            }else{
                Object.assign(formSettings.form1.naturalInfo,info);
            }
            formSettings.form1.role = e.target.value;
        }else if(e.target.keyWord == 'beApplicant'){
            const info = this.refs.form2.info.props.form.getFieldsValue();
            if(e.target.value == 0){
                Object.assign(formSettings.form2.legalInfo,info);
            }else{
                Object.assign(formSettings.form2.naturalInfo,info);
            }
            formSettings.form2.role = e.target.value;
        }
        this.setState({
            formSettings:formSettings
        });
    };
    unifiedSocialCode = (socialFlag)=>{
        this.setState({
            socialFlag:socialFlag
        })
    }
    checkForm=()=>{
        const {arbClaim,fact,arbClause} = this.state;
        const {userInfo} = this.props;
        let checkFlag = true;
        this.refs.form0.validateFieldsAndScroll(
            (err,values) => {
                if (!err) {
                    const ms = new Date(values.signTime).getTime()
                    values.signTime = ms;
                    Object.assign(this.caseInfo, values);
                }else{
                    checkFlag = false;
                }
            }
        );
        this.refs.form1.info.props.form.validateFieldsAndScroll(
            (err,values) => {
                if (!err) {
                    if(values.applicantCardId){
                        values.applicantBirthday = values.applicantCardId.toString().substring(6,14);
                    }
                    Object.assign(this.caseInfo, values);
                }else{
                    checkFlag = false;
                }
            }
        );
        this.refs.form2.info.props.form.validateFieldsAndScroll(
            (err,values) => {
                if (!err) {
                    if(values.beApplicantCardId){
                        values.beApplicantBirthday = values.beApplicantCardId.toString().substring(6,14);
                    }
                    Object.assign(this.caseInfo, values);
                }else{
                    checkFlag = false;
                }
            }
        );
        if(this.props.userInfo.role == 2){
            this.refs.form3.info.props.form.validateFieldsAndScroll(
                (err,values) => {
                    if (!err) {
                        if(values.agentStyle == 1){
                            values.lawFirm = values.lawFirm.file?values.lawFirm.file.response.body:values.lawFirm;
                            values.lawerCertificate = values.lawerCertificate.file?values.lawerCertificate.file.response.body:values.lawerCertificate;
                        }
                        Object.assign(this.caseInfo, values);
                    }else{
                        checkFlag = false;
                    }
                }
            );
        }
        // if(arbClause == ''){
        //     message.warning('请输入仲裁条款');
        //     checkFlag=false;
        // }
        if(arbClaim == ''){
            message.warning('请输入仲裁请求');
            checkFlag=false;
        }
        if(fact == ''){
            message.warning('请输入事实与理由');
            checkFlag=false;
        }
        if(!this.state.socialFlag && (this.state.formSettings.form1.role == 1)){ 
            message.warning('企业没有认证');
            checkFlag=false;
        }
        const {applicantName,applicantPhone,applicantCardId,beApplicantName,beApplicantPhone,beApplicantCardId,agentInfo} = this.caseInfo;
        if(applicantPhone === beApplicantPhone){
            message.warning('申请人手机号与被申请人手机号不能相同，请修改');
            checkFlag=false;
        }
        if(applicantCardId === beApplicantCardId){
            message.warning('申请人身份证号与被申请人身份证号不能相同，请修改');
            checkFlag=false;
        }
        if(userInfo.role == 2 && agentInfo){
            if(applicantCardId === agentInfo.applicantCardId){
                message.warning('申请人身份证号与代理人身份证号不能相同，请修改');
                checkFlag=false;
            }
            if(applicantPhone === agentInfo.applicantPhone){
                message.warning('申请人手机号与代理人手机号不能相同，请修改');
                checkFlag=false;
            }
            if(beApplicantCardId === agentInfo.applicantCardId){
                message.warning('被申请人身份证号与代理人身份证号不能相同，请修改');
                checkFlag=false;
            }
            if(beApplicantPhone === agentInfo.applicantPhone){
                message.warning('被申请人手机号与代理人手机号不能相同，请修改');
                checkFlag=false;
            }
        }
        if(checkFlag){
            this.caseInfo.arbClaim = '<p>'+arbClaim.replace(/\n/gm,'</p><p>')+'</p>';
            this.caseInfo.fact = '<p>'+fact.replace(/\n/gm,'</p><p>')+'</p>';
            // this.caseInfo.arbClause = '<p>'+arbClause.replace(/\n/gm,'</p><p>')+'</p>';
            cache.setItem('caseInfo',JSON.stringify(this.caseInfo));
        }
        return checkFlag;
    };

    // 示例相关的配置操作
    showSample=(type)=>{
        let content = '';
        switch(type){
            // case 'arbClause':
            //     content=`
            //     <h2 class="sample-title"><b>1</b></h2>
            //     <div class="sample-content text-indent-1">
            //         <p>因本合同引起的或与本合同有关的任何争议均提交海南仲裁委员会按照其《互联网金融仲裁规则》仲裁解决，以书面方式审理，采用电子送达方式送达仲裁文书，并以本合同载明的双方电子邮箱及电话号码为电子送达地址，合同载明的双方地址为线下仲裁文书及司法文书的送达地址。</p>
            //     </div>
            //     <h2 class="sample-title"><b>2</b></h2>
            //     <div class="sample-content text-indent-1">
            //         <p>因本合同引起的或与本合同有关的任何争议均提交海南仲裁委员会按照其《互联网金融仲裁规则》仲裁解决，以书面方式审理，采用电子送达方式送达仲裁文书，甲方的电子邮箱为： ，电话号码为： ，线下仲裁文书及司法文书的送达地址为： ；乙方的电子邮箱为： ，电话号码为： ，线下仲裁文书及司法文书的送达地址为： 。</p>
            //     </div>`;
            //     break;
            case 'apply':
                content=`
                <h2 class="sample-title"><b>1</b>债券转让合同纠纷/借款合同纠纷</h2>
                <div class="sample-content text-indent-1">
                    <h3>仲裁请求</h3>
                    <p>1、裁令被申请人偿还尚欠申请人的借款本金人民币<i>54,137.87</i><span>（欠付本金）</span>元；</p>
                    <p>2、裁令被申请人支付申请人截止至<i>2016年11月18日</i><span>（应还款日期）</span>借款利息<i>1234.00</i><span>（借款利息）</span>元；</p>
                    <p>3、裁令被申请人支付申请人逾期利息（罚息或违约金）<i>9149.03</i><span>（逾期利息）</span>元（自<i>2016年11月19日</i><span>（申请日期）</span>起暂计至<i>2017年7月21日</i><span>（应还款日期次日）</span>，并支付至实际给付之日）；</p>
                    <p>4、裁令被申请人支付申请人律师费<i>2000.00</i><span>（标的额的10%）</span>元；</p>
                    <p>5、裁令本案仲裁费用由被申请人承担。</p>
                </div>
                <h2 class="sample-title"><b>2</b>信用卡纠纷</h2>
                <div class="sample-content text-indent-1">
                    <h3>仲裁请求</h3>
                    <p>1、裁令被申请人偿还信用卡透支本金人民币<i>54,137.87</i><span>（欠付本金）</span>元，截至<i>2015年08月20日</i><span>（当前欠付计算截止日期）</span>的利息<i>600.00</i><span>（欠付利息）</span>元、违约金<i>0.00</i><span>（违约金）</span>元，合计<i>600.00</i><span>（欠付本金+欠付利息+违约金）</span>元；</p>
                    <p>2、裁令被申请人偿还<i>2015年08月20日</i><span>（当前欠付计算截止日期次日）</span>至全部欠款还清之日的利息；</p>
                    <p>3、裁令被申请人支付申请人律师费<i>2000.00</i><span>（标的额的10%）</span>元；</p>
                    <p>4、裁令本案仲裁费用由被申请人承担。</p>
                </div>
                <h2 class="sample-title"><b>3</b>金融借款合同纠纷</h2>
                <div class="sample-content text-indent-1">
                    <h3>仲裁请求</h3>
                    <p>1、裁令被申请人偿还借款本金人民币<i>54,137.87</i><span>（欠付本金）</span>元、截至<i>2015年08月20日</i><span>（当前欠付计算截止日期）</span>的利息<i>600.00</i><span>（欠付利息）</span>元、罚息<i>5000.00</i><span>（罚息）</span>元、违约金<i>0.00</i><span>（违约金）</span>元，合计<i>10,600.00</i><span>（欠付本金+欠付利息+罚息+违约金）</span>元；</p>
                    <p>2、裁令被申请人偿还<i>2015年08月20日</i><span>（当前欠付计算截止日期次日）</span>至全部欠款还清之日的罚息及复利；</p>
                    <p>3、裁令被申请人支付申请人律师费<i>2000.00</i><span>（标的额的10%）</span>元、催收费<i>1000.00</i><span>（催收费）</span>元；</p>
                    <p>4、请求被申请人<i>李四</i><span>（担保人）</span>对上述债务承担担保还款责任；</p>
                    <p>5、裁令本案仲裁费用由被申请人承担。</p>
                </div>`;
                break;
            case 'fact':
                content=`
                <h2 class="sample-title"><b>1</b>债券转让合同纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><i>2016年06月14日</i><span>（合约签订日期）</span>，原债权人与被申请人签订《<i>XXX借款协议</i><span>（合约名称）</span>》。该借款合同系双方真实意思表示，真实有效。</p>
                    <p>《<i>XXX借款协议</i><span>（合约名称）</span>》约定：被申请人向原债权人借款人民币<i>63,950.00</i><span>（出借金额）</span>元；借款期限为<i>36个月</i><span>（还款期限）</span>；借款利率为<i>16%/年</i><span>（借款利率）</span>；还款方式为<i>等额本息</i><span>（还款方式）</span>。依照《<i>XXX借款协议</i><span>（合约名称）</span>》的约定，如被申请人未按期还款，则以欠付金额为基数，以<i>47%/年或0.13%/日</i><span>（逾期利率/罚息利率/违约金）</span>的标准向原债权人支付逾期利息（罚息或违约金）。</p>
                    <p>《<i>XXX借款协议</i><span>（合约名称）</span>》签订后，原债权人于<i>2016年06月14日</i><span>（出借日期）</span>依约向被申请人放款人民币<i>63,950.00</i><span>（出借金额）</span>元，履行了合同义务。被申请人自应还款之日至<i>2017年07月31日</i><span>（申请日期）</span>，已经归还本金和利息共计<i>9812.13</i><span>（已还本金+利息）</span>元。截至<i>2017年07月31日</i><span>（申请日期）</span>，被申请人逾期已达<i>168</i><span>（申请日期-应还款日期）</span>日。</p>
                    <p>根据《<i>XXX借款协议</i><span>（合约名称）</span>》中债权转让相关条款的约定，当借款期限届满时，若借款人未能按时还款，由第三方（包括自然人和机构）代偿的，代偿人依据《<i>XXX借款协议</i><span>（合约名称）</span>》获得债权的代位求偿权，完成了债权转让。自此，原债权人的权利义务由债权受让人（代偿人）概括承受。本案申请人<i>张三</i><span>（原告/申请人(债券受让人)）</span>已经按照上述约定向原债权人<i>李四</i><span>（出借人）</span>代偿了本案被申请人的全部借款本金和利息，故申请人已经取得了债权受让人的权利，有权要求被申请人向其偿还全部款项。</p>
                    <p>综上所述，鉴于被申请人的严重违约行为，为了维护申请人的合法权益，请求裁决支持申请人的仲裁请求。</p>
                </div>
                <h2 class="sample-title"><b>2</b>借款合同纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><i>2016年06月14日</i><span>（合约签订日期）</span>，原债权人与被申请人签订《<i>XXX借款合同</i><span>（合约名称）</span>》。该借款合同系双方真实意思表示，真实有效。</p>
                    <p>《<i>XXX借款合同</i><span>（合约名称）</span>》约定：被申请人向原债权人借款人民币<i>63,950.00</i><span>（出借金额）</span>元；借款期限为<i>36个月</i><span>（还款期限）</span>；借款利率为<i>16%/年</i><span>（借款利率）</span>；还款方式为<i>等额本息</i><span>（还款方式）</span>。依照《<i>XXX借款合同</i><span>（合约名称）</span>》的约定，如被申请人未按期还款，则以欠付金额为基数，以<i>47%/年或0.13%/日</i><span>（逾期利率/罚息利率/违约金）</span>的标准向原债权人支付逾期利息（罚息或违约金）。</p>
                    <p>《<i>XXX借款合同</i><span>（合约名称）</span>》签订后，原债权人于<i>2016年06月14日</i><span>（出借日期）</span>依约向被申请人放款人民币<i>63,950.00</i><span>（出借金额）</span>元，履行了合同义务。被申请人自应还款之日至<i>2017年07月31日</i><span>（申请日期）</span>，已经归还本金和利息共计<i>9812.13</i><span>（已还本金+利息）</span>元。截至<i>2017年07月31日</i><span>（申请日期）</span>，被申请人逾期已达<i>168</i><span>（申请日期-应还款日期）</span>日。</p>
                    <p>综上所述，鉴于被申请人的严重违约行为，为了维护申请人的合法权益，请求裁决支持申请人的仲裁请求。</p>
                </div>
                <h2 class="sample-title"><b>3</b>信用卡纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><i>2013年03月01日</i><span>（签约日期）</span>，被申请人向申请人申请办理信用卡，被申请人填写了信用卡申请表，并签署了《<i>虚拟银行信用卡合约</i><span>（合同名称）</span>》。合约约定了信用卡的重要提示、使用、还款、收费标准等内容。依被申请人的申请，申请人核准并向被申请人发放了卡号为<i>5214660006936081</i><span>（卡号）</span>的信用卡，被申请人激活后多次使用该信用卡消费。截至<i>2015年08月20日</i><span>（当前欠付计算截止日期）</span>，被申请人尚欠信用卡透支款本金人民币<i>10,000</i><span>（欠付本金）</span>元、利息<i>600</i><span>（欠付利息）</span>元、违约金<i>0.00</i><span>（违约金）</span>元；合计<i>10,600.00</i><span>（欠付本金+欠付利息+违约金）</span>元未归还申请人。</p>
                    <p>被申请人未按约归还欠款已构成违约，其应按合同约定承担相应的民事责任。为维护申请人的合法权益，特向贵会申请仲裁，请求依法裁决支持申请人的仲裁请求。</p>
                </div>
                <h2 class="sample-title"><b>4</b>金融借款合同纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><i>2013年03月01日</i><span>（签约日期）</span>，被申请人向申请人签订了《<i>金融借款合同</i><span>（合约名称）</span>》。合同约定由申请人贷款<i>1,200,000.00</i><span>（出借金额）</span>元人民币给被申请人。借款期限为2014年11月26日至2015年05月26日。为确保被申请人能够按照合同约定还款，被申请人<i>李四</i><span>（担保人）</span>提供连带保证责任；且申请人与被申请人<i>李四</i><span>（担保人）</span>签订了《<i>担保合同</i><span>（担保合同）</span>》，合同约定：担保范围包括债务的本金、利息、罚息、复利、违约金以及仲裁费、律师费、催收费等实现债权的费用。</p>
                    <p>合同签订后，申请人于<i>2014年11月26日</i><span>（出借日期）</span>依约向被申请人发放贷款人民币<i>1,200,000.00</i><span>（出借金额）</span>元，履行了合同义务。截至<i>2017年11月30日</i><span>（申请日期）</span>申请人起诉时为止，被申请人偿还本金<i>0.00</i><span>（已还本金）</span>元，利息<i>0.00</i><span>（已还利息）</span>元，已经违反了《<i>金融借款合同</i><span>（合同名称）</span>》的约定，构成严重违约。同时，被申请人<i>李四</i><span>（担保人）</span>未尽到《<i>担保合同</i><span>（担保合同）</span>》约定的义务，应对被申请人因违约行为所产生的债务承担担保责任。</p>
                    <p>为维护申请人的合法权益，特向贵会申请仲裁，请求依法裁决支持申请人的仲裁请求。</p>
                </div>`;
                break;
            default:
                content = '没有内容';
        }
        this.setState({
            sample:true,
            sampleContent:content
        })
    };
    hideSample=()=>{
        this.setState({
            sample:false
        })
    };

    // 获取文本域内的内容并转化
    getClaim=(e,name)=>{
        let text = e.target.value;
        this.setState({
            [name]:text
        })
    }

    // 身份证号码验证提示
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
    componentDidMount(){
        this.initInfo();
    }
    render(){
        const currentRole = this.props.userInfo.role;
        const {saveLoading,sample,formSettings,showFlag1,showFlag2,sampleContent,arbClaim,fact,tipVisible,whriteEntrustVisible,arbClause} = this.state;
        // console.log(formSettings.agent);
        return (
            <div className="my-case-first ant-row">
                <ApplySteps step={0}/>
                <AgentContent {...formSettings.agent} evidences={this.caseInfo} ref="form3"/>
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>仲裁协议签订信息</span><em></em></p>
                    <AgreementInfo {...formSettings.form0} caseInfo={this.caseInfo} ref="form0"/>
                </section>
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>申请人信息</span><em></em><Icon type="minus" style={{"display":!showFlag1?"none":"inline-block"}} onClick={this.showMore1} /><Icon type="plus" style={{"display":showFlag1?"none":"inline-block"}} onClick={this.showMore1} /></p>
                    <div style={{"display":!showFlag1?"none":"block"}}>
                        <ApplyInfoForm unifiedSocialCode={this.unifiedSocialCode.bind(this)}  tipOpen={this.tipOpen} btnShow={this.btnShow} {...formSettings.form1} chooseRole={this.chooseRole} caseInfo={this.caseInfo} currentRole={currentRole} ref="form1" />
                    </div>
                </section>
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>被申请人信息</span><em></em><Icon type="minus" style={{"display":!showFlag2?"none":"inline-block"}} onClick={this.showMore2} /><Icon type="plus"style={{"display":!showFlag2?"inline-block":"none"}} onClick={this.showMore2} /></p>
                    <div style={{"display":!showFlag2?"none":"block"}}>
                        <ApplyInfoForm unifiedSocialCode={this.unifiedSocialCode.bind(this)} {...formSettings.form2} chooseRole={this.chooseRole} caseInfo={this.caseInfo} ref="form2"/>
                    </div>
                </section>
                {/* <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>仲裁条款</span><em></em><i className="sample" onClick={(type)=>{this.showSample('arbClause')}}>示例</i></p>
                    <div className="my-case-first-example">
                        <TextArea placeholder="请输入仲裁条款" value={arbClause} autosize={{minRows: 2}} onChange={(e,name)=>{this.getClaim(e,'arbClause')}} />
                    </div>
                </section> */}
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>填写仲裁请求</span><em></em><i className="sample" onClick={(type)=>{this.showSample('apply')}}>示例</i></p>
                    <div className="my-case-first-example">
                        <TextArea placeholder="请输入仲裁请求" value={arbClaim} autosize={{minRows: 2}} onChange={(e,name)=>{this.getClaim(e,'arbClaim')}}  />
                    </div>
                </section>
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>事实与理由</span><em></em><i className="sample" onClick={(type)=>{this.showSample('fact')}}>示例</i></p>
                    <div className="my-case-first-example">
                        <TextArea placeholder="请输入事实和理由" value={fact} autosize={{minRows: 2}} onChange={(e,name)=>{this.getClaim(e,'fact')}} />
                    </div>
                </section>
                {whriteEntrustVisible?<div className="my-case-buttons">
                    <Button type="primary" onClick={this.saveDraft} loading={saveLoading}>存草稿</Button>
                    <Button onClick={this.nextStep}>下一步</Button>
                </div>:''}
                <Sample hideSample={this.hideSample} visible={sample} content={sampleContent}/>
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
            </div>
        )
    }
}