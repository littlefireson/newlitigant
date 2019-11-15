import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Table, Select, Icon, Input, Button, Breadcrumb } from 'antd'
import ajax from '../../../utils/ajax'
const Option = Select.Option;
const Search = Input.Search;

import PayHead from './PayHead'



@connect((state)=>({
    userInfo:state.userInfo
}))
export default class PaymentRecord extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            total:0,
            dataSource:[],
            dataColumns:[]
        }
    }
    getColumns=()=>{
        const {role} = this.props.userInfo;
        const statusList = {
            0:'待缴费',
            1:'缴费成功',
            2:'缴费失败'
        };
        const columns = [{
            title: '序号',
            dataIndex: 'orderNumber',
            key: 'orderNumber'
        },{
            title: '案件编号',
            dataIndex: 'caseNo',
            key: 'caseNo'
        },{
            title: role==0?'被申请人':'申请人',
            dataIndex: role==0?'defeName':'propName',
            key: role==0?'defeName':'propName'
        },
        role==2?{}:{
            title: '我的代理人',
            dataIndex: 'agentName',
            key: 'agentName'
        }
        ,{
            title: '缴费状态',
            dataIndex: 'status',
            key: 'status',
            render:(text,record)=>{
                switch(record.status){
                    case '0':
                        return (<span className="case-status bg-FDA235">{statusList[record.status]}</span>);
                    case '2':
                        return (<span className="case-status bg-AAAAAA">{statusList[record.status]}</span>);
                    default:
                        return (<span className="case-status bg-87D068">{statusList[record.status]}</span>);
                }
            }
        },{
            title: '立案时间',
            dataIndex: 'registerTime',
            key: 'registerTime',
            className:'closed-time'
        },{
            title: '缴费时间',
            dataIndex: 'payTime',
            key: 'payTime',
            className:'closed-time'
        },{
            title: '金额（元）',
            dataIndex: 'amount',
            key: 'amount'
        }];
        this.setState({
            dataColumns:columns
        })
    }
    getSources=(pageNum,pageSize,startTime,endTime,fifterCondition)=>{
        const {userInfo} = this.props;
        ajax.get('litigant/case/getCasePayList',{
            params:{
                pageNum,
                pageSize:8,
                currentRole:userInfo.role,
                startTime,
                endTime,
                fifterCondition
            }
        }).then((data)=>{
            let arr = [];
            data.list.map((item,index)=>{
                item.orderNumber = index*1+1;
                item.key = index;
                item.agentName = item.agentName || '--';
                arr.push(item);
            })
            this.setState({
                dataSource:arr,
                total:data.total
            })
        })
    }
    componentDidMount(){
        this.getSources(1);
        this.getColumns();
    }
    render(){
        const {dataColumns,dataSource,total} = this.state;
        return (
            <section className="my-case ant-row-layout clearfix">
                <PayHead  getSources={this.getSources}/>
                <Table className="my-case-table" columns={dataColumns} dataSource={dataSource} pagination={{defaultPageSize:8,total,showQuickJumper:true,onChange:(page)=>{this.getSources(page)}}}/>
            </section>
        )
    }
}

