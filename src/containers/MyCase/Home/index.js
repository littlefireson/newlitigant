import React, {Component} from 'react'
import { Table, Select, Icon, Input, Button, Modal ,message } from 'antd'
import { Route,Switch,Redirect,NavLink,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import ajax from '../../../utils/ajax'
import cache from '../../../utils/cache'
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;

import CaseHead from './CaseHead'

@connect(state=>({
    userInfo: state.userInfo,
    token:state.token,
    selectValue: state.selectValue[0],
    inputValue: state.selectValue[1]
}))
@withRouter
export default class CaseHome extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            dataSource:[],
            loading:false,
            total:0,
            selectStatus:'',
        }
    }
    getList=(page,status,fifterCondition)=>{
        if(status && status.payload){
          status =undefined
        }
        const token = this.props.token;
        const {role} = this.props.userInfo;
        if(token){
            this.setState({
                loading:true
            })
            ajax({
                url:'/litigant/case',
                method:'get',
                params:{
                    pageNum:page,
                    pageSize:8,
                    currentRole:role,
                    status,
                    fifterCondition
                }
            }).then((bodyData)=>{
                const dataList = bodyData.list;
                const caseList = [];
                dataList.map((item,index)=>{
                    const obj = {};
                    obj.key = index;
                    obj.id = item.id;
                    obj.orderNumber = index+1;
                    obj.caseNo = item.caseNo || '--';
                    obj.defendantName = item.defendantName || '--';
                    obj.proposerName = item.proposerName || '--';
                    obj.secretaryName = item.secretaryName|| '--';
                    obj.status = item.status || '2';
                    obj.caseCompleteTime = item.caseCompleteTime || '--';
                    obj.caseApplyTime = item.caseApplyTime || '--';
                    obj.agentName= item.agentName || '--';
                    obj.operation = ['处理案件'];
                    obj.confirmStatus = item.confirmStatus;
                    if((item.status<7 || item.status==10)&&item.status!=2){
                        if(role == 2){
                            // obj.operation = obj.operation.concat(['变更权限','取消代理']);
                            obj.operation = obj.operation.concat(['取消代理']);
                        }else{
                            obj.operation = !item.hasAgent?obj.operation.concat(['委托代理']):obj.operation.concat(['变更权限','变更代理','取消代理']);
                        }
                        
                    }else if(item.status!=2){
                        obj.operation = item.status==8?['案件详情','补正']:['案件详情']
                    }
                    else if(item.status==2){
                        obj.operation = obj.operation.concat(['删除']);
                    }
                    caseList.push(obj);
                });
                this.setState({
                    dataSource:caseList,
                    total:bodyData.total
                });
            }).finally(()=>{
                this.setState({
                    loading:false
                })
            });
        }
    };
    getCol=()=>{
        const {role} = this.props.userInfo;
        const statusList = {
            0:'待提交',
            1:'待审核',
            2:'立案失败',
            3:'待缴费',
            4:'答辩期',
            5:'审理期',
            6:'裁决期',
            7:'已结案',
            8:'补正期',
            9:'案件转线下',
            10:'和解中',
            11:'案件中止',
            12:'已撤案'
        };
        const columns0 = [{
            title: '序号',
            dataIndex: 'orderNumber',
            key: 'orderNumber'
        },{
            title: '案件编号',
            dataIndex: 'caseNo',
            key: 'caseNo'
        },{
            title: '被申请人',
            dataIndex: 'defendantName',
            key: 'defendantName',
            className:'limit-name'
        },{
            title: '我的代理人',
            dataIndex: 'agentName',
            key: 'agentName'
        },{
            title: '秘书',
            dataIndex: 'secretaryName',
            key: 'secretaryName'
        },{
            title: '案件状态',
            dataIndex: 'status',
            key: 'status',
            render:(text,record)=>{
                switch(record.status){
                    case '0':
                    case '1':
                    case '3':
                        return (<span className="case-status bg-FDA235">{statusList[record.status]}</span>);
                    case '2':
                        return (<span className="case-status bg-AAAAAA">{statusList[record.status]}</span>);
                    default:
                        return (<span className="case-status bg-87D068">{statusList[record.status]}</span>);
                }
            }
        },{
            title: '结案时间',
            dataIndex: 'caseCompleteTime',
            key: 'caseCompleteTime',
            className:'closed-time',
        },{
            title: '立案时间',
            dataIndex: 'caseApplyTime',
            key: 'caseApplyTime',
            className:'closed-time'
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(text,record)=>{
                return record.operation.map((value,index)=>{
                    switch(value){
                        case '处理案件':
                            switch(record.status){
                                case '0':
                                    return <NavLink key={index} to={'/myCase/apply/first/'+record.id}>{value}</NavLink>;
                                case '1':
                                    return <NavLink key={index} to={'/myCase/apply/third/false/'+record.id}>{value}</NavLink>;
                                case '2':
                                    return <NavLink key={index} to={'/myCase/apply/third/true/'+record.id}>{value}</NavLink>;
                                case '3':
                                    return <NavLink key={index} to={'/myCase/apply/fourth/'+record.id}>{value}</NavLink>;
                                case '4':
                                    return (record.confirmStatus!= '1')
                                    ?<NavLink key={index} to={'/myCase/apply/confirmAdress/'+record.id}>{value}</NavLink>
                                    :<NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                                case '7':
                                    return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                                default:
                                    return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                            }
                        case '委托代理':
                            return (<NavLink key={index} to={`/myCase/agent/${record.id}/0`}>{value}</NavLink>);
                        case '变更代理':
                            return <a key={index} onClick={(caseId)=>{this.changeAgent(record.id)}}>{value}</a>;
                        case '取消代理':
                            return <a key={index} onClick={(caseId)=>{this.cancelAgent(record.id)}}>{value}</a>;
                        case '变更权限':
                            return <NavLink key={index} to={`/myCase/agent/${record.id}/1`}>{value}</NavLink>;
                        case '补正':
                            return <NavLink key={index} to={`/myCase/caseDetail/${record.id}/adjudication/correction`}>{value}</NavLink>;
                        case '删除':
                            return (<a key={index} onClick={(caseId)=>{this.deleteAgent(record.id)}}>{value}</a>);
                        default:
                            return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                            
                    }
                });
                
                //record.operation.map((value,index)=>(<NavLink key={index} to='/myCase/caseDetail/113' key={index}>{value}</NavLink>))
            }
        }];
        const columns1 = [{
            title: '序号',
            dataIndex: 'orderNumber',
            key: 'orderNumber'
        },{
            title: '案件编号',
            dataIndex: 'caseNo',
            key: 'caseNo'
        },{
            title: '申请人',
            dataIndex: 'proposerName',
            key: 'proposerName',
            className:'limit-name'
        },{
            title: '我的代理人',
            dataIndex: 'agentName',
            key: 'agentName'
        },{
            title: '秘书',
            dataIndex: 'secretaryName',
            key: 'secretaryName'
        },{
            title: '案件状态',
            dataIndex: 'status',
            key: 'status',
            render:(text,record)=>{
                switch(record.status){
                    case '0':
                    case '1':
                    case '3':
                        return (<span className="case-status bg-FDA235">{statusList[record.status]}</span>);
                    case '2':
                        return (<span className="case-status bg-AAAAAA">{statusList[record.status]}</span>);
                    default:
                        return (<span className="case-status bg-87D068">{statusList[record.status]}</span>);
                }
            }
        },{
            title: '结案时间',
            dataIndex: 'caseCompleteTime',
            key: 'caseCompleteTime',
            className:'closed-time',
        },{
            title: '立案时间',
            dataIndex: 'caseApplyTime',
            key: 'caseApplyTime',
            className:'closed-time'
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(text,record)=>{
                return record.operation.map((value,index)=>{
                    switch(value){
                        case '处理案件':
                            switch(record.status){
                                case '0':
                                    return <NavLink key={index} to={'/myCase/apply/first/'+record.id}>{value}</NavLink>;
                                case '1':
                                    return <NavLink key={index} to={'/myCase/apply/third/false/'+record.id}>{value}</NavLink>;
                                case '2':
                                    return <NavLink key={index} to={'/myCase/apply/third/true/'+record.id}>{value}</NavLink>;
                                case '3':
                                    return <NavLink key={index} to={'/myCase/apply/fourth/'+record.id}>{value}</NavLink>;
                                case '4':
                                    return (record.confirmStatus!= '1')
                                    ?<NavLink key={index} to={'/myCase/apply/confirmAdress/'+record.id}>{value}</NavLink>
                                    :<NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                                case '7':
                                    return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                                default:
                                    return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                            }
                        case '委托代理':
                            return (<NavLink key={index} to={`/myCase/agent/${record.id}/0`}>{value}</NavLink>);
                        case '变更代理':
                            return <a key={index} onClick={(caseId)=>{this.changeAgent(record.id)}}>{value}</a>;
                        case '取消代理':
                            return <a key={index} onClick={(caseId)=>{this.cancelAgent(record.id)}}>{value}</a>;
                        case '变更权限':
                            return <NavLink key={index} to={`/myCase/agent/${record.id}/1`}>{value}</NavLink>;
                        case '补正':
                            return <NavLink key={index} to={`/myCase/caseDetail/${record.id}/adjudication/correction`}>{value}</NavLink>;
                        case '删除':
                            return (<a key={index} onClick={(caseId)=>{this.deleteAgent(record.id)}}>{value}</a>);
                        default:
                            return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                    }
                });
                //record.operation.map((value,index)=>(<NavLink key={index} to='/myCase/caseDetail/113' key={index}>{value}</NavLink>))
            }
        }];
        const columns2 = [{
            title: '序号',
            dataIndex: 'orderNumber',
            key: 'orderNumber'
        },{
            title: '案件编号',
            dataIndex: 'caseNo',
            key: 'caseNo'
        },{
            title: '申请人',
            dataIndex: 'proposerName',
            key: 'proposerName',
            className:'limit-name'
        },{
            title: '被申请人',
            dataIndex: 'defendantName',
            key: 'defendantName',
            className:'limit-name'
        },{
            title: '秘书',
            dataIndex: 'secretaryName',
            key: 'secretaryName'
        },{
            title: '案件状态',
            dataIndex: 'caseStatus',
            key: 'caseStatus',
            render:(text,record)=>{
                switch(record.status){
                    case '0':
                    case '1':
                    case '3':
                        return (<span className="case-status bg-FDA235">{statusList[record.status]}</span>);
                    case '2':
                        return (<span className="case-status bg-AAAAAA">{statusList[record.status]}</span>);
                    default:
                        return (<span className="case-status bg-87D068">{statusList[record.status]}</span>);
                }
            }
        },{
            title: '结案时间',
            dataIndex: 'caseCompleteTime',
            key: 'caseCompleteTime',
            className:'closed-time',
        },{
            title: '立案时间',
            dataIndex: 'caseApplyTime',
            key: 'caseApplyTime',
            className:'closed-time'
        },{
            title: '代理方',
            dataIndex: 'agentName',
            key: 'agentName'
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render:(text,record)=>{
                return record.operation.map((value,index)=>{
                    switch(value){
                        case '处理案件':
                            switch(record.status){
                                case '0':
                                    return <NavLink key={index} to={'/myCase/apply/first/'+record.id}>{value}</NavLink>;
                                case '1':
                                    return <NavLink key={index} to={'/myCase/apply/third/false/'+record.id}>{value}</NavLink>;
                                case '2':
                                    return <NavLink key={index} to={'/myCase/apply/third/true/'+record.id}>{value}</NavLink>;
                                case '3':
                                    return <NavLink key={index} to={'/myCase/apply/fourth/'+record.id}>{value}</NavLink>;
                                case '4':
                                    return (record.confirmStatus!= '1')
                                    ?<NavLink key={index} to={'/myCase/apply/confirmAdress/'+record.id}>{value}</NavLink>
                                    :<NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                                case '7':
                                    return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                                default:
                                    return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                            }
                        case '委托代理':
                            return (<NavLink key={index} to={`/myCase/agent/${record.id}/0`}>{value}</NavLink>);
                        case '变更代理':
                            return '';
                        case '取消代理':
                            return <a key={index} onClick={(caseId)=>{this.cancelAgent(record.id)}}>{value}</a>;
                        // case '变更权限':
                        //     return <NavLink key={index} to={`/myCase/agent/${record.id}/1`}>{value}</NavLink>;
                        case '补正':
                            return <NavLink key={index} to={`/myCase/caseDetail/${record.id}/adjudication/correction`}>{value}</NavLink>;
                        case '删除':
                            return (<a key={index} onClick={(caseId)=>{this.deleteAgent(record.id)}}>{value}</a>);
                        default:
                            return <NavLink key={index} to={'/myCase/caseDetail/'+record.id}>{value}</NavLink>;
                    }
                });
                // record.operation.map((value,index)=>(<NavLink key={index} to='/myCase/caseDetail/113' key={index}>{value}</NavLink>))
            }
        }];
        const colArr = {
            0:columns0,
            1:columns1,
            2:columns2
        };
        return colArr[role];
    };
    deleteAgent=(caseId)=>{
        const getList = this.getList;
        confirm({
            title: '',
            className:'confirm-agent',
            content: '是否删除案件？',
            onOk() {
                ajax({
                    url:`litigant/case/deleteFailCase?caseId=${caseId}`,
                    method:'post'
                }).then(()=>{
                    message.success('删除成功');
                    getList(1);
                }).catch(()=>{
                    message.error('删除失败')
                });
            },
            onCancel() {
                
            },
        });
    }
    cancelAgent=(caseId)=>{
        const getList = this.getList;
        confirm({
            title: '',
            className:'confirm-agent',
            content: '是否取消代理？取消后案件将转入线下处理',
            onOk() {
                ajax({
                    url:`agent/author/${caseId}/cancelAuthor`,
                    method:'post',
                    data:{
                        caseId
                    }
                }).then(()=>{
                    getList(1);
                })
            },
            onCancel() {
                
            },
        });
    }
    changeAgent=(caseId)=>{
        const getList = this.getList;
        confirm({
            title: '',
            className:'confirm-agent',
            content: '是否变更代理？变更后案件将转入线下处理',
            onOk() {
                ajax({
                    url:`agent/author/${caseId}/cancelAuthor`,
                    method:'post',
                    data:{
                        caseId
                    }
                }).then(()=>{
                    getList(1);
                })
            },
            onCancel() {
                
            },
        });
    }
    changeAccess=(caseId)=>{
        this.props.history.push(`/myCase/apply/${caseId}`);
    }
    componentDidMount(){
        this.getList(1);
       
    }
    render(){
        const {dataSource,loading,total,userInfo} = this.state;
        return (
            <section className="my-case ant-row-layout clearfix">
                <CaseHead {...this.props} getList={this.getList}/>
                <Table className="my-case-table" loading={loading} columns={this.getCol()} dataSource={dataSource} pagination={{defaultPageSize:8 ,total,showQuickJumper:true,onChange:(page)=>{this.getList(page,this.props.selectValue,this.props.inputValue)}}}/>
            </section>
        )
    }
}
