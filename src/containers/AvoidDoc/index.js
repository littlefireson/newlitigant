import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Timeline,Button,Spin} from 'antd';
import ajax from "../../utils/ajax";
import cache from "../../utils/cache";
import {BlankPage} from "../../components";

@withRouter
export default class AvoidDoc extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            docContent:null
        }
    }
    componentDidMount(){
        const {match:{params:{avoidId,type}}} = this.props;
        let url = `/litigant/case/${avoidId}/getArbiAvoidInfo`;
        if(type==1){
            url = `/litigant/case/${avoidId}/getArbiAvoidDecision`;
        }
        this.setState({
            spinning:true
        })
        ajax.get(url).then((data)=>{
            this.setState({
                docContent:data
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
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
    getList=()=>{
        const {docContent,spinning} =this.state;
        const {match:{params:{type}}} = this.props;
        if(docContent){
            return(<div>
                {type==0 && <article className="book">
                    <p>申请人：{docContent.applicantName}</p>
                    <h3>请求事项</h3>
                    <div dangerouslySetInnerHTML={{__html:docContent.requestItem}}>
                    </div>
                    <h3>事实与理由</h3>
                    <div dangerouslySetInnerHTML={{__html:docContent.factReason}}>
                    </div>
                    <footer>
                        <p>此致</p>
                        <p>海南仲裁委员会</p>
                        <aside>
                            <p>申请人：{docContent.applicantName} </p>
                            <p>{docContent.applyTime}</p>
                        </aside>
                    </footer>
                </article>}
                {type==1 && <article className="doc-book">
                <h3>海南仲裁委员会</h3>
                <h2>裁决书</h2>
                <div className="doc-notice">
                    <p>说明：1、共同选定仲裁员/主任指定仲裁员</p>
                    <p>2、当事人提出回避/仲裁员自行回避</p>
                    <p>3、准许回避申请/驳回回避申请</p>
                </div>
                <div className="doc-content">
                    <p className="doc-content-number">{docContent.caseNo}</p>
                    <p>申请人：{docContent.applicantName}</p>
                    <p>海南仲裁委员会（以下简称本会）于{this.transDate(docContent.acceptanceTime)}受理了申请人{docContent.propName}与被申请人{docContent.defeName}关于{docContent.caseType}一案。</p>
                    {
                    docContent.arbiType==1?<p>在本会《仲裁规则》规定期限内，双方共同选定仲裁员{docContent.arbiName}组成独任仲裁庭，仲裁庭于{this.transDate(docContent.groupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>:
                    <p>双方当事人未在规定期限内共同选定或共同委托本会主任指定独任仲裁员，根据《中华人民共和国仲裁法》（以下简称《仲裁法》）第三十二条、《仲裁规则》第  条的规定，本会主任指定{docContent.arbiName}为本案独任仲裁员，仲裁庭于{this.transDate(docContent.groupTime)}成立。本会按照《仲裁规则》的规定向双方当事人送达了组庭通知书。</p>
                    }
                    {docContent.applyType!=2?<p>申请人{docContent.applicantName}于{this.transDate(docContent.applyTime)}向本会提交了仲裁员回避申请书。</p>:
                    <p>仲裁员{docContent.arbiName}于{this.transDate(docContent.applyTime)}向本会提交了仲裁员自行回避申请书。</p>}
                </div>
                
                <footer>
                    <p><span>海南仲裁委员会</span></p>
                    <p><span>{this.transDate(docContent.createTime,true)}</span></p>
                    <p><span>秘书：{docContent.secretaryName}</span></p>
                </footer>
            </article>}
            </div>)
        }else{
            if(!spinning){
                return (<BlankPage/>)
            }
        }
    }
    render(){
        const {spinning} = this.state;
        return(<section className="changeApply">
            <Spin spinning={spinning} tip="加载中...">
                {this.getList()}
            </Spin>
        </section>)
    }
}