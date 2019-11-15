import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Table,Spin,Icon,Modal,Button} from 'antd';
import classNames from 'classnames';
import {Book} from '../../components'
import ajax from "../../utils/ajax";
const ButtonGroup = Button.Group;

@withRouter
@connect(state=>({
    userInfo:state.userInfo
}))
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
            messageH:""
        }
    }
    static defaultProps={
        baseInfo:{
            dcoName:'',
            createTime:'',
            changeId:null
        },
    }
    getFrameHeight=(v)=>{
        this.setState({
            messageH:v
        })
    }
    getCaseInfo=()=>{
        const {caseId,caseInfo} =this.state;
        if(!caseInfo){
            const {baseInfo} =this.props;
            this.setState({
                caseInfo:baseInfo
            })
        }
    }
    getContent=()=>{
        const {caseInfo,spinning}=this.state;
        return(<Spin spinning={spinning}  tip="加载中...">
            {caseInfo &&  <Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)}  title={caseInfo.title} caseInfo={caseInfo} type={caseInfo.type}></Book>}
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
                <strong onClick={this.toggle}><time>{baseInfo.createTime}</time>{baseInfo.title}</strong>
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