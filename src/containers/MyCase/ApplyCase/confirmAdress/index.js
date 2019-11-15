import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import { Checkbox ,Button,message} from "antd";
import ajax from '../../../../utils/ajax';
import cache from '../../../../utils/cache';
import {  } from '../../../../reduces/message';

@withRouter
export default class confirmAdress extends Component{
    constructor(props){
        super(props);
        const {match:{params:{id}}} = props;
        this.state={
            info:'',
            checked:false,
            disabled:true,
            commInfo:{

            },
            baseInfo:{

            },
            agentUserInfo:{

            }
        }
        
    }
    componentDidMount(){ 
        ajax.get(`/person/center/getBaseInfo`).then((commInfo)=>{
           this.setState({
               info:commInfo
           })
        })
        const {match:{params:{id}}} = this.props;
        if(id){
            
            ajax.get(`/litigant/case/${id}/commInfo`).then((commInfo)=>{
                this.setState({
                    commInfo
                })
                cache.setItem('commInfo',JSON.stringify(commInfo));
                return commInfo
            }).then((commInfo)=>{
                if(commInfo.litigantType == "3"||commInfo.litigantType == "4"){
                    ajax.post(`/litigant/case/agentUserInfo?caseId=${id}`).then((data)=>{
                        this.setState({
                            agentUserInfo:data
                        })
                    })
                }
            })
            ajax.get(`/litigant/case/${id}/caseInfo`).then((body)=>{
                const {baseInfo} = body;
                this.setState({
                    baseInfo
                })
                cache.setItem('baseInfo',JSON.stringify(baseInfo));
            })
        }
    }
    onChange = (e) => {
        this.setState((prevState, props) => ({
            checked: e.target.checked,
            disabled: !prevState.disabled,
        }));
    }
    submit = ()=>{
        const {match:{params:{id}}} = this.props;
        if(this.state.checked){
            console.log(id)
            ajax.post(`/litigant/case/confirmAddress?caseId=${id}`,{
                caseId:id,
            }).then(()=>{
                const {history}=this.props;
                message.success(`已确认送达地址`);
                history.push(`/myCase/caseDetail/${id}`);
            })
            
        }
    }
    edit = ()=>{
        const {history}=this.props;
        history.push('/personal/1');
    }
    render(){
        const {info,commInfo,baseInfo,agentUserInfo} = this.state;
        const {caseNo} = commInfo.info || '';
        const {litigantType} = commInfo || '';
        const {
            defendant={},
            proposer={},
            caseType='',
        } = baseInfo || '';
        let adressUl;
        if(litigantType === '0'){
            adressUl = (<div className="my-case-adress-contact">
            <div className="my-case-adress-contact">
                <li className="payment-notice-list-item">
                    <span><label>受送达人姓名：</label><b>{info.name}</b></span>
                </li>
            </div>
            {info.userName==proposer.phone?
            <div className="my-case-adress-contact">
                <li className="payment-notice-list-item">
                    <span><label>联系电话：</label><b>{info.userName}</b></span>
                </li>
            </div>:
            <div className="my-case-adress-contact">
                <li className="payment-notice-list-item">
                    <span><label>联系电话1：</label><b>{info.userName}</b></span>
                </li>
                <li className="payment-notice-list-item">
                    <span><label>联系电话2：</label><b>{proposer.phone!=null?proposer.phone:"--"}</b><b className="my-case-adress-remark">{proposer.phone!=null?"(合同约定的联系电话，不可更改)":""}</b></span>
                </li>
            </div>}
            <div className="my-case-adress-contact">
                <li className="payment-notice-list-item">
                <span><label>送达地址：</label><b>{info.address}</b></span>
                </li>
            </div>
            {info.email==proposer.mail?
            <div className="my-case-adress-contact">
                <li className="payment-notice-list-item">
                    <span><label>电子邮箱：</label><b>{info.email}</b></span>
                </li>
            </div>:
            <div className="my-case-adress-contact">
                <li className="payment-notice-list-item">
                    <span><label>电子邮箱1：</label><b>{info.email}</b></span>
                </li>
                <li className="payment-notice-list-item">
                    <span><label>电子邮箱2：</label><b>{proposer.mail!=null?proposer.mail:"--"}</b><b className="my-case-adress-remark">{proposer.mail!=null?"(合同约定的邮箱，不可更改)":""}</b></span>
                </li>
            </div>}
        </div>)
        }else if(litigantType === '1'){
            adressUl = (
                <div className="my-case-adress-contact">
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>受送达人姓名：</label><b>{info.name}</b></span>
                        </li>
                    </div>
                    {info.userName==defendant.phone?
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>联系电话：</label><b>{info.userName}</b></span>
                        </li>
                    </div>:
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>联系电话1：</label><b>{info.userName}</b></span>
                        </li>
                        <li className="payment-notice-list-item">
                            <span><label>联系电话2：</label><b>{defendant.phone!=null?defendant.phone:"--"}</b><b className="my-case-adress-remark">{defendant.phone!=null?"(合同约定的联系电话，不可更改)":""}</b></span>
                        </li>
                    </div>}
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                        <span><label>送达地址：</label><b>{info.address}</b></span>
                        </li>
                    </div>
                    {info.email==defendant.mail?
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱：</label><b>{info.email}</b></span>
                        </li>
                    </div>:
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱1：</label><b>{info.email}</b></span>
                        </li>
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱2：</label><b>{defendant.mail!=null?defendant.mail:"--"}</b><b className="my-case-adress-remark">{defendant.mail!=null?"(合同约定的邮箱，不可更改)":""}</b></span>
                        </li>
                    </div>}
                </div>
            )
        }
        else if(litigantType === '3'){
            adressUl = (
                <div className="my-case-adress-contact">
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>受送达人姓名：</label><b>{agentUserInfo.applicantName}</b></span>
                        </li>
                    </div>
                    {agentUserInfo.applicantPhone==proposer.phone?
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>联系电话：</label><b>{agentUserInfo.applicantPhone}</b></span>
                        </li>
                    </div>:
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>联系电话1：</label><b>{agentUserInfo.applicantPhone}</b></span>
                        </li>
                        <li className="payment-notice-list-item">
                            <span><label>联系电话2：</label><b>{proposer.phone!=null?proposer.phone:"--"}</b><b className="my-case-adress-remark">{proposer.phone!=null?"(合同约定的联系电话，不可更改)":""}</b></span>
                        </li>
                    </div>}
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>送达地址：</label><b>{agentUserInfo.applicantAddress}</b></span>
                        </li>
                    </div>
                    {agentUserInfo.applicantEmail==proposer.mail?
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱：</label><b>{agentUserInfo.applicantEmail}</b></span>
                        </li>
                    </div>:
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱1：</label><b>{agentUserInfo.applicantEmail}</b></span>
                        </li>
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱2：</label><b>{proposer.mail!=null?proposer.mail:"--"}</b><b className="my-case-adress-remark">{proposer.mail!=null?"(合同约定的邮箱，不可更改)":""}</b></span>
                        </li>
                    </div>}
                </div>)
        }
        else if(litigantType === '4'){
            adressUl = (
                <div className="my-case-adress-contact">
                     <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>受送达人姓名：</label><b>{agentUserInfo.applicantName}</b></span>
                        </li>
                    </div>
                    {agentUserInfo.applicantPhone==defendant.phone?
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>联系电话：</label><b>{agentUserInfo.applicantPhone}</b></span>
                        </li>
                    </div>:
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>联系电话1：</label><b>{agentUserInfo.applicantPhone}</b></span>
                        </li>
                        <li className="payment-notice-list-item">
                            <span><label>联系电话2：</label><b>{defendant.phone!=null?defendant.phone:"--"}</b><b className="my-case-adress-remark">{defendant.phone!=null?"(合同约定的联系电话，不可更改)":""}</b></span>
                        </li>
                    </div>}
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>送达地址：</label><b>{agentUserInfo.applicantAddress}</b></span>
                        </li>
                    </div>
                    {agentUserInfo.applicantEmail==defendant.mail?
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱：</label><b>{agentUserInfo.applicantEmail}</b></span>
                        </li>
                    </div>:
                    <div className="my-case-adress-contact">
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱1：</label><b>{agentUserInfo.applicantEmail}</b></span>
                        </li>
                        <li className="payment-notice-list-item">
                            <span><label>电子邮箱2：</label><b>{defendant.mail!=null?defendant.mail:"--"}</b><b className="my-case-adress-remark">{defendant.mail!=null?"(合同约定的邮箱，不可更改)":""}</b></span>
                        </li>
                    </div>}
                </div>)
        }
        return(
            <div className='my-case ant-row-layout clearfix'>
                <section className="my-case-fourth-item ant-col-18 ant-col-offset-3 payment-notice">
                    <div className='className="payment-notice-wrapper'>
                        <div className="">
                            <div className="payment-notice-head">
                                <h3 className="payment-notice-head-title"><span>送达地址确认书</span></h3>
                            </div>
                            <ul className="payment-notice-list">
                                
                                <li className="payment-notice-list-item">
                                    <span><label>案号：</label><b>{caseNo}</b></span>
                                    
                                </li>
                                <li className="payment-notice-list-item">
                                    <span><label>案由：</label><b>{caseType}</b></span>
                                </li>
                                {adressUl}
                                <li className="payment-notice-list-item my-case-adress-matters">
                                    <span>
                                        <label>告知事项：</label>
                                    <b><br/>1.为便于当事人及时收到仲裁文书，保证仲裁程序顺利进行，当事人应当如实提供确切的送达地址；
                                    <br/>2.仲裁期间如果送达地址有变更，应当及时告知本委变更后的送达地址；
                                    <br/>3.如果提供的地址不准确、送达地址发生变更而未及时告知，以及当事人本人或者指定的代收人拒绝签收，导致仲裁文书未能被实际接收的，文书退回之日视为送达之日；
                                    <br/>4.送达地址中的合同约定的受送达人联系电话和电子邮箱不可更改，当事人未确认送达地址前，仲裁法律文书及通知将会发到合同中约定的地址中；确认送达地址后，仲裁法律文书及通知将发送至当事人后确认的地址中。
                                    </b>
                                    </span>
                                </li>
                            </ul>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.onChange}
                            >
                                我已清楚本确认书的告知事项，提供了上述送达地址，并保证所提供的送达地址各项内容正确、有效。
                            </Checkbox>
                        </div>
                        <div className='my-case-adress-button'>
                                <Button
                                    style={{ marginLeft: '10px' }}
                                    type="primary"
                                    disabled = {litigantType === '3'||litigantType === '4'?true:false}
                                    onClick={this.edit}
                                >
                                修改
                                </Button>
                                <Button
                                    style={{ marginLeft: '10px' }}
                                    type="primary"
                                    disabled = {this.state.disabled}
                                    onClick={this.submit}
                                >
                                确认
                                </Button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}