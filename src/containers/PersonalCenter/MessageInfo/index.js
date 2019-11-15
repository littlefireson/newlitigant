import React, {Component} from 'react'
import { Pagination ,Button} from 'antd'

import ajax from '../../../utils/ajax'

export default class MessageInfo extends Component{
    render(){
        const {messages,total,checkMessage,checkAllMessage,unReadNum}=this.props;
        return (
            <div className="personal-center-content ant-col-20">
                {messages.length?
                		<div className="personal-center-content-main message-info">
                		<div className="message-info-list-item"><Button type="primary" onClick={checkAllMessage.bind(this)}>全部标记为已读</Button></div>
                    <div className="message-info-list">
                    {
                        messages.map((item,index)=>(
                            <div className="message-info-list-item" key={index} onClick={checkMessage.bind(this,item.id)}>
                                <p className="message-info-list-item-head">{item.status==0&&<b className="check-tip"></b>}<span>{item.createTime}</span></p>
                                <p className="message-info-list-item-main"><a href="javascript:void(0);"><em>【{item.title}】</em><span>{item.messageBody}</span></a></p>
                            </div>
                        ))
                    }
                    </div>
                    <div className="message-info-pagination">
                        <Pagination
                            total={total}
                            showTotal={total => `共 ${total} 条，一页显示 10 条`}
                            pageSize={10}
                            defaultCurrent={1}
                            onChange={this.props.getMessage}
                        />
                    </div>
                </div>
                :
                <div className="personal-center-content-main message-info">
                    <p className="message-none">暂无数据</p>
                </div>}
            </div>
        )
    }
}