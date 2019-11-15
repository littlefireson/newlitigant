import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Table,Spin,Icon,Modal,Button} from 'antd';
import classNames from 'classnames';
import {Book} from '../../components'
import ajax from "../../utils/ajax";
import cache from '../../utils/cache';
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
@withRouter
export default class ChangeDetail extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}} = props;
        this.state={
            caseInfo:null,
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
    transPtransP=(string)=>{
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
    agreeMediate=()=>{
        const {match:{path},history} = this.props;
        history.push(`${path}/receipt`);
    }
    refuseMediate=()=>{
        confirm({
            title:'拒签则调解书生效失败，继续仲裁',
            content:'',
            onOk:()=>{
                let {match:{params:{caseId}},history} = this.props;
                caseId = caseId?caseId.split('/')[0]:'';
                ajax.post(`compromise/operation/${caseId}/protocolRefuse`,{caseId}).then(()=>{
                    history.goBack();
                })
            }
        })
        
    }
    getCtrl=()=>{
        const {refuseBtn,agreeBtn}=this.props;
        return (<ButtonGroup>
            { agreeBtn && (<Button type="primary" size="small" ghost onClick={this.agreeMediate}>同意</Button>)}
            { refuseBtn && (<Button type="primary" size="small" ghost onClick={this.refuseMediate}>拒绝</Button>)}
        </ButtonGroup>)
    }
    getContent=()=>{
        const {caseInfo}=this.state;
        if(caseInfo){
            const {defeAgent,defendant,propAgent,proposer} = caseInfo;
            return(<section className="changeDetail">
                <header>
                    <strong onClick={this.toggle}><time>{baseInfo.createTime}</time>{baseInfo.dcoName}</strong>
                    <aside>
                        {this.getCtrl()}
                        <em className={toogleName} onClick={this.toggle}>{baseInfo.status}</em>
                    </aside>
                </header>
                <article className="adjudication-book">
                    <h3>海南仲裁委员会</h3>
                    <h2>调解书</h2>
                    <div className="doc-notice">
                        <p>说明：1、申请人{propAgent?'有':'无'}代理人、被申请人{defeAgent?'有':'无'}代理人</p>
                        <p>2、{caseInfo.arbiSignMode==0?'合同约定仲裁条款':'单独仲裁协议'}</p>
                        <p>3、{caseInfo.arbiType==0?'本会主任指定独任仲裁员':'双方共同选定独任仲裁员'}</p>
                        <p>4、被申请人{caseInfo.hasBack?'有':'无'}反请求</p>
                        <p>5、{caseInfo.requestChange?'有':'无'}变更仲裁请求、{caseInfo.backRequestChange?'有':'无'}变更仲裁反请求</p>
                    </div>
                    <div className="doc-content">
                        <p className="doc-content-number">{caseInfo.caseNo}</p>
                        {proposer.type==0?<div>
                            <p>申请人：{proposer.name}{proposer.sex?`，${proposer.sex}`:''}{proposer.ethnic?`，${proposer.ethnic.replace(/族/g,'')}族`:''}{proposer.birthday?`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日生`:''}{proposer.cardId?`，身份证号：${proposer.cardId}`:''}</p>
                            {proposer.address&&<p>住所：{proposer.address}</p>}
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
                        <p>海南仲裁委员会（以下简称本会）根据申请人{peoposer.name}（以下简称申请人）与被申请人{defendant.name}（以下简称被申请人）{caseInfo.protocolName?`于${this.transDate(caseInfo.signTime)}签订的《${caseInfo.protocolName}》中的仲裁条款`:`于${this.transDate(caseInfo.signTime)}签订的仲裁协议`}和申请人的仲裁申请，于{this.transDate(caseInfo.caseAcceptanceTime)}受理了申请人关于{caseInfo.caseType}的仲裁申请。</p>
                        <p>根据《海南仲裁委员会互联网金融仲裁规则》（以下简称《仲裁规则》）第  条的规定，本会向被申请人送达了仲裁受理通知书、仲裁申请书副本、仲裁规则、仲裁员名册等材料。</p>
                        {
                        caseInfo.arbiType==1?<p>在本会《仲裁规则》规定期限内，双方共同选定仲裁员{caseInfo.arbitratorName}组成独任仲裁庭，仲裁庭于{this.transDate(caseInfo.arbitratorGroupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>:
                        <p>双方当事人未在规定期限内共同选定或共同委托本会主任指定独任仲裁员，根据《中华人民共和国仲裁法》（以下简称《仲裁法》）第三十二条、《仲裁规则》第  条的规定，本会主任指定{caseInfo.arbitratorName}为本案独任仲裁员，仲裁庭于{this.transDate(caseInfo.arbitratorGroupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>
                        }
                    </div>
                    <div className="doc-reword">
                        <p className="doc-reword-title">一、仲裁请求与答辩</p>
                        <p>申请人向本会提出如下仲裁请求：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.arbiRequest)}}></div>
                        <p>其事实和理由是：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.arbiFact)}}></div>
                        {caseInfo.requestChange&&<div>
                            <p>申请人又于{this.transDate(caseInfo.requestChangeTime)}向本会提交书面变更仲裁请求申请书，变更仲裁请求为：</p>
                            <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.changeRequest)}}></div>
                            <p>其事实和理由是：</p>
                            <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.changeFact)}}></div>
                        </div>}
                        {caseInfo.haveBackRequest&&<div>
                            <p>被申请人向本会提出如下仲裁反请求：</p>
                            <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backRequest)}}></div>
                            <p>其事实和理由是：</p>
                            <div dangerouslySetInnerHTML={{__html:caseInfo.backFact}}></div>
                            {caseInfo.backRequestChange&&<div>
                                <p>被申请人又于{this.transDate(caseInfo.backRequestChangeTime)}向本会提交书面变更仲裁反请求申请书，变更仲裁反请求为：</p>
                                <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backChangeRequest)}}></div>
                                <p>其事实和理由是：</p>
                                <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.backChangeFact)}}></div>
                            </div>}
                        </div>}
                    </div>
                    <div className="doc-reword">
                        <p>仲裁过程中，申请人、被申请人自愿达成如下和解协议：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.protocolText)}}></div>
                        <p>根据《中华人民共和国仲裁法》第四条、第七条、第四十九条、第五十二条，仲裁庭认为，上述和解协议是申请人与被申请人的真实意思表示，没有违反法律、行政法规的强制性规定，仲裁庭予以确认。</p>
                        <p>本案已预收仲裁费用{caseInfo.arbiFee}元，本会不予退回。</p>
                        <p>本调解书自双方当事人签收之日起发生法律效力。</p>
                    </div>
                    <footer>
                        <p><span>仲裁员：{caseInfo.arbiName}</span></p>
                        <p><span>{this.transDate(caseInfo.decisionTime,true)}</span></p>
                        <p><span>秘书：{caseInfo.secretaryName}</span></p>
                    </footer>
                </article>
            </section>)
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
        return(
            <article ref="content">
                {this.getContent()}
            </article>
        )
        
    }
}