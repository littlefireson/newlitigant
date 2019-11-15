import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Timeline,Button,Spin} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import {BlankPage} from "../../components";

@withRouter
export default class BreakOff extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            requestList:[],
        }
    }
    componentDidMount(){
        const {match:{params:{caseId}}} = this.props;
        this.setState({
            spinning:true
        })
        ajax.get(`/litigant/case/${caseId}/breakOffInfo`).then((data)=>{
            let {applyDocs,decisionVO} = data;
            let requestList = [];
            if(applyDocs){
                applyDocs.map((item,index)=>{
                    item.title = '中止申请书';
                    item.type = 6;
                    requestList.push(item)
                })
            }
            if(decisionVO){
                decisionVO.title = '中止决定书';
                decisionVO.type = 9;
                requestList.push(decisionVO);
            }
            this.setState({
                requestList,
                spinning:false
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    getList=()=>{
        const {requestList,spinning} =this.state;
        if(requestList.length>0){
            let lastIndex = requestList.length;
            return(<Timeline>
                { requestList.map((item,index)=> {
                    if(item.status == '审核中'){
                        lastIndex = requestList.length-1;
                    }
                    const show = index == 0;
                    return (<Timeline.Item key={index}>
                        <ChangeDetail show={show} baseInfo={item} />
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
        return(<section className="changeApply">
            <Spin spinning={spinning} tip="加载中...">
                {this.getList()}
            </Spin>
        </section>)
    }
}