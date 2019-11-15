import React, {Component} from 'react'
import { Steps } from 'antd'

const Step = Steps.Step;

export default class ApplySteps extends Component{
    render(){
        return(
            <Steps current={this.props.step}>
                <Step title="填写仲裁申请" />
                <Step title="提交证据材料" />
                <Step title="立案审核" />
                <Step title="缴费" />
                <Step title="立案完成" />
            </Steps>
        )
    }
}
