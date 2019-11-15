import React, {Component} from 'react'
import {Button,Alert} from 'antd'
import {userChange} from '../../../actions'
import ajax from '../../../utils/ajax'

export default class TransferVerify extends Component{
    constructor(props){
        super(props);
        this.state={
            account:'',
            amount:'',
            accountName:'',
            accountBank:'',
            remark:'',
            signAmount:'',
            signAccount:'',
            signAccountName:'',
            signAccountBank:'',
            signRemark:'',
        }
    }
    handelRefresh=()=>{
        // ajax({
        //     url:'/api/sys/user/updateEnterprisePayStatus',
        //     method:Post
        // }).then(()=>{

        // })
        
        this.props.getStatus();
    };
    alertMessage=()=>{
        const {userInfo:{realAuth}} = this.props;
        if(realAuth == 0){
            <Alert message="请继续进行打款验证" type="warning" showIcon/>
        }
    }
    componentWillReceiveProps(props){
        const {account,amount,accountName,accountBank,remark, signAmount, signAccount, signAccountName,signAccountBank,signRemark} = props;
        this.setState({
            account,
            amount,
            accountName,
            accountBank,
            remark,
            signAmount,
            signAccount,
            signAccountName,
            signAccountBank,
            signRemark
        })
    }
    render(){
        this.alertMessage();
        const {account,amount,accountName,accountBank,remark,signAmount,signAccount,signAccountName,signAccountBank,signRemark} =this.state;
        return (
            <div>
                <h2 className="transfer-verify-title">请用工商登记的公司基本户打款认证</h2>
                <div className="transfer-verify-text">
                    <p className="ant-row"><label className="ant-col-5">验证金额</label><span className="ant-col-18">{amount}</span></p>
                    <p className="ant-row"><label className="ant-col-5">收款名</label><span className="ant-col-18">{accountName}</span></p>
                    <p className="ant-row"><label className="ant-col-5">收款账号</label><span className="ant-col-18">{account}</span></p>
                    <p className="ant-row"><label className="ant-col-5">开户行</label><span className="ant-col-18">{accountBank}</span></p>
                    <p className="ant-row"><label className="ant-col-5">备注信息</label><span className="ant-col-18">{remark}</span></p>
                </div>
               
                <div className="personal-center-content-btn-box">
                    <Button onClick={this.handelRefresh} type="primary">已缴费，刷新状态</Button>
                </div>
            </div>
        )
    }
}