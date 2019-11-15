import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Row, Col,Button,Modal,message} from 'antd';
import {ArbitrationPreview,CodeCheck,EditBlock} from '../../components';
import ajax from '../../utils/ajax'

@withRouter
@connect(state=>({
    litigantType:state.litigantType
}))
export default class AlterApply extends Component{
    constructor(props){
        super(props);
        const {litigantType} = props;
        let role = 0; //申请人为0   被申请人为1
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        this.state={
            visible:false,
            loading:false,
            getCodeLoading:false,
            role,
            phoneNo:'',
            codeName:'',
            info:{
                changeRequest:'',
                factReason:'',
                caseEvidences:[]
            }
        }
    }
    preview=(val)=>{
        const {info:{changeRequest,factReason}} = this.state;
        let caseId = this.props.match.params.caseId;
        if(caseId.indexOf('/') != -1){
            caseId = caseId.split('/')[0];
        }
        if(changeRequest){
            if(factReason){
                this.setState({
                    info:{
                        changeRequest,
                        factReason
                    }
                })
                if(val == 1){
                    this.codeShow();
                }else{
                    this.ModalOpen();
                }
                
            }else{
                message.error('请输入事实与理由');
            }
        }else{
            message.error('请输入变更申请事项');
        }
    }
    ModalOpen=()=>{
        this.setState({
            visible:true,
        });
    };
    ModalClose=()=>{
        this.setState({visible:false});
    };
    goBack=()=>{
        const {history}=this.props;
        history.goBack();
    }
    sendCase=()=>{
        const {info:{changeRequest,factReason}} = this.state;
        const {match:{params:{caseId}}} = this.props;
        this.setState({loading:true});
        ajax.post('/case/change',{
            caseId:caseId.split('/')[0],
            changeRequest,
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
        let {info} = this.state;
        info[name] = this.deleteBr(value);
        this.setState({
            info
        })
    }
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const {role} = this.state;
        const tplId = role==0?1026:1073;
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
        const {match:{params:{caseId}}} = this.props;
        const {info,visible,loading,codeFlag,role,getCodeLoading,phoneNo,codeName} = this.state;
        const title = role==0?"变更仲裁请求申请书":'变更仲裁反请求申请书';
        const tplId = role==0?1026:1073;
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">{title}</header>
                    <EditBlock title="变更申请事项" name="changeRequest" onChange={this.handleChange}/>
                    <EditBlock title="事实与理由" name="factReason" onChange={this.handleChange}/>
                    {/* <CkEditor title="变更申请事项" name="changeRequest" onChange={this.handleChange}/>
                    <CkEditor title="事实与理由" name="factReason" onChange={this.handleChange}/> */}
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
                onCancel={this.ModalClose}
                visible={visible}
                footer={[
                    <Button onClick={this.ModalClose}>取消</Button>,
                    <Button type="primary" loading={getCodeLoading} onClick={this.codeShow}>签字并提交</Button>
                ]}>
                <ArbitrationPreview type="change" title={title} info={info} changeRequest={info.changeRequest} factReason={info.factReason}/>
            </Modal>
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={1} tplId={tplId} caseId={caseId} name={codeName}/>
    </section>)
    }
}