import React, {Component} from 'react'
import { Timeline } from 'antd'

export default class HomeTimeLine extends Component{
    render(){
        return (
            <div className="home-box-content clearfix">
                <div className="home-box-content-left ant-col-4">
                    <p>申请人</p>
                    <p>立案流程</p>
                </div>
                <div className="home-box-content-center ant-col-5">
                    <Timeline>
                        <Timeline.Item>填写被申请人材料</Timeline.Item>
                        <Timeline.Item>填写申请人材料</Timeline.Item>
                        <Timeline.Item>填写仲裁申请</Timeline.Item>
                        <Timeline.Item>提交证据材料</Timeline.Item>
                        <Timeline.Item>审核</Timeline.Item>
                        <Timeline.Item>缴费</Timeline.Item>
                        <Timeline.Item>立案成功</Timeline.Item>
                    </Timeline>
                </div>
                <div className="home-box-content-right ant-col-15">
                    <h3>申请立案需提交材料</h3>
                    <p>1. 仲裁协议（约定将纠纷提请仲裁解决的条款或合同）</p>
                    <p>2. 仲裁申请书；</p>
                    <p>3. 申请人、被申请人的身份证明（申请人、被申请人为自然人的，应提交身份证复印件或其他身份证明材料；申请人、被申请人是法定代表人的，应提交营业执照复印件或者工商注册登记资料、申请人法定代表人证明书；申请人、被申请人是其他组织的，应提交有关部门关于该组织成立的批准文件或者能够证明其主体资格的材料）；</p>
                    <p>4. 有委托代理人的，需提交授权委托书；</p>
                    <p>5. 与案件相关的证据材料等。</p>
                </div>
            </div>
        )
    }
}