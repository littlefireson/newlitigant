import React, {Component} from 'react'
import { Breadcrumb, Icon, Steps } from 'antd'
import { Switch,Route,Redirect,Link,withRouter ,Router } from 'react-router-dom';
import {connect} from 'react-redux'
import {TimeTip,AsyncComponent} from '../../../components'
import cache from '../../../utils/cache'

const Step = Steps.Step;
const ApplyChoose = AsyncComponent(() => import(/* webpackChunkName: "ApplyChoose" */ "./ApplyChoose"));
const ApplyFirst = AsyncComponent(() => import(/* webpackChunkName: "ApplyFirst" */ "./ApplyFirst"));
const ApplySecond = AsyncComponent(() => import(/* webpackChunkName: "ApplySecond" */ "./ApplySecond"));
const ApplyThird = AsyncComponent(() => import(/* webpackChunkName: "ApplyThird" */ "./ApplyThird"));
const ApplyFourth = AsyncComponent(() => import(/* webpackChunkName: "ApplyFirst" */ "./ApplyFourth"));
const confirmAdress = AsyncComponent(() => import(/* webpackChunkName: "ApplyFirst" */ "./confirmAdress"));

@connect(state=>({
   userInfo: state.userInfo
}))
@withRouter
export default class ApplyCase extends Component{
    constructor(props,context){
        super(props,context);
    }
    componentDidMount(){
        const {userInfo} = this.props;
        if(userInfo.realAuth == '0' ){ //  第三方接口不通  || this.props.userInfo.realAuth == '0'
            this.props.history.push('/personal');
        }
        cache.setItem('caseInfo',JSON.stringify({
            caseEvidences:[
                //{evidenceMat:'',purposeEvidence:'',sourceEvidence:'',docName:'',fileId:''}
            ],//证据
            filingType:userInfo.role=='2'?1:0,  //立案人类型  0 本人   1 代理
            applicantName:'',//申请人名称
            applicantType:userInfo.type, //申请人类型,0- 自然人，1- 法人
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
            arbClause:'',//仲裁条款
            arbClaim:'', //仲裁请求
            fact:'', //事实与理由
            lawFirm:'', //所函
            agreementOfAgency:'', //委托代理合同
            powerOfAttorney:'', //授权委托书
            // caseBatchId: '201906281418601217364846',
            // isBatchFinish: 1
        }));
    }
    render(){
        
        return (
            <section className="my-case ant-row-layout clearfix">
                {/*<Breadcrumb className="bread-crumb clearfix">*/}
                    {/*<Breadcrumb.Item>我的案件</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item><a href="">申请立案</a></Breadcrumb.Item>*/}
                {/*</Breadcrumb>*/}
                <Switch>
                    {/* <Route path="/myCase/apply/choose" component={ApplyChoose}/> */}
                    <Route path="/myCase/apply/first/:id?/:fail?" component={ApplyFirst}/>
                    <Route path="/myCase/apply/second/:id?/:fail?" component={ApplySecond}/>
                    <Route path="/myCase/apply/third/:fail/:id?" component={ApplyThird}/>
                    <Route path="/myCase/apply/fourth/:id" component={ApplyFourth}/>
                    <Route path="/myCase/apply/confirmAdress/:id" component={confirmAdress}/>
                    <Redirect to="/myCase/apply/first"/>
                </Switch>
            </section>
        )
    }
}


