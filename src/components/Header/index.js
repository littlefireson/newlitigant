import React,{Component} from 'react';
import { Menu, Dropdown, Icon, Button } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios';
import cache from '../../utils/cache'
import ajax,{baseURL} from '../../utils/ajax'
import {userChange,tokenUpdate,messageChange} from '../../actions'

//头部身份切换选项
const menu1 = (<Menu>
    <Menu.Item>
        <Link rel="noopener noreferrer" to="/0">申请人</Link>
    </Menu.Item>
    <Menu.Item>
        <Link rel="noopener noreferrer" to="/1">被申请人</Link>
    </Menu.Item>
    <Menu.Item>
        <Link rel="noopener noreferrer" to="/2">代理人</Link>
    </Menu.Item>
</Menu>);
const menu2 = (<Menu>
    <Menu.Item>
        <Link rel="noopener noreferrer" to="/0">申请人</Link>
    </Menu.Item>
    <Menu.Item>
        <Link rel="noopener noreferrer" to="/1">被申请人</Link>
    </Menu.Item>
</Menu>);

//头部导航
class Nav extends Component {
    getCurrent=()=>{
        const router = this.props.location.pathname.split('/')[1];
        if(router == ''){
            return 'home'
        }else if(router == 'myCase'){
            return 'case'
        }else if(router == 'personal'){
            return 'personal'
        }else if(router == 'help'){
            return 'help'
        }else{
            return 'home'
        }
    };
    render() {
        const {agent,userInfo} = this.props;
        return (
            <div className="common-header-nav">
                <Menu
                    selectedKeys={[this.getCurrent()]}
                    mode="horizontal"
                >
                    <Menu.Item key="home">
                        <Link to="/" rel="noopener noreferrer">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="case">
                        <Link to="/myCase" rel="noopener noreferrer">{agent==1?"代理案件":"我的案件"}</Link>
                    </Menu.Item>
                    <Menu.Item key="personal">
                        <Link to="/personal" rel="noopener noreferrer">个人中心</Link>
                    </Menu.Item>
                    <Menu.Item key="help">
                        <Link to="/help" rel="noopener noreferrer">帮助中心</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

@connect((state)=>({
    message:state.message
}))
class Status extends Component {
    getRoleName=()=>{
        const {role} = this.props.userInfo;
        switch(role){
            case '0':
                return '申请人';
            case '1':
                return '被申请人';
            case '2':
                return '代理人';
            default:
                return '申请人';
        }
    }
    goOut=()=>{
        this.props.dispatch(userChange({}));
        this.props.dispatch(tokenUpdate(''));
        this.props.history.push('/main');
    }
    render() {
        const {userInfo:{role,realName,type},message} = this.props;
        return (
            <div className="common-header-right">
                <div className="common-header-right-status">
                    <span>当前身份：</span><b>{this.getRoleName()}，</b>
                    <Dropdown overlay={type==1?menu2:menu1}>
                        <a className="ant-dropdown-link">
                            <span>切换身份</span><Icon type="down" />
                        </a>
                    </Dropdown>
                    <span className="user-info">
                        <i className="iconfont icon-user"></i>
                        {message>0&&<Link to="/personal/3" className="red-point" rel="noopener noreferrer">{message>99?'99+':message}</Link>}
                        <b title={realName}>{realName?realName:'未绑定'}</b>
                        <em onClick={this.goOut}>退出登录</em>
                    </span>
                </div>
            </div>
            
        )
    }
}

class Buttons extends Component {
    constructor(props){
        super(props)
        if(location.href.indexOf('litigant')!=-1){
            this.refereeURL = location.href.split('litigant')[0]+'referee';
        }else{
            this.refereeURL = location.href;
        }
    }
    render() {
        return (
            <div className="common-header-right">
                <div className="common-header-right-button">
                    <a href={this.refereeURL}>仲裁员登录</a>
                    <Link to="/login"><Button className="button-login" style={{"display":!this.props.loginKey?"inline-block":"none"}}>登录</Button></Link>
                    <Link to="/register"><Button className="button-register" style={{"display":!this.props.loginKey?"inline-block":"none"}}>注册</Button></Link>
                </div>
            </div>
        )
    }
}

@connect(state=>({
    token:state.token,
    userInfo:state.userInfo
}))
@withRouter
export default class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            logo:''
        }
    }
    getDom=()=>{
        let nowIndex = 0;
        const domList = {
            0:<Buttons {...this.props} loginKey={0}/>,
            1:<Buttons {...this.props} loginKey={1}/>,
            2:[<Nav {...this.props} agent={0} key="0"/>,<Status {...this.props} key="1"/>],
            3:[<Nav {...this.props} agent={1} key="0"/>,<Status {...this.props} key="1"/>],
            4:''
        };
        const {pathname} = this.props.location;
        if(pathname && (pathname == '/login' || pathname == '/register' || pathname == '/forget' || pathname == '/main')){
            nowIndex = 0;
            if(pathname == '/login'){
                nowIndex = 1;
            }
        }else{
            nowIndex = 0;
        }
        if(this.props.token && this.props.userInfo){
            if(this.props.token){
                nowIndex = 2;
            }
            if(this.props.userInfo.role == '2'){
                nowIndex = 3;
            }
            if(pathname == '/register/success'){
                nowIndex = 4;
            }
        }
        return domList[nowIndex];
    };
    getMessage=(pageNum,pageSize)=>{
        // console.log('pageNum:'+pageNum+',pageSize:'+pageSize);
        ajax.get('common/message/litigantList',{
            params:{
                pageNum,
                pageSize
            }
        }).then((data)=>{
            this.props.dispatch(messageChange(data.unReadNum));
        })
    };
    componentWillMount = ()=>{
        axios({
            url:`${baseURL}/websiteConfig/list`,
            method:'get', 
        }).then((data)=>{
            data.data.body.forEach(element => {
                if(element.keyName == 'logo'){
                    this.setState({
                        logo:element.value
                    })
                }
            });
        })
    }
    render(){
       
        return (<header className="common-header ant-row-layout clearfix">
            <div className="common-header-wrapper clearfix ant-col-24">
                <div className="common-header-logo">
                    <Link to="/main">
                        {this.state.logo?<img src={`${baseURL}public/file/preview/${this.state.logo}`} alt="logo"/>:<h1 className="web-name">互联网仲裁平台</h1>}
                    </Link>
                </div>
                {this.getDom()}
                {this.props.token&&this.getMessage(1,10)}
            </div>
        </header>)
    }
}