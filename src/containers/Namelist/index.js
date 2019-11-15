import React,{Component} from 'react';
import {Input,Button,Row, Col,Table,Pagination,Spin} from 'antd';
import {BlankPage} from '../../components'
import { baseURL } from '../../utils/ajax'
import ajax from '../../utils/ajaxWithoutToken'
import cache from '../../utils/cache';

export default class Roster extends Component{
    constructor(context, props) {
        super(context, props);
        const token = cache.getItem('token');
        this.state = {
            token,
            pageNum:1,
            pageSize:8,
            loading:true,
            listArray:false,
            listData:[],
            columns: [
                {
                   title: '姓名',
                   dataIndex: 'name',
                   key: 'name',
                 },
                {
                   title: '出生年月',
                   dataIndex: 'date',
                   key: 'date',
                },
                {
                    title: '职业',
                    dataIndex: 'occupation',
                    key: 'occupation',
                },
                {
                    title: '专长',
                    dataIndex: 'expertise',
                    key: 'expertise',
                },
                {
                    title: '居住地',
                    dataIndex: 'residence',
                    key: 'residence',
                }
            ]
        }

    }
    componentDidMount(){
        ajax.get(`public/arbitrator/litigantList`).then((response)=>{
            this.setState({
                listData:response
            })
        }).finally(()=>{
            this.setState({loading:false})
        })
    }
    toggleArray = (e)=>{
        this.setState({
            listArray:!this.state.listArray
        });
    }

    render(){
        const {pageSize,pageNum,loading,listData,columns,listArray,token} = this.state;
        if(listData.list ){
            const dataSource =listData.list.map((item,index)=>{
                return {
                    key: index,
                    name:item.name,
                    date:item.age,
                    occupation:item.job,
                    expertise:item.specialty,
                    residence:item.address
                }
            })
            const dataSource1 = listData.list.map((item,index)=>{
                return(
                    <div className="listItem clearfix"  key={index}>
                        <div className=" fl">
                            <img className="img" src={`${baseURL}public/file/downloads?id=${item.portrait}`}/>
                        </div>
                        <div className="info fr">
                            <p>姓名：{item.name}</p>
                            <p>出生年月：{item.age}</p>
                            <p>职业：{item.job}</p>
                            <p>专长：{item.specialty}</p>
                            <p>居住地：{item.address}</p>
                        </div>
                    </div>
                )
            })
            return(
                <Spin spinning={loading}>
                <div className="help-center-content ant-col-24 roster">
                    <div className="help-center-content-main arbitration-clause">
                        <div className="roster-body">
                            <header className="roster-toggleArray">
                                <a onClick={this.toggleArray}>列表</a>
                                <a onClick={this.toggleArray}>平铺</a>
                            </header>
                            <main className="roster-content">
                                <div className="tile" style={{display:listArray ? 'block' :'none' }}>
                                    <Table dataSource={dataSource} columns={columns} pageSize={pageSize} pagination={{
                                        pageSize,
                                        total:listData.total,
                                        style:{marginTop:30,textAlign:'center'}}}/>
                                </div>
                                <div className="list" style={{display:listArray ? 'none' :'block' }}>
                                    {dataSource1}
                                </div>
        
                                {/* <Pagination 
                                    current={pageNum}
                                    pageSize={pageSize}
                                    total={listData.total}
                                    style={{marginTop:30,textAlign:'center'}}
                                /> */}
                            </main>
                        </div>
                    </div>
                </div>
                </Spin>
            )
        }else{
            return(
                <BlankPage />
            )
        }
    }
}