import React, {Component} from 'react'
import { Menu, Icon } from 'antd'

export default class SidebarMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:'calculate'
        };
    }
    handleClick = (e) => {
        this.setState({
            current: e.key
        });
        this.props.selectMenu(e.key);
    };
    render(){
        return(
            <div className="menu-container ant-col-4">
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    style={{ minHeight: 366 }}
                    mode="horizontal"
                >
                    <Menu.Item key="calculate">
                        <i className="iconfont icon-jisuanqi"></i>仲裁费计算
                    </Menu.Item>
                    <Menu.Item key="download">
                        <i className="iconfont icon-xiazai"></i>模版查看
                    </Menu.Item>
                    <Menu.Item key="clause">
                        <i className="iconfont icon-jibenxinxi"></i>网络仲裁条款
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}