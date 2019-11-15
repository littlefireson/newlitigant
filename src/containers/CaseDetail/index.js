import React,{ Component } from 'react';
import {Route,Switch,withRouter} from 'react-router-dom';
import {AsyncComponent} from '../../components';
//处理案件
const CaseContent = AsyncComponent(() => import(/* webpackChunkName: "casecontent" */ './CaseContent'));
//案件相关文书
const Bookshelves = AsyncComponent(() => import(/* webpackChunkName: "bookshelves" */ '../Bookshelves'));
//撤回仲裁申请
const Withdrawn = AsyncComponent(() => import(/* webpackChunkName: "withdrawn" */ '../Withdrawn'));
//添加证据
const AddProof = AsyncComponent(() => import(/* webpackChunkName: "addproof" */ '../AddProof'));
//答辩
const Reply = AsyncComponent(() => import(/* webpackChunkName: "reply" */ '../Reply'));
//变更仲裁请求
const AlterApply = AsyncComponent(() => import(/* webpackChunkName: "alterapply" */ '../AlterApply'));
//申请秘书回避
const AvoidSec = AsyncComponent(() => import(/* webpackChunkName: "avoidsec" */ '../AvoidSec'));
//反请求
const LaunchCounterclaim = AsyncComponent(() => import(/* webpackChunkName: "avoidsec" */ '../LaunchCounterclaim'));
//和解协议申请
const Settlement = AsyncComponent(() => import(/* webpackChunkName: "settlement" */ '../Settlement'));
//管辖权异议
const Challenge = AsyncComponent(() => import(/* webpackChunkName: "challenge" */ '../Challenge'));
//延期答辩
const Delay = AsyncComponent(() => import(/* webpackChunkName: "delay" */ '../Delay'));
//申请补正
const Correction = AsyncComponent(() => import(/* webpackChunkName: "corrections" */ '../Correction'));
// 管辖权异议反馈
const Feedback = AsyncComponent(() => import(/* webpackChunkName: "feedback" */ '../Feedback'));
// 仲裁员回避文书
const AvoidDoc = AsyncComponent(() => import(/* webpackChunkName: "avoidDoc" */ '../AvoidDoc'));
// 案件中止
const Suspension = AsyncComponent(() => import(/* webpackChunkName: "suspension" */ '../Suspension'));
//送达回证
const Receipt = AsyncComponent(() => import(/* webpackChunkName: "receipt" */ '../Receipt'));
@withRouter
export default class CaseDetail extends Component{
    render(){
        const {match:{path}} = this.props;
        return(<Switch>
            <Route path={`${path}+/bookshelves`}  component={Bookshelves}/>
            <Route path={`${path}+/withdrawn`}  component={Withdrawn}/>
            <Route path={`${path}+/addProof`}  component={AddProof}/>
            <Route path={`${path}+/reply/:type`}  component={Reply}/>
            {/* <Route path={`${path}+/feedback/:type`}  component={Reply}/> */}
            <Route path={`${path}+/alterApply`}  component={AlterApply}/>
            <Route path={`${path}+/avoidSec/:avoidType`}  component={AvoidSec}/>
            <Route path={`${path}+/launchCounterclaim`}  component={LaunchCounterclaim}/>
            <Route path={`${path}+/settlement/:type?`}  component={Settlement}/>
            <Route path={`${path}+/challenge`}  component={Challenge}/>
            <Route path={`${path}+/delay`}  component={Delay}/>
            <Route path={`${path}+/correction`}  component={Correction}/>
            <Route path={`${path}+/jurisdiction/feedback/:type?`}  component={Feedback}/>
            <Route path={`${path}+/oppsiteJuris/feedback/:type?`}  component={Feedback}/>
            <Route path={`${path}+/suspension`}  component={Suspension}/>
            <Route path={`${path}+/avoid/:avoidId/:type`}  component={AvoidDoc}/>
            <Route path={`${path}+/receipt`}  component={Receipt}/>
            <Route path={path} component={CaseContent}/>
        </Switch>)
    }
}