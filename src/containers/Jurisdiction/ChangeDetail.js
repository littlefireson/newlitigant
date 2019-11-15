import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Table,Spin,Icon,Modal,Button} from 'antd';
import classNames from 'classnames';
import {Book} from '../../components'
import ajax from "../../utils/ajax";
import cache from '../../utils/cache';
const ButtonGroup = Button.Group;
const columns=[{
    title: '缴款项目编码',
    dataIndex: 'no',
    key: 'no'
},{
    title: '缴款项目名称',
    dataIndex: 'name',
    key: 'name'
},{
    title: '标准',
    dataIndex: 'price',
    key: 'price'
},{
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity'
},{
    title: '金额',
    dataIndex: 'amount',
    key: 'amount'
},{
    title: '滞纳金率',
    dataIndex: 'lateFee',
    key: 'lateFee'
},{
    title: '总金额',
    dataIndex: 'totalSum',
    key: 'totalSum'
}];
const source = [{
    key:'1',
    projectNumber:'1034214454514',
    projectName:'居民身份证-一代身份证-一般地区',
    standard:'10.00',
    num:'1',
    amount:'10.00',
    lateFee:'--',
    totalSum:'10.00'
}];
@withRouter
export default class ChangeDetail extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}} = props;
        this.state={
            show:props.show || false,
            height:0,
            caseInfo:null,
            caseId,
            spinning:false,
            visible:false,
            info:null,
            dataSource:[],
            disabled:false,
            messageH:''
        }
    }
    static defaultProps={
        baseInfo:{
            dcoName:'',
            createTime:''
        },
        showBtns:false,
        replyButton:{},
        changeReplyButton:{}
    }
    getFrameHeight=(v)=>{
        this.setState({
            messageH:v
        })
    }
    getDateList=(payInfo)=> {
        if (payInfo && payInfo.items) {
            return payInfo.items.map((item, index) => {
                item.key = index;
                item.amount = item.price * item.quantity;
                item.lateFee = '';
                item.totalSum = item.amount + item.lateFee;
                return item;
            })
        }else{
            return [];
        }
    }
    getCaseInfo=()=>{
        const {caseId,caseInfo} =this.state;
        const {baseInfo} = this.props;
        if(!caseInfo){
            this.setState({
                caseInfo:baseInfo
            })
        }
    }
    getContent=()=>{
        const {caseInfo,spinning,visible,info,dataSource}=this.state;
        let title = '管辖权异议申请书';
        if(caseInfo){
            title = caseInfo.docName;
        }
        return(<Spin spinning={spinning}  tip="加载中...">
            {caseInfo &&  <Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)} title={title} createTime={caseInfo.createTime} caseInfo={caseInfo} oppositeFlag={true} type={caseInfo.type}></Book>}
        </Spin>)
    }
    toggle=()=>{
        const {show}=this.state;
        if(!show){
            this.getCaseInfo();
        }
        this.setState((pre)=>({
            show:!pre.show
        }))
    }
    showSteps=()=>{
        this.setState({
            visible:true
        })
    };
    hideModal=()=>{
        this.setState({
            visible:false
        })
    }
    getStatus=(status)=>{
        switch(status){
            case 0:
                return '未生成';
            case 1:
                return '已缴费';
            case 2:
                return '未缴费';
            default:
                return '已过期';
        }
    }
    componentDidUpdate(){
        const {height} = this.state;
        if(this.refs.content){
            const articleH = this.refs.content.scrollHeight;
            if(articleH != height){
                this.setState({
                    height:articleH
                })
            }
        }
        
    }
    componentDidMount(){
        const {show} = this.state;
        if(show){
            this.getCaseInfo()
        }
        if(this.refs.content){
            const articleH = this.refs.content.scrollHeight;
            this.setState({
                height:articleH
            })
        }
        const {validFlag} = JSON.parse(cache.getItem('commInfo'));
        this.setState({
            disabled:validFlag
        })
    }
    goFeedback=()=>{
        const {history,location} = this.props;
        history.push(`${location.pathname}/feedback/0`);
    }
    getCtrl=()=>{
        const {showBtns,baseInfo}=this.props;
        const {disabled} = this.state;
        if(showBtns){
            return (<ButtonGroup>
                { baseInfo.feedbackBtn && (<Button type="primary" size="small" ghost onClick={this.goFeedback} disabled={disabled}>反馈</Button>)}
            </ButtonGroup>)
        }
    }
    render(){
        const {baseInfo}=this.props;
        const {show,height}=this.state;
        const toogleName=classNames({
            'show':show
        });
        const style = show ?{height}:{};
        const statusList = {
            0:'待审核',
            1:'审核通过',
            2:'审核失败'
        }
        if(baseInfo){
            return(<section className="changeDetail">
                <header>
                    <strong onClick={this.toggle}><time>{baseInfo.createTime}</time>{baseInfo.docName}</strong>
                    <aside>
                        {this.getCtrl()}
                        <em className={toogleName} onClick={this.toggle}>{statusList[baseInfo.status]}</em>
                    </aside>
                </header>
                <article style={style} ref="content">
                    {this.getContent()}
                </article>
            </section>)
        }else{
            return '';
        }
        
    }
}