import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Table,Spin,Icon,Modal,Button} from 'antd';
import classNames from 'classnames';
import {Book} from '../../components'
import ajax from "../../utils/ajax";
import cache from '../../utils/cache';
const ButtonGroup = Button.Group;
@withRouter
export default class ChangeDetail extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}} = props;
        this.state={
            caseInfo:null,
            spinning:false,
            messageH:''
        }
    }
    transDate=(date,toUp)=>{
        const thisDate = new Date(date);
        let thisYear = thisDate.getFullYear();
        let thisMonth = thisDate.getMonth()+1;
        let thisDay = thisDate.getDate();
        if(toUp){
            if(thisMonth>10){
                thisMonth = '十'+thisMonth.toString().substring(1)
            }
            if(thisDay>=10 && thisDay<20){
                thisDay = '十'+thisDay.toString().substring(1)
            }else if(thisDay>=20){
                thisDay = thisDay.toString().substring(0,1)+'十'+thisDay.toString().substring(1)
            }
            thisYear = this.toUpCase(thisYear);
            thisMonth = this.toUpCase(thisMonth);
            thisDay = this.toUpCase(thisDay);
            return `${thisYear}年${thisMonth}月${thisDay}日`;
        }
        return `${thisYear}年${thisMonth}月${thisDay}日`;
    }
    toUpCase=(num)=>{
        num = num.toString().replace(/1/g,'一').replace(/2/g,'二').replace(/3/g,'三').replace(/4/g,'四').replace(/5/g,'五').replace(/6/g,'六').replace(/7/g,'七').replace(/8/g,'八').replace(/9/g,'九').replace(/0/g,'〇');
        return num;
    }
    transP=(string)=>{
        if(string.indexOf('<br/>')!=-1){
            const arr = string.split('<br/>');
            let content = '';
            arr.map((item,index)=>{
                content += `<p>${item}</p>`;
            })
            return content;
        }else{
            return string;
        }
    }
    getFrameHeight=(v)=>{
        this.setState({
            messageH:v
        })
    }
    getContent=()=>{
        const {caseInfo}=this.state;
        if(caseInfo){
            const {caseDocHead:{applicant,applicantAgent,beApplicant,beApplicantAgent}} = caseInfo;
            // console.log(caseInfo);
            return(
                <div>
               {caseInfo &&<Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)} caseInfo={caseInfo} title={'裁决书'}></Book>}
            {/* <article className="doc-book">
                <h3>海南仲裁委员会</h3>
                <h2>裁决书</h2>
                <div className="doc-notice">
                    <p>说明：1、申请人{applicantAgent?'有':'无'}代理人、被申请人{beApplicantAgent?'有':'无'}代理人</p>
                    <p>2、被申请人{caseInfo.haveBackRequest?'有':'无'}反请求</p>
                    <p>3、{caseInfo.requestChange?'有':'无'}变更仲裁请求、{caseInfo.backRequestChange?'有':'无'}变更仲裁反请求</p>
                    <p>4、{caseInfo.protocolMode==0?'合同约定仲裁条款':'单独仲裁协议'}</p>
                    <p>5、{caseInfo.arbitratorType==0?'本会主任指定独任仲裁员':'双方共同选定独任仲裁员'}</p>
                    <p>6、本请求{caseInfo.requestReply?'有':'无'}答辩、变更仲裁请求{caseInfo.requestChangeReply?'有':'无'}答辩、反请求{caseInfo.backRequestReply?'有':'无'}答辩、变更反请求{caseInfo.backRequestChangeReply?'有':'无'}答辩</p>
                </div>
                <div className="doc-content">
                    <p className="doc-content-number">{caseInfo.caseNo}</p>
                    {applicant.type==0?<div>
                        <p>申请人：{applicant.name}{applicant.sex?`，${applicant.sex}`:''}{applicant.ethnic?`，${applicant.ethnic.replace(/族/g,'')}族`:''}{applicant.birthday?`，${applicant.birthday.substring(0,4)}年${applicant.birthday.substring(4,6)}月${applicant.birthday.substring(6)}日生`:''}{applicant.cardId?`，身份证号：${applicant.cardId}`:''}{applicant.phone?`，手机号：${applicant.phone}`:''}</p>
                        {applicant.address&&<p>住所：{applicant.address}</p>}
                    </div>:
                    <div>
                        <p>申请人：{applicant.name}</p>
                        <p>{applicant.address?`住所：${applicant.address}`:''}{applicant.mail?`，邮箱：${applicant.mail}`:''}</p>
                        <p>法定代表人：{applicant.certName}，职务：{applicant.certDuties}</p>
                    </div>}
                    {applicantAgent&&<div>
                        {applicantAgent.type==1?
                        <p>委托代理人：{applicantAgent.name}，{applicantAgent.duties}律师</p>:
                        <p>委托代理人：{applicantAgent.name}{applicantAgent.sex?`，${applicantAgent.sex}`:''}{applicantAgent.ethnic?`，${applicantAgent.ethnic.replace(/族/g,'')}族`:''}{applicantAgent.birthday?`，${applicantAgent.birthday.substring(0,4)}年${applicantAgent.birthday.substring(4,6)}月${applicantAgent.birthday.substring(6)}日生`:''}{applicantAgent.cardId?`，身份证号：${applicantAgent.cardId}`:''}</p>}
                    </div>}
                    {beApplicant.type==0?<div>
                        <p>被申请人：{beApplicant.name}{beApplicant.sex&&`，${beApplicant.sex}`}{beApplicant.ethnic&&`，${beApplicant.ethnic.replace(/族/,'')}族`}{beApplicant.birthday&&`，${beApplicant.birthday.substring(0,4)}年${beApplicant.birthday.substring(4,6)}月${beApplicant.birthday.substring(6)}日出生`}{beApplicant.cardId&&`，身份证号码：${beApplicant.cardId}`}{beApplicant.phone?`，手机号：${beApplicant.phone}`:''}</p>
                        {beApplicant.address&&<p>住所：{beApplicant.address}</p>}
                    </div>:
                    <div>
                        <p>被申请人：{beApplicant.name}</p>
                        <p>{beApplicant.address?`住所：${beApplicant.address}`:''}{beApplicant.mail?`，邮箱：${beApplicant.mail}`:''}</p>
                        <p>法定代表人：{beApplicant.certName}，职务：{beApplicant.certDuties}</p>
                    </div>}
                    {beApplicantAgent&&<div>
                        {beApplicantAgent.type==1?
                        <p>委托代理人：{beApplicantAgent.name}，{beApplicantAgent.duties}律师</p>:
                        <p>委托代理人：{beApplicantAgent.name}{beApplicantAgent.sex?`，${beApplicantAgent.sex}`:''}{beApplicantAgent.ethnic?`，${beApplicantAgent.ethnic.replace(/族/g,'')}族`:''}{beApplicantAgent.birthday?`，${beApplicantAgent.birthday.substring(0,4)}年${beApplicantAgent.birthday.substring(4,6)}月${beApplicantAgent.birthday.substring(6)}日生`:''}{beApplicantAgent.cardId?`，身份证号：${beApplicantAgent.cardId}`:''}</p>}
                    </div>}
                    <p>海南仲裁委员会（以下简称本会）根据申请人{applicant.name}（以下简称申请人）{applicant.nameExt}与被申请人{beApplicant.name}（以下简称被申请人）{caseInfo.protocolName?`于${this.transDate(caseInfo.signTime)}签订的《${caseInfo.protocolName}》中的仲裁条款`:`于${this.transDate(caseInfo.signTime)}签订的仲裁协议`}和申请人的仲裁申请，于{this.transDate(caseInfo.caseAcceptanceTime)}受理了申请人关于{caseInfo.caseType}的仲裁申请。</p>
                    <p>根据《海南仲裁委员会互联网金融仲裁规则》（以下简称《仲裁规则》）第十条、第十一条的规定，本会向被申请人送达了仲裁受理通知书、仲裁申请书副本、仲裁规则、仲裁员名册等材料。</p>
                    {
                    caseInfo.arbitratorType==1?<p>在本会《仲裁规则》规定期限内，双方共同选定仲裁员{caseInfo.arbitratorName}组成独任仲裁庭，仲裁庭于{this.transDate(caseInfo.arbitratorGroupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>:
                    <p>双方当事人未在规定期限内共同选定或共同委托本会主任指定独任仲裁员，根据《中华人民共和国仲裁法》（以下简称《仲裁法》）第三十二条、《仲裁规则》第二十四条的规定，本会主任指定{caseInfo.arbitratorName}为本案独任仲裁员，仲裁庭于{this.transDate(caseInfo.arbitratorGroupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>
                    }
                    <p>本案已审理终结，现予以裁决。</p>
                </div>
                <div className="doc-reword">
                    <p className="doc-reword-title">一、仲裁请求与答辩</p>
                    <p>申请人向本会提出如下仲裁请求：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestArbClaim)}}></div>
                    <p>其事实和理由是：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestFact)}}></div>
                    {caseInfo.requestReply?
                    <div>
                        <p>被申请人对申请人的仲裁请求作出如下答辩：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestReply)}}></div>
                    </div>:
                    <p>被申请人未对申请人的仲裁请求作出答辩。</p>}
                    {caseInfo.requestChange&&<div>
                        <p>申请人又于{this.transDate(caseInfo.requestChangeTime)}向本会提交书面变更仲裁请求申请书，变更仲裁请求为：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestChangeRequest)}}></div>
                        <p>其事实和理由是：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestChangeFactReason)}}></div>
                        {caseInfo.requestChangeReply?<div>
                            <p>被申请人对申请人的变更仲裁请求作出如下答辩：</p>
                            <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestFact)}}></div>
                        </div>:<p>被申请人未对申请人的变更仲裁请求作出答辩。</p>}
                    </div>}
                    {caseInfo.haveBackRequest&&<div>
                        <p>被申请人向本会提出如下仲裁反请求：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backRequestArbClaim)}}></div>
                        <p>其事实和理由是：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backRequestFact)}}></div>
                        {caseInfo.backRequestReply?<div>
                            <p>申请人对被申请人的仲裁反请求作出如下答辩：</p>
                            <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backRequestReply)}}></div>
                        </div>:
                        <p>申请人未对被申请人的仲裁反请求作出答辩。</p>}
                        {caseInfo.backRequestChange&&<div>
                            <p>被申请人又于{this.transDate(caseInfo.backRequestChangeTime)}向本会提交书面变更仲裁反请求申请书，变更仲裁反请求为：</p>
                            <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backRequestChangeRequest)}}></div>
                            <p>其事实和理由是：</p>
                            <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backRequestChangeFactReason)}}></div>
                            {caseInfo.backRequestChangeReply?<div>
                                <p>申请人对被申请人的变更仲裁反请求作出如下答辩：</p>
                                <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestFact)}}></div>
                            </div>:
                            <p>申请人未对被申请人的变更仲裁反请求作出答辩。</p>}
                        </div>}
                    </div>}
                </div>
                <div className="doc-reword">
                    <p className="doc-reword-title">二、举证与质证</p>
                    {caseInfo.applicantProof&&<div>
                        <p>申请人提供如下证据：</p>
                        <p>{caseInfo.applicantProofMat}</p>
                        {caseInfo.beApplicantProofOppugn?<div>
                            <p>被申请人对申请人提供的证据发表如下质证意见：</p>
                            <p>{caseInfo.beApplicantProofOppugn}</p>
                        </div>:
                        <p>被申请人未对申请人提供的证据发表质证意见。</p>}
                    </div>}
                    {caseInfo.beApplicantProof&&<div>
                        <p>被申请人提供如下证据：</p>
                        <p>{caseInfo.beApplicantProofMat}</p>
                        {caseInfo.applicantProofOppugn?<div>
                            <p>申请人对被申请人提供的证据发表如下质证意见：</p>
                            <p>{caseInfo.applicantProofOppugn}</p>
                        </div>:
                        <p>申请人未对被申请人提供的证据发表质证意见。</p>}
                    </div>}
                </div>
                <div className="doc-reword">
                    <p className="doc-reword-title">三、事实认定</p>
                    <p>本庭经审理查明：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.factFinding)}}></div>
                </div>
                <div className="doc-reword">
                    <p className="doc-reword-title">四、仲裁庭意见</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.arbitralTribunalOpinion)}}></div>
                </div>
                <div className="doc-reword">
                    <p className="doc-reword-title">五、裁决</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.finalDecision)}}></div>
                    <p>本裁决为终局裁决，自作出之日起发生法律效力。</p>
                </div>
                <footer>
                    <p><span>仲裁员：{caseInfo.arbitratorName}</span></p>
                    <p><span>{this.transDate(caseInfo.badgingDate,true)}</span></p>
                    <p><span>秘书：{caseInfo.secretaryName}</span></p>
                </footer>
            </article> */}
            </div>)
        }
        
    }
    componentDidMount(){
        const {baseInfo}=this.props;
        if(baseInfo){
            this.setState({
                caseInfo:baseInfo
            })
        }
    }
    render(){
        const {baseInfo}=this.props;
        if(baseInfo){
            return(
                <article ref="content">
                    {this.getContent()}
                </article>
            )
        }else{
            return '';
        }
        
    }
}