import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter,Link} from 'react-router-dom'
import { Progress, Icon, Table, Button,Modal } from 'antd'
import {userChange} from '../../actions'
import ajax from '../../utils/ajax'
import cache from '../../utils/cache'

import HomeSteps from './HomeSteps'
import HomeTimeLine from './HomeTimeLine'
import HomeTable from './HomeTable'
const confirm = Modal.confirm;

@connect(state=>({
    userInfo:state.userInfo
}))
@withRouter
export default class Home extends Component{
    state = {
        agentedCaseCount:0,
        agentingCaseCount:0,
        beApplicantCount:0,
        passCount:0,
        waitAuditCount:0,
        messages:null
    }
    applyCase=()=>{
        const {userInfo,history} = this.props;
        if(userInfo.verifyStatus == '1'||userInfo.realAuth == '0'){
            confirm({
                title: '',
                content: '您还未进行身份认证',
                okText: '去认证',
                cancelText: '取消',
                onOk() {
                    history.push('/personal');
                },
                onCancel() {

                }
            })
        }else{
            history.push('/myCase/apply');
        }
    };
    acceptAgent=()=>{
        const {userInfo,history} = this.props;
        if(userInfo.verifyStatus == '1'||userInfo.realAuth == '0'){
            confirm({
                title: '',
                content: '您还未进行身份认证',
                okText: '去认证',
                cancelText: '取消',
                onOk() {
                    history.push('/personal');
                },
                onCancel() {

                }
            })
        }else{
            history.push('/myCase/accept');
        }
    }
    getRole=()=>{
        let {userInfo,history,dispatch,match,location} = this.props;
        if(match.params.role){
            switch(match.params.role){
                case '0':
                    if(userInfo.role != '0'){
                        ajax({
                            url:'/sys/user/changeRole',
                            method:'post',
                            data:{
                                role:'0'
                            }
                        }).then(()=>{
                            userInfo.role='0';
                            dispatch(userChange(userInfo));
                            this.getHomeCount();
                            this.getMessage(1,3);
                        })
                    }
                    break;
                case '1':
                    if(userInfo.role != '1'){
                        ajax({
                            url:'/sys/user/changeRole',
                            method:'post',
                            data:{
                                role:'1'
                            }
                        }).catch(()=>{
                            return
                        })
                        userInfo.role='1';
                        dispatch(userChange(userInfo));
                    }
                    history.push('/myCase');
                    break;
                case '2':
                    if(userInfo.role != '2'){
                        ajax({
                            url:'/sys/user/changeRole',
                            method:'post',
                            data:{
                                role:'2'
                            }
                        }).then(()=>{
                            userInfo.role='2';
                            dispatch(userChange(userInfo));
                            this.getHomeCount();
                            this.getMessage(1,3);
                        })
                    }
                    break;
            }
        }
    }
    getMessage=(pageNum,pageSize)=>{
        // console.log('pageNum:'+pageNum+',pageSize:'+pageSize);
        ajax.get('common/message/litigantList',{
            params:{
                pageNum,
                pageSize
            }
        }).then((data)=>{
            this.setState({
                messages:data.list.list
            })
        })
    };
    getHomeCount=()=>{
        ajax.get('litigant/case/homeCount',{}).then((data)=>{
            this.setState({
                ...data
            })
        });
    }
    componentDidMount(){
        this.getHomeCount();
        this.getMessage(1,3);
    }
    render(){
        const {userInfo} = this.props;
        const {agentedCaseCount,agentingCaseCount,beApplicantCount,passCount,waitAuditCount,messages} = this.state;
        this.getRole();
        return (
            <section className="home ant-row-layout">
                <div className="home-box ant-col-24 clearfix">
                    <div className="home-cases ant-col-14">
                        <section className="clearfix">
                            <div className="home-cases-left ant-col-12">
                                {/* <Progress width={42} type="circle" strokeWidth={20} percent={50} showInfo={false}/> */}
                                <ul className="home-cases-list">
                                    <li><i></i><span>待审核案件 :</span><b>{waitAuditCount}</b></li>
                                    <li><i></i><span>已审核通过案件 :</span><b>{passCount}</b></li>
                                </ul>
                            </div>
                            <div className="home-cases-right ant-col-12">
                                {/* <Progress width={42} type="circle" strokeWidth={20} percent={50} showInfo={false}/> */}
                                <ul className="home-cases-list">
                                    <li><i></i><span>被申请案件 :</span><b>{beApplicantCount}</b></li>
                                    <li><i></i><span>已代理案件 :</span><b>{agentedCaseCount}</b></li>
                                </ul>
                            </div>
                            {/* <Icon type="question-circle-o" /> */}
                        </section>
                        <footer>
                            <div className="home-cases-agent">
                                <span>代理中案件 :</span><b>{agentingCaseCount}</b>
                                {userInfo.role==0 && <a onClick={this.applyCase}>申请立案</a>}
                                {userInfo.role==2 && <a onClick={this.applyCase}>代理立案</a>}
                                {userInfo.role==2 && <a onClick={this.acceptAgent}>代理受理</a>}
                            </div>
                        </footer>
                    </div>
                    <div className="home-messages ant-col-10">
                        <div className="home-messages-title">
                            <span>消息</span>
                            <Link to="/personal/3">查看更多</Link>
                        </div>
                        <div className="home-messages-content">
                            {messages && messages.length ? messages.map((item,index)=>(<p key={index} title={item.messageBody}>{item.createTime} {item.messageBody}</p>)):<p className="text-center">暂无消息</p>}
                        </div>
                    </div>
                </div>
                <div className="home-box ant-col-24 clearfix">
                    <HomeSteps/>
                    <HomeTimeLine/>
                </div>
            </section>
        )
    }
}
