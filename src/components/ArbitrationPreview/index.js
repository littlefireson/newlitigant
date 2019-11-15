import React, {Component} from 'react'
import { Table, Button } from 'antd'
import {connect} from 'react-redux';
import ajax,{baseURL} from '../../utils/ajax'
import cache from '../../utils/cache'

import DocHeader from '../DocHeader/index'

const dataColumns = [{
    title: '证据序号',
    dataIndex: 'evidenceNumber',
    key: 'evidenceNumber'
},{
    title: '证据材料',
    dataIndex: 'evidenceMat',
    key: 'evidenceMat'
},{
    title: '证据目的',
    dataIndex: 'purposeEvidence',
    key: 'purposeEvidence'
},{
    title: '证据来源',
    dataIndex: 'sourceEvidence',
    key: 'sourceEvidence'
}];

const fileSrc = require('../../assets/images/upload-file.png');

@connect((state)=>({
    litigantType: state.litigantType,
    userInfo:state.userInfo
}))
export default class ArbitrationPreview extends Component{
    constructor(props){
        super(props);
        const baseInfo = JSON.parse(cache.getItem('baseInfo')) || {};
        this.date = new Date();
        this.date = `${this.date.getFullYear()}年${this.date.getMonth()+1}月${this.date.getDate()}日`;
        this.state = {
            autograph:props.autograph || 'true',
            baseInfo
        }
    }
    // 生成证据清单列表
    createSource=()=>{
        const {caseEvidences} = this.props;
        const dataSource = [];
        for(let i in caseEvidences){
            let obj = caseEvidences[i];
            obj.key = i;
            obj.evidenceNumber = i*1+1;
            if(obj.sourceEvidence == undefined){
                obj.sourceEvidence = '--';
            }
            dataSource.push(obj);
        }
        return dataSource;
    };
    // 获取内容
    getContent=(type)=>{
        const {baseInfo} = this.state;
        const {autograph=true,litigantType,info,userInfo} = this.props;
        let role = 0; //申请人为0   被申请人为1
        if(litigantType==1 || litigantType==4){
            role = 1;
        }
        const {
            proposer={},
            defendant={},
            signTime
        } = baseInfo
        if(type=='apply'){
            return (<div>
                {userInfo.role==2&&<div>
                    <h2>授权委托书</h2>
                    <div className="my-case-second-preview-application-item">
                    {info.applicantType==0 && <div>
                        <p>委托人：{info.applicantName}，{info.applicantSex==0||info.applicantSex==1?info.applicantSex=='1'?'女，':'男，':''}{info.applicantEthnic?info.applicantEthnic.replace(/族/g,'')+'族，':''}{info.applicantBirthday.substring(0,4)}年{info.applicantBirthday.substring(4,6)}月{info.applicantBirthday.substring(6)}日生{info.applicantCardId?'，身份证号码：'+info.applicantCardId:''}</p>
                        {info.applicantAddress?<p>住所：{info.applicantAddress}</p>:''}
                    </div>}
                    {info.applicantType==1 && <div>
                        <p>委托人：{info.applicantName}</p>
                        {info.applicantAddress?<p>住所：{info.applicantAddress}</p>:''}
                        <p>法定代表人：{info.applicantCertName}{info.applicantCertDuties?'，职务：'+info.applicantCertDuties:''}</p>
                    </div>}
                        {!info.duties?<p>代理人：{info.agentInfo.applicantName}，{info.agentInfo.applicantSex==0?'男':'女'}，{info.agentInfo.applicantEthnic.replace(/族/g,'')}族，{info.agentInfo.applicantBirthday.substring(0,4)}年{info.agentInfo.applicantBirthday.substring(4,6)}月{info.agentInfo.applicantBirthday.substring(6)}日生，身份证号：{info.agentInfo.applicantCardId}</p>:''}
                        {!info.agentInfo.applicantAddress&&<p>住所：{info.agentInfo.applicantAddress}</p>}
                        {info.duties&&<p>代理人：{info.agentInfo.applicantName}，{info.duties}律师</p>}
                    </div>
                    <div className="my-case-second-preview-application-item">
                        <p>现委托{info.agentInfo.applicantName}在我方与{info.beApplicantName}{info.caseType?`关于${info.caseType}`:''}一案中 ，作为我方仲裁代理人。</p>
                    </div>
                    <div className="my-case-second-preview-application-item">
                        <p>代理人{info.agentInfo.applicantName}的代理权限为：</p>
                        {info.agentType==1&&<p>一般授权。</p>}
                        {info.agentType==2&&<p>特别授权：包括代为提起、承认、放弃、变更仲裁请求或仲裁反请求，进行和解，代为签收调解书，必须有委托人特别授权。</p>}
                    </div>
                    <p className="align-right"><span>委托人：{info.applicantName}</span></p>
                    <p className="align-right"><span>{this.date}</span></p>
                    <p className="align-left note-tips">注：根据本会《互联网金融仲裁规则》的规定，代理人代为提起、承认、放弃、变更仲裁请求或仲裁反请求，进行和解，签收调解书，必须有委托人特别授权。</p>
                </div>}
                <h2>仲裁申请书</h2>
                <div className="my-case-second-preview-application-item">
                    {info.applicantType==0 && <div>
                        <p>申请人：{info.applicantName}，{info.applicantSex==0||info.applicantSex==1?info.applicantSex=='1'?'女，':'男，':''}{info.applicantEthnic?info.applicantEthnic.replace(/族/g,'')+'族，':''}{info.applicantBirthday.substring(0,4)}年{info.applicantBirthday.substring(4,6)}月{info.applicantBirthday.substring(6)}日生{info.applicantCardId?'，身份证号：'+info.applicantCardId:''}</p>
                        {info.applicantAddress?<p>住所：{info.applicantAddress}</p>:''}
                    </div>}
                    {info.applicantType==1 && <div>
                        <p>申请人：{info.applicantName}{info.applicantUnifiedSocialCode?<span>，社会统一信用代码：{info.applicantUnifiedSocialCode}</span>:''}</p>
                        {info.applicantAddress?<p>住所：{info.applicantAddress}</p>:''}
                        <p>法定代表人：{info.applicantCertName}{info.applicantCertDuties?'，职务：'+info.applicantCertDuties:''}</p>
                    </div>}

                    {info.beApplicantType==0 && <div>
                        <p>被申请人：{info.beApplicantName}，{info.beApplicantSex==0||info.beApplicantSex==1?info.beApplicantSex=='1'?'女，':'男，':''}{info.beApplicantEthnic?info.beApplicantEthnic.replace(/族/g,'')+'族，':''}{info.beApplicantBirthday.substring(0,4)}年{info.beApplicantBirthday.substring(4,6)}月{info.beApplicantBirthday.substring(6)}日生{info.beApplicantCardId?'，身份证号：'+info.beApplicantCardId:''}</p>
                        {info.beApplicantAddress?<p>住所：{info.beApplicantAddress}</p>:''}
                    </div>}
                    {info.beApplicantType==1 &&
                    <div>
                        <p>被申请人：{info.beApplicantName}</p>
                        {info.beApplicantAddress?<p>住所：{info.beApplicantAddress}</p>:''}
                        <p>法定代表人：{info.beApplicantCertName}{info.beApplicantCertDuties?'，职务：'+info.beApplicantCertDuties:''}</p>
                    </div>}
                </div>
                <p className="title">仲裁请求</p>
                <div className="my-case-second-preview-application-item"  dangerouslySetInnerHTML={{__html: info.arbClaim}}></div>
                <p className="title">事实与理由</p>
                <div className="my-case-second-preview-application-item"  dangerouslySetInnerHTML={{__html: info.fact}}></div>
                <p className="align-left align-left-indent">此致</p>
                <p className="align-left">海南仲裁委员会</p>
                {autograph&&<div>
                    <p className="align-right"><span>申请人：{info.applicantName}</span></p>
                    <p className="align-right"><span>{this.date}</span></p>
                </div>}
            </div>);
        }else if(type=='reply'){
            const {replyContent} = this.props;
            return (<div>
                <h2>仲裁{role==0?'反请求':''}答辩书</h2>
                <div className="my-case-second-preview-application-item">
                    <DocHeader proposer={proposer} defendant={defendant} role={role} replyFlag={true} />
                </div>
                <div className="my-case-second-preview-application-item">
                    <p>答辩人与被答辩人{role==0?defendant.name:proposer.name}关于{info.caseNo}一案，依据事实和法律，发表如下答辩意见：</p>
                    <div dangerouslySetInnerHTML={{__html: replyContent}}></div>
                </div>
                <p className="align-left align-left-indent">此致</p>
                <p className="align-left">海南仲裁委员会</p>
                <p className="align-right"><span>答辩人：{role==1?defendant.name:proposer.name}</span></p>
                <p className="align-right"><span>{this.date}</span></p>
            </div>);
        }else if(type=='thisReply'){
            return (<div>
                <h2>仲裁答辩书</h2>
                <div className="my-case-second-preview-application-item">
                    <DocHeader proposer={proposer} defendant={defendant} oppositeFlag={true} replyFlag={true} />
                </div>
                <div className="my-case-second-preview-application-item">
                    <p>答辩人与被答辩人{proposer.name}关于{info.caseNo}一案，依据事实和法律，发表如下答辩意见：</p>
                    <div dangerouslySetInnerHTML={{__html: info.replyContent}}></div>
                </div>
                <p className="align-left align-left-indent">此致</p>
                <p className="align-left">海南仲裁委员会</p>
                <p className="align-right"><span>答辩人：{defendant.name}</span></p>
                <p className="align-right"><span>{this.date}</span></p>
            </div>);
        }else if(type=='backReply'){
            return (<div>
                <h2>仲裁反请求答辩书</h2>
                <div className="my-case-second-preview-application-item">
                    <DocHeader proposer={proposer} defendant={defendant} replyFlag={true} />
                </div>
                <div className="my-case-second-preview-application-item">
                    <p>答辩人与被答辩人{defendant.name}关于{info.caseNo}一案，依据事实和法律，发表如下答辩意见：</p>
                    <div dangerouslySetInnerHTML={{__html: info.replyContent}}></div>
                </div>
                <p className="align-left align-left-indent">此致</p>
                <p className="align-left">海南仲裁委员会</p>
                <p className="align-right"><span>答辩人：{proposer.name}</span></p>
                <p className="align-right"><span>{this.date}</span></p>
            </div>);
        }else if(type=='reverse'){
            return (<div>
                <h2>仲裁反请求申请书</h2>
                <DocHeader proposer={proposer} defendant={defendant} oppositeFlag={true} counterFlag={true}/>
                <p className="title">反请求事项</p>
                <div className="my-case-second-preview-application-item"  dangerouslySetInnerHTML={{__html: info.arbClaim}}></div>
                <p className="title">事实与理由</p>
                <div className="my-case-second-preview-application-item"  dangerouslySetInnerHTML={{__html: info.fact}}></div>
                <p className="align-left align-left-indent">此致</p>
                <p className="align-left">海南仲裁委员会</p>
                <p className="align-right"><span>申请人：{defendant.name}</span></p>
                <p className="align-right"><span>{this.date}</span></p>
            </div>);
        }else if(type=='change'){
            const title = this.props.title;
            return (<div>
                <h2>{title}</h2>
                <DocHeader proposer={proposer} defendant={defendant} role={role}/>
                <p className="title" key='title1'>申请事项</p>
                <div className="my-case-second-preview-application-item"  dangerouslySetInnerHTML={{__html: info.changeRequest}}></div>
                <p className="title" key='title2'>事实与理由</p>
                <div className="my-case-second-preview-application-item"  dangerouslySetInnerHTML={{__html: info.factReason}}></div>
                <p className="align-left align-left-indent" key='title3'>此致</p>
                <p className="align-left" key='title4'>海南仲裁委员会</p>
                <p className="align-right" key='title5'><span>申请人：{role==0?proposer.name:defendant.name}</span></p>
                <p className="align-right" key='title6'><span>{this.date}</span></p>
            </div>)
        }else if(type=='entrust'){
            if(info.oppositeName){
                return (<div>
                    <h2>授权委托书</h2>
                    <div className="my-case-second-preview-application-item">
                        {info.clientele.type == '0'?
                           <p>委托人：{info.clientele.name}，{info.clientele.sex}，{info.clientele.ethnic?`${info.clientele.ethnic.replace(/族/g,'')}族，`:''}{info.clientele.birthday.substring(0,4) || ''.substring(0,4)}年{info.clientele.birthday.substring(4,6) ||''.substring(4,6)}月{info.clientele.birthday.substring(6) || ''.substring(6)}日生，身份证号码：{info.clientele.cardId} </p> : <p>委托人：{info.clientele.name}</p>
                        }
                        {info.clientele.address&&<p>住所：{info.clientele.address}</p>}
                        {!info.caseDocAgent.duties?<p>代理人：{info.caseDocAgent.name}，{info.caseDocAgent.sex}，{info.caseDocAgent.ethnic.replace(/族/g,'')}族，{info.caseDocAgent.birthday.substring(0,4)}年{info.caseDocAgent.birthday.substring(4,6)}月{info.caseDocAgent.birthday.substring(6)}日生，身份证号：{info.caseDocAgent.cardId}</p>:''}
                        {!info.caseDocAgent.address?<p>住所：{info.caseDocAgent.address}</p>:''}
                        {info.caseDocAgent.duties?<p>代理人：{info.caseDocAgent.name}，{info.caseDocAgent.duties}律师</p>:''}
                    </div>
                    <div className="my-case-second-preview-application-item">
                        <p>现委托{info.caseDocAgent.name}在我方与{info.oppositeName}{info.caseType?`关于${info.caseType}`:''}一案中 ，作为我方仲裁代理人。</p>
                    </div>
                    <div className="my-case-second-preview-application-item">
                        <p>代理人{info.caseDocAgent.name}的代理权限为：</p>
                        {info.agentType==1&&<p>一般授权。</p>}
                        {info.agentType==2&&<p>特别授权：包括代为提起、承认、放弃、变更仲裁请求或仲裁反请求，进行和解，代为签收调解书，必须有委托人特别授权。</p>}
                    </div>
                    <p className="align-right"><span>委托人：{info.clientele.name}</span></p>
                    <p className="align-right"><span>{info.inscribeTime}</span></p>
                    <p className="align-left note-tips">注：根据本会《互联网金融仲裁规则》的规定，代理人代为提起、承认、放弃、变更仲裁请求或仲裁反请求，进行和解，签收调解书，必须有委托人特别授权。</p>
                </div>)
            }else{
                return ''
            }
        }else if(type=='feedback'){
            return (<div>
                <h2>管辖权异议回应意见书</h2>
                <p className="title">针对{role==0?'被申请人':'申请人'}提出的管辖权异议，我方发表如下回应意见：</p>
                <div className="my-case-second-preview-application-item" dangerouslySetInnerHTML={{__html: info}}></div>
                <p className="align-left align-left-indent">此致</p>
                <p className="align-left">海南仲裁委员会</p>
                <p className="align-right"><span>申请人：{role==0?proposer.name:defendant.name}</span></p>
                <p className="align-right"><span>{this.date}</span></p>
            </div>)
        }else{
            return(<div>type不可识别</div>)
        }
    }
    isImage=(type)=>{
        if(type !=null){
            if(type.indexOf('image/') != -1){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    getList=()=>{
        const {info} = this.props;
        const token = cache.getItem('token');
        return info.caseEvidences.map((item,index)=>(
            <li key={index}>
                <a href={`${baseURL}public/file/downloads?id=${item.fileId}&access_token=${token}`}>
                    <img src={this.isImage(item.docType)?`${baseURL}public/file/downloads?id=${item.fileId}&access_token=${token}`:fileSrc} title={item.evidenceMat} alt={item.evidenceMat}/>
                </a>
                <span className="evidence-mat" title={item.evidenceMat}>{item.evidenceMat}</span>
            </li>
        ))
    }
    render(){
        this.dataSource = this.createSource();
        const {type} = this.props;
        return (
            <div className="my-case-second-preview">
                <div className="my-case-second-preview-application">
                    {this.getContent(type)}
                </div>
                {/* {type=="apply"&&<div className="my-case-second-preview-application">
                    {this.getContent('entrust')}
                </div>} */}
                {this.dataSource.length?<div className="my-case-second-preview-details">
                    <div className="my-case-second-preview-details-item">
                        <h3>证据清单</h3>
                        <Table columns={dataColumns} dataSource={this.dataSource} pagination={false}/>
                        <h4>证据</h4>
                        <ul className="evidence-list clearfix">
                            {this.getList()}
                        </ul>
                    </div>
                </div>:''}
            </div>
        )
    }
}
