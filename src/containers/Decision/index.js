import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Timeline,Button,Spin} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import {BlankPage} from "../../components";
@withRouter
export default class Decision extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            decisionInfo:null
        }
    }
    componentDidMount(){
        const {match:{params:{caseId}}} = this.props;
        this.setState({
            spinning:true
        })
        ajax.post(`/case/withdraw/${caseId}/decision`,{caseId}).then((data)=>{
            const decisionInfo = data;
            this.setState({
                decisionInfo
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    getList=()=>{
        const {decisionInfo,spinning} =this.state;
        if(decisionInfo){
            return(
                <ChangeDetail baseInfo={decisionInfo} />
            )
        }else{
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