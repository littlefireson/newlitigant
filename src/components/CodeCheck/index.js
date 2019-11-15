import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {message,Modal,Form,Input,Button,Row,Col} from 'antd';
const FormItem = Form.Item;

import {TimeBtn} from '../index'

import ajax from '../../utils/ajax'

@withRouter
export default class CodeCheck extends Component{
    constructor(props) {
        super(props);
        this.state={
            checkLoading:false
        }
    };

    checkCode=()=>{
        const codeNum = this.refs.code.refs.input.value;
        const {match:{params:{caseId}},codeSrc,phoneNo,setCaseInfo} = this.props;
        if(codeNum){
            if(codeSrc){
                setCaseInfo(codeNum,phoneNo);
            }else{
                ajax.get('litigant/case/smsResponse',{
                    params:{caseId:caseId?caseId.split('/')[0]:'',messageCode:codeNum}
                }).then(()=>{
                    this.checkSuccess();
                })
            }
        }else{
            message.error('请输入手机验证码');
        }
    };

    checkSuccess=()=>{
        const codeNum = this.refs.code.refs.input.value;
        const {sendMsg,codeFlag} = this.props;
        if(codeFlag=='撤案'){
            sendMsg(codeNum);
        }else{
            sendMsg();
        }
        
    };

    codeClose=()=>{
        const {ModalClose} = this.props;
        this.refs.code.refs.input.value='';
        ModalClose();
    };

    getCode=(e,text)=>{
        const {codeSrc} = this.props;
        e.refs.timeBtn.changeDisableCode("正在发送验证码");
        if(codeSrc){
            const {getCode} = this.props;
            getCode(e.refs.timeBtn.timer);
        }else{
            const {caseId,tplId,tplType} = this.props;
            ajax.get('litigant/case/validSms',{params:{caseId:caseId.split('/')[0],tplId,tplType}
            }).then(()=>{
                e.refs.timeBtn.timer();
            }).catch(()=>{
                e.refs.timeBtn.changeAbleCode(text);
            })
        }
    };

    componentWillReceiveProps(props){
        const {sendLoading} = props;
        this.setState({
            checkLoading:sendLoading
        })
    };

    render(){
        const {visible,agentFlag=false,phoneNo='',name='',codeFlag} = this.props;
        console.log(this.props);
        const {checkLoading} = this.state;
        const item = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            }
        };
        const item1 = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 }
            }
        };
        return(
            <Modal
                width={600}
                className="code-check"
                closable={false}
                title={agentFlag?"授权验证码":"验证码验证"}
                visible={visible}
                okText="确定"
                footer={[
                    <Button onClick={this.codeClose}>取消</Button>,
                    <Button type="primary" loading={checkLoading} onClick={()=>{
                        codeFlag=='撤案'?this.checkSuccess():
                    this.checkCode()}}>确定</Button>
                ]}
            >
            <Form>
                <FormItem {...item1} label="" >
                    <p>短信已发送至{name}手机号为{phoneNo}的手机上，请注意查收。</p>
                </FormItem>
                {agentFlag?<FormItem {...item} label="授权验证码">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input placeholder="请输入授权验证码" ref="code" maxLength="6" />
                        </Col>
                        <Col span={12}>
                        <TimeBtn thisClass="get-code" thisClick={this.getCode.bind(null,this,"获取授权验证码")} thisTime={60} ref="timeBtn" txt="获取授权验证码"/>
                        </Col>
                    </Row>
                </FormItem>:
                <FormItem {...item} label="短信验证码">
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input placeholder="请输入短信验证码" ref="code" maxLength="6" className="ant-col-16" />
                        </Col>
                        <Col span={12}>
                        <TimeBtn thisClass="" thisClick={this.getCode.bind(null,this,"获取短信验证码")} thisTime={60} ref="timeBtn" txt="获取短信验证码" hasSend={true}/>
                        </Col>
                    </Row>
                </FormItem>}
            </Form>
            </Modal>
        )
    }
}