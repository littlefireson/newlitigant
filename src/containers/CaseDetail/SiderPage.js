import React, { Component } from 'react';
import { Link,withRouter} from 'react-router-dom';
import { Card } from 'antd';
import {TimeTip} from '../../components';
import ajax from '../../utils/ajax';
@withRouter
export default class SiderPage extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId=''}}}=props;
        this.state={
            caseId,
            countDownList:[]
        }
    }
    componentDidMount(){
        const {caseId} = this.state;
        ajax.get(`/litigant/case/${caseId}/countDown`).then((countDownList)=>{
            if(countDownList){
                this.setState({
                    countDownList
                })
            }
        })
    }
    getCountDownList=()=>{
        const {countDownList} = this.state;
        if(countDownList.length>0){
            return (<div className="time-box">
                {countDownList.map((item,index)=>(<TimeTip key={index} title={item.name} duringTime={item.time}/>))}
            </div>)
        }
    }
    render(){
        const {match:{url},location,info={},progress={}} = this.props;
        const {
            applicantName="",
            applicantPhone="",
            applicantAttorney="",
            beApplicantName="",
            beApplicantPhone="",
            arbitralTribunal="",
            beApplicantAttorney="",
            secretary="",
            caseNo="",
            propAgentPhone="",
            defeAgentPhone=""
        } = info;
        const {registerCaseDate} = progress;
        return(<div>
            {this.getCountDownList()}
            <Card title="仲裁信息">
                <p>案号：{caseNo}</p>
                <p>立案时间：{registerCaseDate?registerCaseDate.split('.')[0]:'--'}</p>
                {secretary && (<p>秘书：{secretary}</p>)}
                {arbitralTribunal &&<p>仲裁庭：{arbitralTribunal}</p>}
                <footer>
                    <Link className="btn-link" to={location.pathname+'/bookshelves'}>案件相关文书</Link>
                </footer>
            </Card>
            <Card title="申请人">
                <p>{applicantName}（{applicantPhone}）</p>
            </Card>
            {
                applicantAttorney && (
                <Card title="代理人(申请方)">
                    <p>{applicantAttorney}（{propAgentPhone}）</p>
                </Card>
                )
            }
            <Card title="被申请人">
                <p>{beApplicantName}（{beApplicantPhone}）</p>
            </Card>
            {
                beApplicantAttorney && (
                    <Card title="代理人(被申请方)">
                    <p>{beApplicantAttorney}（{defeAgentPhone}）</p>
                    </Card>
                )
            }

        </div>)
    }
}