import React,{Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {Button,Spin} from 'antd';
import ajax from '../../utils/ajax'
import {CodeCheck} from '../../components'

@withRouter
export default class Receipt extends Component{
    constructor(props){
        super(props);
        this.state={
            spinning:false,
            codeFlag:false,
            sendLoading:false,
            getCodeLoading:false,
            phoneNo:'',
            codeName:''
        }
    }
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1054;
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
    componentDidMount(){
        let {match:{params:{caseId}}} = this.props;
        caseId = caseId?caseId.split('/')[0]:'';
        ajax.post(`compromise/operation/${caseId}/protocolDeliver`,{caseId}).then((data)=>{
            this.setState({
                info:data
            })
        })
    }
    render(){
        const {spinning,info,codeFlag,sendLoading,getCodeLoading,phoneNo,codeName} = this.state;
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1054;
        return(<section className="">
            <Spin tip="正在加载..." spinning={spinning}>
            <article className="doc-book">
                <h3>海南仲裁委员会</h3>
                <h2>调解书送达回证</h2>
                <div className="doc-content">
                    <p>被送达人：{info.beDeliver}</p>
                    <p>案号：{info.caseNo}</p>
                    <p>案由：{info.caseType}</p>
                    <p>送达人：{info.deliver}</p>
                    <p>送达日期：{info.applyTime}</p>
                </div>
                <div className="my-case-buttons">
                    <Button onClick={this.props.history.goBack}>返回</Button>
                    <Button type="primary" loading={getCodeLoading} onClick={this.codeShow}>签名</Button>
                </div>
            </article>
            </Spin>
            <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={sendLoading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
        </section>)
    }
}