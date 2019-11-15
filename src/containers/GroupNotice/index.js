import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Timeline,Button,Spin} from 'antd';
import ChangeDetail from "./ChangeDetail";
import ajax from "../../utils/ajax";
import {BlankPage} from "../../components";
@connect((state)=>({
    litigantType: state.litigantType
}))
@withRouter
export default class GroupNotice extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            groupInfo:null
        }
    }
    componentDidMount(){
        const {match:{params:{caseId}},litigantType} = this.props;
        ajax.post(`/public/case/${caseId}/groupNotice`,{caseId}).then((data)=>{
            const groupInfo = data;
            this.setState({
                groupInfo
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    getList=()=>{
        const {groupInfo,spinning} =this.state;
        if(groupInfo){
            return(
                <ChangeDetail baseInfo={groupInfo}/>
            )
        }else{
            if(!spinning){
                return (<BlankPage/>)
            }
        }
    }
    render(){
        const {spinning} =this.state;
        return(<section className="changeApply adjudication borderNone">
            <Spin spinning={spinning} tip="加载中...">
                {this.getList()}
            </Spin>
        </section>)
    }
}