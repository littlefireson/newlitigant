import React, {Component} from 'react'
import { Progress, Icon, Table } from 'antd'

export default class HomeTable extends Component{

    render(){
        const columns = [{
            title: '案件操作',
            dataIndex: 'operation',
            key: 'operation',
            className:'ant-col-6'
        }, {
            title: '文案',
            dataIndex: 'case',
            key: 'case',
            className:'ant-col-12'
        }, {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            className:'ant-col-6'
        }];
        const dataSource = [{
            key: '1',
            operation: '立案审核通过，未缴费',
            case: 'SA201710171528立案申请待缴费，立案审核通过，请及时缴费',
            remark: '--'
        },{
            key: '2',
            operation: '立案成功，等待当事人选择仲裁员',
            case: 'SA201710171528立案申请待缴费，立案审核通过，请及时缴费',
            remark: '--'
        },{
            key: '3',
            operation: '被申请方有和解请求',
            case: 'SA201710171528立案申请待缴费，立案审核通过，请及时缴费',
            remark: '--'
        },{
            key: '4',
            operation: '立案成功，等待当事人选择仲裁员',
            case: 'SA201710171528立案申请待缴费，立案审核通过，请及时缴费',
            remark: '--'
        },{
            key: '5',
            operation: '立案审核通过，未缴费',
            case: 'SA201710171528立案申请待缴费，立案审核通过，请及时缴费',
            remark: '--'
        },{
            key: '6',
            operation: '被申请方有和解请求',
            case: 'SA201710171528立案申请待缴费，立案审核通过，请及时缴费',
            remark: '--'
        }];
        return (
            <div className="home-box-tables">
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        )
    }
}