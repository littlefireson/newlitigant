import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Timeline,Button,Spin} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import {BlankPage} from "../../components";
@withRouter
export default class Mediate extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            agreeBtn:false,
            refuseBtn:false,
            adjInfo:null
        }
    }
    componentDidMount(){
        const {match:{params:{caseId}}} = this.props;
        this.setState({
            spinning:true
        })
        ajax.get(`/litigant/case/${caseId}/adjustmentDoc`).then((data)=>{
            const {adjustmentDocVO,agreeBtn,refuseBtn} = data;
            this.setState({
                agreeBtn,
                refuseBtn,
                adjInfo:adjustmentDocVO
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    getList=()=>{
        const {adjInfo,agreeBtn,refuseBtn,spinning} =this.state;
        if(adjInfo){
            return(
                <ChangeDetail baseInfo={adjInfo} agreeBtn={agreeBtn} refuseBtn={refuseBtn} />
            )
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
        return(<section className="changeApply adjudication">
            <Spin spinning={spinning} tip="加载中...">
                {this.getList()}
            </Spin>
        </section>)
    }
}