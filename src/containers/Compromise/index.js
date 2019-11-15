import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button,Spin,Popconfirm} from 'antd';
import axios from 'axios';
import ajax from '../../utils/ajax';
import {Chat,CodeCheck} from '../../components';

// 4开始都有聊天窗口 5，8，9聊天没有发送栏
const status={
    0:'无和解',
    1:'等待对方和解回应',
    2:'等待我方和解回应',
    3:'等待第三方和解回应',
    4:'等待和解开始',
    5:'和解中',
    6:'拒绝和解',
    7:'等待对方和解协议回应(调解书)',
    8:'等待我方和解协议回应(调解书)',
    9:'等待对方和解协议回应(裁决书)',
    10:'等待我方和解协议回应(裁决书)',
    11:'和解完成',
    12:'一般代理操作'
}
@withRouter
export default class Compromise extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}} = props;
        this.state={
            caseId,
            menuVOs:[],
            status:0,
            applyList:[],
            chatList:[],
            protocolInfoVO:null,
            loading:false,
            sendLoading:false,
            getCodeLoading:false,
            codeFlag:false,
            chatLoading:false,
            time:30000,
            tplId:'',
            tplType:'',
            phoneNo:'',
            codeName:''
        }
    }
    getCompromiseApply=()=>{
        const {applyList} = this.state;
        if(applyList && applyList.length>0){
            return (
                <article>
                    {
                        
                        applyList.map((item,index)=> (
                            item && 
                        <div key={index}>
                            <time>{item.responseTime}</time>
                            <span>{item.message}</span>
                        </div>

                        ))
                    }
                </article>
            )
        }
        
    }
    //和解操作
    operation=(menuId)=>{
        this.setState({
            sendLoading:true,
        })
        const {caseId} =this.state;
        ajax.post(`/compromise/operation/${caseId}`,{
            menuId,
        }).then(()=>{
            this.getAll();
        }).finally(()=>{
            this.setState({
                sendLoading:false,
                codeFlag:false
            })
        })
    }
    //请求和解操作按钮，和解操作记录
    getAll=()=>{
        const {caseId} =this.state;
        this.setState({
            loading:true
        })
        ajax.get(`/compromise/operation/${caseId}/info`).then((data)=>{
            const {applyInfoVOs,compromiseMenuVO:{status,menuVOs},protocolInfoVO} =data;
            // console.log(applyInfoVOs);
            this.setState({
                status,
                menuVOs,
                protocolInfoVO,
                applyList:applyInfoVOs
            })
            if(status>4){//展示聊天信息
                this.setState({
                    chatLoading:true
                })
                this.getChatList()
            }

        }).finally(()=>{
            this.setState({
                loading:false
            })
        })
    }
    getMenu=()=>{
        const {menuVOs,protocolInfoVO,getCodeLoading} = this.state;
        const {location,history} = this.props;
        const text="调解仅限一次，拒绝后终止调解，继续仲裁";
        const btns={
            20:(<Button key='20' type="primary" size="large" ghost loading={getCodeLoading} onClick={this.codeShow.bind(this,20,1044,2)}>请求和解</Button>),
            21:(<Button key='21' type="primary" size="large" ghost loading={getCodeLoading} onClick={this.codeShow.bind(this,21,1046,1)}>同意和解</Button>),
            22:(<Popconfirm key='22' placement="top" title={text} onConfirm={this.operation.bind(this,22)} okText="确定" cancelText="取消">
                    <Button  type="primary" size="large" ghost>拒绝和解</Button>
                </Popconfirm>),
            23:(<Button key='23' type="primary" size="large" ghost onClick={()=>{
                history.push(location.pathname+'/settlement/1')
            }}>请求出具调解书</Button>),
            24:(<Button key='24' type="primary" size="large" ghost onClick={this.operation.bind(this,24)}>同意出具调解书</Button>),
            // 25:(<Popconfirm key='25' placement="top" title={text} onConfirm={this.operation.bind(this,25)} okText="确定" cancelText="取消">
            //         <Button type="primary" size="large" ghost>拒绝调解书</Button>
            //     </Popconfirm>),
            26:(<Button key='26' type="primary" size="large" ghost onClick={()=>{
                history.push(location.pathname+'/settlement/0')
            }}>请求出具裁决书</Button>),
            28:(<Button key='28' type="primary" size="large" ghost onClick={this.operation.bind(this,28)}>同意出具裁决书</Button>),
        }
        if(menuVOs){
            return (<footer className="compromise-footer">
                {menuVOs.map((item,index)=>(btns[item.menuId]))}
            </footer>)
        }else{
            return (<footer className="compromise-footer">
                <Button key='26' type="primary" size="large" ghost disabled={true}>当前状态不可操作</Button>
            </footer>)
        }
    }
    sendMsg=(content)=>{
        const {caseId} = this.state;
        this.setState({
            chatLoading:true
        });
        return ajax.post(`/compromise/record/${caseId}`,{
            content
        }).then((chatList)=>{
            this.setState({
                chatList
            })
        }).finally(()=>{
            this.setState({
                chatLoading:false
            });
        })
    }
    getChatList=()=>{
        const {caseId} = this.state;
        ajax.get(`/compromise/record/${caseId}`).then((chatList)=>{
            this.setState({
                chatList
            })
        }).finally(()=>{
            this.setState({
                chatLoading:false
            })
        })
    }
    getChat=()=>{
        const {status,chatList} = this.state;
        const disabled = status=='6'||status=='11'||status=='12';
        if(status>4){
            if(!this.timer){
                this.setTimer();
            }
            return (status==6 && chatList.length<0 ? '' : <Chat disabled={disabled} chatList={chatList} sendMsg={this.sendMsg}/>)
        }
    }
    setTimer=()=>{
        const {time} = this.state;
        if(!this.timer){
            clearInterval(this.timer)
        }
        this.timer = setInterval(this.getChatList,time)
    }
    componentDidMount() {
        this.getAll();
    }
    componentWillReceiveProps(nextProps){
        const {location:{pathname}} = nextProps;
        if(pathname.indexOf('compromise')!=-1){
            this.getChatList();
            this.setTimer();
        }else{
            if(this.timer){
                clearInterval(this.timer);
            }
        }
    }
    componentWillUnmount(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
    sendCase=null;
    codeShow=(menuId,tplId,tplType)=>{
        const {match:{params:{caseId}}} = this.props;
        this.sendCase=this.operation.bind(this,menuId);
        this.setState({
            getCodeLoading:true
        })
        ajax.get('litigant/case/validSms',{params:{caseId:caseId.split('/')[0],tplId,tplType}}).then((data)=>{
            this.setState({
                phoneNo:data.phone,
                codeName:data.name,
                tplId,
                tplType,
                codeFlag:true
            })
        }).finally(()=>{
            this.setState({
                getCodeLoading:false
            })
        })
    }
    codeClose=()=>{
        this.setState({
            codeFlag:false
        })
    }
    render(){
        const {loading,chatLoading,status,protocolInfoVO,chatList,codeFlag,sendLoading,phoneNo,tplType,tplId,codeName} = this.state;
        const {match:{params:{caseId}}} = this.props;
        return(<section className="content-box compromise">
            <Spin spinning={loading} tip="加载中...">
                {chatList && chatList.length==0 ?
                    <article className="compromise-attitude">
                        {/*<header>双方发送和解申请——办案部门同意——和解沟通</header>*/}
                        {this.getCompromiseApply()}
                    </article>
                :''}
                <Spin spinning={chatLoading} tip="加载中...">
                    {this.getChat()}
                </Spin>
                {protocolInfoVO &&
                    (<article className="protocol">
                        <header>
                            <time>{protocolInfoVO.time}</time>
                            <span>{protocolInfoVO.titleName}</span>
                            <aside>{protocolInfoVO.statusName}</aside>
                        </header>
                    </article>)
                }
                {this.getMenu()}
            </Spin>
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={sendLoading} phoneNo={phoneNo} tplType={tplType} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}