import React, {Component} from 'react'
import { Steps } from 'antd'
const Step = Steps.Step

export default class HomeSteps extends Component{
    render(){
        return (
            <div className="home-box-steps">
                <h2>网络仲裁流程</h2>
                <Steps current={0}>
                    <Step title="填写仲裁申请" />
                    <Step title="提交证据材料" />
                    <Step title="审核" />
                    <Step title="缴费" />
                    <Step title="立案成功" />
                </Steps>
            </div>
        )
    }
}