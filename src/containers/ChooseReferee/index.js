import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Modal,Button,message,Spin} from 'antd';
import {RefereeCheckItem,CodeCheck} from '../../components';
import ReTable from './ReTable';
import ajax from "../../utils/ajax";
@withRouter
@connect((state)=>({
    litigantType: state.litigantType
}))
export default class ChooseReferee extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}} = props;
        const {litigantType} = props;
        let role = 0;
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        this.state={
            visible: false,
            caseId:caseId,
            arbitratorId:null,
            loading:false,
            spinning:false,
            evadeSpinning:false,
            arbitratorInfo:[],
            evadeList:[],
            //被申请人
            defeArbitrator:null,
            //申请人
            propArbitrator:null,
            //当前
            sysArbitrator:null,
            //能否选择仲裁员
            arbitratorFlag:true,
            getCodeLoading:false,
            codeFlag:false,
            role,
            phoneNo:'',
            codeName:''
        }
    }
    ModalOpen=()=>{
        this.setState({visible:true})
    }
    ModalClose=()=>{
        this.setState({visible:false})
    }
    handleChoice=(arbitratorId)=>{
        // console.log(arbitratorId);
        this.setState({
            arbitratorId
        })
    }
    handleClick=()=>{
        const {caseId,arbitratorId} =this.state;
        this.setState({
            loading:true
        })
        ajax.post(`/arbitrator/choice/${caseId}`,{
            arbitratorId,
            isSysRecom:1
        }).then(()=>{
            this.setState({
                visible:false
            });
            this.getArbitratorInfo();
        }).finally(()=>{
            this.setState({
                loading:false,
                codeFlag:false
            })
        })
    }
    getArbitratorInfo=()=>{
        const {caseId} =this.state;
        this.setState({
            spinning:true
        })
        ajax.get(`/litigant/case/${caseId}/arbitratorInfo`).then((data)=>{
            const {defeArbitrator,propArbitrator,sysArbitrator,arbitratorFlag} = data;
            this.setState({
                defeArbitrator,
                propArbitrator,
                sysArbitrator,
                arbitratorFlag
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
    }
    componentDidMount(){
        this.getArbitratorInfo();
        this.getEvadeList();
    }
    getEvadeList=()=>{
        const {caseId} =this.state;
        this.setState({
            evadeSpinning:true
        })
        ajax.get(`/arbitrator/choice/${caseId}/list`).then((evadeList)=>{
            this.setState({
                evadeList
            })
        }).finally(()=>{
            this.setState({
                evadeSpinning:false
            })
        })
    }
    showApplyBook=(id,type)=>{
        const {match:{path}} = this.props;
        this.props.history.push(`${path}/avoid/${id}/${type}`);
    }
    getEvade=()=>{
        const {evadeList} = this.state;
        const status={
            0:'待审核',
            1:'审核通过',
            2:'审核失败'
        }
        if(evadeList.length>0){
            return (<div className="content-box">
                {
                    evadeList.map((item,index)=>(
                        <article className="content-box-article outList-item" key={index}>
                            <header>
                                <time>{item.createTime}</time>
                                {
                                    item.status && (<aside>
                                        <i className="dot">•</i>{status[item.status]}
                                    </aside>)
                                }
                            </header>
                            <article>
                                <div>
                                    <h3>申请仲裁员回避</h3>
                                    <p>仲裁员：{item.name}</p>
                                </div>
                                <div>
                                    <Button type="dashed" onClick={this.showApplyBook.bind(this,item.id,0)}>仲裁员回避申请书</Button>
                                    { item.status=='1' && (<Button onClick={this.showApplyBook.bind(this,item.id,1)} type="dashed">仲裁员回避决议书</Button>)}
                                </div>
                            </article>
                        </article>
                    ))
                }
            </div>)
        }
    }
    codeShow=()=>{
        const {arbitratorId} =this.state;
        if(arbitratorId){
            const {match:{params:{caseId}}} = this.props;
            const tplId = 1037;
            this.setState({
                getCodeLoading:true
            })
            ajax.get('litigant/case/validSms',{params:{caseId:caseId.split('/')[0],tplId,tplType:2}}).then((data)=>{
                this.setState({
                    phoneNo:data.phone,
                    codeName:data.name,
                    codeFlag:true
                })
            }).finally(()=>{
                this.setState({
                    getCodeLoading:false
                })
            })
        }else{
            message.warning('请选择仲裁员');
        }
    }
    codeClose=()=>{
        this.setState({
            codeFlag:false
        })
    }
    render(){
        const {
            visible,
            loading,
            defeArbitrator,
            propArbitrator,
            sysArbitrator,
            spinning,
            evadeSpinning,
            arbitratorFlag,
            getCodeLoading,
            codeFlag,
            role,
            phoneNo,
            codeName
        } = this.state;
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1037;
        const propEnable=arbitratorFlag&&role=='0'?true:false;
        const defeEnable=arbitratorFlag&&role=='1'?true:false;
        return(<section>
            <Spin spinning={evadeSpinning} tip="加载中...">
                {this.getEvade()}
            </Spin>
            <div className="content-box">
                <Spin spinning={spinning} tip="加载中...">
                    <header className="content-box-title">
                        选择仲裁员
                    </header>
                    <article className="content-box-article">
                        <RefereeCheckItem title="申请方的选择" enable={propEnable} referee={propArbitrator} onClick={this.ModalOpen}/>
                        <RefereeCheckItem title="被申请方选择" enable={defeEnable} referee={defeArbitrator} onClick={this.ModalOpen}/>
                        <RefereeCheckItem current title="" referee={sysArbitrator}/>
                    </article>
                </Spin>
            </div>
            <Modal className="reModal"
                   title="选择仲裁员"
                   width="690px"
                   closable={true}
                   onCancel={this.ModalClose}
                   footer={[
                       <Button key="submit" size="large" type="primary" onClick={this.codeShow} loading={getCodeLoading}>
                           提交
                       </Button>,
                   ]}
                   visible={visible}>
                <ReTable onChoice={this.handleChoice} caseId={caseId}/>
            </Modal>
            <CodeCheck visible={codeFlag} sendMsg={this.handleClick} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}