import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import {Chat} from '../../components';
import ajax from '../../utils/ajax'
import cache from '../../utils/cache'
@withRouter
export default class Debate extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:true,
            chatList:[],
            time:10000,
            disabled:false
        }
    }
    getCaseId=()=>{
        const {match:{params:{caseId}}} = this.props;
        ajax.get(`/case/argue/${caseId}`).then((chatList)=>{
            if(chatList.length>0){
                this.setState({
                    chatList
                })
            }
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    setTimer=()=>{
        const {time} = this.state;
        if(!this.timer){
            clearInterval(this.timer)
        }
        this.timer = setInterval(this.getCaseId,time)
    }
    componentDidMount(){
        const {validFlag} = JSON.parse(cache.getItem('commInfo'));
        this.setState({
            disabled:validFlag
        })
        this.getCaseId();
        this.setTimer()
    }
    componentWillReceiveProps(nextProps){
        const {location:{pathname}} = nextProps;
        if(pathname.indexOf('debate')!=-1){
            this.getCaseId();
            this.setTimer();
        }else{
            if(this.timer){
                clearInterval(this.timer);
            }
        }
    }
    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
    sendMsg=(content)=>{
        const {match:{params:{caseId}}} = this.props;
        this.setState({
            spinning:true
        });
        return ajax.post(`/case/argue`,{
            caseId,
            content
        }).then((chatList)=>{
            this.setState({
                chatList
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            });
        })
    }
    render(){
        const {spinning,chatList,disabled}=this.state;
        return (<section className="compromise">
            <Spin tip="正在加载..." spinning={spinning}>
                <Chat debateFlag={true} chatList={chatList} sendMsg={this.sendMsg} disabled={disabled}></Chat>
            </Spin>
        </section>)
    }
}