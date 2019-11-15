import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Icon, Form, Input, Button, Radio, message, Modal } from 'antd'
import cache from '../../utils/cache'
import ajax from '../../utils/ajax'
const { TextArea } = Input;

import {Sample,EvidenceForm,ArbitrationPreview,CodeCheck} from '../../components'

import NaturalInfo from '../MyCase/ApplyCase/ApplyFirst/NaturalInfo'
import LegalInfo from '../MyCase/ApplyCase/ApplyFirst/LegalInfo'

class EvidencesForm extends Component{
    constructor( props){
        super(props);
    }
    render(){
        return (
            <Form>
                <EvidenceForm {...this.props}/>
            </Form>
        )
    }
}

EvidencesForm = Form.create()(EvidencesForm);

class ApplyInfoForm extends Component{
    constructor(props){
        super(props);
    }
    getDom=()=>{
        const domList = {
            0:<NaturalInfo {...this.props} wrappedComponentRef={(inst) => this.info = inst}/>,
            1:<LegalInfo {...this.props}  wrappedComponentRef={(inst) => this.info = inst}/>
        };
        return domList[this.props.role];
    };
    render(){
        return(
            <div>
                {this.getDom()}
            </div>
        )
    }
}

//发起反请求
@connect(
    state=>({
        userInfo:state.userInfo,
    })
)
export default class LaunchCounterclaim extends Component{
    constructor(props,context){
        super(props,context);
        const {userInfo} = props;
        this.info = JSON.parse(cache.getItem('commInfo')).info || {};
        this.info.caseEvidences = [];
        const evdLength = this.info.caseEvidences.length || 0;
        let contentArr = [];
        let docList = {};
        if(evdLength > 0){
            this.info.caseEvidences.map((item,index)=>{
                let kysMs = Date.now()+index;
                item.key = kysMs;
                contentArr.push(kysMs);
                docList[kysMs] = item.docType;
            })
        }
        this.state = {
            sendLoading:false,
            codeFlag:false,
            phoneNo:'',
            codeName:'',
            loading:false,
            visible:false,
            sample:false,
            getCodeLoading:false,
            sampleContent:'',
            arbClaim:'',
            fact:'',
            docList,
            contentArr:evdLength>0?contentArr:[Date.now()],
            gotEvidence:evdLength,
            evidence:evdLength*1+1,
            formSettings:{
                form1:{
                    prevName:"beApplicant",
                    disable:true,
                    role:userInfo.type,
                    naturalInfo:this.info,
                    legalInfo:this.info
                },
                form2:{
                    prevName:"applicant",
                    disable:true,
                    role:userInfo.type,
                    naturalInfo:this.info,
                    legalInfo:this.info
                }
            }
        };
    }

    initInfo=()=>{
        const {formSettings} = this.state;
        let {match:{params:{caseId}}} = this.props;
        caseId = caseId.split('/')[0]
        ajax({
            url:`/back/register/${caseId}/headInfo`,
            method:'get',
            params:{
                caseId
            }
        }).then((data)=>{
            Object.assign(this.info,data);
            formSettings.form1.role = this.info.beApplicantType;
            formSettings.form1.naturalInfo = this.info;
            formSettings.form1.legalInfo = this.info;
            formSettings.form2.role = this.info.applicantType;
            formSettings.form2.naturalInfo = this.info;
            formSettings.form2.legalInfo = this.info;
            this.setState({
                formSettings
            })
        })
    }
    setType=(key,docType)=>{
        const {docList} = this.state;
        docList[key] = docType?docType:'applicant/rar';
        this.setState({
            docList
        })
    }
    checkForm=()=>{
        const {arbClaim,fact,docList} = this.state;
        let checkFlag = true;
        this.info.caseEvidences = [];
        for(let evd in this.refs){
            this.refs[evd].validateFieldsAndScroll((err,values)=>{
                // console.log(values);
                if(!err || (!values.evidenceMat && !values.purposeEvidence&& !values.sourceEvidence && !values.fileId)){
                    if(values && values.fileId){
                        values.docType = docList[evd.split('evidence')[1]];
                        values.fileId = values.fileId.file.response.body;
                        this.info.caseEvidences.push(values);
                    }
                }else{
                    checkFlag=false;
                }
            });
        }
        if(arbClaim == ''){
            message.warning('请输入仲裁请求');
            checkFlag=false;
        }
        if(fact == ''){
            message.warning('请输入事实与理由');
            checkFlag=false;
        }
        if(checkFlag){
            this.info.arbClaim = '<p>'+arbClaim.replace(/\n/gm,'</p><p>')+'</p>';
            this.info.fact = '<p>'+fact.replace(/\n/gm,'</p><p>')+'</p>';
        }
        return checkFlag;
    };

    // 示例相关的配置操作
    showSample=(type)=>{
        let content = '';
        switch(type){
            case 'apply':
                content=`
                <h2 class="sample-title"><b>1</b>债券转让合同纠纷/借款合同纠纷</h2>
                <div class="sample-content text-indent-1">
                    <h3>仲裁请求</h3>
                    <p>1、裁令被申请人偿还尚欠申请人的借款本金人民币<span>欠付本金</span>元；</p>
                    <p>2、裁令被申请人支付申请人截止至<span>应还款日期</span>借款利息<span>借款利息</span>元；</p>
                    <p>3、裁令被申请人支付申请人逾期利息（罚息或违约金）<span>逾期利息</span>元（自<span>申请日期</span>起暂计至<span>应还款日期次日</span>，并支付至实际给付之日）；</p>
                    <p>4、裁令被申请人支付申请人律师费<span>标的额的10%</span>元；</p>
                    <p>5、裁令本案仲裁费用由被申请人承担。</p>
                </div>
                <h2 class="sample-title"><b>2</b>信用卡纠纷</h2>
                <div class="sample-content text-indent-1">
                    <h3>仲裁请求</h3>
                    <p>1、裁令被申请人偿还信用卡透支本金人民币<span>欠付本金</span>元，截至<span>当前欠付计算截止日期</span>的利息<span>欠付利息</span>元、违约金<span>违约金</span>元，合计<span>欠付本金+欠付利息+违约金</span>元；</p>
                    <p>2、裁令被申请人偿还<span>当前欠付计算截止日期次日</span>至全部欠款还清之日的利息；</p>
                    <p>3、裁令被申请人支付申请人律师费<span>标的额的10%</span>元；</p>
                    <p>4、裁令本案仲裁费用由被申请人承担。</p>
                </div>
                <h2 class="sample-title"><b>3</b>金融借款合同纠纷</h2>
                <div class="sample-content text-indent-1">
                    <h3>仲裁请求</h3>
                    <p>1、裁令被申请人偿还借款本金人民币<span>欠付本金</span>元、截至<span>当前欠付计算截止日期</span>的利息<span>欠付利息</span>元、罚息<span>罚息</span>元、违约金<span>违约金</span>元，合计<span>欠付本金+欠付利息+罚息+违约金</span>元；</p>
                    <p>2、裁令被申请人偿还<span>当前欠付计算截止日期次日</span>至全部欠款还清之日的罚息及复利；</p>
                    <p>3、裁令被申请人支付申请人律师费<span>标的额的10%</span>元、催收费<span>催收费</span>元；</p>
                    <p>4、请求被申请人<span>担保人</span>对上述债务承担担保还款责任；</p>
                    <p>5、裁令本案仲裁费用由被申请人承担。</p>
                </div>`;
                break;
            case 'fact':
                content=`
                <h2 class="sample-title"><b>1</b>债券转让合同纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><span>合约签订日期</span>，原债权人与被申请人签订《<span>合约名称</span>》。该借款合同系双方真实意思表示，真实有效。</p>
                    <p>《<span>合约名称</span>》约定：被申请人向原债权人借款人民币<span>出借金额</span>元；借款期限为<span>还款期限</span>；借款利率为<span>借款利率</span>；还款方式为<span>还款方式</span>。依照《<span>合约名称</span>》的约定，如被申请人未按期还款，则以欠付金额为基数，以<span>逾期利率/罚息利率/违约金</span>的标准向原债权人支付逾期利息（罚息或违约金）。</p>
                    <p>《<span>合约名称</span>》签订后，原债权人于<span>出借日期</span>依约向被申请人放款人民币<span>出借金额</span>元，履行了合同义务。被申请人自应还款之日至<span>申请日期</span>，已经归还本金和利息共计<span>已还本金+利息</span>元。截至<span>申请日期</span>，被申请人逾期已达<span>申请日期-应还款日期</span>日。</p>
                    <p>根据《<span>合约名称</span>》中债权转让相关条款的约定，当借款期限届满时，若借款人未能按时还款，由第三方（包括自然人和机构）代偿的，代偿人依据《<span>合约名称</span>》获得债权的代位求偿权，完成了债权转让。自此，原债权人的权利义务由债权受让人（代偿人）概括承受。本案申请人<span>原告/申请人(债券受让人)</span>已经按照上述约定向原债权人<span>出借人</span>代偿了本案被申请人的全部借款本金和利息，故申请人已经取得了债权受让人的权利，有权要求被申请人向其偿还全部款项。</p>
                    <p>综上所述，鉴于被申请人的严重违约行为，为了维护申请人的合法权益，请求裁决支持申请人的仲裁请求。</p>
                </div>
                <h2 class="sample-title"><b>2</b>借款合同纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><span>合约签订日期</span>，原债权人与被申请人签订《<span>合约名称</span>》。该借款合同系双方真实意思表示，真实有效。</p>
                    <p>《<span>合约名称</span>》约定：被申请人向原债权人借款人民币<span>出借金额</span>元；借款期限为<span>还款期限</span>；借款利率为<span>借款利率</span>；还款方式为<span>还款方式</span>。依照《<span>合约名称</span>》的约定，如被申请人未按期还款，则以欠付金额为基数，以<span>逾期利率/罚息利率/违约金</span>的标准向原债权人支付逾期利息（罚息或违约金）。</p>
                    <p>《<span>合约名称</span>》签订后，原债权人于<span>出借日期</span>依约向被申请人放款人民币<span>出借金额</span>元，履行了合同义务。被申请人自应还款之日至<span>申请日期</span>，已经归还本金和利息共计<span>已还本金+利息</span>元。截至<span>申请日期</span>，被申请人逾期已达<span>申请日期-应还款日期</span>日。</p>
                    <p>综上所述，鉴于被申请人的严重违约行为，为了维护申请人的合法权益，请求裁决支持申请人的仲裁请求。</p>
                </div>
                <h2 class="sample-title"><b>3</b>信用卡纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><span>签约日期</span>，被申请人向申请人申请办理信用卡，被申请人填写了信用卡申请表，并签署了《<span>合同名称</span>》。合约约定了信用卡的重要提示、使用、还款、收费标准等内容。依被申请人的申请，申请人核准并向被申请人发放了卡号为<span>卡号</span>的信用卡，被申请人激活后多次使用该信用卡消费。截至<span>当前欠付计算截止日期</span>，被申请人尚欠信用卡透支款本金人民币<span>欠付本金</span>元、利息<span>欠付利息</span>元、违约金<span>违约金</span>元；合计<span>欠付本金+欠付利息+违约金</span>元未归还申请人。</p>
                    <p>被申请人未按约归还欠款已构成违约，其应按合同约定承担相应的民事责任。为维护申请人的合法权益，特向贵会申请仲裁，请求依法裁决支持申请人的仲裁请求。</p>
                </div>
                <h2 class="sample-title"><b>4</b>金融借款合同纠纷</h2>
                <div class="sample-content text-indent2">
                    <h3>事实与理由</h3>
                    <p><span>签约日期</span>，被申请人向申请人签订了《<span>合约名称</span>》。合同约定由申请人贷款<span>出借金额</span>元人民币给被申请人。借款期限为2014年11月26日至2015年05月26日。为确保被申请人能够按照合同约定还款，被申请人<span>担保人</span>提供连带保证责任；且申请人与被申请人<span>担保人</span>签订了《<span>担保合同</span>》，合同约定：担保范围包括债务的本金、利息、罚息、复利、违约金以及仲裁费、律师费、催收费等实现债权的费用。</p>
                    <p>合同签订后，申请人于<span>出借日期</span>依约向被申请人发放贷款人民币<span>出借金额</span>元，履行了合同义务。截至<span>申请日期</span>申请人起诉时为止，被申请人偿还本金<span>已还本金</span>元，利息<span>已还利息</span>元，已经违反了《<span>合同名称</span>》的约定，构成严重违约。同时，被申请人<span>担保人</span>未尽到《<span>担保合同</span>》约定的义务，应对被申请人因违约行为所产生的债务承担担保责任。</p>
                    <p>为维护申请人的合法权益，特向贵会申请仲裁，请求依法裁决支持申请人的仲裁请求。</p>
                </div>`;
                break;
            default:
                content = '没有内容';
        }
        this.setState({
            sample:true,
            sampleContent:content
        })
    };
    hideSample=()=>{
        this.setState({
            sample:false
        })
    };

    // 获取文本域内的内容并转化
    getClaim=(e,name)=>{
        let text = e.target.value;
        this.setState({
            [name]:text
        })
        this.info[name] = text;
    }
    // 预览
    addEvidence = () => {
        const keyMs = Date.now();
        const { contentArr } = this.state;
        let newContentArr  = contentArr.concat();
        newContentArr.push(keyMs);
        this.setState((pre)=>{
            pre.evidence++;
            return({
                contentArr:newContentArr,
                evidence:pre.evidence
            })
        });
    };
    deleteEvidence=(e)=>{
        let key = e.target.getAttribute('keyindex');
        const { contentArr } = this.state;
        let newContentArr  = contentArr.concat();
        if(newContentArr.length > 1){
            this.setState((pre)=>{
                pre.evidence--;
                return({
                    contentArr:newContentArr.filter(id=> id != key),
                    evidence:pre.evidence
                })
            })
        }
    };
    preview=(val)=>{
        if(this.checkForm()){
            if(val==1){
                this.codeShow()
            }else{
                this.ModalOpen();
            }
        }else{
            this.info.caseEvidences=[];
        }
    };
    getEvidences=()=>{
        const {contentArr,gotEvidence}=this.state;
        const info = JSON.parse(cache.getItem('info')) || {};
        return contentArr.map((item,index)=><EvidencesForm key={item} keyMs={item} arrLength={contentArr.length} keyIndex={index*1+1} ref={"evidence"+item} evidenceDelete={this.deleteEvidence} evidenceInfo={null} setType={this.setType}/>)
    };
    ModalOpen=()=>{
        this.setState({
            visible:true,
        });
    };
    ModalClose=()=>{
        this.setState({visible:false});
        this.info.caseEvidences=[];
    };
    sendCase=()=>{
        let sendData = {};
        let {match:{params:{caseId}}} = this.props;
        caseId = caseId.split('/')[0];
        sendData.caseId = caseId;
        sendData.arbClaim = this.info.arbClaim;
        sendData.fact = this.info.fact;
        sendData.caseEvidences = this.info.caseEvidences;
        this.setState({
            sendLoading:true
        });
        ajax({
            url:`/back/register/${caseId}`,
            method:'post',
            data:sendData,
        }).then(()=>{
            this.props.history.goBack();
        }).finally(()=>{
            this.setState({
                sendLoading:false
            });
        })
    };
    codeShow=()=>{
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1066;
        this.setState({
            getCodeLoading:true
        })
        ajax.get('litigant/case/validSms',{params:{caseId:caseId.split('/')[0],tplId,tplType:1}}).then((data)=>{
            this.setState({
                phoneNo:data.phone,
                codeName:data.name,
                codeFlag:true
            })
        }).finally(()=>{
            this.setState({
                getCodeLoading:false
            })
        })
    }
    codeClose=()=>{
        this.setState({
            codeFlag:false
        })
    }
    componentDidMount(){
        this.initInfo();
    }
    render(){
        const {saveLoading,sample,formSettings,item,sampleContent,arbClaim,fact,loading,visible,contentArr,sendLoading,codeFlag,getCodeLoading,phoneNo,codeName} = this.state;
        const {match:{params:{caseId}}} = this.props;
        const tplId = 1066;
        return (
            <div className="my-case-first ant-row-layout">
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>反请求申请人信息</span><em></em></p>
                    <ApplyInfoForm {...formSettings.form1} chooseRole={this.chooseRole} info={this.info} />
                </section>
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>反请求被申请人信息</span><em></em></p>
                    <ApplyInfoForm {...formSettings.form2} chooseRole={this.chooseRole} info={this.info} />
                </section>
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>填写仲裁请求</span><em></em><i className="sample" onClick={(type)=>{this.showSample('apply')}}>示例</i></p>
                    <div className="my-case-first-example">
                        <TextArea placeholder="请输入仲裁请求" value={arbClaim} autosize={{minRows: 2}} onChange={(e,name)=>{this.getClaim(e,'arbClaim')}}  />
                    </div>
                </section>
                <section className="my-case-first-item">
                    <p className="my-case-first-identity"><span>事实与理由</span><em></em><i className="sample" onClick={(type)=>{this.showSample('fact')}}>示例</i></p>
                    <div className="my-case-first-example">
                        <TextArea placeholder="请输入事实和理由" value={fact} autosize={{minRows: 2}} onChange={(e,name)=>{this.getClaim(e,'fact')}} />
                    </div>
                </section>
                <section className="my-case-second-item">
                    {this.getEvidences()}
                    <p className="btn-add-content"><span onClick={this.addEvidence}>添加证据</span></p>
                </section>
                <div className="my-case-buttons">
                    <Button type="primary" onClick={this.preview} loading={saveLoading}>预览</Button>
                    <Button type="primary" onClick={this.preview.bind(this,1)} loading={saveLoading}>签字并提交</Button>
                </div> 
                <Sample hideSample={this.hideSample} visible={sample} content={sampleContent}/>
                <Modal className="preview-modal"
                    title=""
                    width="auto"
                    onCancel={this.ModalClose}
                    footer={[
                        <Button onClick={this.ModalClose}>取消</Button>,
                        <Button type="primary" loading={getCodeLoading} onClick={this.codeShow}>签字并提交</Button>
                    ]}
                    visible={visible}>
                    <ArbitrationPreview info={this.info} caseEvidences={this.info.caseEvidences} arbClaim={this.info.arbClaim} fact={this.info.fact}  type="reverse"/>
                </Modal>
                <CodeCheck visible={codeFlag} sendMsg={this.sendCase} ModalClose={this.codeClose} sendLoading={sendLoading} phoneNo={phoneNo} tplType={2} tplId={tplId} caseId={caseId} name={codeName}/>
            </div>
        )
    }
}