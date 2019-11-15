import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Row, Col,Button,Modal,message} from 'antd';
import {EditBlock,CodeCheck} from '../../components';
import ajax from '../../utils/ajax';
import cache from '../../utils/cache'
@withRouter
@connect(state=>({
    litigantType:state.litigantType
}))
export default class Challenge extends Component{
    constructor(props){
        super(props);
        const {litigantType} = props;
        let role = 0;
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        this.commInfo = JSON.parse(cache.getItem('commInfo'));
        this.state={
            role,
            visible:false,
            loading:false,
            codeFlag:false,
            getCodeLoading:false,
            requestItem:'',
            reason:'',
            phoneNo:'',
            codeName:''
        }
    }
    ModalClose=()=>{
        this.setState({visible:false});
    };
    goBack=()=>{
        const {history}=this.props;
        history.goBack();
    }
    sendCase=()=>{
        const {requestItem,reason} = this.state;
        const {match:{params:{caseId}}} = this.props;
        this.setState({loading:true});
        ajax.post('/case/juris/dis',{
            caseId:caseId.split('/')[0],
            requestItem,
            reason
        }).then(()=>{
            message.success('提交成功');
            this.goBack();
        }).catch((e)=>{
        }).finally(()=>{
            this.setState({loading:false});
        })
    };
    deleteBr=(string)=>{
        if(string.indexOf('<p><br></p>')!=-1){
            string = string.replace(/<p><br><\/p>/g,'');
        }
        if(string.indexOf('<br>')!=-1){
            string = string.replace(/<br>/g,'<br/>');
        }
        return string
    }
    preview=(val)=>{
        const {requestItem,reason} = this.state;
        // console.log(requestItem);
        // console.log(reason);
        if(requestItem){
            if(reason){
                if(val == 1){
                    this.codeShow();
                }else{
                    this.setState({visible:true});
                }
              
            }else{
                message.error('请输入理由')
            }
        }else{
            message.error('请输入申请事项')
        }
    }
    handleChange=(name,value)=>{
        this.setState({
            [name]:this.deleteBr(value)
        })
    }
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const {role} = this.state;
        const tplId = role==0?1035:1079;
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
    }
    codeClose=()=>{
        this.setState({
            codeFlag:false
        })
    }
    render(){
        const {requestItem,reason,visible,loading,codeFlag,getCodeLoading,role,phoneNo,codeName} = this.state;
        const {match:{params:{caseId}}} = this.props;
        const tplId = role==0?1035:1079;
        const {caseNo=''} = this.commInfo.info;
        const {proposer,defendant} = JSON.parse(cache.getItem('baseInfo'));
        let thisDate = new Date();
        thisDate = `${thisDate.getFullYear()}年${thisDate.getMonth()+1}月${thisDate.getDate()}日`;
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">管辖权异议</header>
                    <EditBlock title="申请事项" name="requestItem" onChange={this.handleChange}/>
                    <EditBlock title="事实与理由" name="reason" onChange={this.handleChange}/>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.goBack}>返回</Button>
                        <Button type="primary" onClick={this.preview}>预览</Button>
                        <Button type="primary" onClick={this.preview.bind(this,1)}>提交申请书</Button>
                    </footer>
                </Col>
            </Row>
            <Modal className="preview-modal"
                   title=""
                   width="auto"
                   confirmLoading={getCodeLoading}
                   onOk={this.codeShow}
                   onCancel={this.ModalClose}
                   okText="提交申请书"
                   cancelText="取消"
                   visible={visible}>
                <article className="book">
                    <h2>管辖权异议申请书</h2>
                    <h2>（{role==1?'本请求':'反请求'}）</h2>
                    <p>海南仲裁委员会：</p>
                    <p>针对贵会受理的{caseNo}案，我方提出管辖权异议如下：</p>
                    <h3>请求</h3>
                    <div dangerouslySetInnerHTML={{__html:requestItem}}></div>
                    <h3>理由是</h3>
                    <div dangerouslySetInnerHTML={{__html:reason}}></div>
                    <footer>
                        <p>此致</p>
                        <p>海南仲裁委员会</p>
                        <aside>
                            <p>申请人：{role==0?proposer.name:defendant.name} </p>
                            <p>{thisDate}</p>
                        </aside>
                    </footer>
                </article>
            </Modal>
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}