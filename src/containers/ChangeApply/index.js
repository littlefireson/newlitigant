import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Timeline,Button,Spin,Tabs,Modal,message} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import cache from '../../utils/cache';
import {BlankPage,AsyncComponent} from "../../components";
const Counterclaim = AsyncComponent(() => import(/* webpackChunkName: "counterclaim" */ '../Counterclaim'));
const GroupNotice = AsyncComponent(() => import(/* webpackChunkName: "groupNotice" */ '../GroupNotice'));

const TabPane = Tabs.TabPane;

@withRouter
export default class ChangeApply extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            requestList:[],
            changeReplyButton:{},
            replyButton:{},
            giveUpShow:false,
            changeId:''
        }
    }
    componentDidMount(){
        const {match:{params:{caseId}}} = this.props;
        this.setState({
            spinning:true
        })
        ajax.get(`/litigant/case/${caseId}/request`).then((data)=>{
            const {changeReplyButton,replyButton,requestVO} = data;
            this.setState({
                requestList:requestVO,
                changeReplyButton,
                replyButton
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    giveUpApply=()=>{
        let {changeReplyButton,replyButton,changeId} =this.state;
        const {location,history,match:{params:{caseId}}}=this.props;
        const type=changeId?1:0;
        ajax({
            url:`case/flow/${caseId}/giveReply`,
            method:'post',
            data:{
                caseId,
            }
        }).then(()=>{
            this.setState({
                giveUpShow:false
            })

            if(type===1){
                changeReplyButton.dropBtn=false;
                changeReplyButton.replyBtn=false;
                this.setState({
                    changeReplyButton
                })
            }else{
                replyButton.dropBtn=false;
                replyButton.replyBtn=false;
                this.setState({
                    replyButton
                })
            }
            message.success('放弃答辩成功！');
        })
    }
    showGiveUp = (changeId)=>{
        this.setState({
            giveUpShow:true,
            changeId:changeId
        })
    }
    closeGiveUpShow=()=>{
        this.setState({
            giveUpShow:false
        })
    };
    getList=()=>{
        const {requestList,spinning,changeReplyButton,replyButton,giveUpShow} =this.state;
        if(requestList.length>0){
            return(<Timeline>
                { requestList.map((item,index)=> {
                    const show = index == 0;
                    const showBtns = index == 0 || (index+1) == requestList.length;
                    return (<Timeline.Item key={index}>
                        <ChangeDetail show={show} showBtns={showBtns}  baseInfo={item} changeReplyButton={changeReplyButton} replyButton={replyButton} showGiveUp={this.showGiveUp} giveUpApply={this.giveUpApply}/>
                        <Modal
                            visible={giveUpShow}
                            title="是否放弃答辩"
                            width="20%"
                            className="calculate-cost-table"
                            onOk={this.giveUpApply}
                            onCancel={this.closeGiveUpShow}
                        >
                            放弃答辩后将不可以再次答辩，是否确认放弃答辩？
                        </Modal>
                    </Timeline.Item>)
                })
                }
            </Timeline>)
        }else{
            if(!spinning){
                return (<BlankPage/>)
            }
        }
    }
    tabClick=(key)=>{
        //console.log(key);
    }
    render(){
        const {spinning} =this.state;
        const tabList = JSON.parse(cache.getItem('tabList'));
        return(
            <Spin spinning={spinning} tip="加载中...">
                {<section className="question quote">
                    <Tabs onTabClick={this.tabClick}>
                        {(tabList[1]&&tabList[1].tabFlag)&&<TabPane tab={<span>{tabList[1].remaindFlag&&<b className="red-point"></b>}本请求</span>} key={2}>
                            <section className="changeApply borderNone">
                                {this.getList()}
                            </section>
                        </TabPane>}
                        {(tabList[2]&&tabList[2].tabFlag)&&<TabPane tab={<span>{tabList[2].remaindFlag&&<b className="red-point"></b>}组庭通知书</span>} key={3}>
                            <GroupNotice/>
                        </TabPane>}
                        {(tabList[3]&&tabList[3].tabFlag)&&<TabPane tab={<span>{tabList[3].remaindFlag&&<b className="red-point"></b>}反请求</span>} key={4}>
                            <Counterclaim/>
                        </TabPane>}
                    </Tabs>
                </section>}
            </Spin>)
    }
}