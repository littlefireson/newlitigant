import React, {Component} from 'react'
import { Icon, Form, Input, Button, Radio, Upload, message,Spin } from 'antd'
import {userChange} from '../../../actions'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import ajax from '../../../utils/ajax'

import NaturalInfo from './NaturalInfo'
import LegalInfo from './LegalInfo'
import Personal from './Personal'
import TransferVerify from '../TransferVerify/index'
import SecondTransferVerify from '../TransferVerify/second'
 export default class IdentifyInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            checkStatus:'0',
            loading:false,
            account:'',
            amount:'',
            status:'',
            accountName:'',
            accountBank:'',
            remark:'',
            signAccount:'',
            signAmount:'',
            signAccountName:'',
            signAccountBank:'',
            signRemark:''
        };
    }
    setInfo=()=>{
        if(this.props.userInfo.type == 1){
            this.getStatus()
        }else{
            this.setState({
                loading:false
            })
        }
    }
    checkInfo=()=>{
        this.setState({
            status:0
        })
    }
    getDom=()=>{
        const {type} = this.props.userInfo || {type:0};
        const {account,amount,accountName,accountBank,remark,signAmount,signAccount,signAccountName,signAccountBank,signRemark} = this.state;
        const {status} = this.state;
        let nowIndex = 0;
        const domList = {
            0:<NaturalInfo {...this.props}/>,
            1:<LegalInfo {...this.props} getStatus={this.getStatus}/>,
            // 2:<Personal {...this.props} getStatus={this.getStatus}/>,
            2:<TransferVerify userInfo={this.props.userInfo} {...this.props} getStatus={this.getStatus} accountName={accountName}
            accountBank={accountBank}
            remark ={remark} account={account} amount={amount} signAccountName={signAccountName}
            signAccountBank={signAccountBank}
            signRemark ={signRemark} signAccount={signAccount} signAmount={signAmount} />,
            4:<div className="show-status-wrapper">
                  <Icon className="icon-error" type="close-circle-o" />
                  <p>抱歉，审核失败，请重新填写认证信息</p>
                  <Button type="primary" onClick={this.checkInfo}>确定</Button>
              </div>
        };
        if(status == 0){
            nowIndex = type*1;
        }else{
            nowIndex = status*1+1;
        }
        return domList[nowIndex];
    };
    getStatus=()=>{
        this.setState({
            loading:true
        })
        // 获取审核状态
        ajax({
            url:'/sys/user/enterpriseAuthStatus',
            method:'get'
        }).then((data)=>{
            const {account,amount,status,accountName,accountBank,remark,payStatus,signAmount,signAccount,signAccountName,signAccountBank,signRemark} = data;
            this.setState({
                checkStatus:data.status,
                status,
                account,
                amount,
                accountName,
                accountBank,
                remark,
                signAmount,
                signAccount,
                signAccountName,
                signAccountBank,
                signRemark,
                payStatus
            });
            if(data.status == 2){
                let {userInfo} = this.props;
                userInfo.verifyStatus = 0;
                this.props.dispatch(userChange(userInfo));
                this.props.history.push('/personal/1');
            }
        }).finally(()=>{
            this.setState({
                loading:false
            })
        });
    }
    componentDidMount(){
        this.setInfo();
    }
    render(){
        const {type} = this.props.userInfo || 0;
        const {checkStatus} = this.state;
        return (
            <div className="personal-center-content ant-col-20">
                {type==0 && checkStatus == "0"?<div className="personal-center-content-head">
                    <p>实名认证需提交身份信息进行审核</p>
                    {/* <p>银行卡号的银行预留手机号需与注册手机号保持一致</p> */}
                </div>:''}
                {type==1 && checkStatus == "0"?<div className="personal-center-content-head-legal">
                    <h2><Icon type="info-circle-o" />企业或组织认证需要提供的材料：</h2>
                    <p>1.公司相关信息</p>
                    <p>2.公司三证合一的营业执照/营业执照彩色照片</p>
                    <p>3.企业信用信息公示报告，请登录“国家信用信息公示系统”将您申请的企业的公示报告发送到邮箱，并上传至仲裁平台</p>
                    {/* <Button type="primary"><a href="https://www.e-arbitral.org.cn/api-core-service/api/public/file/downloads?id=201806290951650046844616.doc">下载授权书</a></Button> */}
                </div>:''}
                {type==2 && checkStatus == "0"?<div className="personal-center-content-head-legal">
                    <h2><Icon type="info-circle-o" />个体工商户需要提供的材料：</h2>
                    <p>1.公司相关信息</p>
                    <p>2.营业执照彩色照片</p>
                    <p>3.企业信用信息公示报告，请登录“国家信用信息公示系统”将您申请的企业的公示报告发送到邮箱，并上传至仲裁平台</p>
                    {/* <Button type="primary"><a href="https://www.e-arbitral.org.cn/api-core-service/api/public/file/downloads?id=201806290951650046844616.doc">下载授权书</a></Button> */}
                </div>:''}
                <div className="personal-center-content-main">
                    <Spin spinning={this.state.loading}>
                        {this.getDom()}
                    </Spin>
                </div>
            </div>
        )
    }
}