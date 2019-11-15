import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import cache from '../../utils/cache';
import DocHeader from '../DocHeader/index'
import {baseURL} from '../../utils/ajax';
import {Spin} from 'antd';

@connect((state)=>({
    litigantType: state.litigantType
}))
@withRouter
export default class Book extends Component{
    constructor(props){
        super(props);
        const baseInfo = JSON.parse(cache.getItem('baseInfo')) || {};
        this.modelHeight = "";
        this.state={
            spining:false,
            baseInfo,
            modelHeight:"",
            arr:[],
            spining:true,
        }
    }
    NewDate=(str)=>{  
        if(!str){  
          return 0;  
        }  

        let arr=str.split(" ");  
        let d=arr[0].split("-");  
        let t=arr[1].split(":");  
        let date = new Date();   
        date.setUTCFullYear(d[0], d[1] - 1, d[2]);   
        date.setUTCHours(t[0], t[1], t[2], 0);   
        return date;  
      }  
    transDate=(date,toUp)=>{
        if(date && date.indexOf('.')!=-1){
            date = date.split('.')[0];
        }
        const thisDate = new Date(this.NewDate(date));
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
        if(string&&string.indexOf('<br/>')!=-1){
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
    getPContent=(str)=>{
        const reg = />.*?<\/p>/;
        const reg1 = />.*?<\/span>/;
        let content = '';
        if(str.match(reg)){
            str.match(reg).map((ele)=>{
                ele=ele.substring(1).split('</p>')[0];
                if(ele.match(reg1)){
                    let spanItem = '';
                    ele.match(reg1).map((item)=>{
                        spanItem+=`<span>${item.substring(1)}`;
                    })
                    content+=spanItem;
                }else{
                    content+=ele;
                }
            })
        }
        return content;
    }
    caseTitle = (title)=>{
        switch(title){   
            case "撤案决定书":
                return "0";
            case "裁决书":
                return "1";
            case "仲裁申请书":
                return "2";
            case "反请求申请书":
                return "3";
            case "反请求撤案决定书":
                return "4";
            case "仲裁员回避申请书":
                return "5";
            case "仲裁员回避决定书":
                return "6";
            case "组庭通知书":
                return "7";
            case "撤回仲裁申请书":
                return "8";
            case "撤回反请求申请书":
                return "9";
            case "变更仲裁请求申请书":
                return "10";
            case "变更反请求申请书":
                return "11";
            case "和解协议申请书":
                return "12";
            case "反请求答辩书":
                return "13";
            case "仲裁答辩书":
                return "14";
            case "秘书回避申请书":
                return "15";
            case "补正申请书":
                return "16";
            case "管辖权异议申请书":
                return "17";
            case "反请求管辖权异议申请书":
                return "18";
            case "管辖权异议决定书": 
                return "19";
            case "秘书回避决定书":
                return "20";
            case "变更反请求答辩书":
                return "21";
            case "变更仲裁答辩书":
                return "22";
            case "反请求管辖权异议决定书":
                return "23";
            case "不受理变更仲裁请求通知书":
                return "24";
            case "变更仲裁请求受理通知书":
                return "25";
            case "案件受理通知书":
                return "26";
            case "仲裁请求不受理通知书":
                return "27";
            case "案件中止申请书":
                return "28";
            case "受理变更仲裁反请求通知书":
                return "29";
            case "不受理仲裁反请求通知书":
                return "30";
            case "受理仲裁反请求通知书":
                return "31";
            case "管辖权异议回应书":
                return "32";
            case "反请求管辖权异议回应书":
                return "33";
            case "调解书":
                return "34";
            case "代理授权委托书":
                return "35";
            case "代理授权委托书":
                return "36";
            case "案件中止决定书":
                return "37";
            case "补正书":
                return "38";
            case "裁决书-生效证明":
                return "39";
            case "调解书-生效证明":
                return "40";
            case "应仲裁通知书":
                return "41";
            case "反请求答辩通知书":
                return "42";
            case "案件立案审批表单":
                return "43";
            case "反请求受理通知书":
                return "44";
            case "反请求立案审批表单":
                return "45";
            case "应仲裁通知书":
                return "46";
            case "仲裁员名册":
                return "47";
            case "仲裁员补充名册":
                return "48";
            case "仲裁庭选定表":
                return "49";
            case "当事人权利义务告知书":
                return "50";
            case "仲裁委员会仲裁规则":
                return "51";
            case "诚信仲裁保证书":
                return "52";
            case "诚信仲裁提示书":
                return "53";
            case "送达地址确认书":
                return "54";
            case "撤案决定书":
                return "55";
            case "被申请人组庭通知书":
                return "56";
            case "仲裁员组庭通知书":
                return "57";
            default:
               return null;
        }
    }
    resizeFrame=(id)=>{
         
        let self = this;    //为了避免作用域及缓存
        window.receiveMessageFromIndex = function ( event ) {
            if(event!=undefined){
                self.state.arr.push(id);
                 var nary= self.state.arr.sort();
                for(var i=0;i< self.state.arr.length;i++){
                    if (nary[i]==nary[i+1]){
                        return null
                    }else{
                        self.setState({
                            modelHeight:event.data,
                            spining:false      
                        },()=>{
                            if(self.props.getFrameHeight){
                                self.props.getFrameHeight(self.state.modelHeight);
                            }
                        })
                    }
                }
            }
        }

        //监听message事件
        window.addEventListener("message", receiveMessageFromIndex, false);
    }
    getContent=()=>{
        const {title,apply,reason,caseInfo,litigantType,oppositeFlag=false,type=0} = this.props;
        const {baseInfo} = this.state;
        const {caseNo} = JSON.parse(cache.getItem('commInfo')).info;
        const docType =  this.caseTitle(title);
        const token = cache.getItem('token');
    
        const caseId = this.props.match.params.caseId;
        const location_href = location.href.split('#')[0];
        const setJsUrl = location_href+'static/resetFrame.js';
        const bookcontent = 
        <div className="spining">
            
            <iframe id={`${docType}iframe`} scrolling="no"
            frameBorder="0" 
            width="100%" 
            height={`${this.state.modelHeight}`}
            src={baseURL+`arbitrator/case/${caseId}/doc/${docType}?access_token=${token}&jsUrl=${setJsUrl}`}
            onLoad={this.resizeFrame.bind(this,`${docType}iframe`)}
            > 
            <Spin spinning={this.state.spining}/>
            </iframe>
        </div>
        
        
        
        const {
            requestItem="",
            factReason="",
            feedBack="",
            amendContent="",
            createTime="",
            applyTime=""
        }=caseInfo;
        // console.log(requestItem);
        const {
            proposer={},
            defendant={},
            propAgent={},
            defeAgent={},
            signTime="",
            caseType=''
        }=baseInfo;
        let role = 0; //申请人为0   被申请人为1
        const bookList = {
            // 0:仲裁申请书  2
            // 1:管辖权异议  
            // 2:反请求管辖权异议
            // 3:管辖权异议回应书
            // 4:反请求管辖权异议回应书
            // 5:反请求申请书
            // 6:中止申请书
            // 7:补正申请书
            // 8:裁决补正书
            // 9:中止决定书
            // 10:管辖权决定书
            // 11:反请求管辖权决定书
            0:<article className="book">
                <h2>{title}</h2>
                <DocHeader proposer={proposer} defendant={defendant} oppositeFlag={false}/>
                <h3>请求事项</h3> 
                <div dangerouslySetInnerHTML={{__html:requestItem}}>
                </div>
                <h3>事实与理由</h3>
                <div dangerouslySetInnerHTML={{__html:factReason}}>
                </div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>申请人：{proposer.name} </p>
                        <p>{this.transDate(applyTime)}</p>
                    </aside>
                </footer>
            </article>,
            1:<article className="book">
                <h2>{title}</h2>
                <h2>（本请求）</h2>
                <p>海南仲裁委员会：</p>
                <p>针对贵会受理的{caseNo}案，我方提出管辖权异议如下：</p>
                <h3>请求</h3>
                <div dangerouslySetInnerHTML={{__html:requestItem}}></div>
                <h3>理由是</h3>
                <div dangerouslySetInnerHTML={{__html:factReason}}></div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>{defendant.name}</p>
                        <p>{this.transDate(createTime)}</p>
                    </aside>
                </footer>
            </article>,
            2:<article className="book">
                <h2>{title}</h2>
                <h2>（反请求）</h2>
                <p>海南仲裁委员会：</p>
                <p>针对贵会受理的{caseNo}案，我方提出管辖权异议如下：</p>
                <h3>请求</h3>
                <div dangerouslySetInnerHTML={{__html:requestItem}}></div>
                <h3>理由是</h3>
                <div dangerouslySetInnerHTML={{__html:factReason}}></div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>{proposer.name}</p>
                        <p>{this.transDate(createTime)}</p>
                    </aside>
                </footer>
            </article>,
            3:<article className="book">
                <h2>{title}</h2>
                <h3>针对被申请人提出的管辖权异议，我方发表如下回应意见：</h3>
                <div dangerouslySetInnerHTML={{__html:feedBack}}></div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>{proposer.name}</p>
                        <p>{this.transDate(createTime)}</p>
                    </aside>
                </footer>
            </article>,
            4:<article className="book">
                <h2>{title}</h2>
                <h3>针对申请人提出的反请求管辖权异议，我方发表如下回应意见：</h3>
                <div dangerouslySetInnerHTML={{__html:feedBack}}></div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>{defendant.name}</p>
                        <p>{this.transDate(createTime)}</p>
                    </aside>
                </footer>
            </article>,
            5:<article className="book">
                <h2>{title}</h2>
                <DocHeader proposer={proposer} defendant={defendant} counterFlag={true} oppositeFlag={oppositeFlag}/>
                <h3>请求事项</h3>
                <div dangerouslySetInnerHTML={{__html:requestItem}}>
                </div>
                <h3>事实与理由</h3>
                <div dangerouslySetInnerHTML={{__html:factReason}}>
                </div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>申请人：{defendant.name} </p>
                        <p>{this.transDate(applyTime)}</p>
                    </aside>
                </footer>
            </article>,
            6:<article className="book">
                <h2>{title}</h2>
                <DocHeader proposer={proposer} defendant={defendant} role={role}/>
                <h3>请求事项</h3>
                <div dangerouslySetInnerHTML={{__html:requestItem}}>
                </div>
                <h3>事实与理由</h3>
                <div dangerouslySetInnerHTML={{__html:factReason}}>
                </div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>申请人：{proposer.name} </p>
                        <p>{this.transDate(createTime)}</p>
                    </aside>
                </footer>
            </article>,
            7:<article className="book">
                <h2>{title}</h2>
                <p>海南仲裁委员会：</p>
                <p>关于贵会作出的{caseNo}裁决书，我方提出如下补正申请：</p>
                <div dangerouslySetInnerHTML={{__html:amendContent}}>
                </div>
                <h3>理由是：</h3>
                <div dangerouslySetInnerHTML={{__html:factReason}}>
                </div>
                <footer>
                    <p>此致</p>
                    <p>海南仲裁委员会</p>
                    <aside>
                        <p>申请人：{caseInfo.applicantName} </p>
                        <p>{this.transDate(createTime)}</p>
                    </aside>
                </footer>
            </article>,
            8:<article className="doc-book">
                <h3>海南仲裁委员会</h3>
                <h2>补正裁决书</h2>
                <div className="doc-content">
                    {proposer.type==0?<div>
                        <p>申请人：{proposer.name}{proposer.sex&&`，${proposer.sex}`}{proposer.ethnic&&`，${proposer.ethnic.replace(/族/,'')}族`}{proposer.birthday&&`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日出生`}{proposer.cardId&&`，身份证号码：${proposer.cardId}`}</p>
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
                </div>
                <div className="doc-reword">
                    <p>本会受理的珠仲网字{caseNo}案，已于{this.transDate(caseInfo.decisionTime)}作出裁决，现查明该裁决书中存在</p>
                    <p>{caseInfo.faultAmount}</p>
                    <p>的错误，应予补正。</p>
                </div>
                <div className="doc-reword">
                    <p>{caseInfo.decisionContent}</p>
                    <p>本裁决补正书为裁决书的一部分，自作出之日起发生法律效力。</p>
                </div>
                <footer>
                    <p><span>仲裁员：{caseInfo.arbiName}</span></p>
                    <p><span>{this.transDate(caseInfo.createTime,true)}</span></p>
                    <p><span>秘书：{caseInfo.secretaryName}</span></p>
                </footer>
            </article>,
            9:<article className="doc-book book">
                <h3>海南仲裁委员会</h3>
                <h2>决定书</h2>
                <div className="doc-notice">
                    <p>说明：1、申请人{propAgent?'有':'无'}代理人、被申请人{defeAgent?'有':'无'}代理人</p>
                    <p>2、{caseInfo.isGroup?'已':'无'}祖庭</p>
                </div>
                <div className="doc-content">
                    {proposer.type==0?<div>
                        <p>申请人：{proposer.name}{proposer.sex&&`，${proposer.sex}`}{proposer.ethnic&&`，${proposer.ethnic.replace(/族/,'')}族`}{proposer.birthday&&`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日出生`}{proposer.cardId&&`，身份证号码：${proposer.cardId}`}</p>
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
                    <p>海南仲裁委员会（以下简称本会）于{this.transDate(caseInfo.caseAcceptanceTime)}受理了申请人{proposer.name}与被申请人{defendant.name}关于{caseType}一案。</p>
                    {caseInfo.isGroup&&<p>本会按照《仲裁规则》的规定，组成由{caseInfo.arbiName}担任仲裁员的独任仲裁庭，并于{this.transDate(caseInfo.groupTime)}向双方当事人送达了组庭通知书。</p>}
                </div>
                <div className="doc-content">
                    <p>本案在仲裁过程中，{requestItem!==''?this.getPContent(requestItem):''}</p>
                    <p>本{caseInfo.isGroup?'庭':'会'}经审查认为，{factReason!==''?this.getPContent(factReason):''}</p>
                    <p>依据{caseInfo.rules?caseInfo.rules:'--'}的规定，决定如下：</p>
                    <p>{caseInfo.decision}</p>
                    <p>中止本案仲裁。</p>
                </div>
                <footer>
                    <p><span>{caseInfo.isGroup?`仲裁员：${caseInfo.arbiName}`:'海南仲裁委员会'}</span></p>
                    <p><span>{this.transDate(caseInfo.createTime,true)}</span></p>
                    <p><span>秘书：{caseInfo.secretaryName}</span></p>
                </footer>
            </article>,
            10:<article className="doc-book book">
                <h3>海南仲裁委员会</h3>
                <h2>决定书</h2>
                <div className="doc-notice">
                    <p>说明：1、申请人{propAgent?'有':'无'}代理人、被申请人{defeAgent?'有':'无'}代理人</p>
                    <p>2、{caseInfo.protocolSignMode==0?'合同约定仲裁条款':'单独仲裁协议'}</p>
                    <p>3、{caseInfo.isGroup?'已':'未'}组庭</p>
                    <p>4、仲裁请求{caseInfo.requestChange?'有':'无'}变更</p>
                    <p>5、{caseInfo.jurisFeedback?'有':'无'}回应意见</p>
                </div>
                <div className="doc-content">
                    {proposer.type==0?<div>
                        <p>申请人：{proposer.name}{proposer.sex&&`，${proposer.sex}`}{proposer.ethnic&&`，${proposer.ethnic.replace(/族/,'')}族`}{proposer.birthday&&`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日出生`}{proposer.cardId&&`，身份证号码：${proposer.cardId}`}</p>
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
                    <p>海南仲裁委员会（以下简称本会）根据申请人{proposer.name}（以下简称申请人）与被申请人{defendant.name}（以下简称被申请人）{caseInfo.protocolName?`于${this.transDate(caseInfo.sigeTime)}签订的《${caseInfo.protocolName}》中的仲裁条款`:`于${this.transDate(caseInfo.signTime)}签订的仲裁协议`}和申请人的仲裁申请，于{this.transDate(caseInfo.caseAcceptanceTime)}受理了申请人关于{caseInfo.caseType}的仲裁申请。</p>
                    {caseInfo.isGroup&&<p>本会按照《仲裁规则》的规定，组成由{caseInfo.arbiName}担任仲裁员的独任仲裁庭，并于{this.transDate(caseInfo.groupTime)}向双方当事人送达了组庭通知书。</p>}
                </div>
                <div className="doc-content">
                    <p>申请人向本会提出如下仲裁请求：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestInfo)}}></div>
                    {caseInfo.changeRequestInfo&&<div>
                        <p>申请人又于{this.transDate(caseInfo.changeApplyTime)}向本会提交书面变更仲裁请求申请书，变更仲裁请求为：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.changeRequestInfo)}}></div>
                    </div>}
                </div>
                <div className="doc-content">
                    <p>被申请人于{this.transDate(caseInfo.jurisApplyTime)}向本会提交了管辖权异议申请书，请求：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.jurisRequestItem)}}></div>
                    <p>其理由是：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.jurisFactReason)}}></div>
                    {caseInfo.jurisFeedback&&<div>
                        <p>申请人提出如下回应意见：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.jurisFeedback)}}></div>
                    </div>}
                </div>
                <footer>
                    <p><span>{caseInfo.isGroup?`仲裁员：${caseInfo.arbiName}`:'海南仲裁委员会'}</span></p>
                    <p><span>{this.transDate(caseInfo.createTime,true)}</span></p>
                    <p><span>秘书：{caseInfo.secretaryName}</span></p>
                </footer>
            </article>,
            11:<article className="doc-book book">
                <h3>海南仲裁委员会</h3>
                <h2>决定书</h2>
                <div className="doc-notice">
                    <p>说明：1、申请人{propAgent?'有':'无'}代理人、被申请人{defeAgent?'有':'无'}代理人</p>
                    <p>2、{caseInfo.protocolSignMode==0?'合同约定仲裁条款':'单独仲裁协议'}</p>
                    <p>3、{caseInfo.isGroup?'已':'未'}组庭</p>
                    <p>4、仲裁反请求{caseInfo.requestChange?'有':'无'}变更</p>
                    <p>5、{caseInfo.jurisFeedback?'有':'无'}回应意见</p>
                </div>
                <div className="doc-content">
                    {proposer.type==0?<div>
                        <p>申请人：{proposer.name}{proposer.sex&&`，${proposer.sex}`}{proposer.ethnic&&`，${proposer.ethnic.replace(/族/,'')}族`}{proposer.birthday&&`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日出生`}{proposer.cardId&&`，身份证号码：${proposer.cardId}`}</p>
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
                    <p>海南仲裁委员会（以下简称本会）根据申请人{proposer.name}（以下简称申请人）与被申请人{defendant.name}（以下简称被申请人）{caseInfo.protocolName?`于${this.transDate(caseInfo.sigeTime)}签订的《${caseInfo.protocolName}》中的仲裁条款`:`于${this.transDate(caseInfo.signTime)}签订的仲裁协议`}和申请人的仲裁申请，于{this.transDate(caseInfo.caseAcceptanceTime)}受理了申请人关于{caseInfo.caseType}的仲裁申请。</p>
                    {caseInfo.isGroup&&<p>本会按照《仲裁规则》的规定，组成由{caseInfo.arbiName}担任仲裁员的独任仲裁庭，并于{this.transDate(caseInfo.groupTime)}向双方当事人送达了组庭通知书。</p>}
                </div>
                <div className="doc-content">
                    <p>被申请人向本会提出如下仲裁反请求：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.requestInfo)}}></div>
                    {caseInfo.changeRequestInfo&&<div>
                        <p>被申请人又于{this.transDate(caseInfo.changeApplyTime)}向本会提交书面变更仲裁反请求申请书，变更仲裁反请求为：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.changeRequestInfo)}}></div>
                    </div>}
                </div>
                <div className="doc-content">
                    <p>申请人于{this.transDate(caseInfo.jurisApplyTime)}向本会提交了管辖权异议申请书，请求：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.jurisRequestItem)}}></div>
                    <p>其理由是：</p>
                    <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.jurisFactReason)}}></div>
                    {caseInfo.jurisFeedback&&<div>
                        <p>被申请人提出如下回应意见：</p>
                        <div dangerouslySetInnerHTML={{__html:this.transP(caseInfo.jurisFeedback)}}></div>
                    </div>}
                </div>
                <footer>
                    <p><span>{caseInfo.isGroup?`仲裁员：${caseInfo.arbiName}`:'海南仲裁委员会'}</span></p>
                    <p><span>{this.transDate(caseInfo.createTime,true)}</span></p>
                    <p><span>秘书：{caseInfo.secretaryName}</span></p>
                </footer>
            </article>
        }
        if(docType!=null){
            return bookcontent;
        }else{
            return bookList[type];
        }
    }
    render(){ 
        return <div>
            {this.getContent()}
        </div>
    }
}