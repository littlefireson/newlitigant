import '../assets/styles/index.less'

import React, {Component} from 'react'
import { Switch,Route,Redirect,Link,withRouter } from 'react-router-dom';
import cache from '../utils/cache'
import {Header,Footer,AsyncComponent} from '../components'
const Main = AsyncComponent(() => import(/* webpackChunkName: "mainHome" */ './Main'));
const RegisterForm = AsyncComponent(() => import(/* webpackChunkName: "registerform" */ './Register'));
const CaseDetail = AsyncComponent(() => import(/* webpackChunkName: "casedetail" */ './CaseDetail'));
const Home = AsyncComponent(() => import(/* webpackChunkName: "home" */ './Home'));
const ForgetForm = AsyncComponent(() => import(/* webpackChunkName: "forgetform" */ './Forget'));
const MyCase = AsyncComponent(() => import(/* webpackChunkName: "mycase" */ './MyCase'));
const LinkBar = AsyncComponent(() => import(/* webpackChunkName: "linkbar" */ './LinkBar'));
const PersonalCenter = AsyncComponent(() => import(/* webpackChunkName: "personalcenter" */ './PersonalCenter'));
const HelpCenter = AsyncComponent(() => import(/* webpackChunkName: "helpcenter" */ './HelpCenter'));
const Advantage = AsyncComponent(() => import(/* webpackChunkName: "advantage" */ './Advantage'));
const Regulation = AsyncComponent(() => import(/* webpackChunkName: "regulation" */ './Regulation'));
const Namelist = AsyncComponent(() => import(/* webpackChunkName: "namelist" */ './Namelist'));

@withRouter
export default class App extends Component{
    getToken=()=>{
        let token = cache.getItem('token') || '';
        const {location,history} = this.props;
        const router = location.pathname.split('/')[1];
        if(router != 'login' && router != 'forget' && router != 'register' && router !="main" && router !="advantage" && router !="regulation" && router !="namelist"){
            if(!token){
                history.push('/login');
            }
        }
    };
    render(){
        return (
            <section className="container master-container">
                {this.getToken()}
                <Header {...this.props}/>
                <div className="master-content">
                    <LinkBar/>
                    <Switch>
                        <Route path="/main" component={Main}/>
                        <Route path="/advantage" component={Advantage}/>
                        <Route path="/regulation" component={Regulation}/>
                        <Route path="/namelist" component={Namelist}/>
                        <Route path="/login"  component={Main}/>
                        <Route path="/register/:success?" component={RegisterForm}/>
                        <Route path="/forget" component={ForgetForm}/>
                        <Route path="/myCase/caseDetail/:caseId" component={CaseDetail}/>
                        <Route path="/myCase" component={MyCase}/>
                        <Route path="/personal/:id?" component={PersonalCenter}/>
                        <Route path="/help" component={HelpCenter}/>
                        <Route exact path="/:role?" component={Home}/>
                    </Switch>
                </div>
                <Footer/>
            </section>
        )
    }
}