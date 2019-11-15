import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Icon } from 'antd'
import cache from '../../../../utils/cache'

@connect(
    state=>({
        userInfo:state.userInfo
    })
)

export default class ApplyFirst extends Component{
    constructor(props,context){
        super(props,context);
        const {userInfo} = this.props;
        if(userInfo.role != '2' && userInfo.type == '0'){
            this.state={
                allShow:false,
                chooseShow:true
            }
        }else if(userInfo.role != '2' && userInfo.type == '1'){
            this.state={
                allShow:false,
                chooseShow:false
            }
        }else{
            this.setState({
                allShow:true,
                chooseShow:true
            });
        }
        this.caseInfo=JSON.parse(cache.getItem('caseInfo'));
    }
    typeChoose=(type)=>{
        this.caseInfo.caseType = type;
        cache.setItem('caseInfo',JSON.stringify(this.caseInfo));
        this.props.history.push('/myCase/apply/first');
    };
    render(){
        const {chooseShow,allShow} = this.state;
        return (
            <div className="my-case-type ant-row">
                <p className="my-case-type-title">选择案件类型</p>
                <ul className="my-case-type-list clearfix">
                    <li className="my-case-type-item" style={{"display":allShow || chooseShow?'list-item':'none'}} onClick={()=>{this.typeChoose('债权转让合同纠纷')}}>
                        <div className="img-wrapper">
                            <img src={require("../../../../assets/images/case-type1.png")} alt=""/>
                            <div className="img-cover"></div>
                        </div>
                        <p><span>债权转让合同纠纷</span><Icon type="right-circle-o" /></p>
                    </li>
                    <li className="my-case-type-item" style={{"display":allShow || chooseShow?'list-item':'none'}} onClick={()=>{this.typeChoose('借款合同纠纷')}}>
                        <div className="img-wrapper">
                            <img src={require("../../../../assets/images/case-type1.png")} alt=""/>
                            <div className="img-cover"></div>
                        </div>
                        <p><span>借款合同纠纷</span><Icon type="right-circle-o" /></p>
                    </li>
                    <li className="my-case-type-item" style={{"display":!allShow || chooseShow?'none':'list-item'}} onClick={()=>{this.typeChoose('信用卡纠纷')}}>
                        <div className="img-wrapper">
                            <img src={require("../../../../assets/images/case-type1.png")} alt=""/>
                            <div className="img-cover"></div>
                        </div>
                        <p><span>信用卡纠纷</span><Icon type="right-circle-o" /></p>
                    </li>
                    <li className="my-case-type-item" style={{"display":!allShow || chooseShow?'none':'list-item'}} onClick={()=>{this.typeChoose('金融借款合同纠纷')}}>
                        <div className="img-wrapper">
                            <img src={require("../../../../assets/images/case-type1.png")} alt=""/>
                            <div className="img-cover"></div>
                        </div>
                        <p><span>金融借款合同纠纷</span><Icon type="right-circle-o" /></p>
                    </li>
                    <li className="my-case-type-item" onClick={()=>{this.typeChoose('其他')}}>
                        <div className="img-wrapper">
                            <img src={require("../../../../assets/images/case-type1.png")} alt=""/>
                            <div className="img-cover"></div>
                        </div>
                        <p><span>其他</span><Icon type="right-circle-o" /></p>
                    </li>
                </ul>
            </div>
        )
    }
}