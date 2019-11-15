import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {tokenUpdate,userChange} from '../../actions'
import LoginForm from '../Login'
import cache from '../../utils/cache'
@connect(
    state=>({
        userInfo:state.userInfo
    })
)
export default class Main extends Component{
    constructor(props,context){
        super(props,context);
    }
    isLogin=()=>{
        if(this.props.location.pathname == "/login"){
            this.state= {
                loginForm:true
            }
        }else{
            this.state= {
                loginForm:false
            }
        }
    }
    componentDidMount(){
        // this.props.dispatch(userChange({}));
        // this.props.dispatch(tokenUpdate(''));
    }
    render(){
        // const {loginForm} = this.state;
        {this.isLogin()}
        return (
            <section className="main-content ant-layout clearfix">
                <div className="main-content-banner ant-col-24">
                    <img src={require("../../assets/images/banner_new.jpg")} alt="banner"/>
                    {this.state.loginForm && <LoginForm {...this.state} />}
                </div>
                <ul className="main-content-list clearfix ant-col-24">
                    <li className="ant-col-8">
                        <Link to="/advantage">
                            <div className="main-content-list-top">
                                <img src={require("../../assets/images/main-advantage.png")} alt="互联网仲裁优势"/>
                            </div>
                            <div className="main-content-list-bottom">
                                <p>互联网仲裁优势</p>
                                <span>SUPERIORITY</span>
                                <i className="anticon anticon-right-circle-o"></i>
                            </div>
                        </Link>
                    </li>
                    <li className="ant-col-8">
                        <Link to="/regulation">
                            <div className="main-content-list-top">
                                <img src={require("../../assets/images/main-rules.png")} alt="互联网仲裁规则"/>
                            </div>
                            <div className="main-content-list-bottom">
                                <p>互联网仲裁规则</p>
                                <span>REGULATION</span>
                                <i className="anticon anticon-right-circle-o"></i>
                            </div>
                        </Link>
                    </li>
                    <li className="ant-col-8">
                        <Link to="/namelist">
                            <div className="main-content-list-top">
                                <img src={require("../../assets/images/main-roster.png")} alt="互联网仲裁员名册"/>
                            </div>
                            <div className="main-content-list-bottom">
                                <p>互联网仲裁员名册</p>
                                <span>NAME LIST</span>
                                <i className="anticon anticon-right-circle-o"></i>
                            </div>
                        </Link>
                    </li>
                    {/* <li className="ant-col-6">
                        <a href="https://www.tsign.cn/verify/verify.html" target="_blank">
                            <div className="main-content-list-left">
                                <span>SIGNATURE</span>
                                <p>文书签章验证</p>
                                <i className="anticon anticon-right-circle-o"></i>
                            </div>
                            <div className="main-content-list-right">
                                <img src={require("../../assets/images/main-signature.png")} alt="文书签章验证"/>
                            </div>
                        </a>
                    </li> */}
                </ul>
            </section>
        )
    }
}