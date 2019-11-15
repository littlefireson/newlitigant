import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Button } from 'antd'
import ApplySteps from '../ApplySteps'

import ajax from '../../../../utils/ajax'

@withRouter
export default class ApplyThird extends Component{
    state={
        status:0,
        reason:''
    }
    goModify =()=> {
        const {history,match} = this.props;
        const {id} = match.params;
        history.push(`/myCase/apply/first/${id}/true`);
    };
    goApply =()=> {
        const {history} = this.props;
        history.push(`/myCase`);
    }
    componentDidMount(){
        const {fail='true',id} = this.props.match.params;
        if(fail=="true"){
            ajax.post(`public/case/${id}/caseFail`,{caseId:id}).then((data)=>{
                const {status,reason} = data;
                this.setState({
                    status,
                    reason
                })
            })
        }
    }
    render(){
        const {fail='true'} = this.props.match.params;
        const {status,reason} = this.state;
        return (
            <div className="my-case-third ant-row">
                <ApplySteps step={2}/>
                <section className="my-case-third-item ant-col-18 ant-col-offset-3">
                    {fail=="false"?<div className="my-case-third-item-examining">
                        <img src={require("../../../../assets/images/examining.png")} alt=""/>
                        <p>案件正在审核中，请稍后查看进度</p>
                    </div>:
                    <div className="my-case-third-item-examine-fail clearfix">
                        <img src={require("../../../../assets/images/examine-fail.png")} alt=""/>
                        <div className="my-case-third-item-examine-fail-content">
                            <h3>审核未通过</h3>
                            <p>{reason}</p>
                            <Button onClick={this.goModify} type="primary">修改申请资料</Button>
                        </div>
                    </div>}
                </section>
            </div>
        )
    }
}