import React, {Component} from 'react'
import { Form,  Button, Modal } from 'antd'
import {connect} from 'react-redux'
import {EvidenceForm} from '../../../../components'
import cache from '../../../../utils/cache'
import ajax from '../../../../utils/ajax'

import ApplySteps from '../ApplySteps'
import {ArbitrationPreview,CodeCheck} from '../../../../components'

class EvidencesForm extends Component{
    constructor( props,context){
        super(props,context);
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

export default class ApplySecond extends Component{
    constructor( props){
        super(props);
        this.caseInfo = JSON.parse(cache.getItem('caseInfo')) || {};
        const evdLength = this.caseInfo.caseEvidences.length;
        let contentArr = [];
        let docList = {};
        if(evdLength > 0){
            this.caseInfo.caseEvidences.map((item,index)=>{
                let kysMs = Date.now()+index;
                item.key = kysMs;
                contentArr.push(kysMs);
                docList[kysMs] = item.docType;
            })
        }
        this.state= {
            contentArr:evdLength>0?contentArr:[Date.now()],
            gotEvidence:evdLength,
            evidence:evdLength*1+1,
            visible:false,
            saveLoading:false,
            sendLoading:false,
            getCodeLoading:false,
            docList,
            info:null,
            codeFlag:false,
            agentFlag:false,
            codeSrc:"litigant/case/caseRegisterSmsResponse",
            phoneNo:'',
            codeName:''
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
    preview=(val)=>{
        const {userInfo} = this.props;
        const caseInfo = JSON.parse(cache.getItem('caseInfo'));
        const {applicantType,applicantUnifiedSocialCode} = caseInfo;
        if(applicantType==1){
            ajax({
                url:`agent/author/${applicantUnifiedSocialCode}/enterpriseAuthorValid`,
                method:'post',
                data:{
                    unifiedSocialCode:applicantUnifiedSocialCode
                }
            }).then((data)=>{
                this.setState({
                    phoneNo:data
                })
            })
        }
        if(this.checkForm()){
            debugger;
            if(val == 1){
                this.codeShow()
            }else{
                this.ModalOpen();
            }
           
        }else{
            this.caseInfo.caseEvidences=[];
        }
    };
    getEvidences=()=>{
        const {contentArr,gotEvidence}=this.state;
        const caseInfo = JSON.parse(cache.getItem('caseInfo')) || {};
        return contentArr.map((item,index)=><EvidencesForm key={item} keyMs={item} arrLength={contentArr.length} keyIndex={index*1+1} ref={"evidences"+item} evidenceDelete={this.deleteEvidence} evidenceInfo={index<gotEvidence?caseInfo.caseEvidences[index]:null} setType={this.setType}/>)
    };
    ModalOpen=()=>{
        const caseInfo = JSON.parse(cache.getItem('caseInfo'));
        this.setState({
            info:caseInfo,
            visible:true,
        });
    };
    ModalClose=()=>{
        this.setState({visible:false});
        this.caseInfo.caseEvidences=[];
    };
    sendCase=()=>{
        const caseId = this.props.match.params.id || '';
        this.caseInfo.caseId = caseId;
        this.setState({
            sendLoading:true
        });
        ajax({
            url:'/public/case/caseApply',
            method:'post',
            data:this.caseInfo,
        }).then(()=>{
            const {userInfo} = this.props;
            cache.setItem('caseInfo',JSON.stringify({
                caseEvidences:[
                    //{evidenceMat:'',purposeEvidence:'',sourceEvidence:'',docName:'',fileId:''}
                ],//证据
                filingType:userInfo.role=='2'?1:0,  //立案人类型  0 本人   1 代理
                applicantName:'',//申请人名称
                applicantType:userInfo.type, //申请人类型,0- 自然人，1- 法人
                applicantEthnic:'',  //申请人民族
                applicantSex:'', //申请人性别,'男'或'女'
                applicantPhone:'',  //申请人联系电话
                applicantCardId:'', //申请人身份证号
                applicantEmail:'',  //申请人邮箱
                applicantAddress:'',  //申请人住所
                applicantBirthday:'',  //申请人出生,格式'yyyyMMdd'
                applicantUnifiedSocialCode:'',  //申请人统一社会信用代码
                applicantCertName:'',  //申请人法定代表人姓名
                applicantCertDuties:'', //申请人法定代表人职务
                beApplicantName:'',  //被申请人名称
                beApplicantType:'', //被申请人类型,0- 自然人，1- 法人
                beApplicantEthnic:'', //被申请人民族
                beApplicantSex:'', //被申请人性别,格式'男'或'女'
                beApplicantPhone:'', //被申请人联系电话
                beApplicantCardId:'', //被申请人身份证号
                beApplicantEmail:'', //被申请人邮箱
                beApplicantAddress:'', //被申请人住所
                beApplicantBirthday:'', //被申请人出生
                beApplicantUnifiedSocialCode:'', //被申请人统一社会信用代码
                beApplicantCertName:'', //被申请人法定代表人姓名
                arbClaim:'', //仲裁请求
                fact:'', //事实与理由
                lawFirm:'', //所函
                agreementOfAgency:'', //委托代理合同
                powerOfAttorney:'', //授权委托书
                caseAmount:''
            }));
            this.props.history.push('/myCase/apply/third/false');
        }).finally(()=>{
            this.setState({
                sendLoading:false
            });
        })
    };
    goFirst=()=>{
        let caseId = this.props.match.params.id || '';
        let failFlag = this.props.match.params.fail || '';
        if(caseId){
            if(failFlag){
                this.props.history.push(`/myCase/apply/first/${caseId}/true`);
            }else{
                this.props.history.push(`/myCase/apply/first/${caseId}`);
            }
        }else{
            this.props.history.push(`/myCase/apply/first`);
        }
    };
    saveDraft = ()=>{
        const caseId = this.props.match.params.id || '';
        if(this.checkForm()){
            this.setState({
                saveLoading:true
            });
            ajax({
                url:'/public/case/caseApplyDraft',
                method:'post',
                data:{
                    ...this.caseInfo,
                    caseId:caseId
                },
            }).then((bodyData)=>{
                const id = bodyData;
                if(id){
                    this.props.history.push('/myCase/apply/second/'+id);
                }
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
        this.caseInfo.caseEvidences = [];
        for(let evd in this.refs){
            this.refs[evd].validateFieldsAndScroll((err,values)=>{
                if(!err || (!values.fileId&&!values.evidenceMat&&!values.purposeEvidence&&!values.sourceEvidence)){
                    if(values.fileId && typeof values.fileId === 'object' && values.fileId.file.response.body){
                        values.docType = docList[evd.split('evidences')[1]];
                        values.fileId = values.fileId.file.response.body;
                        this.caseInfo.caseEvidences.push(values);
                    }else if(values.fileId && typeof values.fileId === 'string'){
                        values.docType = docList[evd.split('evidences')[1]];
                        this.caseInfo.caseEvidences.push(values);
                    }
                }else{
                    checkFlag = false;
                }
            });
        }
        if(checkFlag){
            cache.setItem('caseInfo',JSON.stringify(this.caseInfo));
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
    codeShow=()=>{
        const {userInfo} = this.props;
        const caseInfo = JSON.parse(cache.getItem('caseInfo'));
        const {applicantType,applicantName,applicantPhone,applicantUnifiedSocialCode} = caseInfo;
        this.setState({
            getCodeLoading:true
        })
        if(userInfo.role==2){
            ajax.post('agent/author/agentAuthorMsg',{applicantType,name:applicantName,phoneNo:applicantPhone?applicantPhone:this.state.phoneNo,unifiedSocialCode:applicantUnifiedSocialCode?applicantUnifiedSocialCode:null}).then((data)=>{
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
            ajax.get('litigant/case/caseRegisterSmsValid').then((data)=>{
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
    }
    codeClose=()=>{
        this.setState({
            codeFlag:false
        })
    }
    getCode=(fn)=>{
        const {userInfo} = this.props;
        const caseInfo = JSON.parse(cache.getItem('caseInfo'));
        const {applicantType,applicantName,applicantPhone,applicantUnifiedSocialCode} = caseInfo;
        if(userInfo.role==2){
            ajax.post('agent/author/agentAuthorMsg',{applicantType,name:applicantName,phoneNo:applicantPhone?applicantPhone:null,unifiedSocialCode:applicantUnifiedSocialCode?applicantUnifiedSocialCode:null}).then(()=>{fn()})
        }else{
            ajax.get('litigant/case/caseRegisterSmsValid').then(()=>{fn()})
        }
    }
    setCaseInfo=(code,codePhone)=>{
        this.caseInfo.code = code;
        this.caseInfo.codePhone = codePhone;
        this.sendCase();
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const {history,userInfo} = this.props;
        if(history.action=="POP"){
            history.goBack();
        }
        if(userInfo.role==2){
            this.setState({
                agentFlag:true,
                codeSrc:"agent/author/agentAuthorMsgResponse"
            })
        }
    }
    render(){
        const {contentArr,visible,saveLoading,info,codeFlag,sendLoading,getCodeLoading,agentFlag,codeSrc,phoneNo,codeName} = this.state;
        return(
            <div className="my-case-second ant-row">
                <ApplySteps step={1}/>
                <section className="my-case-second-item">
                    {this.getEvidences()}
                    <p className="btn-add-content"><span onClick={this.addEvidence}>添加证据</span></p>
                </section>
                <div className="my-case-buttons">
                    <Button onClick={this.goFirst}>上一步</Button>
                    <Button type="primary" onClick={this.saveDraft} loading={saveLoading}>存草稿</Button>
                    <Button onClick={this.preview} id="btn-preview" type="primary">预览</Button>
                    <Button onClick={this.preview.bind(this,1)} id="btn-preview" type="primary" loading={getCodeLoading} >签名并提交申请书</Button>
                </div>
                <Modal className="preview-modal"
                       title=""
                       width="auto"
                       onCancel={this.ModalClose}
                       footer={[
                       <Button onClick={this.ModalClose}>取消</Button>,
                       <Button type="primary" loading={getCodeLoading} onClick={this.codeShow}>签名并提交申请书</Button>
                       ]}
                       visible={visible}>
                    <ArbitrationPreview info={info} caseEvidences={info?info.caseEvidences:[]} type="apply"/>
                </Modal>
                <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={sendLoading} codeSrc={codeSrc} agentFlag={agentFlag} phoneNo={phoneNo} setCaseInfo={this.setCaseInfo} getCode={this.getCode} name={codeName}/>
            </div>
        )
    }
}
