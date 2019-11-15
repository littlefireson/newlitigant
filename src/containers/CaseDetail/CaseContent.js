import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {Route,withRouter} from 'react-router-dom';
import {litigantTypeUpdate} from '../../actions';
import { Row, Col, Steps, Tabs} from 'antd';
import ajax from '../../utils/ajax';
import cache from '../../utils/cache';
import SiderPage from './SiderPage';
import {AsyncComponent} from '../../components'
const Step = Steps.Step;
const TabPane = Tabs.TabPane;
// const Apply = AsyncComponent(() => import(/* webpackChunkName: "apply" */ '../Apply'));
const ChooseReferee = AsyncComponent(() => import(/* webpackChunkName: "chooseReferee" */ '../ChooseReferee'));
const Compromise = AsyncComponent(() => import(/* webpackChunkName: "compromise" */ '../Compromise'));
const Quote = AsyncComponent(() => import(/* webpackChunkName: "quote" */ '../Quote'));
const Question = AsyncComponent(() => import(/* webpackChunkName: "question" */ '../Question'));
const ChangeApply = AsyncComponent(() => import(/* webpackChunkName: "changeApply" */ '../ChangeApply'));
// const Counterclaim = AsyncComponent(() => import(/* webpackChunkName: "counterclaim" */ '../Counterclaim'));
const BtnBox = AsyncComponent(() => import(/* webpackChunkName: "btnbox" */ '../BtnBox'));
const Jurisdiction = AsyncComponent(() => import(/* webpackChunkName: "jurisdiction" */ '../Jurisdiction'));
const OppsiteJuris = AsyncComponent(() => import(/* webpackChunkName: "oppsiteJuris" */ '../OppsiteJuris'));
const Adjudication = AsyncComponent(() => import(/* webpackChunkName: "adjudication" */ '../Adjudication'));
const BreakOff = AsyncComponent(() => import(/* webpackChunkName: "breakOff" */ '../BreakOff'));
const Mediate = AsyncComponent(() => import(/* webpackChunkName: "mediate" */ '../Mediate'));
const AddCorrection = AsyncComponent(() => import(/* webpackChunkName: "addCorrection" */ '../AddCorrection'));
const Decision = AsyncComponent(() => import(/* webpackChunkName: "decision" */ '../Decision'));
@withRouter
@connect(
    (state)=>({
        litigantType: state.litigantType
    }),
    (dispatch)=>({
        actions: bindActionCreators(litigantTypeUpdate, dispatch)
    })
)
export default class CaseDetail extends Component{
    constructor(props){
        super(props);
        this.state={
            withdrawMsg:'',
            commInfo:{
                info:{},
                progress:{
                    currentProgress:1
                }
            },
            tabs:[{
                to:'',
                title:'仲裁申请',
                component:<ChangeApply pointClick={this.pointClick}/>,
                innerProgress:0,
                tabId:1,
                bgColor:'#87d3c9'
            },{
                to:'/chooseReferee',
                title:'选择仲裁员',
                component:<ChooseReferee pointClick={this.pointClick}/>,
                innerProgress:1,
                tabId:5,
                bgColor:'#33a7d8'
            },{
                to:'/quote',
                title:'举证及质证',
                component:<Quote pointClick={this.pointClick}/>,
                innerProgress:1,
                tabId:6,
                bgColor:'#d3a4ce'
            },{
                to:'/compromise',
                title:'和解对话',
                component:<Compromise pointClick={this.pointClick}/>,
                innerProgress:1,
                tabId:7,
                bgColor:'#d3a4ce'
            // },{
            //     to:'/counterclaim',
            //     title:'反请求',
            //     component:<Counterclaim/>,
            //     innerProgress:1
            },{
                to:'/jurisdiction',
                title:'管辖权异议',
                component:<Jurisdiction pointClick={this.pointClick}/>,
                innerProgress:1,
                tabId:41,
                bgColor:'#33a7d8'
            },{
                to:'/oppsiteJuris',
                title:'反请求管辖权异议',
                component:<OppsiteJuris pointClick={this.pointClick}/>,
                innerProgress:1,
                tabId:42,
                bgColor:'#33a7d8'
            },{
                to:'/break',
                title:'中止申请书',
                component:<BreakOff pointClick={this.pointClick}/>,
                innerProgress:1,
                tabId:40,
                bgColor:'#33a7d8'
            },{
                to:'/question',
                title:'仲裁庭提问及辩论',
                component:<Question pointClick={this.pointClick}/>,
                innerProgress:2,
                tabId:8,
                bgColor:'#8869ad'
            },{
                to:'/adjudication',
                title:'裁决书',
                component:<Adjudication pointClick={this.pointClick}/>,
                innerProgress:3,
                tabId:12,
                bgColor:'#ea6cb0'
            },{
                to:'/addCorrection',
                title:'裁决补正书',
                component:<AddCorrection pointClick={this.pointClick}/>,
                innerProgress:3,
                tabId:13,
                bgColor:'#ea6cb0'
            },{
                to:'/mediate',
                title:'调解书',
                component:<Mediate pointClick={this.pointClick}/>,
                innerProgress:3,
                tabId:10,
                bgColor:'#ea6cb0'
            },{
                to:'/decision',
                title:'撤案决定书',
                component:<Decision pointClick={this.pointClick}/>,
                innerProgress:4,
                tabId:11,
                bgColor:'#f59154'
            }],
            tabList:[]
        }
    }
    pointClick=(tabList)=>{
        this.setState({tabList})
    }
    componentDidMount(){
        const {match:{params:{caseId}},actions} = this.props;
        const {tabs} = this.state;
        if(caseId){
            ajax.get(`/litigant/case/${caseId}/commInfo`).then((commInfo)=>{
                const {litigantType} = commInfo;
                actions(litigantType);
                this.setState({
                    commInfo
                })
                cache.setItem('commInfo',JSON.stringify(commInfo));
            })
            ajax.get(`litigant/case/${caseId}/withdrawMsg`,{caseId}).then((data)=>{
                if(data){
                    this.setState({
                        withdrawMsg:data.message
                    })
                }
            })
            ajax.get(`/litigant/case/${caseId}/caseInfo`).then((body)=>{
                const {baseInfo} = body;
                cache.setItem('baseInfo',JSON.stringify(baseInfo));
            })
            ajax.post(`cas/tab`,{caseId,role:0}).then((data)=>{
                const tabList = data;
                this.setState({
                    tabList
                })
                cache.setItem('tabList',JSON.stringify(tabList));
            })
        }
    }
    getTabPane(){
        const {tabs,commInfo:{info={},progress={}},withdrawMsg,tabList} = this.state;
        const {currentProgress=1}=progress;
        const {match:{path,url}}=this.props;
        return tabs.map(({to,title,component,innerProgress,tabId,bgColor},index)=>{
            for(let tab in tabList){
                if(tabList[tab].tabId == tabId){
                    const thisTab = tabList[tab];
                    if(innerProgress<=currentProgress-1 && thisTab.tabFlag){
                        return(<TabPane tab={<p>{thisTab.remaindFlag&&<b className="red-point"></b>}<i className="tab-bg" style={{"backgroundColor":bgColor}}></i><em className="tab-border" style={{"borderColor":bgColor}}></em><span className="tab-text">{title}</span></p>} key={url+to}>
                            {component}
                        </TabPane>)
                    }else{
                        return ''
                    }
                }
            }
        })
    }
    handleTabChange = (key) => {
        const { history} = this.props;
        history.push(key);
    }
    tabClick=(pathname)=>{
        const {match:{params:{caseId}},actions} = this.props;
        const {tabs} = this.state;
        const thisName = pathname.split(caseId)[1];
        tabs.map((item,index)=>{
            if(item.to == thisName){
                //console.log(item.tabId);//1  6  8  属于有二级标题的一级标签id
            }
        })
    }
    render(){
        const {location} = this.props;
        const {commInfo:{info={},progress={}},withdrawMsg}= this.state;
        const {currentProgress=1}=progress;
        // const withdrawNode = ()=>{
        //     if(withdrawMsg){
        //         return [<p className="withdraw-msg">{withdrawMsg}</p>]
        //     }
        // }
        return(<section className="caseDetail">
            <Row className="ant-row-layout">
                <Col span={4}>
                    <SiderPage info={info} progress={progress}/>
                </Col>
                <Col className="rightContent" span={20}>
                    {progress && (
                        <header className="panelBg">
                            <Steps current={currentProgress-1}>
                                <Step title="立案" />
                                <Step title="答辩" />
                                <Step title="审理" />
                                <Step title="裁决" />
                                <Step title="结案" />
                            </Steps>
                        </header>
                    )}
                    <section className="caseDetail-content">
                        {withdrawMsg&&[<p className="withdraw-msg">{withdrawMsg}</p>]}
                        <Tabs className="case-tabs" activeKey={location.pathname} defaultActiveKey={location.pathname} onChange={this.handleTabChange} onTabClick={this.tabClick}>
                            {this.getTabPane()}
                        </Tabs>
                        <BtnBox/>
                    </section>
                </Col>
            </Row>
        </section>)
    }
}