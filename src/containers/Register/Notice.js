import React, {Component} from 'react'
import {Button,Modal,Checkbox } from 'antd'

export default class Notice extends Component{
    state={
        visible1:false,
        visible2:false,
        visible3:false,
        flag1:true,
        flag2:true,
        flag3:true,
    }
    onChange1=(e)=>{
        this.setState({
            flag1:e.target.checked
        })
    }
    showModal1=()=>{
        this.setState({
            visible1:true
        })
    }
    hideModal1=()=>{
        this.setState({
            visible1:false
        })
    }

    onChange2=(e)=>{
        this.setState({
            flag2:e.target.checked
        })
    }
    showModal2=()=>{
        this.setState({
            visible2:true
        })
    }
    hideModal2=()=>{
        this.setState({
            visible2:false
        })
    }

    onChange3=(e)=>{
        this.setState({
            flag3:e.target.checked
        })
    }
    showModal3=()=>{
        this.setState({
            visible3:true
        })
    }
    hideModal3=()=>{
        this.setState({
            visible3:false
        })
    }

    render(){
        const {visible1,visible2,visible3,flag1,flag2,flag3} = this.state;
        return (
            <div className="register-notice ant-col-16 ant-col-offset-4">
                <div className="register-notice-main arbitration-clause">
                    <h4>*请仔细阅读以下《海南仲裁委员会仲裁规则》、《案件信息保密及安全保障协议》，若全部勾选并点击“同意”，代表用户/注册人认同以下全部内容；点击“不同意”，则返回至首页。</h4>
                    <div className="register-notice-main-checkboxs">
                        <p><Checkbox onChange={this.onChange1} checked={flag1}><a href="javascript:void(0);" className="notice-regulation" onClick={this.showModal1}>《海南仲裁委员会互联网金融仲裁规则》</a></Checkbox></p>
                        <p><Checkbox onChange={this.onChange2} checked={flag2}><a href="javascript:void(0);" className="notice-regulation" onClick={this.showModal2}>《案件信息保密及安全保障协议》</a></Checkbox></p>
                        {/* <p><Checkbox onChange={this.onChange3} checked={flag3}><a href="javascript:void(0);" className="notice-regulation" onClick={this.showModal3}></a></Checkbox></p> */}
                    </div>
                </div>
                <div className="personal-center-content-btn-box">
                    <Button type="primary" onClick={this.props.goNext} disabled={!(flag1&&flag2&&flag3)}>同意</Button>
                    <Button onClick={this.props.history.goBack}>不同意</Button>
                </div>
                <Modal
                    visible={visible1}
                    footer={[<Button type="primary" onClick={this.hideModal1}>确定</Button>]}
                    closable={false}
                    width="auto"
                >
                    <div className="register-regulation-main arbitration-clause">
                    <div>
                        <p className="t-center"><strong><span
                                className="font-h-29 t-center">海南仲裁委员会仲裁规则</span></strong></p>
                        <p className="tex-c"><span className="font-fs-16">（2017年8月22日第三届海南仲裁委员会第八次会议修订）</span>
                        </p>
                        <p className="tx-c-28">
                                <strong><span className="font-s-19">目&nbsp; 录</span></strong></p>
                        <p className="tx-l"><span
                                className="font-s-16">第一章&nbsp; 总&nbsp; 则</span></p>
                        <p className="indent-p"><span className="font-s-16">第一条&nbsp; 海南仲裁委员会</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16">第二条&nbsp; 本规则的适用</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16">第三条&nbsp; 放弃异议权</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16">第四条&nbsp; 诚信仲裁</span>
                        </p>
                        <p className="tx-l"><span
                                className="font-s-16">第二章&nbsp; 仲裁协议</span></p>
                        <p className="indent-p"><span className="font-s-16">第五条&nbsp; 仲裁协议的定义和形式</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16">第六条&nbsp; 仲裁协议的独立性</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16">第七条&nbsp; 仲裁邀请</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16">第八条&nbsp; 仲裁协议效力及管辖权异议</span>
                        </p>
                        <p className="tx-l"><span
                                className="font-s-16">第三章&nbsp; 仲裁申请、答辩、反请求</span></p>
                        <p className="indent-p"><span className="font-s-16">第九条&nbsp; 申请仲裁</span></p>
                        <p className="indent-p"><span
                                className="font-s-16">第十条&nbsp; 受理</span></p>
                        <p className="indent-p"><span className="font-s-16">第十一条&nbsp; 发送仲裁通知</span></p>
                        <p className="indent-p"><span className="font-s-16">第十二条&nbsp; 答辩</span></p>
                        <p className="indent-p"><span className="font-s-16">第十三条&nbsp; 反请求</span></p>
                        <p className="indent-p"><span className="font-s-16">第十四条&nbsp; 变更仲裁请求或反请求</span></p>
                        <p className="indent-p"><span className="font-s-16">第十五条&nbsp; 追加当事人</span></p>
                        <p className="indent-p"><span className="font-s-16">第十六条&nbsp; 提交的文件份数</span></p>
                        <p className="indent-p"><span className="font-s-16">第十七条&nbsp; 仲裁保全</span></p>
                        <p className="indent-p"><span className="font-s-16">第十八条&nbsp; 代理人</span></p>
                        <p className="tx-l"><span
                                className="font-s-16">第四章&nbsp; 仲裁庭</span></p>
                        <p className="indent-p"><span className="font-s-16">第十九条&nbsp; 仲裁员名册</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十条&nbsp; 仲裁庭组成</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十一条&nbsp; 仲裁庭组成通知</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十二条&nbsp; 仲裁员信息披露</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十三条&nbsp; 仲裁员回避</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十四条&nbsp; 仲裁员更换</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十五条&nbsp; 多数仲裁员继续仲裁程序</span></p>
                        <p className="tx-l"><span
                                className="font-s-16">第五章&nbsp; 审理和裁决</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十六条&nbsp; 审理方式</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十七条&nbsp; 保密义务</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十八条&nbsp; 仲裁地</span></p>
                        <p className="indent-p"><span className="font-s-16">第二十九条&nbsp; 开庭地点</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十条&nbsp; 合并审理</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十一条&nbsp; 开庭通知</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十二条&nbsp; 当事人缺席</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十三条&nbsp; 仲裁程序中止和恢复</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十四条&nbsp; 证据提交</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十五条&nbsp; 仲裁庭自行收集证据</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十六条&nbsp; 鉴定</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十七条&nbsp; 仲裁庭指定的专家</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十八条&nbsp; 质证和认证</span></p>
                        <p className="indent-p"><span className="font-s-16">第三十九条&nbsp; 辩论</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十条&nbsp; 最后陈述意见</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十一条&nbsp; 庭审记录</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十二条&nbsp; 撤回仲裁申请和撤销案件</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十三条&nbsp; 调解</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十四条&nbsp; 仲裁程序事项的决定</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十五条&nbsp; 裁决作出期限</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十六条&nbsp; 仲裁裁决</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十七条&nbsp; 仲裁裁决监督</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十八条&nbsp; 裁决确定费用承担</span></p>
                        <p className="indent-p"><span className="font-s-16">第四十九条&nbsp; 裁决补正和补充</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十条&nbsp; 调解书和决定书补正</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十一条&nbsp; 决定书使用</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十二条&nbsp; 重新仲裁</span></p>
                        <p className="tx-l"><span
                                className="font-s-16">第六章&nbsp; 简易程序</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十三条&nbsp; 简易程序的适用</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十四条&nbsp; 答辩和反请求的期限</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十五条&nbsp; 仲裁庭组成</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十六条&nbsp; 开庭通知</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十七条&nbsp; 简易程序变更</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十八条&nbsp; 裁决作出期限</span></p>
                        <p className="indent-p"><span className="font-s-16">第五十九条&nbsp; 本规则其他条款的适用</span></p>
                        <p className="tx-l"><span
                                className="font-s-16">第七章&nbsp; 国际商事仲裁的特别规定</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十条&nbsp; 本章适用</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十一条&nbsp; 答辩及反请求</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十二条&nbsp; 仲裁庭组成</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十三条&nbsp; 保全与临时措施</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十四条&nbsp; 紧急仲裁员</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十五条&nbsp; 开庭通知</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十六条&nbsp; 调解</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十七条&nbsp; 裁决作出期限</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十八条&nbsp; 法律适用</span></p>
                        <p className="tx-l"><span
                                className="font-s-16">第八章&nbsp; 期间和送达</span></p>
                        <p className="indent-p"><span className="font-s-16">第六十九条&nbsp; 期间的计算</span></p>
                        <p className="indent-p"><span className="font-s-16">第七十条&nbsp; 送达</span></p>
                        <p className="tx-l"><span
                                className="font-s-16">第九章&nbsp; 附&nbsp; 则</span></p>
                        <p className="indent-p"><span className="font-s-16">第七十一条&nbsp; 期限</span></p>
                        <p className="indent-p"><span className="font-s-16">第七十二条&nbsp; 期间</span></p>
                        <p className="indent-p"><span className="font-s-16">第七十三条&nbsp; 语言</span></p>
                        <p className="indent-p"><span className="font-s-16">第七十四条&nbsp; 本规则的解释</span></p>
                        <p className="indent-p"><span className="font-s-16">第七十五条&nbsp; 本规则的正式文本</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16">第七十六条&nbsp; 本规则的施行</span>
                        </p>
                        <p ><a><span
                                className="font-s">&nbsp;</span></a></p>
                        <p><strong><span className="font-s-16"><br/> </span></strong></p>
                        <p ><a><strong><span className="font-s-19">第一章&nbsp; 总&nbsp; 则</span></strong></a>
                        </p>
                        <p className="indent-p"><strong><span
                                className="font-s">&nbsp;</span></strong></p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第一条&nbsp; 海南仲裁委员会</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）海南仲裁委员会（以下称“本委”）系依法组建登记的解决平等主体的自然人、法人和其他组织之间发生的合同纠纷和其他财产权益纠纷的常设仲裁机构。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）本委主任履行本规则赋予的职责，副主任或秘书长受主任委托履行主任的职责。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）本委的办事机构和分支机构负责案件程序管理和日常事务。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人对本委办事机构和分支机构受理仲裁案件有异议的，由本委决定。<a><span></span></a></span>
                        </p>
                        <p className="indent-p"><a><strong><span className="font-s">第二条&nbsp; 本规则的适用</span></strong></a>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（一）</span><span className="font-s">当事人协议将争议提交本委仲裁的，适用本规则。当事人就仲裁程序事项或仲裁适用的规则另有约定的，从其约定。但该约定无法执行或违反法律强制性规定的除外。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人约定按照本规则进行仲裁但未约定具体仲裁机构的，视为同意将争议提交本委仲裁。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人约定适用本委制定的行业或专业仲裁规则且其争议属于该规则适用范围的，从其约定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）本规则未明确规定的事项，本委有权决定以适当的方式推进仲裁程序，以促进当事人之间的争议得到高效和公平的解决。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三条&nbsp; 放弃异议权</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">当事人知道或应当知道本规则或仲裁协议中规定的任何条款或条件未被遵守，但仍参加或继续参加仲裁程序且未对上述不遵守情况及时提出书面异议的，视为其放弃提出异议的权利。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">&nbsp;</span><a><strong><span
                                className="font-s">第四条&nbsp; 诚信仲裁</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁参与人应当遵循诚实信用和善意仲裁的原则，并签署诚信仲裁保证书。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人或代理人违反本规则规定致使程序拖延或费用增加的，应当承担由此增加的费用。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人及其代理人所作陈述和提交材料不实的，应当承担相应的后果。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p >
                                <a><strong><span
                                        className="font-s-19">第二章&nbsp; 仲裁协议</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="indent-p"><span
                                className="font-s">&nbsp;</span><a><strong><span
                                className="font-s">第五条&nbsp; 仲裁协议的定义和形式</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁协议是指当事人同意将相互间已经发生或可能发生的合同纠纷和其他财产权益纠纷提交仲裁的协议。仲裁协议包括合同中订立的仲裁条款或以其他书面形式达成的请求仲裁的协议。</span>
                        </p>
                        <p className="indent-p-middle"><span className="font-s">（二）仲裁协议应当采取书面形式。书面形式包括但不限于合同书、信件和数据电文（包括电报、电传、传真、电子数据交换和电子邮件）等可以有形表现所载内容的形式。在仲裁申请书和答辩书的交换过程中，一方当事人声称有仲裁协议，另一方当事人不做否认表示的，视为存在书面仲裁协议。</span>
                        </p>
                        <p className="indent-p-middle"><span className="font-s">（三）仲裁协议的适用法对仲裁协议的形式及效力另有规定的，从其规定。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六条&nbsp; 仲裁协议的独立性</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">仲裁协议独立存在。合同的变更、转让、解除、终止、无效、失效、未生效、被撤销以及成立与否，均不影响仲裁协议的效力。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第七条&nbsp; 仲裁邀请</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">当事人之间没有仲裁协议，一方当事人通过本委邀请另一方当事人以仲裁方式解决纠纷并签署仲裁邀请书的，本委于3日内将仲裁邀请书及本规则送达另一方当事人。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">另一方当事人同意仲裁的，双方当事人达成仲裁协议，本委通知双方直接进入仲裁程序；另一方当事人收到仲裁邀请书后10日内未作答复的，视为未接受邀请。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第八条&nbsp; 仲裁协议效力及管辖权异议</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）当事人对仲裁协议效力或仲裁案件管辖权有异议的，应当在首次开庭前以书面形式提出；书面审理的，应当在首次答辩期限届满前以书面形式提出。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人未依照前述规定提出异议的，视为承认该仲裁协议的效力或本委对仲裁案件的管辖权。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人对仲裁协议效力有异议的，可请求本委作出决定或请求人民法院作出裁定。一方请求本委作出决定，另一方请求人民法院作出裁定的，由人民法院裁定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人对仲裁协议效力或仲裁案件管辖权提出异议的，可由本委或由本委授权仲裁庭作出决定。仲裁庭的决定可在仲裁程序中单独作出，也可在裁决书中一并作出。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）本委经形式审查认为存在由本委进行仲裁的协议，可根据表面证据作出本委有管辖权的决定，仲裁程序继续进行。本委依表面证据作出的管辖权决定并不妨碍本委根据仲裁庭在审理过程中发现的与表面证据不一致的事实或证据重新作出管辖权决定。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（六）本委对仲裁案件作出无管辖权决定的，应当撤销案件。</span></p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p >
                                <a><strong><span
                                        className="font-s-19">第三章&nbsp; 仲裁申请、答辩、反请求</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第九条&nbsp; 申请仲裁</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）申请仲裁，应当提交下列文件或资料：</span>
                        </p>
                        <p className="indent-p"><span className="font-s">1.</span><span
                                className="font-s">仲裁协议；</span></p>
                        <p className="indent-p"><span className="font-s">2.</span><span
                                className="font-s">载明下列内容的仲裁申请书：</span></p>
                        <p className="indent-p"><span className="font-s">（1）申请人、被申请人的姓名或名称、住所、邮政编码、电话号码、传真以及其他可能的快捷联系方式；法人或其他组织法定代表人或主要负责人的姓名、职务、住所、邮政编码、电话号码、传真以及其他可能的快捷联系方式；</span>
                        </p>
                        <p className="indent-p-middle"><span className="font-s">（2）仲裁请求和所根据的事实、理由；</span>
                        </p>
                        <p className="indent-p-middle"><span className="font-s">（3）申请人或申请人授权的代理人的签名或印章。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">3.</span><span
                                className="font-s">证据和载明证据名称、证据来源、证明对象、证人姓名和住址的清单；</span></p>
                        <p className="indent-p"><span className="font-s">4.</span><span
                                className="font-s">申请人的身份证明文件。</span></p>
                        <p className="indent-p"><span className="font-s">（二）申请人申请仲裁，应当在接到书面通知后5日内按照本委收费标准预交仲裁费用。当事人预交仲裁费用有困难的，可申请减交或缓交，由本委决定是否批准。当事人不按期预交仲裁费用，又不提出减交或缓交申请，视为撤回仲裁申请。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十条&nbsp; 受理</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）本委自收到仲裁申请之日起5日内认为符合受理条件的，予以受理。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁申请不符合本章第九条规定的，当事人应当补正；未予补正的，视为撤回仲裁申请。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（三）仲裁程序自本委书面通知受理仲裁申请之日开始。</span></p>
                        <p className="indent-p"><span
                                className="font-s">（四）受理案件后本委指定一名秘书协助仲裁案件的程序管理。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十一条&nbsp; 发送仲裁通知</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">本委受理仲裁申请应将受理通知书、本规则和仲裁员名册发送申请人，并自受理仲裁申请之日起5日内将答辩通知连同仲裁申请书及其附件、本规则和仲裁员名册发送被申请人。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十二条&nbsp; 答辩</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）被申请人应当自收到答辩通知之日起15日内提交下列文件或资料。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">1.</span><span
                                className="font-s">载明下列内容的答辩书：</span></p>
                        <p className="indent-p"><span className="font-s">（1）被申请人的姓名或名称、住所、邮政编码、电话号码、传真以及其他可能的快捷联系方式；法人或其他组织法定代表人或主要负责人的姓名、职务、住所、邮政编码、电话号码、传真以及其他可能的快捷联系方式；</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（2）答辩意见和所根据的事实、理由；</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（3）被申请人或被申请人授权的代理人的签名或印章。</span></p>
                        <p className="indent-p"><span className="font-s">2.</span><span
                                className="font-s">证据和载明证据名称、证据来源、证明对象、证人姓名和住址的清单；</span></p>
                        <p className="indent-p"><span className="font-s">3.</span><span
                                className="font-s">被申请人的身份证明文件。</span></p>
                        <p className="indent-p"><span className="font-s">（二）被申请人确有正当理由请求延长答辩期限的，仲裁庭组成前由本委决定；仲裁庭组成后由仲裁庭决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）本委自收到答辩书之日起5日内将答辩书及其附件发送申请人。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）未提交答辩书，不影响仲裁程序的继续进行。&nbsp;&nbsp; </span>
                        </p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第十三条&nbsp; 反请求</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）被申请人如有反请求，应当自收到答辩通知之日起15日内以书面形式提交。逾期提交的，仲裁庭组成前由本委决定是否接受；仲裁庭组成后由仲裁庭决定是否接受。 </span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（二）反请求申请参照本章第九条、第十条的规定办理。</span></p>
                        <p className="indent-p"><span className="font-s">（三）本委自受理反请求申请之日起5日内将反请求答辩通知连同反请求申请书及其附件发送申请人。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（四）申请人答辩参照本章第十二条的规定办理。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十四条&nbsp; 变更仲裁请求或反请求</span></strong></a><strong><span
                                className="font-s"> </span></strong></p>
                        <p className="indent-p"><span className="font-s">（一）当事人可变更仲裁请求或反请求。变更仲裁请求或反请求应当提交书面申请。是否接受，仲裁庭组成前由本委决定；仲裁庭组成后由仲裁庭决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人变更仲裁请求或反请求，需补交仲裁费的，参照本章第九条第（二）项的规定办理。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十五条&nbsp; 追加当事人</span></strong></a></p>
                        <p className="indent-p"><span className="font-s-16 font-s">（一）已经进入仲裁程序的任何一方当事人可依据相同仲裁协议书面申请追加当事人。是否接受，仲裁庭组成前由本委决定；仲裁庭组成后由仲裁庭决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16 font-s">（二）本委或仲裁庭接受追加当事人请求的，各方当事人应按照本规则第十九条、第二十条、第五十五条、第六十二条的规定重新选定仲裁员组成仲裁庭，但各方当事人均同意由原仲裁庭继续审理的除外。</span>
                        </p>
                        <p className="indent-p"><span className="font-s-16 font-s">（三）经当事人和案外人一致同意后，案外人可书面申请加入仲裁程序。是否接受，仲裁庭组成前由本委决定；仲裁庭组成后由仲裁庭决定。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十六条&nbsp; 提交的文件份数</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">当事人提交仲裁申请书、答辩书、反请求申请书、证据材料以及其他书面文件，应一式五份。当事人超过两人的，增加相应份数；仲裁庭由一名仲裁员组成的，减少两份。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十七条&nbsp; 仲裁保全</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）一方当事人因另一方当事人的行为或其他原因，可能使裁决难以执行或造成当事人其他损害的，可申请财产保全或行为保全。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）在证据可能灭失或以后难以取得的情况下，当事人可申请证据保全。<br/> 　　（三）当事人提出上述申请的，本委将当事人的申请提交至有管辖权的人民法院。<br/> 　　（四）因情况紧急，不立即申请保全将会使其合法权益受到难以弥补的损害或证据可能灭失或以后难以取得的，当事人可在申请仲裁前向有管辖权的人民法院提出上述申请。 </span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第十八条&nbsp; 代理人</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">当事人委托代理人进行仲裁活动的，应当提交载明具体委托事项和权限的授权委托书。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="tc-ml-28">
                                <a><strong><span
                                        className="font-s-19">第四章&nbsp; 仲裁庭</span></strong></a>
                        </p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第十九条&nbsp; 仲裁员名册</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">（一）本委根据不同行业或专业设置仲裁员名册。</span></p>
                        <p className="indent-p"><span className="font-s">（二）当事人可从本委提供的仲裁员名册中选择仲裁员，也可从仲裁员名册外选择临时仲裁员。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人在仲裁员名册外选择临时仲裁员的，应当向本委提供该人选的专业简历和联系方式，经本委确认后可以担任仲裁员。除本规则第五十二条第（一）项规定情形外，该仲裁员任期至案件审理终结时止。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十条&nbsp; 仲裁庭组成</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）除非当事人另有约定或本规则另有规定，仲裁庭由三名仲裁员组成。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）双方当事人应当自收到仲裁通知之日起15日内分别选定或委托主任指定一名仲裁员，当事人未在上述期限内选定或委托主任指定仲裁员的，由主任指定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）双方当事人应当自被申请人收到仲裁通知之日起15日内共同选定或共同委托主任指定首席仲裁员。双方当事人也可以在上述期限内，各自推荐一至三名仲裁员作为首席仲裁员人选；经双方当事人申请或同意，本委也可以提供五至七名首席仲裁员候选名单，由双方当事人在本项规定的期限内从中选择一至三名仲裁员作为首席仲裁员人选。推荐名单或选择名单中有一名相同的，为双方当事人共同选定的首席仲裁员；有一名以上相同的，由主任根据案件具体情况在相同人选中确定，确定的仲裁员为双方当事人共同选定的首席仲裁员；推荐名单或选择名单中没有相同的人选，由主任在推荐名单或选择名单之外指定首席仲裁员。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）双方当事人未能依照本条第（三）项规定共同选定首席仲裁员的，由主任指定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）案件有两个或两个以上的申请人或被申请人时，申请人方或被申请人方应当共同协商选定或共同委托主任指定一名仲裁员；自最后一名当事人收到仲裁通知之日起15日内未能就选定或委托主任指定仲裁员达成一致意见的，由主任指定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）当事人选定在开庭地行政区划以外居住的仲裁员，应当承担仲裁员因审理案件发生的差旅费。当事人未在规定期限内预交差旅费的，视为未选定仲裁员，主任可根据本规则的规定指定仲裁员。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（七）仲裁员拒绝接受当事人的选定或因疾病以及其他可能影响正常履行仲裁员职责的原因不能参加案件审理的，当事人应当自收到重新选定仲裁员通知之日起5日内重新选定仲裁员。未能在该期限内重新选定仲裁员的，由主任指定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（八）主任可授权副主任、秘书长或分支机构负责人指定仲裁员。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十一条&nbsp; 仲裁庭组成通知</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">本委自仲裁庭组成之日起5日内将仲裁庭组成情况书面通知当事人。秘书在仲裁庭组成后应当及时将案卷移交仲裁庭。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十二条&nbsp; 仲裁员信息披露</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁员接受指定或选定后，应当签署保证独立、公正仲裁的声明书，声明书可由秘书发送各方当事人。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁员知悉与案件当事人或代理人存在可能导致当事人对其独立性、公正性产生怀疑的情形，应当书面披露。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人应当自收到仲裁员书面披露之日起5日内就是否申请回避提出书面意见。&nbsp;&nbsp;&nbsp; </span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人以仲裁员披露的事项为由申请仲裁员回避的，适用本章第二十三条第（一）、（二）、（四）、（五）、（六）项的规定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）当事人在上述第（三）项规定的期限内未申请仲裁员回避的，不得再以仲裁员曾经披露的事项为由申请回避。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十三条&nbsp; 仲裁员回避</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一） 仲裁员有下列情形之一，必须回避，当事人也有权提出回避申请：</span>
                        </p>
                        <p className="indent-p"><span className="font-s">1.</span><span
                                className="font-s">是本案当事人或当事人、代理人近亲属的；</span></p>
                        <p className="indent-p"><span className="font-s">2.</span><span
                                className="font-s">与本案有利害关系的；</span></p>
                        <p className="indent-p"><span className="font-s">3.</span><span
                                className="font-s">与本案当事人、代理人有其他关系，可能影响公正仲裁的；</span></p>
                        <p className="indent-p"><span className="font-s">4.</span><span
                                className="font-s">私自会见当事人、代理人的；</span></p>
                        <p className="indent-p"><span className="font-s">5.</span><span
                                className="font-s">接受当事人、代理人的请客送礼的。</span></p>
                        <p className="indent-p"><span className="font-s">（二）当事人应当通过书面方式提出回避申请，说明理由，并提供相应证据。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）除本章第二十二条第（三）项规定的情形外，对仲裁员的回避申请应当在首次开庭前提出。回避事由在首次开庭后知道的，可在最后一次开庭终结前提出。不再开庭或书面审理的案件，当事人应当在获知回避事由后10日内提出。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（四）秘书应当及时将回避申请发送其他当事人和仲裁庭成员。</span></p>
                        <p className="indent-p"><span className="font-s">（五）一方当事人申请仲裁员回避，其他当事人表示同意，或被申请回避的仲裁员获知后主动退出，则该仲裁员不再参加案件审理。此情形不属于当事人提出回避的理由成立。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）除本条第（五）项规定情形外，仲裁员是否回避，由主任决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（七）当事人在获知仲裁庭组成情况后聘请的代理人与仲裁员形成本章规定的应予回避情形的，视为该当事人放弃就此申请回避的权利，但其他当事人就此申请回避的权利不受影响。因此导致仲裁程序拖延的，造成回避情形的当事人承担由此发生的费用。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十四条&nbsp; 仲裁员更换</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁员因死亡或健康等原因不能履行职责，或主动退出案件审理，或主任决定其回避，或双方当事人一致要求其退出案件审理的，应当更换。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）本委认为仲裁员在法律上或事实上不能履行职责或没有按照本规则的要求履行职责时，也可主动更换。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）被更换的仲裁员由当事人选定的，当事人应当自收到通知之日起5日内重新选定；由主任指定的，另行指定。本委自仲裁员更换之日起5日内将更换情况书面通知当事人。重新选定或指定仲裁员后，当事人可请求已进行的仲裁程序重新进行，是否必要，由仲裁庭决定；仲裁庭也可自行决定已进行的仲裁程序是否重新进行。仲裁庭决定仲裁程序重新进行的，本规则第四十五条、第五十八条、第六十七条规定的期限自仲裁员更换之日起算。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十五条&nbsp; 多数仲裁员继续仲裁程序</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">最后一次开庭终结后，三人仲裁庭中的一名仲裁员因死亡、健康、除名等特殊事由不能参加评议或作出裁决的，经双方当事人同意并经本委主任决定，可由其他仲裁员继续仲裁程序。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="tc-ml-28">
                                <a><strong><span
                                        className="font-s-19">第五章&nbsp; 审理和裁决</span></strong></a>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第二十六条&nbsp; 审理方式</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭开庭审理案件。</span></p>
                        <p className="indent-p"><span className="font-s">（二）当事人约定不开庭的，或仲裁庭认为不必要开庭审理并征得双方当事人同意的，可根据当事人提交的证据材料和书面文件进行书面审理。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）除非当事人另有约定，仲裁庭可以视频等其认为适当的方式审理案件，可就仲裁案件的程序安排作出决定。无论采取何种审理方式，仲裁庭均应当公平、公正地对待双方当事人，给予双方当事人陈述和辩论的合理机会。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）仲裁庭可在其认为适当的地点以视频、书信、数据电文等其认为适当的方式进行评议。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十七条&nbsp; 保密义务</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁不公开。当事人协议公开的，可以公开，但涉及国家秘密的除外。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）不公开审理的案件，当事人及其代理人、仲裁员、证人、翻译人员、仲裁庭咨询的专家和指定的鉴定人、本委工作人员以及其他有关人员，均不得对外界透露案件实体和程序的有关情况。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十八条&nbsp; 仲裁地</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">（一）</span><span className="font-s">选择本委仲裁的，本委所在地为仲裁地。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁裁决视为在仲裁地作出。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第二十九条&nbsp; 开庭地点</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）除非当事人另有约定，开庭审理在本委所在地进行。在本委分支机构所在地或本委指定的地点开庭的，均视为在本委所在地审理。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人约定在本委所在地或分支机构所在地以外的其他地点开庭的，应当承担由此发生的费用。当事人未在本委规定的期限内按照约定或仲裁庭确定的比例预交费用的，视为未约定。&nbsp;&nbsp;&nbsp; </span>
                        </p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第三十条&nbsp; 合并审理</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">仲裁标的为同一种类或有关联的两个或两个以上的案件，经当事人同意，本委或仲裁庭可决定合并审理。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">仲裁庭组成人员不同的案件，不适用前款的规定。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十一条&nbsp; 开庭通知</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭应当在开庭5日前将开庭日期通知当事人。经双方当事人同意，仲裁庭可提前开庭。当事人有正当理由请求延期开庭的，应当在开庭3日前提出；是否延期，由仲裁庭决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）再次开庭以及延期后开庭日期的通知，不受5日期限限制。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十二条&nbsp; 当事人缺席</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）申请人经书面通知，无正当理由不到庭或未经仲裁庭许可中途退庭的，可视为撤回仲裁申请。但不影响仲裁庭对被申请人的反请求进行缺席审理。 </span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）被申请人经书面通知，无正当理由不到庭或未经仲裁庭许可中途退庭的，仲裁庭可进行缺席审理。被申请人提出反请求的，可视为撤回反请求。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十三条&nbsp; 仲裁程序中止</span></strong></a><strong><span
                                className="font-s">和恢复</span></strong></p>
                        <p className="indent-p"><span className="font-s">（一）案件审理过程中，双方当事人共同申请或出现特殊事由需要中止审理的，可中止仲裁程序。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）中止仲裁程序的决定，仲裁庭组成前由本委作出；仲裁庭组成后由仲裁庭作出。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）中止仲裁程序的原因消失或中止程序期满后，仲裁程序恢复进行。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十四条&nbsp; 证据提交</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）当事人对自己的主张承担举证责任。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁庭有权要求当事人在一定期限内提交证据材料。当事人应当在要求的期限内提交。逾期提交的，仲裁庭有权决定是否接受。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人未能在规定的期限内提交证据，或虽提交证据但不能证明其主张的，负有举证责任的当事人承担因此产生的不利后果。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人对自己提交的证据材料应当分类、装订，标明序号和页码，简要写明证据材料的名称、来源、内容和证明对象，签名盖章并注明提交日期。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）一方当事人对另一方当事人提交的复制品、照片、副本、节录本的真实性没有表示异议，可视为与原件或原物一致。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）除非当事人另有约定，提交的外文证据材料和书面文件应当附有中文译本。仲裁庭认为有必要的，可要求当事人提供其他语言的译本。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十五条&nbsp; 仲裁庭自行收集证据</span></strong></a><strong> </strong><span
                                className="font-s">&nbsp;</span></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭认为有必要，可自行调查事实、收集证据。仲裁庭调查事实、收集证据时，认为有必要通知双方当事人到场的，应当及时通知。经通知，一方或双方当事人未到场，不影响仲裁庭调查事实和收集证据。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁庭调查收集的证据应当发送当事人，给予当事人提出意见的机会。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）案件可能涉及案外人利益的，仲裁庭应当听取案外人和当事人的意见。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十六条&nbsp; 鉴定</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）当事人申请鉴定且经仲裁庭同意，可通知当事人在仲裁庭规定的期限内共同选定鉴定机构或鉴定专家。当事人不能达成一致意见的，由仲裁庭指定鉴定机构或鉴定专家。当事人应当按照约定或仲裁庭确定的比例按期预交鉴定费用，不预交的，视为撤回鉴定申请。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人虽未申请鉴定但仲裁庭认为有必要，可通知当事人在仲裁庭规定的期限内共同选定鉴定机构或鉴定专家。当事人不能达成一致意见的，由仲裁庭指定鉴定机构或鉴定专家。当事人应当按照仲裁庭确定的比例按期预交鉴定费用。不预交的，承担不予鉴定的后果。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）仲裁庭有权要求当事人在规定期限内向鉴定人提供或出示鉴定所需的任何文件、资料、财产或其他物品。当事人无正当理由逾期未提交的，承担相应法律后果。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人、鉴定人就鉴定所需的文件、资料、财产或其他物品是否与案件有关有争议的，由仲裁庭作出决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）鉴定报告的副本，应当发送当事人。当事人可对鉴定报告提出意见。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）根据当事人的请求，或仲裁庭认为有必要，应当通知鉴定人参加开庭。当事人经仲裁庭许可，可向鉴定人提问。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十七条&nbsp; 仲裁庭指定的专家</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">（一）</span><span className="font-s">当事人申请且经仲裁庭同意，或仲裁庭认为有必要，可就案件的专门性问题向一名或数名专家咨询。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人有义务向专家提供任何有关资料。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）仲裁庭可要求专家就案件的专门性问题所提出的报告到庭作出说明和解释。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人应当按照约定或仲裁庭确定的比例按期预交专家费用。不预交的，视为撤回申请；或承担相应法律后果。 </span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十八条&nbsp; 质证和认证</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）开庭审理的案件，在开庭前已经交换的证据应当在开庭时出示，由当事人质证。当事人在证据交换过程中已经认可并记录在卷的证据，经仲裁庭在庭审中说明后，可不经出示，直接作为认定案件事实的依据。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）对当事人当庭或开庭后提交的证据材料，仲裁庭决定接受但不再开庭审理的，可要求当事人在一定期限内提交书面质证意见。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）证据由仲裁庭认定；鉴定报告、专家报告由仲裁庭决定是否采纳。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）一方当事人对另一方当事人陈述的事实，既未表示承认也未否认，经仲裁庭充分说明并询问后，其仍不明确表示肯定或否定的，视为对该项事实的承认。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）当事人在仲裁申请书、答辩书、陈述以及其他书面意见中承认的对己方不利的事实和证据，仲裁庭予以确认。但当事人反悔并有相反证据足以推翻的除外。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）有证据证明一方当事人持有证据无正当理由拒不提供，对方当事人主张该证据的内容不利于证据持有人，可推定该主张成立。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第三十九条&nbsp; 辩论</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">当事人在审理过程中有权进行辩论。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十条&nbsp; 最后陈述意见</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">仲裁庭在审理终结前，应当征询当事人的最后意见。当事人的最后意见可在开庭时以口头方式提出，也可在仲裁庭规定的期限内以书面方式提出。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十一条&nbsp; 庭审记录</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭应当将开庭情况记入笔录。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）经仲裁庭同意，本委可对庭审进行录音或录像。录音或录像仅供本委或仲裁庭查用，不对外公开。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人和其他仲裁参与人认为对自己陈述的记录有遗漏或差错的，有权申请补正；仲裁庭不予补正时，应当记录该申请。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）笔录由仲裁员、秘书、记录人员、当事人和其他仲裁参与人签名或盖章。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十二条&nbsp; 撤回仲裁申请和撤销案件</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">（一）</span><span className="font-s">申请仲裁后，当事人可撤回仲裁申请。被申请人提出反请求的，申请人撤回本请求，不影响仲裁庭对反请求进行审理。被申请人撤回反请求的，不影响仲裁庭对本请求进行审理。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（二）</span><span className="font-s">仲裁庭组成前当事人撤回仲裁申请的，由本委决定；仲裁庭组成后当事人撤回仲裁申请的，由仲裁庭决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）除上述情形以及本规则第八条第（六）项外，因任何其他原因致使仲裁程序不需要或不可能继续进行的，本委或仲裁庭可作出撤销案件的决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）仲裁庭组成前当事人撤回仲裁申请的，本委退回预收的案件受理费；仲裁庭组成后当事人撤回仲裁申请的，本委根据实际情况退回部分预收的案件受理费和案件处理费。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十三条&nbsp; 调解</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）案件审理过程中，仲裁庭可根据当事人的请求或征得当事人同意进行调解。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）案件审理过程中，当事人可自行和解或依据《海南仲裁委员会调解中心调解暂行规则》向本委申请由调解员进行调解。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人自行达成和解的，可请求仲裁庭根据其和解协议的内容制作调解书或裁决书，也可撤回仲裁申请。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）一方当事人申请案外人参加调解，另一方当事人及案外人同意的，仲裁庭可通知案外人参加调解。案外人同意承担民事责任的，应予准许。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）调解达成协议的内容超出仲裁请求范围的，应当允许，但不得损害国家、集体或第三人利益。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）调解达成协议的，仲裁庭应当制作调解书或根据协议的结果制作裁决书。对能够即时履行的或当事人表示不需要制作调解书或裁决书的调解协议应当记入笔录，由双方当事人、仲裁员和秘书在笔录上签名或盖章后即具有法律效力。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（七）调解书应当写明仲裁请求和当事人协议的结果。调解书由仲裁员签名，加盖本委印章。调解书经双方当事人签收后即发生法律效力。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（八）在调解书签收前当事人反悔的，仲裁庭应当及时作出裁决。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（九）调解不成的，任何一方当事人均不得在之后的仲裁程序、司法程序和其他任何程序中援引对方当事人或仲裁庭在调解过程中的任何陈述、意见、观点或建议作为其请求、答辩或反请求的依据。仲裁庭不能将当事人在调解中发表的意见作为裁决的依据。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十四条&nbsp; 仲裁程序事项的决定</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）三人仲裁庭的决定按照多数意见作出，未能形成多数意见，按照首席仲裁员的意见作出。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）经当事人同意或仲裁庭授权，首席仲裁员可就程序事项作出决定。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十五条&nbsp; 裁决作出期限</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭应当自仲裁庭组成之日起四个月内作出裁决。有特殊事由需要延长的，由首席仲裁员提请秘书长批准。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）上述期间不包括仲裁程序中止期间以及对专门性问题进行审计、评估、鉴定、检验，以及当事人双方书面请求仲裁庭给予庭外自行和解的期间。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十六条&nbsp; 仲裁裁决</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）由三名仲裁员组成仲裁庭的，裁决应当按照多数仲裁员的意见作出，少数仲裁员的不同意见可记入笔录。不能形成多数意见时，裁决应当按照首席仲裁员的意见作出。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）裁决书应当写明仲裁请求、争议事实、裁决理由、裁决结果、仲裁费用的承担和裁决日期。当事人另有约定的可以不写明争议事实和裁决理由。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）裁决书由仲裁员签名。对裁决持不同意见的仲裁员可签名，也可不签名；不签名的仲裁员应当出具个人意见。本委可将其个人意见随裁决书发送当事人，但该意见不构成裁决书的一部份。不签名的仲裁员不出具个人意见的，视为无正当理由拒签。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（四）裁决书经仲裁员签名后，加盖本委印章作出。</span></p>
                        <p className="indent-p"><span className="font-s">（五）裁决书自作出之日起发生法律效力。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）仲裁庭认为确有必要，可就当事人的部分请求事项先行作出裁决。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十七条&nbsp; 仲裁裁决监督</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">仲裁裁决作出前，有下列情形之一的，可提交本委专家委员会研究并提出意见，专家委员会的意见作为仲裁庭裁决的重要参考。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（一）仲裁案件在社会上有重大影响的。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁庭意见具有重大分歧的。</span></p>
                        <p className="indent-p"><span className="font-s">（三）本委主任认为有必要的。</span></p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第四十八条&nbsp; 裁决确定费用承担</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭有权在裁决书中确定双方当事人应当承担的仲裁费用和实际发生的其他费用。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁费用原则上由仲裁庭根据当事人责任大小和仲裁请求支持的程度确定各自承担的比例。当事人自行和解或经仲裁庭调解结案的，当事人可协商确定各自承担的比例。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）仲裁庭有权根据当事人的请求裁决责任方补偿对方因办理案件支出的合理费用。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人请求律师费损失并提供相关证据，仲裁庭可参照当事人责任大小和仲裁请求支持的程度及律师收费情况、案件复杂程度、争议金额等因素酌情予以支持。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第四十九条&nbsp; 裁决补正和补充</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）对裁决书中的文字、计算错误或仲裁庭意见部分对当事人申请仲裁的事项已经作出判断但在裁决主文遗漏的，仲裁庭应当补正。裁决书对当事人申请仲裁的事项遗漏的，仲裁庭应当作出补充裁决。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人发现裁决书中有前项规定情形的，可自收到裁决书之日起30日内书面请求仲裁庭补正或作出补充裁决。</span>
                        </p>
                        <p className="indent-p"><span
                                className="font-s">（三）仲裁庭作出的补正或补充裁决，是原裁决书的组成部分。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十条 &nbsp;调解书和决定书补正</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">调解书和决定书的补正适用本章第四十九条裁决书补正的规定。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十一条&nbsp; 决定书使用</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">属于下列情形之一的，由本委或仲裁庭作出决定书：</span></p>
                        <p className="indent-p"><span className="font-s">（一）确认仲裁协议是否有效或案件管辖权；</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）决定仲裁员是否回避；</span></p>
                        <p className="indent-p"><span className="font-s">（三）中止仲裁程序；</span></p>
                        <p className="indent-p"><span className="font-s">（四）准许或视为撤回仲裁申请；</span></p>
                        <p className="indent-p"><span className="font-s">（五）撤销仲裁案件；</span></p>
                        <p className="indent-p"><span className="font-s">（六）驳回仲裁申请；</span></p>
                        <p className="indent-p"><span className="font-s">（七）其他事项。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十二条&nbsp; 重新仲裁</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）人民法院通知重新仲裁的案件，由原仲裁庭在人民法院限定的期限内决定是否重新审理并告知人民法院。重新仲裁的，应在5日内通知当事人。双方当事人一致要求仲裁员退出案件审理的，应当更换。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">原仲裁庭不能履行重新仲裁职责的，由本委决定是否重新审理并告知人民法院，并重新组成仲裁庭。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）仲裁庭应当根据人民法院通知的事由确定重新仲裁的范围。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）是否开庭由仲裁庭决定。开庭日期的通知不受5日期限限制。当事人没有提出新的事实、证据的，仲裁庭认为不需要开庭审理的，可不开庭审理。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）人民法院通知重新仲裁的案件，当事人不得就管辖权提出异议。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）重新仲裁不再收取仲裁费。</span></p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p >
                                <a><strong><span
                                        className="font-s-19">第六章&nbsp; 简易程序</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">&nbsp;&nbsp;&nbsp; </span>
                        </p>
                        <p className="indent-p"><a><strong><span className="font-s">第五十三条&nbsp; 简易程序的适用</span></strong></a>
                        </p>
                        <p className="indent-p"><span className="font-s">（一）除非当事人另有约定，凡案件争议金额不超过300万元或按件收费的，适用简易程序。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）案件争议金额超过300万元，双方当事人约定或同意的，也可适用简易程序，仲裁费用予以适当减收。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）案件争议金额不超过300万元或按件收费的，双方当事人约定适用普通程序的，承担由此增加的仲裁费用。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十四条&nbsp; 答辩和反请求的期限</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">被申请人应当自收到答辩通知之日起10日内提交答辩书和证明文件；如有反请求，也应当在此期限提交申请书和证明文件。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十五条&nbsp; 仲裁庭组成</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">（一）适用简易程序的案件，由独任仲裁员审理。</span></p>
                        <p className="indent-p"><span className="font-s">（二）双方当事人应当自收到仲裁通知之日起10日内在仲裁员名册中共同选定或共同委托主任指定独任仲裁员。选择独任仲裁员时，可适用本规则第二十条第（二）项规定的方式。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">双方当事人逾期未能共同选定或共同委托主任指定独任仲裁员的，由主任指定。</span>
                        </p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第五十六条&nbsp; 开庭通知</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）开庭审理的案件，仲裁庭应当在开庭3日前将开庭日期通知当事人。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）开庭审理的，只开庭一次。仲裁庭认为确有必要的，可决定再次开庭。再次开庭日期的通知，不受3日期限限制。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十七条&nbsp; 简易程序变更</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）因仲裁请求的变更或反请求的提出、变更导致争议金额超过300万元的，不影响简易程序的进行。确需变更为普通程序的，由主任决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）简易程序变更为普通程序的，当事人应当自收到程序变更通知之日起5日内按照本规则的规定各自选定或各自委托主任指定一名仲裁员。除非当事人另有约定，原独任仲裁员为首席仲裁员。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）仲裁庭重新组成前已进行的仲裁程序是否重新进行，由重新组成的仲裁庭决定；仲裁庭重新组成后仲裁程序的进行，不再适用简易程序。本规则第四十五条、第六十七条规定的期限自仲裁庭重新组成之日起重新起算。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十八条&nbsp; 裁决作出期限</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">仲裁庭应当自组成之日起60日内作出裁决。有特殊事由需要延长的，由仲裁庭提请秘书长批准。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第五十九条&nbsp; 本规则其他条款的适用</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">本章未规定的事项，适用本规则其他有关规定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p >
                                <a><strong><span
                                        className="font-s-19">第七章&nbsp; 国际商事仲裁的特别规定</span></strong></a></p>
                        <p className="indent-p"><a><span
                                className="font-s">&nbsp;</span></a></p>
                        <p className="indent-p"><a><strong><span className="font-s">第六十条&nbsp; 本章适用</span></strong></a>
                        </p>
                        <p className="indent-p"><span className="font-s">（一）除非当事人另有约定，国际商事仲裁案件适用本章规定。本章没有规定的，适用本规则其他有关规定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）涉及香港特别行政区、澳门特别行政区及台湾地区的仲裁案件，参照适用本章规定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人对案件是否具有国际或涉外因素有争议的，仲裁庭组成前由本委决定，仲裁庭组成后由仲裁庭决定。仲裁庭的决定不影响此前已经进行的仲裁程序。</span>
                        </p>
                        <p className="indent-p"><a><strong><span
                                className="font-s">第六十一条&nbsp; 答辩及反请求</span></strong></a></p>
                        <p className="indent-p"><a><span className="font-s">（一）被申请人应当自收到答辩通知之日起30日内，提交答辩书和证明文件。</span></a>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）被申请人如有反请求，应当自收到答辩通知之日起30日内，以书面形式提交。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六十二条&nbsp; 仲裁庭组成</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）双方当事人应当自收到仲裁通知之日起30日内按照本规则第十九条、第二十条、第五十五条的规定分别选定或委托主任为其指定一名仲裁员、共同选定或共同委托主任指定首席仲裁员。 </span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人未能按照前款规定选定或委托指定仲裁员的，由主任指定。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六十三条&nbsp; 保全与临时措施</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">（一）</span><span className="font-s">当事人依据中国法律通过本委申请保全的，本委应当将当事人的保全申请提交当事人指明的有管辖权的法院。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）根据当事人申请，仲裁庭可依据所适用的程序性法律或当事人的约定决定采取其认为适当的临时措施，采取临时措施的决定可以仲裁庭决定、中间裁决或有关法律认可的其他方式作出。确有必要的，仲裁庭有权要求申请临时措施的当事人提供适当的担保。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）当事人也可依据有关法律直接向具有管辖权的法院提出临时措施申请。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六十四条&nbsp; 紧急仲裁员</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）案件受理后至组成仲裁庭之前，当事人需要紧急临时救济的，可依据所适用的法律或双方当事人的约定提出指定紧急仲裁员的书面申请，是否同意，由本委决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）本委同意指定紧急仲裁员的，申请人应当预交相应的仲裁费。在紧急仲裁员程序进行过程中，因案件需要，本委可决定追加相应仲裁费。申请人未在本委通知的期限内预交费用的，视为撤回申请。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）本委主任应在当事人预交相应费用后2日内在仲裁员名册中指定一名紧急仲裁员，并将指定情况通知当事人。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）紧急仲裁员的信息披露、回避等事项，参照本规则第二十二条、第二十三条的规定办理。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（五）紧急仲裁员有权采取其认为适当的方式就当事人的临时措施申请进行审查，但应给予当事人有合理陈述的机会。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（六）紧急仲裁员应当于指定之日起15日内作出相关决定、指令或裁决，并说明理由，该决定、指令或裁决由紧急仲裁员签字并加盖本委印章后发送当事人。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（七）当事人对紧急仲裁员作出的相关决定、指令或裁决有异议的，有权自收到相关决定、指令或裁决之日起3日内向紧急仲裁员提出修改、中止或撤销相关决定、指令或裁决的申请，是否同意由紧急仲裁员决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（八）除非当事人另有约定，紧急仲裁员不再担任与临时措施申请有关的争议案件的仲裁员。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（九）紧急仲裁员在上述程序中作出的相关决定、指令或裁决，对仲裁庭不具有约束力。仲裁庭可修改、中止或撤销紧急仲裁员作出的相关决定、指令或裁决。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六十五条&nbsp; 开庭通知</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭应当在开庭15日前将开庭日期通知双方当事人；经当事人同意，可提前开庭。当事人有正当理由请求延期开庭的，应在开庭10日前书面提出；是否延期，由仲裁庭决定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）再次开庭以及延期后开庭日期的通知，不受15日期限限制。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六十六条&nbsp; 调解</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）经双方当事人同意，仲裁庭可进行调解。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）调解不成导致调解程序终止，双方当事人以避免裁决结果可能受到调解影响为由申请更换仲裁员的，由主任批准是否更换，更换仲裁员，双方当事人承担由此增加的费用。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六十七条&nbsp; 裁决作出期限</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">仲裁庭应当自仲裁庭组成之日起6个月（简易程序90日）内作出裁决。有特殊事由需要延长的，由首席仲裁员或独任仲裁员提请秘书长批准。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第六十八条&nbsp; 法律适用</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">（一）仲裁庭应当根据当事人选择适用的法律对争议作出裁决。除非当事人另有约定，选择适用的法律系指实体法。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）当事人未选择的，仲裁庭有权根据案件情况确定适用法律。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）在任何情况下，仲裁庭均应当根据有效的合同条款并考虑有关商事惯例作出裁决。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p >
                                <a><strong><span
                                        className="font-s-19">第八章&nbsp; 期间和送达</span></strong></a></p>
                        <p className="indent-p"><a><span
                                className="font-s">&nbsp;</span></a></p>
                        <p className="indent-p"><a><strong><span className="font-s">第六十九条&nbsp; 期间的计算</span></strong></a>
                        </p>
                        <p className="indent-p"><span className="font-s">（一）本规则规定的期间或根据本规则确定的期间，应当自期间开始之次日起算。期间开始之日，不计算在期间内。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）期间内的公共节假日和非工作日应计算在期间内。期间届满日是公共节假日或非工作日的，以其后的第一个工作日为期间届满日。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）期间不包括在途时间，仲裁文书、通知、材料在期间届满前交邮、交发的，不算过期。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）当事人因不可抗力或其他正当理由耽误期限的，在障碍消除后10日内，可申请顺延；是否准许，由本委或仲裁庭决定。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第七十条&nbsp; 送达</span></strong></a><strong> </strong></p>
                        <p className="indent-p"><span className="font-s">（一）当事人对送达方式有约定的，从其约定。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）除上述第（一）项外，有关仲裁的文书、通知、材料等可当面送达或以邮寄、传真、电子邮件、其他能提供记录的电子数据交换方式或本委认为适当的其他方式送达。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（三）本委向当事人或其代理人发送的仲裁文书、通知、材料等，有以下情形之一的，视为送达：</span>
                        </p>
                        <p className="indent-p"><span className="font-s">1.</span><span
                                className="font-s">送达至受送达人的营业地、注册地、居住地、户籍登记地址、身份证地址、口头或书面向本委确认的地址、对外使用的任何有效地址、当事人协议中列明的地址；</span>
                        </p>
                        <p className="indent-p"><span className="font-s">2.</span><span
                                className="font-s">经合理查询不能找到上述任一地点而以邮寄的方式或能提供投递记录的其他任何方式投递给受送达人最后一个为人所知的通讯地址；</span></p>
                        <p className="indent-p"><span className="font-s">3.</span><span
                                className="font-s">当事人或其代理人收到本委送达的仲裁文书、通知、材料后变更地址而未通知本委的，本委将后续仲裁文书、通知、材料等投递给受送达人原送达地址。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（四）送达时间以上述送达方式中最先送达到受送达人的时间为准。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p >
                                <a><strong><span className="font-s-19">第九章&nbsp; 附&nbsp; 则</span></strong></a>
                        </p>
                        <p className="indent-p"><a><span
                                className="font-s">&nbsp;</span></a></p>
                        <p className="indent-p"><a><strong><span className="font-s">第七十一条&nbsp; 期限</span></strong></a>
                        </p>
                        <p className="indent-p"><span className="font-s">本规则所称期限，是指仲裁参与人单独或共同完成仲裁活动应当遵守的时间。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第七十二条&nbsp; 期间</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">本规则所称期间，是指期限的某一特定的点到另一特定的点所经过的时间段。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第七十三条&nbsp; 语言</span></strong></a></p>
                        <p className="indent-p"><span
                                className="font-s">（一）</span><span className="font-s">除非当事人另有约定，本委以中文为正式语言。</span>
                        </p>
                        <p className="indent-p"><span className="font-s">（二）开庭审理时，当事人或其代理人、证人需要语言翻译，可由本委提供译员，也可由当事人自行提供译员。当事人承担翻译费用。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第七十四条 &nbsp;本规则的解释</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">本规则由本委解释。</span></p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第七十五条&nbsp; 本规则的正式文本</span></strong></a></p>
                        <p className="indent-p"><span className="font-s">本委公布的本规则的中文、英文以及其他语言文本，均为正式文本。不同文本的表述产生歧义时，以中文文本的表述为准。</span>
                        </p>
                        <p className="indent-p">
                                <a><strong><span
                                        className="font-s">第七十六条&nbsp; 本规则的施行</span></strong></a></p>
                        <p className="indent-p"><a><span className="font-s">本规则自2017年9月10日起施行。本规则施行前受理的案件，适用受理时施行的仲裁规则。双方当事人一致同意的，可适用本规则。</span></a>
                        </p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p className="indent-p"><span className="font-s">&nbsp;</span></p>
                        <p><br/></p></div>
                        {/* <p><strong>本协议由海南仲裁委员会（以下简称本会）和用户签订：<br /></strong></p>
                        <p>本协议旨在明确双方在案件信息保密及安全保障方面的权利与义务，本协议包含如下条款：</p>
                        <p className="p-indent">1、用户同意本会使用用户所提交的身份资料、人脸影像等个人信息。这些信息仅供本会用作确认、验证当事人及其代理人身份及推进仲裁程序，本会不在案涉仲裁程序以外的任何场合使用。</p>
                        <p className="p-indent">2、本会依法保护个人信息的保密性及安全性，不向任何机构或个人非法披露，但国家法律法规另有规定的除外。</p>
                        <p className="p-indent">3、本会对仲裁程序的内容、仲裁过程中展示的证据、仲裁裁决等仲裁中产生的信息和文件保密，不对当事人以外的人披露，但国家法律法规另有规定的除外。</p>
                        <p className="p-indent">4、本会为当事人、仲裁庭和本会之间案件数据的在线传输提供安全保障，对因计算机病毒、黑客攻击、网络故障等不可抗力造成数据丢失的，本会不承担责任。</p>
                        <p className="p-indent">5、本会采取为案件数据信息加密的形式为案件信息保密。对因计算机病毒、黑客攻击、网络故障等不可抗力，造成收件人以外的他人获悉有关信息的，本会不承担责任。</p> */}
                    </div>
                </Modal>
                <Modal
                    visible={visible2}
                    footer={[<Button type="primary" onClick={this.hideModal2}>确定</Button>]}
                    closable={false}
                    width="auto"
                >
                    <div className="register-regulation-main arbitration-clause">
                        <p className="p-indent">本协议由海南仲裁委员会（以下简称本会）和用户签订：</p>
                        <p className="p-indent"><strong>本协议旨在明确双方在案件信息保密及安全保障方面的权利与义务，本协议包含如下条款：</strong></p>
                        <p className="p-indent"><strong>1、用户同意本会使用用户所提交的身份资料、人脸影像等个人信息。这些信息仅供本会用作确认、验证当事人及其代理人身份及推进仲裁程序，本会不在案涉仲裁程序以外的任何场合使用。</strong></p>
                        <p className="p-indent"><strong>2、本会依法保护个人信息的保密性及安全性，不向任何机构或个人非法披露，但国家法律法规另有规定的除外。</strong></p>
                        <p className="p-indent"><strong>3、本会对仲裁程序的内容、仲裁过程中展示的证据、仲裁裁决等仲裁中产生的信息和文件保密，不对当事人以外的人披露，但国家法律法规另有规定的除外。</strong></p>
                        <p className="p-indent"><strong>4、本会为当事人、仲裁庭和本会之间案件数据的在线传输提供安全保障，对因计算机病毒、黑客攻击、网络故障等不可抗力造成数据丢失的，本会不承担责任。</strong></p>
                        <p className="p-indent"><strong>5、本会采取为案件数据信息加密的形式为案件信息保密。对因计算机病毒、黑客攻击、网络故障等不可抗力，造成收件人以外的他人获悉有关信息的，本会不承担责任。</strong></p>
                    </div>
                </Modal>
                <Modal
                    visible={visible3}
                    footer={[<Button type="primary" onClick={this.hideModal3}>确定</Button>]}
                    closable={false}
                    width="auto"
                >
                    <div className="register-regulation-main arbitration-clause">
                        <h2>海南仲裁委员会互联网金融仲裁规则</h2>
                        <p>（2018年4月8日第五届海南仲裁委员会第三次会议审议通过，自2018年4月8日起施行）</p>
                        <h3>目录</h3>
                        <p className="p-indent font-12">第一条 制定目的及依据</p>
                        <p className="p-indent font-12">第二条 互联网金融仲裁定义</p>
                        <p className="p-indent font-12">第三条 规则适用</p>
                        <p className="p-indent font-12">第四条 仲裁地</p>
                        <p className="p-indent font-12">第五条 互联网仲裁系统的使用</p>
                        <p className="p-indent font-12">第六条 仲裁协议的形式</p>
                        <p className="p-indent font-12">第七条 程序适用</p>
                        <p className="p-indent font-12">第八条 对仲裁协议、仲裁管辖权的异议</p>
                        <p className="p-indent font-12">第九条 材料的提交及查阅</p>
                        <p className="p-indent font-12">第十条 送达方式</p>
                        <p className="p-indent font-12">第十一条 电子送达地址</p>
                        <p className="p-indent font-12">第十二条 无有效地址的送达</p>
                        <p className="p-indent font-12">第十三条 电子数据的原件要求</p>
                        <p className="p-indent font-12">第十四条 电子签名的使用</p>
                        <p className="p-indent font-12">第十五条 申请仲裁</p>
                        <p className="p-indent font-12">第十六条 预交仲裁费</p>
                        <p className="p-indent font-12">第十七条 受理仲裁申请</p>
                        <p className="p-indent font-12">第十八条 答辩</p>
                        <p className="p-indent font-12">第十九条 举证期限</p>
                        <p className="p-indent font-12">第二十条 证据提交方式</p>
                        <p className="p-indent font-12">第二十一条 质证</p>
                        <p className="p-indent font-12">第二十二条 反请求</p>
                        <p className="p-indent font-12">第二十三条 变更仲裁请求或反请求</p>
                        <p className="p-indent font-12">第二十四条 仲裁庭组成</p>
                        <p className="p-indent font-12">第二十五条 回避</p>
                        <p className="p-indent font-12">第二十六条 审理方式</p>
                        <p className="p-indent font-12">第二十七条 和解</p>
                        <p className="p-indent font-12">第二十八条 辩论</p>
                        <p className="p-indent font-12">第二十九条 结案方式及期限</p>
                        <p className="p-indent font-12">第三十条 仲裁文书</p>
                        <p className="p-indent font-12">第三十一条 仲裁费用承担</p>
                        <p className="p-indent font-12">第三十二条 补正裁决</p>
                        <p className="p-indent font-12">第三十三条 电子归档</p>
                        <p className="p-indent font-12">第三十四条 安全保障</p>
                        <p className="p-indent font-12">第三十五条 仲裁收费与退费</p>
                        <p className="p-indent font-12">第三十六条 案件管理的审批授权</p>
                        <p className="p-indent font-12">第三十七条 规则解释</p>
                        <p className="p-indent font-12">第三十八条 规则施行</p>
                        <p className="p-indent">附表</p>
                        <p className="p-indent"><strong>第一条 制定目的及依据</strong></p><p className="p-indent">为了以互联网仲裁方式公正、高效地解决互联网金融纠纷以及可通过互联网仲裁解决的其他纠纷，依据《中华人民共和国仲裁法》以及其他相关法律的规定，制定本规则。</p>
                        <p className="p-indent"><strong>第二条 互联网金融仲裁定义</strong></p><p className="p-indent">互联网金融仲裁是指在海南仲裁委员会（以下简称本会）互联网金融仲裁系统上开展仲裁程序的争议解决方法；本规则所称互联网金融仲裁平台与互联网金融仲裁系统为同一含义。</p>
                        <p className="p-indent"><strong>第三条 规则适用</strong></p><p className="p-indent">（一）本规则适用于本会受理的争议金额不超过人民币50万（含50万）元的互联网金融争议案件，但当事人另有约定或本会决定采用线下方式仲裁的除外。</p>
                        <p className="p-indent">（二）争议金额超过人民币50万元的互联网金融争议案件，双方当事人约定或者同意的，也可以适用本规则；但争议金额较大、案情复杂敏感的案件，经本会决定，应当采用线下方式仲裁并适用线下相应的仲裁规则。</p>
                        <p className="p-indent">（三）双方当事人约定按照本规则仲裁的其他纠纷，本会认为适合在互联网金融仲裁平台上仲裁的，适用本规则；本会认为不适合在互联网金融仲裁平台上仲裁的，应当适用本会相应的其他仲裁规则。</p>
                        <p className="p-indent">（四）已按本规则线上受理的案件，本会认为不适合采用互联网方式仲裁或双方当事人同意转为线下仲裁的，应转为线下并按相应仲裁规则办理。线上已进行的程序，由本会或仲裁庭决定是否重新进行。</p>
                        <p className="p-indent">（五）当事人约定按照本规则进行仲裁但未约定仲裁机构的，视为同意将争议提交本会仲裁。</p>
                        <p className="p-indent">（六）当事人约定将金融争议提交本会通过互联网仲裁解决的，视为同意按照本规则进行仲裁。当事人使用电子仲裁、在线仲裁、线上仲裁、网上仲裁等表述，在可推断为有效选择本会互联网仲裁作为纠纷解决方式时，视为同意按照本规则进行仲裁。</p>
                        <p className="p-indent">（七）《海南仲裁委员会仲裁规则》、《海南国际仲裁院仲裁规则》的规定与本规则不一致的，以本规则的规定为准。本规则没有规定的事项，适用《海南仲裁委员会仲裁规则》、《海南国际仲裁院仲裁规则》的规定。</p>
                        <p className="p-indent"><strong>第四条 仲裁地</strong></p><p className="p-indent">（一）双方当事人书面约定仲裁地的，从其约定。</p>
                        <p className="p-indent">（二）如果当事人对仲裁地未作约定，本会所在地为仲裁地。本会可以根据案件具体情况确定其他地点为仲裁地。</p>
                        <p className="p-indent">（三）仲裁裁决视为在仲裁地作出。</p>
                        <p className="p-indent"><strong>第五条 互联网仲裁系统的使用</strong></p><p className="p-indent">（一）本规则项下的仲裁活动，应在本会的互联网金融仲裁系统中进行，网址为: http://www.e-arbitral.org.cn （中文域名为：http://www.快裁在线.cn），或登录本会官网点击互联网金融仲裁平台登录。需要线下程序予以辅助或补充的，可在线下完成。</p>
                        <p className="p-indent">（二）当事人订立互联网仲裁协议的，视为具备按照本规则进行互联网仲裁所必须的能力和设备条件（包括但不限于使用互联网仲裁系统、收发电子邮件、使用移动通信工具、参加网络视频庭审）。（二）当事人订立互联网仲裁协议的，视为具备按照本规则进行互联网仲裁所必须的能力和设备条件（包括但不限于使用互联网仲裁系统、收发电子邮件、使用移动通信工具、参加网络视频庭审）。</p>
                        <p className="p-indent"><strong>第六条 仲裁协议的形式</strong></p><p className="p-indent">（一）仲裁协议应当采取书面形式。书面形式包括纸质合同、电子合同、信件、电报、电传、传真、电子数据交换和电子邮件等可以有形地表现所载内容的形式。</p>
                        <p className="p-indent">（二）当事人达成的仲裁协议既可以是在合同中定明的仲裁条款，也可以是在纠纷发生前或发生后以其他方式达成的书面仲裁协议。</p>
                        <p className="p-indent">（三）当事人通过同意网站服务协议的方式达成的电子仲裁条款视为符合法律规定的书面形式要件。</p>
                        <p className="p-indent"><strong>第七条 程序适用</strong></p><p className="p-indent">（一）争议金额不超过人民币5万（含5万）元的案件，适用速裁程序；争议金额超过人民币5万元的案件，适用普通程序。</p>
                        <p className="p-indent">（二）当事人提出反请求或变更仲裁请求导致案件争议金额超过或低于人民币5万元的，不影响程序适用。</p>
                        <p className="p-indent"><strong>第八条 对仲裁协议、仲裁管辖权的异议</strong></p><p className="p-indent">（一）当事人可以对仲裁协议的存在、效力或仲裁案件的管辖权提出异议。适用速裁程序的案件，当事人应当自收到受理通知之日起2日内提出上述异议；适用普通程序的案件，当事人应当自收到受理通知之日起4日内提出上述异议。</p>
                        <p className="p-indent">（二）本会可以直接作出仲裁协议是否有效或者本会是否具有管辖权的决定，也可以授权仲裁庭作出上述决定。</p>
                        <p className="p-indent">（三）在对仲裁协议的存在、效力和管辖权异议作出决定前，仲裁程序可以继续进行。</p>
                        <p className="p-indent">（四）对方当事人可以就上述异议提出回应意见。</p>
                        <p className="p-indent"><strong>第九条 材料的提交及查阅</strong></p><p className="p-indent">当事人应当通过本会互联网仲裁平台提交材料。当事人提交的材料，应当可以随时调阅且可以由本会向另一方当事人转发。各方可以通过本会互联网仲裁平台查看相关仲裁材料。</p>
                        <p className="p-indent"><strong>第十条 送达方式</strong></p><p className="p-indent">（一）本规则项下的仲裁文书采用电子送达方式送达。</p>
                        <p className="p-indent">（二）电子送达可以采用电子邮件、移动通信、传真等即时收悉的特定系统作为送达媒介。本会对应系统显示的电子邮件、手机短信、传真等发送成功的日期为送达日期，但受送达人证明到达其特定系统的日期与本会对应系统显示发送成功的日期不一致的，以受送达人证明到达其特定系统的日期为准。</p>
                        <p className="p-indent">（三）本会采用多种电子送达方式向当事人送达仲裁文书的，以最早成功送达的日期为送达日期。</p>
                        <p className="p-indent">（四）本会在向受送达人发送电子邮件时，可以通过站内信或通过移动通信号码一并发送提示查看的信息。</p>
                        <p className="p-indent"><strong>第十一条 电子送达地址</strong></p><p className="p-indent">（一）当事人在仲裁协议或者合同中约定了采用电子邮件、移动通信、微信、QQ等方式送达的，其约定的电子邮箱、移动通信号码、微信账号、QQ账号等为其电子送达地址。</p>
                        <p className="p-indent">（二）当事人参加本会互联网仲裁程序时，应当确认自己的电子邮箱、移动通信号码作为其电子送达地址，当事人确认的电子送达地址与本条第（一）款提及的送达地址不一致的，以本款确认的电子送达地址为准。</p>
                        <p className="p-indent">（三）当事人未约定也未向本会确认的，其在合同交易中使用的或者在合同交易网站注册时填写的电子邮箱或者移动通信号码，可以作为其电子送达地址。</p>
                        <p className="p-indent">（四）当事人在互联网仲裁过程中变更电子送达地址的，应当及时通知本会。未及时通知的，视为未变更。</p>
                        <p className="p-indent"><strong>第十二条 无有效地址的送达</strong></p><p className="p-indent">没有本规则第十一条规定的电子送达地址的，本会指定专用电子邮箱为送达地址，并按照线下相应仲裁规则的规定向受送达人送达通知，告知该电子邮箱地址及登录密码。本会也可按照本规则第三条第（四）款的规定，转为线下办理。</p>
                        <p className="p-indent"><strong>第十三条 电子数据的原件要求</strong></p><p className="p-indent">符合下列条件之一的电子数据，视为满足法律、法规规定的原件形式要求：</p>
                        <p className="p-indent">（一）能够有效地表现所载内容并可供随时调取查用；</p>
                        <p className="p-indent">（二）经公证机构公证；</p>
                        <p className="p-indent">（三）经合法电子认证服务提供者（如时间戳、数字证书服务机构等）认证；</p>
                        <p className="p-indent">（四）其他能够保证自形成时起，内容保持完整、未被更改的电子数据。但在电子数据上增加背书以及数据交换、储存和显示过程中发生的形式变化不影响电子数据的完整性。</p>
                        <p className="p-indent"><strong>第十四条 电子签名的使用</strong></p><p className="p-indent">（一）当事人在互联网仲裁程序中需要签名确认的，应采用电子签名，可靠的电子签名应符合法律规定的要件，与手写签名或者盖章具有同等的法律效力。</p>
                        <p className="p-indent">（二）经依法设立的电子认证服务提供者认证的电子签名视为可靠的电子签名。</p>
                        <p className="p-indent"><strong>第十五条 申请仲裁</strong></p><p className="p-indent">（一）申请人申请仲裁前应在本会互联网仲裁平台上进行身份验证。</p>
                        <p className="p-indent">（二）申请人应当通过本会互联网仲裁平台申请仲裁，提交证据及当事人身份证明文件。</p>
                        <p className="p-indent"><strong>第十六条 预交仲裁费</strong></p><p className="p-indent">当事人向本会提出仲裁申请、申请增加仲裁请求或提出反请求，经审查符合受理条件的，应按照本规则第三十四条的规定向本会预交仲裁费用。逾期未预交仲裁费用的，视为撤回相应仲裁请求。</p>
                        <p className="p-indent"><strong>第十七条 受理仲裁申请</strong></p><p className="p-indent">（一）本会认为收到的仲裁申请符合受理条件的，通知申请人预交仲裁费。申请人预交仲裁费后，本会在5日内予以受理，并向双方当事人发送仲裁受理通知书及附件，双方当事人可在本会互联网金融仲裁平台上查看仲裁规则和仲裁员名册。</p>
                        <p className="p-indent">（二）本会认为不符合受理条件的，告知申请人不予受理，并说明理由。</p>
                        <p className="p-indent">（三）本会认为申请人提交的材料不齐备、不正确的，可以限期要求申请人补全、补正；补全、补正完备的日期视为收到仲裁申请的日期；申请人逾期不补全、补正的，视为未申请仲裁。</p>
                        <p className="p-indent"><strong>第十八条 答辩</strong></p><p className="p-indent">适用速裁程序的案件，被申请人应当自收到受理通知之日起2日内通过本会互联网仲裁平台提交答辩意见及相关材料。适用普通程序的案件，被申请人应当自收到受理通知之日起4日内通过本会互联网仲裁平台提交答辩意见及相关材料。未提交答辩意见的，不影响仲裁程序的进行。</p>
                        <p className="p-indent"><strong>第十九条 举证期限</strong></p><p className="p-indent">（一）适用速裁程序的案件，当事人应当自收到受理通知之日起2日内通过本会互联网仲裁平台提交证据材料。适用普通程序的案件，当事人应当自收到受理通知之日起4日内通过本会互联网仲裁平台提交证据材料。</p>
                        <p className="p-indent">（二）当事人申请延期举证的，其提交证据材料的期限延长1日。</p>
                        <p className="p-indent"><strong>第二十条 证据提交方式</strong></p><p className="p-indent">（一）当事人应当通过本会互联网仲裁平台提交证据。</p>
                        <p className="p-indent">（二）电子数据可以直接提交。</p>
                        <p className="p-indent">（三）对非电子数据的证据，当事人应当转换为电子数据后提交。</p>
                        <p className="p-indent">（四）经本会或仲裁庭同意，对不能或不宜转换为电子数据的相关证据，当事人可在线下提交。本会同时作出是否转线下仲裁的决定。</p>
                        <p className="p-indent"><strong>第二十一条 质证</strong></p><p className="p-indent">一方当事人可对另一方当事人提供的证据予以质证。适用速裁程序的案件，当事人提交质证意见的期限为举证期结束后1日。适用普通程序的案件，当事人提交质证意见的期限为举证期结束后2日。</p>
                        <p className="p-indent"><strong>第二十二条 反请求</strong></p><p className="p-indent">（一）被申请人有权依据同一仲裁协议向申请人提出反请求。适用速裁程序的案件，反请求申请应当自收到受理通知之日起2日内提出；适用普通程序的案件，反请求申请应当自收到受理通知之日起4日内提出。</p>
                        <p className="p-indent">（二）适用速裁程序的案件，申请人应当自收到反请求受理通知之日起2日内提交答辩意见及证据材料。适用普通程序的案件，申请人应当自收到反请求受理通知之日起4日内提交答辩意见及证据材料。未提交答辩意见及证据材料的，不影响仲裁程序的进行。</p>
                        <p className="p-indent">（三）当事人申请延期举证的，其提交证据材料的期限延长1日。</p>
                        <p className="p-indent"><strong>第二十三条 变更仲裁请求或反请求</strong></p><p className="p-indent">（一）适用速裁程序的案件，当事人变更仲裁请求或反请求的，应当自收到受理通知之日起2日内提出；对方当事人应当在收到变更受理通知之日起2日内提交答辩意见及证据材料。</p>
                        <p className="p-indent">（二）适用普通程序的案件，当事人变更仲裁请求或反请求的，应当自收到受理通知之日起4日内提出；对方当事人应当在收到变更受理通知之日起4日内提交答辩意见及证据材料。</p>
                        <p className="p-indent">（三）当事人未提交答辩意见及证据材料的，不影响仲裁程序的进行。</p>
                        <p className="p-indent">（四）当事人变更的仲裁请求或反请求与原仲裁请求所涉及的法律关系、事实及理由基本一致的，可不予调整当事人预交的仲裁费用。</p>
                        <p className="p-indent"><strong>第二十四条 仲裁庭组成</strong></p><p className="p-indent">（一）仲裁庭由一名仲裁员组成。</p>
                        <p className="p-indent">（二）适用速裁程序的案件，当事人应当在被申请人收到受理通知之日起2日内共同选定或委托本会主任指定仲裁员。适用普通程序的案件，当事人应当在被申请人收到受理通知之日起4日内共同选定或委托本会主任指定仲裁员。</p>
                        <p className="p-indent">（三）当事人未能依照本条第（二）款规定选定或委托本会主任指定仲裁员的，由本会主任指定。</p>
                        <p className="p-indent">（四）本会在互联网金融仲裁平台上提供互联网金融仲裁员名册。当事人或本会主任在此名册范围内选定或指定仲裁员。</p>
                        <p className="p-indent">（五）本会应当及时将仲裁庭的组成情况通知当事人，并将有关案件材料送达仲裁庭。</p>
                        <p className="p-indent"><strong>第二十五条 回避</strong></p><p className="p-indent">（一）当事人有权提出书面回避申请。回避申请应在审限届满3日前提出。回避事由在审限届满前3日内知晓的，由本会决定是否受理回避申请。</p>
                        <p className="p-indent">（二）收到回避申请后，本会主任决定仲裁员是否回避。本会主任作出决定前，被申请回避的仲裁员应当继续履行职责。</p>
                        <p className="p-indent"><strong>第二十六条 审理方式</strong></p><p className="p-indent">仲裁庭以书面审理方式办理互联网金融仲裁案件。仲裁庭可以通过本会互联网仲裁平台向当事人发出问题单，当事人可以通过本会互联网仲裁平台作出回答或说明，未回答或说明的，不影响仲裁程序进行。</p>
                        <p className="p-indent"><strong>第二十七条 和解</strong></p><p className="p-indent">（一）经双方当事人提出和解申请，本会或仲裁庭可以启动和解程序，和解期限为7日，该和解期限不计入审限。</p>
                        <p className="p-indent">（二）进入和解程序的起始日期组庭前由本会决定，组庭后由仲裁庭决定。</p>
                        <p className="p-indent"><strong>第二十八条 辩论</strong></p><p className="p-indent">（一）当事人在仲裁过程中可以书面形式进行辩论。</p>
                        <p className="p-indent">（二）适用普通程序的案件，当事人可在审限届满3日前发表书面辩论意见；适用速裁程序的案件，当事人可在审限届满2日前发表书面辩论意见。</p>
                        <p className="p-indent"><strong>第二十九条 结案方式及期限</strong></p><p className="p-indent">（一）适用速裁程序的案件，仲裁庭应当自组成之日起6日内作出裁决。适用普通程序的案件，仲裁庭应当自组成之日起10日内作出裁决。裁决书自作出之日起生效。</p>
                        <p className="p-indent">（二）当事人达成和解协议的，由仲裁庭根据和解协议的内容在本条第（一）款规定的期限内制作调解书或者裁决书。仲裁庭根据和解协议制作的调解书自双方当事人签收之日起生效。</p>
                        <p className="p-indent">（三）申请人撤回仲裁申请的，仲裁庭组成前由本会作出决定书，仲裁庭组成后由仲裁庭作出决定书。</p>
                        <p className="p-indent">（四）特殊情况需要延长本条第（一）款规定期限的，由仲裁庭提出申请，经本会主任批准可以适当延长，同时案件转为线下办理并适用相应仲裁规则。</p>
                        <p className="p-indent"><strong>第三十条 仲裁文书</strong></p><p className="p-indent">（一）决定书、裁决书、调解书由仲裁员电子签名，并由本会电子签章。本会作出的决定书由本会电子签章。</p>
                        <p className="p-indent">（二）决定书、裁决书、调解书送达至当事人的电子送达地址即视为送达。当事人需要纸质文书的，应当向本会提出申请。</p>
                        <p className="p-indent"><strong>第三十一条 仲裁费用承担</strong></p><p className="p-indent">仲裁庭有权根据案件的具体情况裁决败诉方补偿胜诉方因办理案件而支出的合理费用，包括但不限于当事人参加互联网金融仲裁所支付的技术服务费用、律师费等，但当事人参加互联网金融仲裁所支付的技术服务费用、律师费的补偿金额合计不超过胜诉方所得胜诉金额的百分之十。</p>
                        <p className="p-indent"><strong>第三十二条 补正裁决</strong></p><p className="p-indent">对裁决书中的文字、计算错误或者仲裁庭已经裁决但在裁决书中遗漏的事项，仲裁庭应当补正；当事人自收到裁决书之日起30日内，可以请求仲裁庭补正。</p>
                        <p className="p-indent"><strong>第三十三条 电子归档</strong></p><p className="p-indent">互联网仲裁案件审结后以电子卷宗形式归档。</p>
                        <p className="p-indent"><strong>第三十四条 安全保障</strong></p><p className="p-indent">（一）本会为当事人、仲裁庭和本会之间案件数据的在线传输提供安全保障。对因计算机病毒、黑客攻击、网络故障等不可抗力，造成数据丢失的，本会不承担责任。</p>
                        <p className="p-indent">（二）本会采取为案件数据信息加密的形式为案件信息保密。对因计算机病毒、黑客攻击、网络故障等不可抗力，造成收件人以外的他人获悉有关信息的，本会不承担责任。</p>
                        <p className="p-indent"><strong>第三十五条 仲裁收费与退费</strong></p><p className="p-indent">（一）互联网金融仲裁案件仅收取案件受理费，不收取案件处理费。</p>
                        <p className="p-indent">（二）案件受理费按照附表一所列标准收取。</p>
                        <p className="p-indent">（三）当事人的请求没有明确争议金额的，由本会根据争议所涉及权益的具体情况按附表二的标准收取案件受理费。</p>
                        <p className="p-indent">（四）适用本规则仲裁的案件不适用本会收退费管理办法中关于退费的规定，仲裁费用不予退回。</p>
                        <p className="p-indent"><strong>第三十六条 案件管理的审批授权</strong></p><p className="p-indent">本会互联网金融仲裁案件管理系统中的审批权限可以在本会内部逐级授权，经授权后，被授权方拥有与授权方相同的审批权限，且被授权方所做出的审批行为视为由授权方亲自做出。</p>
                        <p className="p-indent"><strong>第三十七条 规则解释</strong></p><p className="p-indent">（一）本规则条文标题仅具有指引作用，不用于解释条文含义。</p>
                        <p className="p-indent">（二）本规则由本会负责解释。</p>
                        <p className="p-indent"><strong>第三十八条 规则施行</strong></p><p className="p-indent">本规则自2018年4月8日起施行。</p>
                        <img src={require('../../assets/images/fubiao1.png')} alt="附表一"/>
                        <img src={require('../../assets/images/fubiao2.png')} alt="附表二"/>
                        <p>示范仲裁条款（印刷于《规则》封页）：</p>
                        <p>1.因本合同引起的或与本合同有关的任何争议均提交海南仲裁委员会按照其《互联网金融仲裁规则》仲裁解决，以书面方式审理，采用电子送达方式送达仲裁文书，并以本合同载明的双方电子邮箱及电话号码为电子送达地址，合同载明的双方地址为线下仲裁文书及司法文书的送达地址。</p>
                        <p>2.因本合同引起的或与本合同有关的任何争议均提交海南仲裁委员会按照其《互联网金融仲裁规则》仲裁解决，以书面方式审理，采用电子送达方式送达仲裁文书，甲方的电子邮箱为：        ，电话号码为：        ，线下仲裁文书及司法文书的送达地址为：         ；乙方的电子邮箱为：        ，电话号码为：        ，线下仲裁文书及司法文书的送达地址为：         。</p>
                    </div>
                </Modal>
            </div>
        )
    }
}
