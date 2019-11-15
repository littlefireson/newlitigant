import React, {Component} from 'react'
import { Form, Input, Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Steps  } from 'antd';
const FormItem = Form.Item;
const Step = Steps.Step;

import ajax,{baseURL} from '../../utils/ajaxWithoutToken'

import NormalForgetFormOne from './NormalForgetFormOne'
import NormalForgetFormTwo from './NormalForgetFormTwo'
import NormalForgetFormThree from './NormalForgetFormThree'

export default class ForgetForm extends Component{
    state={
        current:0,
        nowIndex:0
    }
    nextStep=(token)=>{
        let {current,nowIndex} = this.state;
        if(token){
            this.lostToken = token;
        }
        this.setState({
            current:current+1,
            nowIndex:nowIndex+1
        })
    }
    changePassword=(pwd)=>{
        ajax({
            url:'sys/user/lostPwd',
            method:'post',
            data:{
                passWord:pwd,
                token:this.lostToken
            }
        }).then(()=>{
            this.nextStep();
        })
    }
    getDom=()=>{
        const {nowIndex} = this.state;
        const domList = {
            0:<NormalForgetFormOne nextStep={this.nextStep}/>,
            1:<NormalForgetFormTwo nextStep={this.nextStep} changePassword={this.changePassword}/>,
            2:<NormalForgetFormThree nextStep={this.nextStep}/>,
        }
        return domList[nowIndex];
    }
    render(){
        const {current} = this.state;
        return (
            <section className="forget ant-row-layout clearfix">
                <Steps current={current} className="ant-col-16 ant-col-offset-4">
                    <Step title="忘记密码" description="" />
                    <Step title="密码重置" description="" />
                    <Step title="重置成功" description="" />
                </Steps>
                {this.getDom()}
            </section>
        )
    }
}