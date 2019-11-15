import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Button, Table, Icon, Modal, Row , Col ,Popconfirm, Radio, Tabs,message} from 'antd'
import ajax, { baseURL } from '../../../../utils/ajax'

import ApplySteps from '../ApplySteps'
import CalculateCostBook from '../../../../components/CalculateCostBook';
const { TabPane } = Tabs;
const columns=[{
    title: '缴款项目编码',
    dataIndex: 'no',
    key: 'no'
},{
    title: '缴款项目名称',
    dataIndex: 'name',
    key: 'name'
},{
    title: '标准',
    dataIndex: 'price',
    key: 'price'
},{
    title: '数量',
    dataIndex: 'quantity',
    key: 'quantity'
},{
    title: '金额',
    dataIndex: 'amount',
    key: 'amount'
},{
    title: '滞纳金率',
    dataIndex: 'lateFee',
    key: 'lateFee'
},{
    title: '总金额',
    dataIndex: 'totalSum',
    key: 'totalSum'
}];

@withRouter
export default class ApplyFourth extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            standard:false,
            info:{},
            dataSource:[],
            payWays:[],
            expand: false,
            payFlag:false,
            payInfo:[],
            payOkFlay:true,
            keyParent:'1',
            keyChild:'0'
        }
    }
    showSteps=()=>{
        this.setState({
            visible:true
        })
    };
    hideModal=()=>{
        this.setState({
            visible:false
        })
    }
    getPayment=()=>{
        const caseId = this.props.match.params.id;
        ajax({
            url:`/litigant/case/${caseId}/payInfo`,
            method:'get',
            params:{
                caseId:caseId
            }
        }).then((data)=>{
            let dataList = [];
            data.items.map((item,index)=>{
                item.key = index;
                item.amount = item.price*item.quantity;
                item.lateFee = '';
                item.totalSum = item.amount + item.lateFee;
                dataList.push(item);
            });
            this.setState({
                info:data,
                dataSource:dataList
            });
        })
    }
    getStatus=(status)=>{
        switch(status){
            case 0:
                return '未生成';
            case 1:
                return '已缴费';
            case 2:
                return '未缴费';
            case 3:
                return '已过期';
            case 4:
                return '待审核（收款审核）';
            case 5:
                return '审核未通过（可再次支付）';
            default:
                return '已过期';
        }
    }
    chargeStandard=()=>{
        this.setState({
            standard:true
        })
    }
    closeStandard=()=>{
        this.setState({
            standard:false
        })
    }
    goCalc=()=>{
        this.props.history.push('/help');
    }
    componentDidMount(){
        this.getPayment();
        this.getPayWays();
    }
    getPayWays=()=>{
        ajax({
            url:"/pay/getPayWays.json",
            method:"post"
        }).then((data)=>{
            let dataList = [];
            data.map((item,index)=>{
                dataList.push(item);
            });
            this.setState({
                payWays:dataList
            });
        })
    }
    getPayInfo=(key,event)=>{
        const caseId = this.props.match.params.id;
        const orderId = this.state.info.orderId;
        const payWayId = this.state.payWays[key].id;
        ajax({
            url:'/pay/getPayChannelInfo.do',
            method:'post',
            params:{
                caseId:caseId,
                orderId:orderId,
                payWayId:payWayId
            }
        }).then((data)=>{
            this.setState({
                payInfo:data    
            })
        })
        this.setState({
            payFlag:true
        })
    }
    closePayPage = ()=>{
        this.setState({
            payFlag:false
        })
    }
    payConfiremed = (key)=>{
        const caseId = this.props.match.params.id;
        const orderId = this.state.info.orderId;
        const payWayId = this.state.payWays[key].id;
        ajax({
            url:'/pay/payConfirmed.do',
            method:'post',
            params:{
                caseId:caseId,
                orderId:orderId,
                payWayId:payWayId
            }
        }).then((data)=>{
            message.success('提交审核成功！');
            this.setState({
                payFlag:false
            })
            this.getPayment();
        }).catch(()=>{
            this.setState({
                payFlag:false
            })
        })
    }
    onChangeParent = (key)=>{
        this.setState({
            keyParent:key
        },()=>{
            if(this.state.keyParent == '0'){

            }else if(this.state.keyParent == '1'){
                this.getPayInfo(this.state.keyChild)
            }
            
        })
    }
    onChangeChild = (key)=>{
        this.setState({
            keyChild:key
        },()=>{
            this.getPayInfo(this.state.keyChild)
        })
    }
    toggle=()=>{
        const {expand} = this.state;
        this.setState({
            expand:!expand
        });
    }
    render(){
        const {visible,standard,info,dataSource,payWays,payFlag,payInfo,payOkFlay,keyParent,keyChild} = this.state;

        return (
            <div className="my-case-fourth ant-row">
                <ApplySteps step={3}/>
                <section className="my-case-fourth-item ant-col-18 ant-col-offset-3 payment-notice">
                    {info&&(info.status==2||info.status==5)?<div className="payment-notice-wrapper">
                        <h2 className="clearfix"><span>{this.getStatus(info.status)}</span><span>{info.status==5?info.reasonRemark:""}</span><a onClick={this.chargeStandard}>收费标准</a></h2>
                        <div className="payment-notice-container">
                            <div className="payment-notice-head">
                                <h3 className="payment-notice-head-title"><span>海南仲裁委北京办事处缴费通知书</span><b>NO. {info.pnNo}</b></h3>
                                <p className="payment-notice-head-item">
                                    <span><label>日期：</label><b>{info.createTime?info.createTime.split(' ')[0]:''}</b></span>
                                    <span><label>金额单位：</label><b>（元）</b></span>
                                </p>
                            </div>
                            <ul className="payment-notice-list">
                                <li className="payment-notice-list-item">
                                    <span><label>执收单位名称：</label><b>海南仲裁委北京办事处</b></span>
                                    <span><label>执收单位编码：</label><b>{info.unitNo}</b></span>
                                </li>
                                <li className="payment-notice-list-item">
                                    <span><label>执收单位（个人）：</label><b>{info.payerName}</b></span>
                                </li>
                            </ul>
                            <Table className="payment-notice-table" columns={columns} dataSource={dataSource} pagination={false}/>
                            <p className="payment-notice-list-item">
                                <span>合计：</span>
                                <span>{info.receivableAmtUp}</span>
                                <span>￥{info.receivableAmt?info.receivableAmt.toFixed(2):''}</span>
                            </p>
                            <p className="payment-notice-list-item">
                                <span><label>缴款截止日期：</label><b>{info.dealTime?info.dealTime.split(' ')[0]:''}</b></span>
                                {/* <span><label>号码校验码：</label><b>{info.checkDigitNo}</b><label>全书校验码：</label><b>{info.checkDigitAll}</b></span> */}
                            </p>
                        </div>
                        <div className="payment-notice-foot">
                            <ul className="payment-notice-foot-list">
                                <li className="payment-notice-foot-list-time">
                                    <label>有效期至：</label><span>{info.dealTime}</span>
                                </li>
                                <li className="payment-notice-foot-list-tip">
                                    有效期内未缴费，则申请立案失败
                                </li>
                                
                            </ul>
                            {/* <a onClick={this.showSteps}><span>缴费步骤</span><Icon type="right" /></a> */}
                        </div>
                        <div className="payment-notice-foot-list-way">
                        {/* style={{display:this.getStatus(info.status)==4?'block':'none'}} */}
                            <Button onClick={this.getPayInfo.bind(this,0)}><span>支付方式</span></Button>
                        </div>
                        <Modal
                            visible={visible}
                            title=""
                            width={649}
                            className="payment-steps"
                            closable={false}
                            footer={
                                <Button type="primary" onClick={this.hideModal}>我知道了</Button>
                            }
                        >
                            <img src={require('../../../../assets/images/payment-steps.png')}/>
                        </Modal>
                    </div>:''}
                    <div style={{"display":info.status==3?"block":"none"}} className="payment-notice-overdue">
                        <p>未在有效期内缴费，申请立案失败。</p>
                    </div>
                    <div style={{"display":info.status==4?"block":"none"}} className="payment-notice-overdue">
                        <p>待仲裁委审核，请耐心等待</p>
                    </div>
                    <div style={{"display":info.status==6?"block":"none"}} className="payment-notice-overdue">
                        <p>缴费审核已通过,系统处理中</p>
                    </div>
                    <div style={{"display":info.status==0?"block":"none"}} className="payment-notice-overdue">
                        <p>缴费信息生成中，请稍后查询</p>
                    </div>
                </section>
                <Modal
                    visible={standard}
                    title="收费标准"
                    width="auto"
                    className="calculate-cost-table"
                    closable={true}
                    onCancel={this.closeStandard}
                    footer={
                        [<Button type="primary" onClick={this.closeStandard}>我知道了</Button>,
                        <Button onClick={this.goCalc}>前往试算</Button>]
                    }
                >
                    <CalculateCostBook />
                </Modal>
                <Modal
                    visible={payFlag}
                    title="支付详情"
                    width={500}
                    className="calculate-cost-table"
                    closable={true}
                    onCancel={this.closePayPage}
                    footer={
                        
                        [<Popconfirm onConfirm={this.payConfiremed.bind(this,keyChild)} placement="topLeft" title="是否确认？确认将发送通知给仲裁委进行收款审核?"  okText="是" cancelText="否">
                            <Button type="primary">确认已支付</Button>
                        </Popconfirm>,
                        ]
                    }
                >
                    <div>
                    <Tabs onChange={this.onChangeParent} defaultActiveKey={keyParent}>
                        <TabPane tab="线上支付" key={0}>
                            暂不支持
                        </TabPane>
                        <TabPane tab="线下支付" key={1}>
                            <Tabs onChange={this.onChangeChild}  defaultActiveKey={keyChild}>
                                {this.state.payWays.map((item,index)=>(
                                    <TabPane tab={item.name} key={index}>
                                            {payInfo.offlineBankcard?
                                            <div key={1} className='payinfo-remark'>
                                                <h3>汇款账号：{payInfo.offlineBankcard.bankcardNo}</h3>
                                                <h3>汇款银行：{payInfo.offlineBankcard.bankName}</h3>
                                                <h3>开户行：{payInfo.offlineBankcard.bankDeposit}</h3>
                                                <h3>支付金额：￥{info.receivableAmt?info.receivableAmt.toFixed(2):''}</h3>
                                                <p>备注信息：{payInfo.offlineBankcard.remark}</p>
                                            </div>:""}
                                            {payInfo.offlineAliQRCode?
                                            <div key={2}>
                                                <div className='payinfo'>
                                                    {/* <img src={`${baseURL}public/file/preview/${payInfo.offlineAliQRCode.qrCode}`} /> */}
                                                    <img src={`${baseURL}public/file/preview/201811021758650020648427.png`} />
                                                </div>
                                                <h3 className='payinfo-remark'>支付金额：￥{info.receivableAmt?info.receivableAmt.toFixed(2):''}</h3>
                                                <p className='payinfo-remark'>{payInfo.offlineAliQRCode.remark}</p>
                                            </div>:""}
                                    </TabPane>
                                ))}
                            </Tabs>
                        </TabPane>
                    </Tabs>
                        
                    {/* <TabPane tab="Tab 1" key="1">
                                {payInfo.offlineBankcard?
                                <div key={1} className='payinfo-remark'>
                                    <h3>汇款账号：{payInfo.offlineBankcard.bankcardNo}</h3>
                                    <h3>汇款银行：{payInfo.offlineBankcard.bankName}</h3>
                                    <h3>开户行：{payInfo.offlineBankcard.bankDeposit}</h3>
                                    <p>备注信息：{payInfo.offlineBankcard.remark}</p>
                                </div>:""}
                                </TabPane>
                                <TabPane tab="Tab 2" key="2">
                                {payInfo.offlineAliQRCode?
                                <div key={2}>
                                    <div className='payinfo'>
                                        {/* <img src={`${baseURL}public/file/preview/${payInfo.offlineAliQRCode.qrCode}`} /> 
                                        <img src={`${baseURL}public/file/preview/201811021758650020648427.png`} />
                                        
                                    </div>
                                    <p className='payinfo-remark'>{payInfo.offlineAliQRCode.remark}</p>
                                </div>:""}
                                </TabPane> */}
                    </div>
                </Modal>
            </div>
        )
    }
}