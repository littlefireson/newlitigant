import React, {Component} from 'react'
import cache from '../../../utils/cache'
import {connect} from 'react-redux'

import NaturalPersonInfo from './NaturalPersonInfo'
import LegalPersonInfo from './LegalPersonInfo'

@connect((state)=>({
    userInfo:state.userInfo
}))

export default class BasicInfo extends Component{
    constructor(props){
        super(props);
        this.state = {
            info:{},
            formItemLayout1:{
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 4 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 10 }
                }
            },
            formItemLayout2:{
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 10 }
                }
            }
        };
    }

    getDom=()=>{
        const {formItemLayout1,formItemLayout2} = this.state;
        const {info} =  this.state;
        const domList = {
            0:<NaturalPersonInfo formItemLayout={formItemLayout1} info={info} userInfo={this.props.userInfo} />,
            1:<LegalPersonInfo formItemLayout={formItemLayout2} info={info}  userInfo={this.props.userInfo}/>
        };
        return domList[this.props.userInfo.type];
    };
    componentWillReceiveProps(props){
        const {info} = props;
        this.setState({
            info
        })
    }
    render(){
        return (
            <div className="personal-center-content ant-col-20">
                {this.getDom()}
            </div>
        )
    }
}