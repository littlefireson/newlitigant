import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import {Row, Col,Button,Modal,message} from 'antd';
import {EditBlock,DocHeader} from '../../components';
import ajax from '../../utils/ajax'
import cache from '../../utils/cache'
@withRouter
@connect(state=>({
    litigantType:state.litigantType
}))
export default class Suspension extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            loading:false,
            requestItem:'',
            factReason:''
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
        const {factReason,requestItem} = this.state;
        const {match:{params:{caseId}},history} = this.props;
        if(factReason && requestItem){
            this.setState({loading:true});
            ajax.post('/litigant/case/caseBreakOff',{
                caseId:caseId.split('/')[0],
                requestItem,
                factReason
            }).then(()=>{
                message.success('提交成功');
                this.goBack();
            }).catch((e)=>{
            }).finally(()=>{
                this.setState({loading:false});
            })
        }else{
            message.error('申请事项和事实与理由不能为空');
        }
    };
    preview=(val)=>{
        const {requestItem,factReason} = this.state;
        if(requestItem){
            if(requestItem){
                if(val==1){
                    this.sendCase()
                }else{
                    this.setState({visible:true})
                }
            }else{
                message.error('请输入事实与理由')
            }
        }else{
            message.error('请输入申请事项')
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
    render(){
        const {requestItem,factReason,visible,loading} = this.state;
        const {litigantType} = this.props;
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
                    <header className="edit-page-title">中止申请书</header>
                    <EditBlock title="申请事项" name="requestItem" onChange={this.handleChange}/>
                    <EditBlock title="事实与理由" name="factReason" onChange={this.handleChange}/>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.goBack}>返回</Button>
                        <Button type="primary" onClick={this.preview}>预览</Button>
                        <Button type="primary" onClick={this.preview.bind(this,1)}>提交申请书</Button>
                    </footer>
                </Col>
            </Row>
            <Modal className="preview-modal"
                   title=""
                   width="auto"
                   confirmLoading={loading}
                   onOk={this.sendCase}
                   onCancel={this.ModalClose}
                   okText="提交申请书"
                   cancelText="取消"
                   visible={visible}>
                <article className="book">
                    <h2>中止申请书</h2>
                    <DocHeader proposer={proposer} defendant={defendant} role={role}/>
                    <h3>申请事项</h3>
                    <div dangerouslySetInnerHTML={{__html:requestItem}}></div>
                    <h3>事实与理由</h3>
                    <div dangerouslySetInnerHTML={{__html:factReason}}></div>
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
    </section>)
    }
}