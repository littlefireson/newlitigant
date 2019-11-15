import React, {Component} from 'react'
import { Route,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import cache from '../../utils/cache'
import {AsyncComponent} from '../../components'

const CaseHome = AsyncComponent(() => import(/* webpackChunkName: "CaseHome" */ "./Home"));
const PaymentRecord = AsyncComponent(() => import(/* webpackChunkName: "PaymentRecord" */ "./PaymentRecord"));
const ApplyAgent = AsyncComponent(() => import(/* webpackChunkName: "ApplyAgent" */ "./ApplyAgent"));
const AcceptAgent = AsyncComponent(() => import(/* webpackChunkName: "AcceptAgent" */ "./AcceptAgent"));
const ApplyCase = AsyncComponent(() => import(/* webpackChunkName: "ApplyCase" */ "./ApplyCase"));
@connect(state=>({
    userInfo: state.userInfo
}))
export default class MyCase extends Component{
    constructor(props,context){
        super(props,context);
        // this.setInitCase();
    }
    setInitCase=()=>{
        const {userInfo} = this.props;
        this.caseInfo={
            //caseAttachments: [
            //    {attachName:'',attachContent:'',fileId:''}
            //],//附件
            caseEvidences:[
                //{evidenceMat:'',purposeEvidence:'',sourceEvidence:'',docName:'',fileId:''}
            ],//证据
            filingType:userInfo.role=='2'?1:0,  //立案人类型  0 本人   1 代理
            // caseType:'',  //案件类型
            applicantName:'',//申请人名称
            applicantType:'', //申请人类型,0- 自然人，1- 法人
            applicantEthnic:'',  //申请人民族
            applicantSex:'', //申请人性别,'男'或'女'
            applicantPhone:'',  //申请人联系电话
            applicantCardId:'', //申请人身份证号
            applicantEmail:'',  //申请人邮箱
            applicantAddress:'',  //申请人住所
            applicantBirthday:'',  //申请人出生,格式'yyyyMMdd'
            applicantUnifiedSocialCode:'',  //申请人统一社会信用代码
            applicantCertName:'',  //申请人法定代表人姓名
            applicantCertDuties:'', //申请人法定代表人职务
            beApplicantName:'',  //被申请人名称
            beApplicantType:'', //被申请人类型,0- 自然人，1- 法人
            beApplicantEthnic:'', //被申请人民族
            beApplicantSex:'', //被申请人性别,格式'男'或'女'
            beApplicantPhone:'', //被申请人联系电话
            beApplicantCardId:'', //被申请人身份证号
            beApplicantEmail:'', //被申请人邮箱
            beApplicantAddress:'', //被申请人住所
            beApplicantBirthday:'', //被申请人出生
            beApplicantUnifiedSocialCode:'', //被申请人统一社会信用代码
            beApplicantCertName:'', //被申请人法定代表人姓名
            arbClaim:'', //仲裁请求
            fact:'', //事实与理由
            //reason:'', //理由
            lawFirm:'', //所函
            agreementOfAgency:'', //委托代理合同
            powerOfAttorney:'', //授权委托书
        };
        cache.setItem('caseInfo',JSON.stringify(this.caseInfo));
    }
    render(){
        return (
            <Switch>
                <Route path="/myCase/payment" component={PaymentRecord}/>
                <Route path="/myCase/apply" component={ApplyCase}/>
                <Route path="/myCase/agent/:caseId?/:type?" component={ApplyAgent}/>
                <Route path="/myCase/accept" component={AcceptAgent}/>
                <Route path="/myCase" component={CaseHome}/>
            </Switch>
        )
    }
}
