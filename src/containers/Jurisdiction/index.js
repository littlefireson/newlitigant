import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Timeline,Button,Spin} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import {BlankPage} from "../../components";

@withRouter
@connect((state)=>({
    litigantType: state.litigantType
}))
export default class Jurisdiction extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            requestList:[],
            feedbackBtn:false
        }
    }
    componentDidMount(){
        const {match:{params:{caseId}}} = this.props;
        this.setState({
            spinning:true
        })
        ajax.get(`/litigant/case/${caseId}/getJurisInfo`).then((data)=>{
            let {feedbackBtn,applyDocVO,feedbackDocVO,decisionDocVO} = data;
            let requestList = [];
            if(applyDocVO){
                // console.log(applyDocVO);
                applyDocVO.type=1;
                applyDocVO.requestItem = applyDocVO.requset;
                applyDocVO.factReason = applyDocVO.reasonFact;
                applyDocVO.feedbackBtn = feedbackBtn;
                requestList.push(applyDocVO);
            }
            if(feedbackDocVO){
                feedbackDocVO.type=3;
                requestList.push(feedbackDocVO);
            }
            if(decisionDocVO){
                decisionDocVO.type=10;
                requestList.push(decisionDocVO);
            }
            this.setState({
                requestList
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    getList=()=>{
        const {requestList,spinning} =this.state;
        if(requestList&&requestList.length>0){
            return(<Timeline>
                { requestList.map((item,index)=> {
                    const show = index == 0;
                    const showBtns = index == 0 || (index+1) == requestList.length;
                    return (<Timeline.Item key={index}>
                        <ChangeDetail show={show} showBtns={showBtns}  baseInfo={item} />
                    </Timeline.Item>)
                })
                }
            </Timeline>)
        }
        // else if(){}
        else{
            if(!spinning){
                return (<BlankPage/>)
            }
        }
    }
    render(){
        const {spinning} =this.state;
        return(<section className="changeApply">
            <Spin spinning={spinning} tip="加载中...">
                {this.getList()}
            </Spin>
        </section>)
    }
}