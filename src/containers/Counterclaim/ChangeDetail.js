import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Button, Table, Icon, Modal,Spin ,Row , Col ,Popconfirm, Radio, Tabs,message} from 'antd';
import classNames from 'classnames';
import {Book,ArbitrationPreview} from '../../components'
import ajax ,{baseURL} from "../../utils/ajax";
import cache from "../../utils/cache";
import CalculateCostBook from '../../components/CalculateCostBook';
const { TabPane } = Tabs;
const ButtonGroup = Button.Group;
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
const source = [{
    key:'1',
    projectNumber:'1034214454514',
    projectName:'居民身份证-一代身份证-一般地区',
    standard:'10.00',
    num:'1',
    amount:'10.00',
    lateFee:'--',
    totalSum:'10.00'
}];
@withRouter
export default class ChangeDetail extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}} = props;
        const caseNo = JSON.parse(cache.getItem('commInfo')).info.caseNo;
        this.state={
            show:props.show || false,
            height:0,
            caseInfo:null,
            caseId,
            spinning:true,
            replyVisible:false,
            standard:false,
            visible:false,
            info:null,
            dataSource:[],
            replyInfo:{caseNo},
            messageH:"",
            payWays:[],
            expand: false,
            payFlag:false,
            payInfo:[],
            payOkFlay:true,
            keyParent:'1',
            keyChild:'0'
        }
    }
    static defaultProps={
        baseInfo:{
            dcoName:'',
            createTime:'',
            changeId:null
        },
        showBtns:false,
        replyButton:{},
        changeReplyButton:{}
    }
    getFrameHeight=(v)=>{
        this.setState({
            messageH:v
        })
    }
    getDateList=(payInfo)=> {
        if (payInfo && payInfo.items) {
            return payInfo.items.map((item, index) => {
                item.key = index;
                item.amount = item.price * item.quantity;
                item.lateFee = '';
                item.totalSum = item.amount + item.lateFee;
                return item;
            })
        }else{
            return [];
        }
    }
    setInfo=(caseInfo,info,dataSource)=>{
        this.setState({
            caseInfo,
            info,
            dataSource
        })
    }
    getCaseInfo=()=>{
        const {caseId,caseInfo} =this.state;
        if(!caseInfo){
            const {baseInfo} =this.props;
            const {changeId} =baseInfo;
            this.setState({
                spinning:true
            });
            if(changeId){
                ajax.get(`/litigant/case/back/${changeId}/changeDoc`,{
                    params:{
                        caseId
                    }
                }).then((data)=>{
                    const {baseInfo,payInfo}=data;
                    this.setInfo(baseInfo,payInfo,this.getDateList(payInfo));
                    console.log(payInfo)
                }).finally(()=>{
                    this.setState({
                        spinning:false
                    })
                })
            }else{
                ajax.get(`/litigant/case/${caseId}/backRequest`).then((data)=>{
                    const {baseInfo,payInfo}=data;
                    this.setInfo(baseInfo,payInfo,this.getDateList(payInfo));
                }).finally(()=>{
                    this.setState({
                        spinning:false
                    })
                })
            }
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
    closePayPage = ()=>{
        this.setState({
            payFlag:false
        })
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
        
        const caseId = this.props.match.params.caseId;
        
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
    payConfiremed = (key)=>{
        const caseId = this.props.match.params.caseId;
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
            location.reload();
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
    getContent=()=>{
        const {caseInfo,spinning,visible,info,dataSource,payFlag,payInfo,keyParent,keyChild}=this.state;
        const {baseInfo:{changeId}} =this.props;
        let title = '';
        if(changeId){
            title = '变更仲裁反请求申请书'
        }else{
            title = '反请求申请书'
        }

        return(<Spin spinning={spinning}  tip="加载中...">
             {info && (info.status==2||info.status==5) ? <div style={{"marginBottom":"20px"}} className="payment-notice-wrapper">
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
                    {/* <li className="payment-notice-foot-list-pay">
                        <span>微信扫码支付</span><b>￥{info.receivableAmt?info.receivableAmt.toFixed(2):''}</b>
                    </li> */}
                </ul>
                {/* <a onClick={this.showSteps}><span>缴费步骤</span><Icon type="right" /></a> */}
                
                {/* <div className="payment-notice-foot-code">
                    <img src={`data:image/jpeg;base64,${info.qrCode}`} alt="收款二维码"/>
                </div> */}
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
                <img src={require('../../assets/images/payment-steps.png')}/>
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
                    </div>
                </Modal>
        </div>:''}
        {/* {info&&<div>
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
            </div>} */}
            {caseInfo &&  <Book className={this.state.messageH} getFrameHeight={this.getFrameHeight.bind(this)} title={title} caseInfo={caseInfo}  oppositeFlag={true} counterFlag={true} type={5}></Book>}
        </Spin>)
    }
    toggle=()=>{
        const {show}=this.state;
        if(!show){
            this.getCaseInfo();
        }
        this.setState((pre)=>({
            show:!pre.show
        }))
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
    componentDidUpdate(){
        const {height} = this.state;
        const articleH = this.refs.content.scrollHeight;
        if(articleH != height){
            this.setState({
                height:articleH
            })
        }
    }
    componentDidMount(){
        const {show} = this.state;
        if(show){
            this.getCaseInfo()
        }
        const articleH = this.refs.content.scrollHeight;
        this.setState({
            height:articleH
        })
        this.getPayWays();
    }
    goReply=()=>{
        const {location,history,baseInfo:{changeId}}=this.props;
        let {match:{params:{caseId}}} = this.props;
        caseId = caseId.split('/')[0];
        const type=changeId?1:0;
        ajax({
            url:`litigant/case/back/${caseId}/replyDoc`,
            method:'get',
            params:{
                caseId,
                type
            }
        }).then((data)=>{
            let rejoinText = '';
            if(data){
                rejoinText = data.rejoinText;
            }
            cache.setItem('replyContent',rejoinText);
            history.push(`${location.pathname.split('/counterclaim')[0]}/reply/${type}`);
        })
    }
    getCtrl=()=>{
        const {showBtns,baseInfo:{changeId},replyButton,changeReplyButton,showGiveUp}=this.props;
        if(showBtns){
            const Btns=changeId?changeReplyButton:replyButton;
            const {replyBtn,amendBtn,checkBtn,dropBtn} = Btns;
            return (<ButtonGroup>
                { dropBtn && (<Button type="primary" size="small" ghost onClick={showGiveUp.bind(this,changeId)}>放弃答辩</Button>)}
                { replyBtn && (<Button type="primary" size="small" ghost onClick={this.goReply}>答辩</Button>)}
                { amendBtn && (<Button type="primary" size="small" ghost onClick={this.goReply}>修改答辩</Button>)}
                { checkBtn && (<Button type="primary" size="small" ghost onClick={this.checkReply}>查看答辩</Button>)}
            </ButtonGroup>)
        }
    }
    checkReply=()=>{
        const {location,history,baseInfo:{changeId},match:{params:{caseId}}}=this.props;
        const type=changeId?1:0;
        let {replyInfo} = this.state;
        // console.log(replyInfo);
        ajax({
            url:`litigant/case/back/${caseId}/replyDoc`,
            method:'get',
            params:{
                caseId,
                type
            }
        }).then((data)=>{
            replyInfo.replyContent = data.rejoinText;
            this.setState({
                replyInfo
            })
            this.ModalOpen();
        })
    }
    ModalOpen=()=>{
        this.setState({
            replyVisible:true,
        });
    };
    ModalClose=()=>{
        this.setState({
            replyVisible:false
        });
    };
    render(){
        const {baseInfo}=this.props;
        const {show,height,replyVisible,replyInfo,standard}=this.state;
        const toogleName=classNames({
            'show':show
        });
        const style = show ?{height}:{};
        return(<section className="changeDetail">
            <header>
                <strong onClick={this.toggle}><time>{baseInfo.createTime}</time>{baseInfo.dcoName}</strong>
                <aside>
                    {this.getCtrl()}
                    <em className={toogleName} onClick={this.toggle}>{baseInfo.status}</em>
                </aside>
            </header>
            <article style={style} ref="content">
                {this.getContent()}
            </article>
            <Modal className="preview-modal"
                title=""
                width="auto"
                onCancel={this.ModalClose}
                footer={[
                    <Button type="primary" onClick={this.ModalClose}>确定</Button>
                ]}
                visible={replyVisible}>
                <ArbitrationPreview info={replyInfo} type="backReply"/>
            </Modal>
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
        </section>)
    }
}