import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Timeline,Button,Spin} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import {BlankPage} from "../../components";

@withRouter
export default class AddCorrection extends Component{
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
        ajax.get(`adjudication/amendment/${caseId}/list`).then((data)=>{
            const requestList = data;
            this.setState({
                requestList,
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
            return(<Timeline>
                { requestList.map((item,index)=> {
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