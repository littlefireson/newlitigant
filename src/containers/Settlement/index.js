import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row, Col,Button,Modal,message} from 'antd';
import {EditBlock,DocHeader,CodeCheck} from '../../components';
import ajax from '../../utils/ajax'
import cache from '../../utils/cache'
@withRouter
export default class Settlement extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId,type}}} = props;
        const {proposer,defendant,propAgent,defeAgent,caseType} = JSON.parse(cache.getItem('baseInfo'));
        this.state={
            caseId,
            visible:false,
            loading:false,
            codeFlag:false,
            getCodeLoading:false,
            protocolContent:'',
            type,
            proposer,
            defendant,
            propAgent,
            defeAgent,
            caseType,
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
        const {protocolContent,caseId,type} = this.state;
        this.setState({loading:true});
        ajax.post(`/case/protocol/${caseId.split('/')[0]}`,{
            protocolContent,
            docType:type
        }).then(()=>{
            message.success('提交成功');
            this.goBack();
        }).finally(()=>{
            this.setState({loading:false});
        })
    };
    preview=(val)=>{
        const {protocolContent} = this.state;
        if(protocolContent){
            if(val == 1){
                this.codeShow()
            }else{
                this.setState({visible:true})
            } 
        }else{
            message.error('请输入和解协议')
        }
    }
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
        const tplId = 1049;
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
        const {protocolContent,visible,loading,type,proposer,defendant,propAgent,defeAgent,caseType,codeFlag,getCodeLoading,phoneNo,codeName} = this.state;
        const {caseNo} = JSON.parse(cache.getItem('commInfo')).info;
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1049;
        let thisDate = new Date();
        thisDate = `${thisDate.getFullYear()}年${thisDate.getMonth()+1}月${thisDate.getDate()}日`;
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">和解协议申请（{type==1?'出具调解书':'出具裁决书'}）</header>
                    <EditBlock title="经协商，申请人和被申请人达成以下和解协议" name="protocolContent" onChange={this.handleChange}/>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.goBack}>取消</Button>
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
                <article className="doc-book">
                    <h3>和解协议</h3>
                    <div className="doc-notice">
                        <p>说明：1、申请人{propAgent?'有':'无'}代理人、被申请人{defeAgent?'有':'无'}代理人</p>
                        <p>2、出具{type==1?'调解书':'决定书'}</p>
                    </div>
                    <div className="doc-content">
                        {proposer.type==0?<div>
                            <p>申请人：{proposer.name}{proposer.sex&&`，${proposer.sex}`}{proposer.ethnic&&`，${proposer.ethnic.replace(/族/,'')}族`}{proposer.birthday&&`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日出生`}{proposer.cardId&&`，身份证号码：${proposer.cardId}`}</p>
                            {proposer.address&&<p>住所：{proposer.address}</p>}
                        </div>:
                        <div>
                            <p>申请人：{proposer.name}</p>
                            {proposer.address&&<p>住所：{proposer.address}</p>}
                            <p>法定代表人：{proposer.certName}，职务：{proposer.certDuties}</p>
                        </div>}
                        {propAgent&&<div>
                            {propAgent.type==1?
                            <p>委托代理人：{propAgent.name}，{propAgent.duties}律师</p>:
                            <p>委托代理人：{propAgent.name}{propAgent.sex?`，${propAgent.sex}`:''}{propAgent.ethnic?`，${propAgent.ethnic.replace(/族/g,'')}族`:''}{propAgent.birthday?`，${propAgent.birthday.substring(0,4)}年${propAgent.birthday.substring(4,6)}月${propAgent.birthday.substring(6)}日生`:''}{propAgent.cardId?`，身份证号：${propAgent.cardId}`:''}</p>}
                        </div>}
                        {defendant.type==0?<div>
                            <p>被申请人：{defendant.name}{defendant.sex&&`，${defendant.sex}`}{defendant.ethnic&&`，${defendant.ethnic.replace(/族/,'')}族`}{defendant.birthday&&`，${defendant.birthday.substring(0,4)}年${defendant.birthday.substring(4,6)}月${defendant.birthday.substring(6)}日出生`}{defendant.cardId&&`，身份证号码：${defendant.cardId}`}</p>
                            {defendant.address&&<p>住所：{defendant.address}</p>}
                        </div>:
                        <div>
                            <p>被申请人：{defendant.name}</p>
                            {defendant.address&&<p>住所：{defendant.address}</p>}
                            <p>法定代表人：{defendant.certName}，职务：{defendant.certDuties}</p>
                        </div>}
                        {defeAgent&&<div>
                            {defeAgent.type==1?
                            <p>委托代理人：{defeAgent.name}，{defeAgent.duties}律师</p>:
                            <p>委托代理人：{defeAgent.name}{defeAgent.sex?`，${defeAgent.sex}`:''}{defeAgent.ethnic?`，${defeAgent.ethnic.replace(/族/g,'')}族`:''}{defeAgent.birthday?`，${defeAgent.birthday.substring(0,4)}年${defeAgent.birthday.substring(4,6)}月${defeAgent.birthday.substring(6)}日生`:''}{defeAgent.cardId?`，身份证号：${defeAgent.cardId}`:''}</p>}
                        </div>}
                    </div>
                    <div className="doc-reword">
                        <p>申请人、被申请人关于{caseType}一案（案号为{caseNo}），自愿达成如下和解协议：</p>
                        <div dangerouslySetInnerHTML={{__html:protocolContent}}></div>
                        <p>双方请求仲裁庭根据和解协议出具{type==1?'调解书':'决定书'}。</p>
                    </div>
                    <footer>
                        <p><span>申请人：{proposer.name}</span></p>
                        <p><span>被申请人：{defendant.name}</span></p>
                        <p><span>{thisDate}</span></p>
                    </footer>
                </article>
            </Modal>
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}