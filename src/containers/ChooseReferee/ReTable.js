import React,{Component} from 'react';
import { Table} from 'antd';
import ajax,{baseURL} from "../../utils/ajax";
import cache from '../../utils/cache'
const token = cache.getItem('token');
const columns = [{
    title:'头像',
    dataIndex:'portrait',
    width:62,
    render:(portrait)=>{
        if(portrait){
            return(<img src={`${baseURL}public/file/downloads?id=${portrait}&access_token=${token}`}/>)
        }else{
            return '--'
        }
    }
},{
    title: '姓名',
    dataIndex: 'name',
},{
    title: '年龄',
    dataIndex: 'age',
},{
    title:'职业',
    dataIndex:'job'
},{
    title: '专业',
    dataIndex: 'specialty',
}];
export default class ReTable extends Component{
    state = {
        list: [],
        loading: true,
        selectedRowKeys:null,
        pagination:{}
    }
    selectChange=(selectedRowKeys)=>{
        this.setState({ selectedRowKeys:selectedRowKeys[0] });
        const {onChoice} =this.props;
        if(typeof onChoice == "function"){
            onChoice(selectedRowKeys[0])
        }
    }
    handleRowClick=(record)=>{
        this.setState({ selectedRowKeys:[record.arbitratorId]})
        const {onChoice} =this.props;
        if(record && record.arbitratorId && typeof onChoice == "function"){
            onChoice(record.arbitratorId)
        }
    }
    handleChange=(pagination, filters, sorter)=>{
        const {current}=pagination;
        this.getList(current);
    }
    getList=(pageNum)=>{
        const {caseId} = this.props;
        this.setState({
            loading:true
        });
        ajax.get('/public/arbitrator',{
            params:{
                pageNum,
                pageSize:10,
                caseId
            }
        }).then((data)=>{
            const {list,total,pageNum} = data;
            this.setState({
                list,
                pagination:{
                    total:total,
                    current:pageNum
                }
            })
        }).finally(()=>{
            this.setState({
                loading: false
            })
        })
    }
    componentDidMount(){
        this.getList(1);
    }
    render(){
        const {list,selectedRowKeys,loading,pagination} =this.state;
        const rowSelection = {
            type:'radio',
            selectedRowKeys,
            hideDefaultSelections:true,
            onChange:this.selectChange,
        }
        return (
            <Table className='reTable'
                   size="small"
                   onRowClick={this.handleRowClick}
                   columns={columns}
                   pagination={pagination}
                   rowSelection={rowSelection}
                   rowKey={(record) => (record.arbitratorId)}
                   dataSource={list} loading={loading}
                   onChange={this.handleChange}
            />
        );
    }
}