import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import {Tabs,Spin} from 'antd';
import {BlankPage} from '../../components'
import QuestionContent from "./QuestionContent";
import Debate from '../Debate';
import ajax from "../../utils/ajax";
import cache from "../../utils/cache";

const TabPane = Tabs.TabPane;
@withRouter
@connect(
    (state)=>({
        litigantType: state.litigantType
    })
)
export default class Question extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}},litigantType} = props;
        this.state={
            caseId,
            spinning:false,
            propAnswer: litigantType === '0' || litigantType === '3',
            deAnswer: litigantType === '1' || litigantType === '4',
            propQuestionAnswers:[],
            defeQuestionAnswers:[]
        }
    }
    getList=()=>{
        const {caseId} = this.state;
        return ajax.get(`/litigant/question/${caseId}/list`).then((data)=>{
            const {propQuestionAnswers,defeQuestionAnswers} = data;
            this.setState({
                propQuestionAnswers,
                defeQuestionAnswers
            })
        })
    };
    tabClick=(key)=>{
        //console.log(key)
    };
    componentDidMount(){
        this.setState({
            spinning:true
        });
        this.getList().finally(()=>{
            this.setState({
                spinning:false
            })
        });
    }
    render(){
        const {caseId,spinning,propAnswer,deAnswer,propQuestionAnswers,defeQuestionAnswers} = this.state;
        const tabList = JSON.parse(cache.getItem('tabList'));
        return (<Spin spinning={spinning} tip="加载中...">
            {
                (
                    (propQuestionAnswers && propQuestionAnswers.length>0) ||
                    (defeQuestionAnswers && defeQuestionAnswers.length>0)
                ) ?
                (<section className="question quote">
                    <Tabs onTabClick={this.tabClick}>
                        {(tabList[13]&&tabList[13].tabFlag)&&<TabPane tab={<span>{tabList[13].remaindFlag&&<b className="red-point"></b>}申请人问答</span>} key={14}>
                            {
                                propQuestionAnswers.map((item)=>(<QuestionContent key={item.id} QA={item} caseId={caseId} answer={propAnswer} upDate={this.getList}/>))
                            }
                        </TabPane>}
                        {(tabList[14]&&tabList[14].tabFlag)&&<TabPane tab={<span>{tabList[13].remaindFlag&&<b className="red-point"></b>}被申请人问答</span>} key={15}>
                            {
                                defeQuestionAnswers.map((item)=>(<QuestionContent key={item.id} QA={item} caseId={caseId} answer={deAnswer} upDate={this.getList}/>))
                            }
                        </TabPane>}
                        {(tabList[8]&&tabList[8].tabFlag)&&<TabPane tab={<span>{tabList[8].remaindFlag&&<b className="red-point"></b>}辩论</span>} key={9}>
                            <Debate/>
                        </TabPane>}
                    </Tabs>
                </section>):(<section className="changeApply"><BlankPage/></section>)
            }
        </Spin>)
    }
}