import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { Menu, Icon } from 'antd'

export default class SidebarMenu extends Component{
    getCurrent = () => {
        const id = this.props.match.params.id;
        switch (id){
            case '3':
                return 'messages';
            case '2':
                return 'account';
            default:
                return 'basic'
        }
    };
    render(){
        const {unReadNum} = this.props;
        return(
            <div className="menu-container ant-col-4">
                <Menu
                    selectedKeys={[this.getCurrent()]}
                    style={{ minHeight: 366 }}
                    mode="horizontal"
                >
                    <Menu.Item key="basic">
                        <Link to="/personal/1">
                            <i className="iconfont icon-jibenxinxi"></i>基本信息
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="account">
                        <Link to="/personal/2">
                            <i className="iconfont icon-zhanghaoxinxi"></i>账号信息
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="messages">
                        <Link to="/personal/3">
                            <i className="iconfont icon-wodexiaoxi"></i>我的消息
                            {unReadNum>0?<b className="message-tips"></b>:''}
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}