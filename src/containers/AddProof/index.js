import React,{Component} from 'react';
import {connect} from 'react-redux'
import { Icon, Form, Input, Button, Upload, message, Modal } from 'antd'
import {EvidenceForm} from '../../components'
import ajax from '../../utils/ajax'

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

EvidencesForm = Form.create()(EvidencesForm);

@connect(state=>({
    userInfo:state.userInfo
}))

export default class AddProof extends Component{
    constructor( props){
        super(props);
        let docList = {};
        this.state= {
            contentArr:[Date.now()],
            evidence:1,
            saveLoading:false,
            docList
        };
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
    getEvidences=()=>{
        const {contentArr}=this.state;
        return contentArr.map((item,index)=><EvidencesForm key={item} keyMs={item} arrLength={contentArr.length} keyIndex={index*1+1} ref={"evidence"+item} evidenceDelete={this.deleteEvidence} setType={this.setType}/>)
    };
    saveEvidence = ()=>{
        const caseId = this.props.match.params.caseId.split('/')[0] || '';
        if(this.checkForm()){
            this.setState({
                saveLoading:true
            });
            ajax({
                url:'/case/evidence/'+caseId,
                method:'post',
                data:{
                    caseId:caseId,
                    caseEvidences:this.caseEvidences
                },
                caseId:caseId
            }).then(()=>{
                // console.log(this.props)
                this.props.history.goBack();
            }).finally(()=>{
                this.setState({
                    saveLoading:false
                })
            })
        }
    };
    checkForm=()=>{
        let checkFlag = true;
        const {docList} = this.state;
        this.caseEvidences = [];
        for(let evd in this.refs){
            this.refs[evd].validateFieldsAndScroll((err,values)=>{
                if(!err){
                    values.docType = docList[evd.split('evidences')[1]];
                    values.fileId = values.fileId?values.fileId.file.response.body:'';
                    values.counterclaimFlag = this.props.location.search.split('?')[1] || '';
                    this.caseEvidences.push(values);
                }else{
                    checkFlag = false;
                }
            });
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
    goBack=()=>{
        this.props.history.goBack();
    };
    render(){
        const {contentArr,saveLoading} = this.state;
        return(
            <div className="ant-row-layout">
                <section className="my-case-second-item">
                    {this.getEvidences()}
                    <p className="btn-add-content"><span onClick={this.addEvidence}>添加证据</span></p>
                </section>
                <div className="my-case-buttons">
                    <Button onClick={this.goBack}>返回</Button>
                    <Button id="btn-preview"onClick={this.saveEvidence} loading={saveLoading} type="primary">保存</Button>
                </div>
            </div>
        )
    }
}