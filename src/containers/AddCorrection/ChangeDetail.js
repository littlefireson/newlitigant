import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Table,Spin,Icon,Modal,Button} from 'antd';
import classNames from 'classnames';
import {Book,ArbitrationPreview} from '../../components'
import ajax from "../../utils/ajax";
import cache from '../../utils/cache';
const ButtonGroup = Button.Group;
@withRouter
export default class ChangeDetail extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}} = props;
        this.state={
            show:props.show || false,
            height:0,
            applyDocVO:null,
            decisionDocVO:null,
            caseId,
            spinning:true,
            visible:false,
            messageH:""
        }
    }
    static defaultProps={
        baseInfo:{
            dcoName:'',
            createTime:'',
            id:''
        },
    }
    getFrameHeight=(v)=>{
        this.setState({
            messageH:v
        })
    }
    getCaseInfo=()=>{
        const {caseId,applyDocVO,decisionDocVO} =this.state;
        if(!applyDocVO&&!decisionDocVO){
            const {baseInfo} =this.props;
            const {id} =baseInfo;
            this.setState({
                spinning:true
            });
            ajax.get(`/adjudication/amendment/${id}/info`).then((data)=>{
                const {applyDocVO,decisionDocVO}=data;
                this.setState({
                    applyDocVO,
                    decisionDocVO
                })
            }).finally(()=>{
                this.setState({
                    spinning:false
                })
            })
        }
    }
    getContent=()=>{
        const {applyDocVO,decisionDocVO,spinning,visible}=this.state;
        const {baseInfo:{id}} =this.props;
        return(<Spin spinning={spinning}  tip="加载中...">
            {applyDocVO &&  <Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)} title="裁决书补正申请书" createTime={applyDocVO.createTime} caseInfo={applyDocVO} type={7}></Book>}
            {decisionDocVO &&  <Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)} title="补正裁决书" createTime={decisionDocVO.createTime} caseInfo={decisionDocVO} type={8}></Book>}
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
    componentDidUpdate(){
        const {height} = this.state;
        const articleH = this.refs.content.scrollHeight;
        if(articleH != height){
            this.setState({
                height:articleH
            })
        }
    }
    componentDidMount(){
        const {show} = this.state;
        if(show){
            this.getCaseInfo()
        }
        const articleH = this.refs.content.scrollHeight;
        this.setState({
            height:articleH
        })
    }
    render(){
        const {baseInfo}=this.props;
        const {show,height}=this.state;
        const toogleName=classNames({
            'show':show
        });
        const style = show ?{height}:{};
        return(<section className="changeDetail">
            <header>
                <strong onClick={this.toggle}><time>{baseInfo.createTime}</time>{baseInfo.dcoName}</strong>
                <aside>
                    <em className={toogleName} onClick={this.toggle}>{baseInfo.status}</em>
                </aside>
            </header>
            <article style={style} ref="content">
                {this.getContent()}
            </article>
        </section>)
    }
}