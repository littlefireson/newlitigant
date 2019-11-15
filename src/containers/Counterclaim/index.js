import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Timeline,Button,Spin,Modal,message} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import {BlankPage} from "../../components";

@withRouter
export default class Counterclaim extends Component{
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
        ajax.get(`/litigant/case/back/${caseId}/request`).then((data)=>{
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
        this.setState({
            giveUpShow:false
        })

        let {changeReplyButton,replyButton,changeId} =this.state;
        const {location,history,match:{params:{caseId}}}=this.props;
        const type=changeId?1:0;
        ajax({
            url:`case/flow/${caseId}/giveReply`,
            method:'post',
            params:{
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
    };
    closeGiveUpShow=()=>{
        this.setState({
            giveUpShow:false
        })
    };
    getList=()=>{
        const {requestList,spinning,changeReplyButton,replyButton,giveUpShow} =this.state;
        if(requestList.length>0){
            let lastIndex = requestList.length;
            return(<Timeline>
                { requestList.map((item,index)=> {
                    if(item.status == '审核中'){
                        lastIndex = requestList.length-1;                   
                    }
                    const show = index == 0;
                    const showBtns = index == 0 || (index+1) == lastIndex;
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
    render(){
        const {spinning} = this.state;
        return(<section className="changeApply borderNone">
            <Spin spinning={spinning} tip="加载中...">
                {this.getList()}
            </Spin>
        </section>)
    }
}