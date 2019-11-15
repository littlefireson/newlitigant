import React,{Component} from 'react';
import {Row, Col,Button,Modal,message,Form} from 'antd';
import {withRouter} from 'react-router-dom'

import cache from '../../utils/cache'
import ajax from '../../utils/ajax'

import {EditBlock,EvidenceForm,ArbitrationPreview} from '../../components';

@Form.create()
class EvidencesForm extends Component{
    constructor( props){
        super(props);
    }
    render(){
        return (
            <Form>
                <EvidenceForm {...this.props}/>
            </Form>
        )
    }
}

@withRouter
export default class Reply extends Component{
    constructor(props){ 
        super(props);
        const replyContent = cache.getItem('replyContent');
        const {caseNo} = JSON.parse(cache.getItem('commInfo')).info;
        const evdLength = 0;
        let {caseId,type} = this.props.match.params;
        caseId = caseId.split('/')[0];
        let docList = {};
        let info = {caseNo};
        this.type = type;
        this.url = `/public/case/${caseId}/caseReply`;
        this.method = 'post';
        this.state={
            visible:false,
            loading:false,
            contentArr:evdLength>0?contentArr:[Date.now()],
            gotEvidence:evdLength,
            evidence:evdLength*1+1,
            initHtml:replyContent || '',
            docList,
            info,
            replyContent:replyContent || ''
        }
        if(replyContent!='' && replyContent!=undefined){
            this.url = `public/case/${caseId}/rejoin`;
            this.method = 'put';
        }
    }
    addEvidence = () => {
        const keyMs = Date.now();
        const { contentArr } = this.state;
        let newContentArr  = contentArr.concat();
        newContentArr.push(keyMs);
        this.setState((pre)=>{
            pre.evidence++;
            return({
                contentArr:newContentArr,
                evidence:pre.evidence
            })
        });
    };
    deleteEvidence=(e)=>{
        let key = e.target.getAttribute('keyindex');
        const { contentArr } = this.state;
        let newContentArr  = contentArr.concat();
        if(newContentArr.length > 1){
            this.setState((pre)=>{
                pre.evidence--;
                return({
                    contentArr:newContentArr.filter(id=> id != key),
                    evidence:pre.evidence
                })
            })
        }
    };
    preview=(val)=>{
        if(this.checkForm()){
            if(val == 1){
                this.sendCase()
            }else{
                this.ModalOpen();
            }
           
        }else{
            this.caseEvidences=[];
        }
    };
    ModalOpen=()=>{
        let {info,replyContent} = this.state;
        info.replyContent = replyContent;
        this.setState({
            visible:true,
            info
        });
    };
    ModalClose=()=>{
        this.setState({visible:false});
    };
    getEvidences=()=>{
        const {contentArr,gotEvidence}=this.state;
        return contentArr.map((item,index)=><EvidencesForm key={item} keyMs={item} keyIndex={index*1+1} arrLength={contentArr.length} ref={`evidences${item}`} evidenceDelete={this.deleteEvidence} evidenceInfo={null} setType={this.setType}/>)
    };
    checkForm=()=>{
        let checkFlag = true;
        const {docList,replyContent} = this.state;
        let {info} = this.state;
        info.caseEvidences = [];
        for(let evd in this.refs){
            const obj = this.refs[evd].getFieldsValue();
            if(obj.evidenceMat !== undefined || obj.purposeEvidence !== undefined || obj.fileId !== undefined){
                this.refs[evd].validateFieldsAndScroll((err,values)=>{
                    if(!err){
                        values.docType = docList[evd.split('evidences')[1]];
                        values.fileId = values.fileId?values.fileId.file.response.body:'';
                        values.counterclaimFlag = this.type;
                        info.caseEvidences.push(values);
                    }else{
                        checkFlag = false;
                    }
                });
            }
        }
        this.setState({
            info
        })
        if(replyContent == '' || replyContent==undefined){
            checkFlag = false;
            message.error('请填写答辩内容');
        }
        return checkFlag;
    }; 
    setType=(key,docType)=>{
        const {docList} = this.state;
        docList[key] = docType?docType:'applicant/rar';
        this.setState({
            docList
        })
    }
    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    sendCase=()=>{
        this.setState({
            loading:true
        })
        let {caseId,type} = this.props.match.params;
        caseId = caseId.split('/')[0];
        const {info:{caseEvidences,replyContent}} = this.state;
        ajax({
            url:this.url,
            method:this.method,
            data:{
                caseId,
                replyContent,
                caseEvidences,
                type
            }
        }).then(()=>{
            cache.setItem('replyContent','');
            this.props.history.goBack();
        }).finally(()=>{
            this.setState({
                loading:false
            })
        })
    }
    render(){
        const {contentArr,initHtml,loading,visible,info} = this.state;
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">答辩</header>
                    <EditBlock title="答辩内容" name="replyContent" onChange={this.handleChange} initHtml={initHtml}/>
                    <section className="my-case-second-item">
                        {this.getEvidences()}
                        <p className="btn-add-content"><span onClick={this.addEvidence}>添加证据</span></p>
                    </section>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.props.history.goBack}>放弃答辩</Button>
                        <Button type="primary" onClick={this.preview}>预览</Button>
                        <Button type="primary" onClick={this.preview.bind(this,1)}>提交答辩</Button>
                    </footer>
                    <Modal className="preview-modal"
                        title=""
                        width="auto"
                        onCancel={this.ModalClose}
                        footer={[
                            <Button onClick={this.ModalClose}>取消</Button>,
                            <Button type="primary" loading={loading} onClick={this.sendCase}>提交答辩</Button>
                        ]}
                        visible={visible}>
                        <ArbitrationPreview replyContent={info.replyContent} info={info} caseEvidences={info.caseEvidences} type="reply"/>
                    </Modal>
                </Col>
            </Row>
        </section>)
    }
}