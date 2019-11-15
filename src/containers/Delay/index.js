import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Row, Col,Button,Modal,message} from 'antd';
import {EditBlock,CodeCheck} from '../../components';
import ajax from '../../utils/ajax'
@withRouter
@connect(
    (state)=>({
        litigantType: state.litigantType
    })
)
export default class Delay extends Component{
    constructor(props){
        super(props);
        const {litigantType} = props;
        let role = 0;
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        this.state={
            loading:false,
            delayReason:'',
            role,
            codeFlag:false,
            getCodeLoading:false,
            phoneNo:'',
            codeName:''
        }
    }
    goBack=()=>{
        const {history}=this.props;
        history.goBack();
    }
    sendCase=()=>{
        const {delayReason} = this.state;
        const {match:{params:{caseId}}} = this.props;
        this.setState({loading:true});
        ajax.post(`/litigant/case/${caseId.split('/')[0]}/delayedReply`,{
            delayReason
        }).then(()=>{
            message.success('提交成功');
            this.goBack();
        }).catch((e)=>{}).finally(()=>{
            this.setState({loading:false});
        })
    };
    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const {role} = this.state;
        const tplId = role==0?1040:1081;
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
        const {match:{params:{caseId}},litigantType} = this.props;
        const {loading,codeFlag,getCodeLoading,phoneNo,role,codeName} = this.state;
        const tplId = role==0?1040:1081;
        const title = litigantType == '0' || litigantType == '3' ? '反请求延期答辩申请':'延期答辩申请';
        return(<section className="edit-page">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <header className="edit-page-title">{title}</header>
                    <EditBlock title="原因" name="delayReason" onChange={this.handleChange}/>
                    <footer className="edit-page-footer">
                        <Button type="primary" ghost onClick={this.goBack}>取消</Button>
                        <Button type="primary" loading={getCodeLoading} onClick={this.codeShow}>提交</Button>
                    </footer>
                </Col>
            </Row>
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={loading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}