import React,{Component} from 'react';
import {Row, Col,Button,Modal,message,Form} from 'antd';
import {withRouter} from 'react-router-dom'

import cache from '../../utils/cache'
import ajax from '../../utils/ajax'

import {EditBlock,ArbitrationPreview} from '../../components'

@withRouter
export default class Feedback extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            loading:false,
            feedback:'',
        }
    }
    preview=(val)=>{
        const {feedback} = this.state;
        if(feedback){
            if(val == 1){
                this.sendCase();
            }else{
                this.ModalOpen();
            }
        }else{
            message.error('请输入反馈内容')
        }
    };
    ModalOpen=()=>{
        this.setState({
            visible:true,
        });
    };
    ModalClose=()=>{
        this.setState({
            visible:false
        });
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
        this.setState({[name]:this.deleteBr(value)});
    }
    sendCase=()=>{
        let {caseId} = this.props.match.params;
        caseId = caseId.split('/')[0];
        const {feedback} = this.state;
        ajax({
            url:`case/juris/dis/${caseId}`,
            method:'put',
            data:{
                caseId,
                feedBack:feedback
            }
        }).then(()=>{
            this.props.history.goBack();
        })
    }
    render(){
        const {contentArr,initHtml,loading,visible,feedback} = this.state;
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">管辖权异议回应意见书</header>
                    <EditBlock title="反馈内容" name="feedback" onChange={this.handleChange} initHtml={initHtml}/>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.props.history.goBack}>取消</Button>
                        <Button type="primary" onClick={this.preview}>预览</Button>
                        <Button type="primary" onClick={this.preview.bind(this,1)}>提交</Button>
                    </footer>
                    <Modal className="preview-modal"
                        title=""
                        width="auto"
                        onCancel={this.ModalClose}
                        footer={[
                            <Button onClick={this.ModalClose}>取消</Button>,
                            <Button type="primary" loading={loading} onClick={this.sendCase}>提交</Button>
                        ]}
                        visible={visible}>
                        <ArbitrationPreview info={feedback} type="feedback"/>
                    </Modal>
                </Col>
            </Row>
        </section>)
    }
}