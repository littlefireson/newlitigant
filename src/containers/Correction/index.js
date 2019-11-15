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
export default class Correction extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            loading:false,
            application:'',
            factReason:'',
            codeFlag:false,
            getCodeLoading:false,
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
        const {application,factReason} = this.state;
        if(application){
            if(factReason){
                if(val == 1){
                    this.codeShow();
                }else{
                    this.setState({visible:true})
                }
            }else{
                message.error('请输入理由')
            }
        }else{
            message.error('请输入补正申请内容')
        }
    }
    sendCase=()=>{
        const {application,factReason} = this.state;
        const {match:{params:{caseId}}} = this.props;
        this.setState({loading:true});
        ajax.post('/adjudication/amendment',{
            caseId:caseId.split('/')[0],
            application,
            factReason
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
        const tplId = 1059;
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
        const {application,factReason,visible,loading,codeFlag,getCodeLoading,phoneNo,codeName} = this.state;
        const {caseNo} = JSON.parse(cache.getItem('commInfo')).info;
        const {match:{params:{caseId}},litigantType} = this.props;
        const tplId = 1059;
        const {proposer,defendant} = JSON.parse(cache.getItem('baseInfo'));
        let thisDate = new Date();
        thisDate = `${thisDate.getFullYear()}年${thisDate.getMonth()+1}月${thisDate.getDate()}日`;
        let role = 0;
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">裁决书补正申请书</header>
                    <EditBlock title={`关于贵会作出的${caseNo}裁决书，我方提出如下补正申请：`} name="application" onChange={this.handleChange}/>
                    <EditBlock title="理由是：" name="factReason" onChange={this.handleChange}/>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.goBack}>返回</Button>
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
                    <h2>裁决书补正申请书</h2>
                    <p>海南仲裁委员会：</p>
                    <p>关于贵会作出的{caseNo}裁决书，我方提出如下补正申请：</p>
                    <div dangerouslySetInnerHTML={{__html:application}}></div>
                    <h3>理由是</h3>
                    <div dangerouslySetInnerHTML={{__html:factReason}}></div>
                    <footer>
                        <p>此致</p>
                        <p>海南仲裁委员会</p>
                        <aside>
                            <p>申请人：{role==1?defendant.name:proposer.name}</p>
                            <p>{thisDate}</p>
                        </aside>
                    </footer>
                </article>
            </Modal>
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}