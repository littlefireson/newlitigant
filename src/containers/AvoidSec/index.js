import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Row, Col,Button,Modal,message} from 'antd';
import {EditBlock,CodeCheck} from '../../components';
import ajax from '../../utils/ajax'
import cache from '../../utils/cache'
@withRouter
@connect(state=>({
    litigantType:state.litigantType
}))
export default class AvoidSec extends Component{
    constructor(props){
        super(props);
        const {match:{params:{avoidType}}} = props;
        this.state={
            visible:false,
            loading:false,
            codeFlag:false,
            getCodeLoading:false,
            avoidType,
            avoidRequest:'',
            avoidReason:'',
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
    preview=(val)=>{
        const {avoidRequest,avoidReason} = this.state;
        if(avoidRequest){
            if(avoidReason){
                if(val == 1){
                    this.codeShow();
                }else{
                    this.setState({visible:true});
                }
            }else{
                message.error('请输入事实与理由')
            }
        }else{
            message.error('请输入申请事项')
        }
    }
    sendCase=()=>{
        const {avoidRequest,avoidReason,avoidType} = this.state;
        const {match:{params:{caseId}}} = this.props;
        this.setState({loading:true});
        ajax.post('/case/avoid',{
            caseId:caseId.split('/')[0],
            avoidType:avoidType,
            avoidStyle:1,
            avoidRequest,
            avoidReason
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
    handleChange=(name,value)=>{
        this.setState({
            [name]:this.deleteBr(value)
        })
    }
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const {avoidType} = this.state;
        const tplId = avoidType==0?1031:1033;
        this.setState({
            getCodeLoading:true
        })
        ajax.get('litigant/case/validSms',{params:{caseId:caseId.split('/')[0],tplId,tplType:1}}).then((data)=>{
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
        const {avoidRequest,avoidReason,visible,loading,avoidType,getCodeLoading,codeFlag,phoneNo,codeName} = this.state;
        const {match:{params:{caseId}},litigantType} = this.props;
        const tplId = avoidType==0?1031:1033;
        let thisDate = new Date();
        thisDate = `${thisDate.getFullYear()}年${thisDate.getMonth()+1}月${thisDate.getDate()}日`;
        let role = 0;
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        const {proposer,defendant} = JSON.parse(cache.getItem('baseInfo'));
        const pageTitle=avoidType==0?'秘书回避申请':'仲裁员回避申请';
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">{pageTitle}</header>
                    <EditBlock title="申请事项" name="avoidRequest" onChange={this.handleChange}/>
                    <EditBlock title="事实与理由" name="avoidReason" onChange={this.handleChange}/>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.goBack}>取消</Button>
                        <Button type="primary" onClick={this.preview}>预览</Button>
                        <Button type="primary" onClick={this.preview.bind(this,1)}>签字并提交</Button>
                    </footer>
                </Col>
            </Row>
            <Modal className="preview-modal"
                   title=""
                   width="auto"
                   confirmLoading={getCodeLoading}
                   onOk={this.codeShow}
                   onCancel={this.ModalClose}
                   okText="签字并提交"
                   cancelText="取消"
                   visible={visible}>
                <article className="book">
                    <h2>{pageTitle}</h2>
                    <p>申请人：{role==0?proposer.name:defendant.name}</p>
                    <h3>申请事项：</h3>
                    <div dangerouslySetInnerHTML={{__html:avoidRequest}}></div>
                    <h3>事实与理由：</h3>
                    <div dangerouslySetInnerHTML={{__html:avoidReason}}></div>
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
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={1} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}