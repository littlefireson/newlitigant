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
            spinning:true,
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
    getFrameHeight=(v)=>{
        this.setState({
            messageH:v,
            spinning:false
        })
    }
    getContent=()=>{
        const {caseInfo,spinning}=this.state;
        if(caseInfo){
            const {proposer,propAgent,defendant,defeAgent} = caseInfo;
            return(
                <Spin spinning={spinning}  tip="加载中...">
                    {caseInfo.type==0?<Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)} caseInfo={caseInfo} title={'组庭通知书'}></Book>:<Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)} caseInfo={caseInfo} title={'被申请人组庭通知书'}></Book>}
                
                {/* <article className="doc-book">
                    <h3>海南仲裁委员会</h3>
                    <h2>仲裁庭组成通知书</h2>
                    <div className="doc-content">
                        <p className="doc-content-number">{caseInfo.caseNo}</p>
                        <p className="doc-content-left">{caseInfo.type==0?caseInfo.propName:caseInfo.defeName}：</p>
                        <p>申请人与被申请人关于{caseInfo.caseType}一案，由本会仲裁员{caseInfo.arbiName}组成仲裁庭，{caseInfo.arbiName}为独任仲裁员。</p>
                    </div>
                    <div className="doc-reword">
                        <p>特此通知。</p>
                    </div>
                    <footer>
                        <p><span>海南仲裁委员会</span></p>
                        <p><span>{this.transDate(caseInfo.createTime)}</span></p>
                    </footer>
                </article> */}
            </Spin>
            )
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