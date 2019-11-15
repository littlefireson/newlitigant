import React,{Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom';
import {Tabs,Button,Table,Spin,Input} from 'antd';
import ajax from '../../utils/ajax'
import cache from '../../utils/cache'
const TabPane = Tabs.TabPane;
// const operations = <Button type="primary" >添加举证材料</Button>;
const fileImage = require('../../assets/images/upload-file.png');

const columns = [{
    title: '证据序号',
    dataIndex: 'no',
    key:'no',
    render: (text, record, index) =>(index+1),
}, {
    title: '证据材料',
    dataIndex: 'evidenceMat',
    key:'evidenceMat',
}, {
    title: '证明目的',
    dataIndex: 'purposeEvidence',
    key:'purposeEvidence',
}, {
    title: '提交时间',
    dataIndex: 'createTime',
    key:'createTime',    
}, {
    title: '证据来源',
    dataIndex: 'sourceEvidence',
    key:'sourceEvidence',
}];
@withRouter
@connect((state)=>({
    litigantType:state.litigantType
}))
export default class Quote extends Component{
    constructor(props){
        super(props);
        this.state={
            //被申请人本请求
            defendantEvidencesOrgi:[],
            //申请人本请求
            proposerEvidencesOrgi:[],
            //被申请人反请求
            defendantEvidencesOppo:[],
            //申请人反请求
            proposerEvidencesOppo:[],
            spinning:true,
            disabled:false,
            defendantTab:null,
            proposerTab:null,
            deDisabled:true,
        }
    }
    handleClick=(type)=>{
        const {location,history} = this.props;
        history.push(`${location.pathname}/addProof?${type}`);
    }
    queryClick =(clickIndex,sort,type,e)=>{
        let evidences = this.state[sort+'Evidences'+type];
        let arr = [];
        evidences.map((item,index)=>{
            if(clickIndex == index){
                item.queryFlag = false;
            }
            arr.push(item);
        })
        this.setState({
            [sort+'Evidences'+type]:arr
        })
    }
    submitQuery=(id,prevName,type)=>{
        const caseId = this.props.match.params.caseId;
        const oppugnEvidence = document.getElementById(prevName+id).value;
        let evidences = this.state[prevName+'Evidences'+type];
        ajax({
            url:`case/evidence/${caseId}`,
            method:'put',
            data:{
                caseId,
                id,
                oppugnEvidence
            }
        }).then(()=>{
            let arr = [];
            evidences.map((item,index)=>{
                if(item.id == id){
                    item.oppugnEvidence = oppugnEvidence;
                    item.queryFlag = true;
                }
                arr.push(item);
            })
            this.setState({
                [prevName+'Evidences'+type]:arr
            })
        })
    }
    backClick=(clickIndex,sort,type,e)=>{
        let evidences = this.state[sort+'Evidences'+type];
        let arr = [];
        evidences.map((item,index)=>{
            if(clickIndex == index){
                item.backFlag = false;
            }
            arr.push(item);
        })
        this.setState({
            [sort+'Evidences'+type]:arr
        })
    }
    submitBack=(id,prevName,type)=>{
        const caseId = this.props.match.params.caseId;
        const oppugnBack = document.getElementById(prevName+'Back'+id).value;
        let evidences = this.state[prevName+'Evidences'+type];
        ajax({
            url:`case/evidence/${caseId}/oppugnBack`,
            method:'put',
            data:{
                caseId,
                id,
                oppugnBack
            }
        }).then(()=>{
            let arr = [];
            evidences.map((item,index)=>{
                if(item.id == id){
                    item.oppugnBack = oppugnBack;
                    item.backFlag = true;
                }
                arr.push(item);
            })
            this.setState({
                [prevName+'Evidences']:arr
            })
        })
    }
    getDefendantEvidencesOrgi=()=>{
        const {defendantEvidencesOrgi} = this.state;
        const {litigantType} = this.props;
        const token = cache.getItem('token');
        return defendantEvidencesOrgi.map((item,index)=>(
            <li key={index} className="quote-evidences">
                <a href={`${item.fileId}&access_token=${token}`}>
                    <img src={item.type && item.type.indexOf('image') == -1?fileImage:`${item.fileId}&access_token=${token}`} alt={item.evidenceMat} title={item.evidenceMat}/>
                </a>
                <span className="evidence-mat" title={item.evidenceMat}>{item.evidenceMat}</span>
                {item.oppugnEvidence&&<p className="show-query">
                    <span className="vertical-span"></span>
                    <span className="query-wrapper">
                        <b>{litigantType==0 ||  litigantType==3?'我方':'对方'}质证：</b><i>{item.oppugnEvidence}</i><br/>
                        {item.oppugnBack&&<span>
                            <b>{litigantType==1 ||  litigantType==4?'我方':'对方'}回复质证：</b><i>{item.oppugnBack}</i>
                        </span>}
                    </span>
                </p>}
                
                {(litigantType==0 ||  litigantType==3) && !item.oppugnEvidence && item.queryFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.queryClick.bind(this,index,'defendant','Orgi')}>质证</Button></p>:''}
                {(litigantType==0 ||  litigantType==3) && !item.oppugnEvidence && !item.queryFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'defendant'+item.id} type="text" maxLength="100"/><Button onClick={this.submitQuery.bind(this,item.id,'defendant','Orgi')}>确定</Button></p>:''}
                {(litigantType==1 ||  litigantType==4) && item.oppugnEvidence && !item.oppugnBack && item.backFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.backClick.bind(this,index,'defendant','Orgi')}>回复质证</Button></p>:''}
                {(litigantType==1 ||  litigantType==4) && item.oppugnEvidence && !item.oppugnBack && !item.backFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'defendantBack'+item.id} type="text" maxLength="100"/><Button onClick={this.submitBack.bind(this,item.id,'defendant','Orgi')}>确定</Button></p>:''}
            </li>
        ))
    }
    getProposerEvidencesOrgi=()=>{
        const {proposerEvidencesOrgi} = this.state;
        const {litigantType} = this.props;
        const token = cache.getItem('token');
        return proposerEvidencesOrgi.map((item,index)=>(
            <li key={index} className="quote-evidences">
                <a href={`${item.fileId}&access_token=${token}`}>
                    <img src={item.type && item.type.indexOf('image') == -1?fileImage:`${item.fileId}&access_token=${token}`} alt={item.evidenceMat} title={item.evidenceMat}/>
                </a>
                <span className="evidence-mat" title={item.evidenceMat}>{item.evidenceMat}</span>
                {item.oppugnEvidence&&<p className="show-query"><span className="vertical-span"></span>
                    <span className="vertical-span"></span>
                    <span className="query-wrapper">
                        <b>{litigantType==0 ||  litigantType==3?'对方':'我方'}质证：</b><i>{item.oppugnEvidence}</i><br/>
                        {item.oppugnBack&&<span>
                            <b>{litigantType==1 ||  litigantType==4?'对方':'我方'}回复质证：</b><i>{item.oppugnBack}</i>
                        </span>}
                    </span>
                </p>}
                {(litigantType==1 ||  litigantType==4) && !item.oppugnEvidence && item.queryFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.queryClick.bind(this,index,'proposer','Orgi')}>质证</Button></p>:''}
                {(litigantType==1 ||  litigantType==4) && !item.oppugnEvidence && !item.queryFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'proposer'+item.id} type="text"  maxLength="100" /><Button onClick={this.submitQuery.bind(this,item.id,'proposer','Orgi')}>确定</Button></p>:''}
                {(litigantType==0 ||  litigantType==3) && item.oppugnEvidence && !item.oppugnBack && item.backFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.backClick.bind(this,index,'proposer','Orgi')}>回复质证</Button></p>:''}
                {(litigantType==0 ||  litigantType==3) && item.oppugnEvidence && !item.oppugnBack && !item.backFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'proposerBack'+item.id} type="text" maxLength="100"/><Button onClick={this.submitBack.bind(this,item.id,'proposer','Orgi')}>确定</Button></p>:''}
            </li>
        ))
     }
     getDefendantEvidencesOppo=()=>{
        const {defendantEvidencesOppo} = this.state;
        const {litigantType} = this.props;
        const token = cache.getItem('token');
        return defendantEvidencesOppo.map((item,index)=>(
            <li key={index} className="quote-evidences">
                <a href={`${item.fileId}&access_token=${token}`}>
                    <img src={item.type && item.type.indexOf('image') == -1?fileImage:`${item.fileId}&access_token=${token}`} alt={item.evidenceMat} title={item.evidenceMat}/>
                </a>
                <span className="evidence-mat" title={item.evidenceMat}>{item.evidenceMat}</span>
                {item.oppugnEvidence&&<p className="show-query">
                    <span className="vertical-span"></span>
                    <span className="query-wrapper">
                        <b>{litigantType==0 ||  litigantType==3?'我方':'对方'}质证：</b><i>{item.oppugnEvidence}</i><br/>
                        {item.oppugnBack&&<span>
                            <b>{litigantType==1 ||  litigantType==4?'我方':'对方'}回复质证：</b><i>{item.oppugnBack}</i>
                        </span>}
                    </span>
                </p>}
                
                {(litigantType==0 ||  litigantType==3) && !item.oppugnEvidence && item.queryFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.queryClick.bind(this,index,'defendant','Oppo')}>质证</Button></p>:''}
                {(litigantType==0 ||  litigantType==3) && !item.oppugnEvidence && !item.queryFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'defendant'+item.id} type="text" maxLength="100"/><Button onClick={this.submitQuery.bind(this,item.id,'defendant','Oppo')}>确定</Button></p>:''}
                {(litigantType==1 ||  litigantType==4) && item.oppugnEvidence && !item.oppugnBack && item.backFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.backClick.bind(this,index,'defendant','Oppo')}>回复质证</Button></p>:''}
                {(litigantType==1 ||  litigantType==4) && item.oppugnEvidence && !item.oppugnBack && !item.backFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'defendantBack'+item.id} type="text" maxLength="100"/><Button onClick={this.submitBack.bind(this,item.id,'defendant','Oppo')}>确定</Button></p>:''}
            </li>
        ))
    }
    getProposerEvidencesOppo=()=>{
        const {proposerEvidencesOppo} = this.state;
        const {litigantType} = this.props;
        const token = cache.getItem('token');
        return proposerEvidencesOppo.map((item,index)=>(
            <li key={index} className="quote-evidences">
                <a href={`${item.fileId}&access_token=${token}`}>
                    <img src={item.type && item.type.indexOf('image') == -1?fileImage:`${item.fileId}&access_token=${token}`} alt={item.evidenceMat} title={item.evidenceMat}/>
                </a>
                <span className="evidence-mat" title={item.evidenceMat}>{item.evidenceMat}</span>
                {item.oppugnEvidence&&<p className="show-query"><span className="vertical-span"></span>
                    <span className="vertical-span"></span>
                    <span className="query-wrapper">
                        <b>{litigantType==0 ||  litigantType==3?'对方':'我方'}质证：</b><i>{item.oppugnEvidence}</i><br/>
                        {item.oppugnBack&&<span>
                            <b>{litigantType==1 ||  litigantType==4?'对方':'我方'}回复质证：</b><i>{item.oppugnBack}</i>
                        </span>}
                    </span>
                </p>}
                {(litigantType==1 ||  litigantType==4) && !item.oppugnEvidence && item.queryFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.queryClick.bind(this,index,'proposer','Oppo')}>质证</Button></p>:''}
                {(litigantType==1 ||  litigantType==4) && !item.oppugnEvidence && !item.queryFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'proposer'+item.id} type="text"  maxLength="100" /><Button onClick={this.submitQuery.bind(this,item.id,'proposer','Oppo')}>确定</Button></p>:''}
                {(litigantType==0 ||  litigantType==3) && item.oppugnEvidence && !item.oppugnBack && item.backFlag?<p className="query-evidence"><Button type="primary" id={index} onClick={this.backClick.bind(this,index,'proposer','Oppo')}>回复质证</Button></p>:''}
                {(litigantType==0 ||  litigantType==3) && item.oppugnEvidence && !item.oppugnBack && !item.backFlag?<p className="query-evidence"><span className="vertical-span"></span><Input id={'proposerBack'+item.id} type="text" maxLength="100"/><Button onClick={this.submitBack.bind(this,item.id,'proposer','Oppo')}>确定</Button></p>:''}
            </li>
        ))
     }
    tabClick=(key)=>{
        //console.log(key);
    }
    componentDidMount(){
        const tabList = JSON.parse(cache.getItem('tabList'));
        const {validFlag} = JSON.parse(cache.getItem('commInfo'));
        const {match:{params:{caseId}}} = this.props;
        let defendantTab,proposerTab = null;
        ajax.get(`/case/evidence/${caseId}`).then((data)=>{
            let defendantEvidencesOrgi = data.defendantEvidencesOrgi;//被申请人本请求
            let proposerEvidencesOrgi = data.proposerEvidencesOrgi;//申请人本请求
            let defendantEvidencesOppo = data.defendantEvidencesOppo;//被申请人反请求
            let proposerEvidencesOppo = data.proposerEvidencesOppo;//申请人反请求
            if(defendantEvidencesOrgi){
                let arr = [];
                defendantEvidencesOrgi.map((item,index)=>{
                    item.queryFlag = true;
                    item.backFlag = true;
                    arr.push(item);
                });
                defendantEvidencesOrgi = arr;
            }  
            if(proposerEvidencesOrgi){
                let arr = [];
                proposerEvidencesOrgi.map((item,index)=>{
                    item.queryFlag = true;
                    item.backFlag = true;
                    arr.push(item);
                    return arr;
                });
                proposerEvidencesOrgi = arr;
            }
            if(defendantEvidencesOppo){
                let arr = [];
                defendantEvidencesOppo.map((item,index)=>{
                    item.queryFlag = true;
                    item.backFlag = true;
                    arr.push(item);
                });
                defendantEvidencesOppo = arr;
                this.setState({
                    deDisabled:false
                })
            }  
            if(proposerEvidencesOppo){
                let arr = [];
                proposerEvidencesOppo.map((item,index)=>{
                    item.queryFlag = true;
                    item.backFlag = true;
                    arr.push(item);
                    return arr;
                });
                proposerEvidencesOppo = arr;
                this.setState({
                    deDisabled:false
                })
            }
            this.setState({
                defendantEvidencesOrgi,
                proposerEvidencesOrgi,
                defendantEvidencesOppo,
                proposerEvidencesOppo,
            })
        }).finally(()=>{
            this.setState({
                spinning:false
            })
        })
        this.setState({
            disabled:validFlag
        })
        tabList.map((ele,index)=>{
            if(ele.tabId == 17){
                defendantTab = ele;
            }
            if(ele.tabId == 16){
                proposerTab = ele;
            }
        })
        this.setState({
            defendantTab,
            proposerTab
        })
    }
    render(){
        const {proposerEvidencesOrgi,defendantEvidencesOrgi,proposerEvidencesOppo,defendantEvidencesOppo,spinning,disabled,deDisabled,defendantTab,proposerTab} = this.state;
        return(<section className="quote">
            <Spin tip="正在加载..." spinning={spinning}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="本请求" key="1">
                    <Tabs onTabClick={this.tabClick} tabBarExtraContent={<Button type="primary" disabled={disabled} onClick={this.handleClick.bind(this,'0')}>添加本请求举证材料</Button>}>
                        
                        {(proposerTab&&proposerTab.tabFlag)&&<TabPane tab={<span>{proposerTab.remaindFlag&&<b className="red-point"></b>}<span>申请方证据材料</span></span>} key={16}>
                            <header className="quote-title">证据清单</header>
                            <article className="quote-content evidence-box my-case-second-preview-details-item">
                                <Table dataSource={proposerEvidencesOrgi} columns={columns} pagination={false} size="small"/>
                                {proposerEvidencesOrgi && proposerEvidencesOrgi.length ? <div>
                                    <h4>证据</h4>
                                    <ul className="evidence-list clearfix">
                                        {this.getProposerEvidencesOrgi()}
                                    </ul>
                                </div>:''}
                            </article>
                        </TabPane>}
                        {(defendantTab&&defendantTab.tabFlag)&&<TabPane tab={<span><span>被申请方证据材料</span>{defendantTab.remaindFlag&&<b className="red-point"></b>}</span>} key={17}>
                            <header className="quote-title">证据清单</header>
                            <article className="quote-content evidence-box my-case-second-preview-details-item">
                                <Table dataSource={defendantEvidencesOrgi} columns={columns} pagination={false} size="small"/>
                                {defendantEvidencesOrgi && defendantEvidencesOrgi.length ? <div>
                                    <h4>证据</h4>
                                    <ul className="evidence-list clearfix">
                                        {this.getDefendantEvidencesOrgi()}
                                    </ul>
                                </div>:''}
                            </article>
                        </TabPane>}
                    </Tabs>
                </TabPane>
                <TabPane tab="反请求" key="2">
                    <Tabs onTabClick={this.tabClick} tabBarExtraContent={<Button type="primary" disabled={deDisabled} onClick={this.handleClick.bind(this,'1')}>添加反请求举证材料</Button>}>
                        {(defendantTab&&defendantTab.tabFlag)&&<TabPane tab={<span><span>申请方证据材料</span>{defendantTab.remaindFlag&&<b className="red-point"></b>}</span>} key={17}>
                            <header className="quote-title">证据清单</header>
                            <article className="quote-content evidence-box my-case-second-preview-details-item">
                                <Table dataSource={defendantEvidencesOppo} columns={columns} pagination={false} size="small"/>
                                {defendantEvidencesOppo && defendantEvidencesOppo.length ? <div>
                                    <h4>证据</h4>
                                    <ul className="evidence-list clearfix">
                                    {this.getDefendantEvidencesOppo()}  
                                    </ul>
                                </div>:''}
                            </article>
                        </TabPane>}
                        {(proposerTab&&proposerTab.tabFlag)&&<TabPane tab={<span>{proposerTab.remaindFlag&&<b className="red-point"></b>}<span>被申请方证据材料</span></span>} key={16}>
                            <header className="quote-title">证据清单</header>
                            <article className="quote-content evidence-box my-case-second-preview-details-item">
                                <Table dataSource={proposerEvidencesOppo} columns={columns} pagination={false} size="small"/>
                                {proposerEvidencesOppo && proposerEvidencesOppo.length ? <div>
                                    <h4>证据</h4>
                                    <ul className="evidence-list clearfix">
                                    {this.getProposerEvidencesOppo()}
                                    </ul>
                                </div>:''}
                            </article>
                        </TabPane>}
                        
                    </Tabs>
                </TabPane>
                </Tabs>
            </Spin>
        </section>)
    }
}