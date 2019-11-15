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
            caseInfo:props.baseInfo,
            spinning:false,
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
    getContent=()=>{
        const {caseInfo}=this.state;
        if(caseInfo){
            const {proposer,propAgent,defendant,defeAgent} = caseInfo;
            return(<article className="doc-book">
                <h3>海南仲裁委员会</h3>
                <h2>决定书</h2>
                <div className="doc-notice">
                    <p>说明：1、申请人{propAgent?'有':'无'}代理人、被申请人{defeAgent?'有':'无'}代理人</p>
                    <p>2、{caseInfo.isGroup?'已组庭':'未祖庭'}</p>
                    <p>3、{caseInfo.backArbiFee?'双方当事人':'申请人'}撤回仲裁申请</p>
                </div>
                <div className="doc-content">
                    <p className="doc-content-number">{caseInfo.caseNo}</p>
                    {proposer.type==0?<div>
                        <p>申请人：{proposer.name}{proposer.sex?`，${proposer.sex}`:''}{proposer.ethnic?`，${proposer.ethnic.replace(/族/g,'')}族`:''}{proposer.birthday?`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日生`:''}{proposer.cardId?`，身份证号：${proposer.cardId}`:''}</p>
                        {proposer.address&&<p>住址：{proposer.address}</p>}
                    </div>:
                    <div>
                        <p>申请人：{proposer.name}</p>
                        {proposer.address&&<p>住所：{proposer.address}</p>}
                        <p>法定代表人：{proposer.certName}，职务：{proposer.certDuties}</p>
                    </div>}
                    {propAgent&&<div>
                        {propAgent.type==1?
                        <p>委托代理人：{propAgent.name}，{propAgent.duties}律师</p>:
                        <p>委托代理人：{propAgent.name}{propAgent.sex?`，${propAgent.sex}`:''}{propAgent.ethnic?`，${propAgent.ethnic.replace(/族/g,'')}族`:''}{propAgent.birthday?`，${propAgent.birthday.substring(0,4)}年${propAgent.birthday.substring(4,6)}月${propAgent.birthday.substring(6)}日生`:''}{propAgent.cardId?`，身份证号：${propAgent.cardId}`:''}</p>}
                    </div>}
                    {defendant.type==0?<div>
                        <p>被申请人：{defendant.name}{defendant.sex&&`，${defendant.sex}`}{defendant.ethnic&&`，${defendant.ethnic.replace(/族/,'')}族`}{defendant.birthday&&`，${defendant.birthday.substring(0,4)}年${defendant.birthday.substring(4,6)}月${defendant.birthday.substring(6)}日出生`}{defendant.cardId&&`，身份证号码：${defendant.cardId}`}</p>
                        {defendant.address&&<p>住所：{defendant.address}</p>}
                    </div>:
                    <div>
                        <p>被申请人：{defendant.name}</p>
                        {defendant.address&&<p>住所：{defendant.address}</p>}
                        <p>法定代表人：{defendant.certName}，职务：{defendant.certDuties}</p>
                    </div>}
                    {defeAgent&&<div>
                        {defeAgent.type==1?
                        <p>委托代理人：{defeAgent.name}，{defeAgent.duties}律师</p>:
                        <p>委托代理人：{defeAgent.name}{defeAgent.sex?`，${defeAgent.sex}`:''}{defeAgent.ethnic?`，${defeAgent.ethnic.replace(/族/g,'')}族`:''}{defeAgent.birthday?`，${defeAgent.birthday.substring(0,4)}年${defeAgent.birthday.substring(4,6)}月${defeAgent.birthday.substring(6)}日生`:''}{defeAgent.cardId?`，身份证号：${defeAgent.cardId}`:''}</p>}
                    </div>}
                    <p>海南仲裁委员会（以下简称本会）于{this.transDate(caseInfo.caseAcceptanceTime)}受理了申请人{proposer.name}与被申请人{defendant.name}关于{caseInfo.caseType}一案。</p>
                    {caseInfo.isGroup && <div>
                        {caseInfo.arbiType==1?<p>在本会《仲裁规则》规定期限内，双方共同选定仲裁员{caseInfo.arbiName}组成独任仲裁庭，仲裁庭于{this.transDate(caseInfo.groupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>:
                        <p>双方当事人未在规定期限内共同选定或共同委托本会主任指定独任仲裁员，根据《中华人民共和国仲裁法》（以下简称《仲裁法》）第三十二条、《仲裁规则》第二十四条的规定，本会主任指定{caseInfo.arbiName}为本案独任仲裁员，仲裁庭于{this.transDate(caseInfo.groupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>}
                    </div>}
                </div>
                <div className="doc-reword">
                    <p>{caseInfo.backArbiFee?`申请人与被申请人分别于${this.transDate(caseInfo.applyTime)}、${this.transDate(caseInfo.backApplyTime)}向本会提交了撤回仲裁申请书和撤回仲裁反请求申请书。`:`申请人于${this.transDate(caseInfo.applyTime)}向本会提交了撤回仲裁申请书。`}</p>
                    <p>本会认为，{caseInfo.backArbiFee?`双方当事人自愿向本会撤回仲裁申请，系双方当事人对权利的自行处分，`:`申请人自愿向本会撤回仲裁申请，系其对权利的自行处分，`}不违反法律规定，本会予以准许。依照《中华人民共和国仲裁法》第四十九条之规定，决定如下：</p>
                    <div dangerouslySetInnerHTML={{__html:caseInfo.requestArbClaim}}></div>
                    <p>同意{caseInfo.backArbiFee?`双方当事人`:`申请人`}撤回仲裁申请，结束本案仲裁程序。</p>
                    {(caseInfo.arbiFee>0||caseInfo.backArbiFee>0)&&<p>{caseInfo.arbiFee>0?`申请人已预交的仲裁费${caseInfo.arbiFee}元，本会不予退回。`:''}{caseInfo.backArbiFee>0?`被申请人已预交的仲裁费${caseInfo.backArbiFee}元，本会不予退回。`:''}</p>}
                </div>
                <footer>
                    <p><span>{caseInfo.isGroup?`仲裁员：${caseInfo.arbiName}`:'海南仲裁委员会'}</span></p>
                    <p><span>{this.transDate(caseInfo.createTime,true)}</span></p>
                    <p><span>秘书：{caseInfo.secretaryName}</span></p>
                </footer>
            </article>)
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