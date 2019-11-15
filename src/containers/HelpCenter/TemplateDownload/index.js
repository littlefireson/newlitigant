import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Input, Button, Modal } from 'antd'


export default class TemplateDownload extends Component{
    state = {
        applyFlag:false,
        replyFlag:false
    };
    checkApply=()=>{
        // console.log('apply');
        this.setState({
            applyFlag:true
        })
    }
    checkReply=()=>{
        this.setState({
            replyFlag:true
        })
    }
    modalClose=()=>{
        this.setState({
            applyFlag:false,
            replyFlag:false
        })
    }
    render(){
        const {applyFlag,replyFlag} = this.state;
        return (
            <div className="help-center-content ant-col-20">
                <div className="help-center-content-main template-download">
                    <ul className="template-download-list">
                        <li className="template-download-list-item"><span>仲裁申请书</span><a onClick={this.checkApply}>点击查看</a></li>
                        <li className="template-download-list-item"><span>答辩书</span><a onClick={this.checkReply}>点击查看</a></li>
                    </ul>
                </div>
                <Modal
                    className="my-case-second-preview"
                    title=""
                    width="auto"
                    onCancel={this.modalClose}
                    footer={<Button type="primary" onClick={this.modalClose}>确定</Button>}
                    visible={applyFlag}
                >
                    <div className="my-case-second-preview-application">
                        <h2>仲裁申请书</h2>
                        <div className="my-case-second-preview-application-item">
                            <p>申请人：姓名，性别，民族，xx年xx月xx日出生，身份证号码：xxx</p>
                            <p>住所：xxx</p>
                            <p>被申请人：单位名称</p>
                            <p>住所：xxx</p>
                            <p>法定代表人：姓名，职务：xxx</p>
                        </div>
                        <p className="title">仲裁请求</p>
                        <div className="my-case-second-preview-application-item">
                            <p>1、__________________________________</p>                                                        
                            <p>2、__________________________________</p>
                            <p>3、__________________________________</p>
                        </div>
                        <p className="title">事实与理由</p>
                        <div className="my-case-second-preview-application-item">
                            <p>_______________________________________________________________________________________________</p>
                        </div>
                        <p className="align-left align-left-indent">此致</p>
                        <p className="align-left">海南仲裁委员会</p>
                        <div>
                            <p className="align-right"><span>申请人：xxx</span></p>
                            <p className="align-right"><span>xxxx年xx月xx日</span></p>
                        </div>
                    </div>
                </Modal>
                <Modal
                    className="my-case-second-preview"
                    title=""
                    width="auto"
                    onCancel={this.modalClose}
                    footer={<Button type="primary" onClick={this.modalClose}>确定</Button>}
                    visible={replyFlag}
                >
                    <div className="my-case-second-preview-application">
                        <h2>仲裁答辩书</h2>
                        <div className="my-case-second-preview-application-item">
                            <p>申请人：姓名，性别，民族，xx年xx月xx日出生，身份证号码：xxx，住所：xxx</p>
                            <p>被申请人：单位名称，住所：xxx</p>
                        </div>
                        <p className="title">答辩人与被答辩人xxx关于xxx纠纷一案，依据事实和法律，发表如下答辩意见：</p>
                        <div className="my-case-second-preview-application-item">
                            <p>一、__________________________________</p>                                                        
                            <p>二、__________________________________</p>
                            <p>三、__________________________________</p>
                        </div>
                        <p className="align-left align-left-indent">此致</p>
                        <p className="align-left">海南仲裁委员会</p>
                        <div>
                            <p className="align-right"><span>申请人：xxx</span></p>
                            <p className="align-right"><span>xxxx年xx月xx日</span></p>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}