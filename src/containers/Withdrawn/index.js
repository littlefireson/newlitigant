import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col,Button,Modal,message} from 'antd';
import {EditBlock,CodeCheck} from '../../components';
import ajax from '../../utils/ajax'
import cache from '../../utils/cache'
@withRouter
@connect(state=>({
    litigantType:state.litigantType
}))
export default class Withdrawn extends Component{
    constructor(props){
        super(props);
        const {litigantType} = props;
        let role = 0;
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        this.state={
            visible:false,
            loading:false,
            application:'',
            reason:'',
            role,
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
        const {reason} = this.state;
        if(reason){
            if(val == 1){
                this.codeShow();
            }else{
                this.setState({visible:true})
            }
        }else{
            message.error('理由不能为空');
        }
        
    }
    sendCase=(codeNum)=>{
        const {reason} = this.state;
        const {match:{params:{caseId}},history} = this.props;
        if(reason){
            this.setState({loading:true});
            ajax.post('/case/withdraw',{
                caseId:caseId.split('/')[0],
                reason,
                messageCode:codeNum
            }).then(()=>{
                message.success('提交成功');    
                this.goBack();
            }).catch((e)=>{
            }).finally(()=>{
                this.setState({loading:false});
            })
        }else{
            message.error('理由不能为空');
        }
        
    };
    deleteBr=(string)=>{
        string = string.replace(/<[^>]+>/g,'');
        return string
    }
    handleChange=(name,value)=>{
        this.setState({
            [name]:this.deleteBr(value)
        })
    }
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const {role} = this.state;
        const tplId = role==0?1024:1071;
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
        const {application,reason,visible,loading,getCodeLoading,codeFlag,role,phoneNo,codeName} = this.state;
        const {match:{params:{caseId}}} = this.props;
        const tplId = role==0?1024:1071;
        const {caseNo} = JSON.parse(cache.getItem('commInfo')).info;
        const {proposer,defendant} = JSON.parse(cache.getItem('baseInfo'));
        let thisDate = new Date();
        thisDate = `${thisDate.getFullYear()}年${thisDate.getMonth()+1}月${thisDate.getDate()}日`;
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">撤回仲裁{role==1?'反':''}请求申请书</header>
                    <EditBlock title={`针对贵会受理的${caseNo}案，我方请求撤回仲裁${role==1?'反':''}请求。理由是：`} name="reason" onChange={this.handleChange}/>
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
                   confirmLoading={getCodeLoading}
                   onOk={this.codeShow}
                   onCancel={this.ModalClose}
                   okText="提交申请书"
                   cancelText="取消"
                   visible={visible}>
                <article className="book">
                    <h2>撤回仲裁{role==1?'反':''}请求申请书</h2>
                    <p>海南仲裁委员会：</p>
                    <h3>针对贵会受理的{caseNo}案，我方请求撤回仲裁{role==1?'反':''}请求。理由是：</h3>
                    <div dangerouslySetInnerHTML={{__html:reason}}></div>
                    <footer>
                        <p>此致</p>
                        <p>海南仲裁委员会</p>
                        <aside>
                            <p>{role==1?defendant.name:proposer.name} </p>
                            <p>{thisDate}</p>
                        </aside>
                    </footer>
                </article>
            </Modal>
            <CodeCheck visible={codeFlag} codeFlag={'撤案'} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={1} tplId={tplId} caseId={caseId} name={codeName}/>
    </section>)
    }
}