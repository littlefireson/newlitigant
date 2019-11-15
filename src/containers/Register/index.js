import React, {Component} from 'react'
import { Form, Input, Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { Link,withRouter } from 'react-router-dom'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import RegisterSuccess from './Success'
import NormalRegisterForm from './NormalRegisterForm'
import Notice from './Notice'
import ajax,{baseURL} from '../../utils/ajaxWithoutToken'

//注册中间内容组建
class RegisterContent extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            siteName:""
        }
    }
    componentWillMount = ()=>{
        ajax({
            url:`${baseURL}/websiteConfig/list`,
            method:'get', 
        }).then((data)=>{
            data.forEach(element => {
                if(element.keyName == '网站名称'){
                    this.setState({
                        siteName:element.value
                    })
                }
            });
        })
    }
    render(){
        return (
            <section className="register ant-row-layout clearfix">
                <p className="register-title">欢迎注册{this.state.siteName?this.state.siteName:""}</p>
                <NormalRegisterForm {...this.props}/>
                <p className="register-login ant-col-12 ant-col-offset-6">已有账号，<Link to="login">直接登录</Link></p>
            </section>
        )
    }
}

@withRouter
export default class RegisterForm extends Component{
    constructor(props,context){
        super(props,context);
        this.state={
            success:2
        };
    }
    toSuccess=()=>{
        this.setState({
            success:1
        });
        this.props.history.push('register/success');
    };
    goNext=()=>{
        this.setState({
            success:0
        });
    }
    getDom=()=>{
        const {success} = this.state;
        const domList={
            0: <RegisterContent {...this.props} toSuccess={this.toSuccess}/>,
            1: <RegisterSuccess {...this.props}/>,
            2: <Notice {...this.props} goNext={this.goNext}/>
        };
        return domList[success];
    };
    componentDidMount(){
        if(this.props.match.params.success){
            this.setState({
                success:1
            })
        }
    }
    render(){
        return (
            this.getDom()
        )
    }
}