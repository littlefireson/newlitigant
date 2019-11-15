import React,{Component} from 'react';
import {message} from 'antd';
import ajax from '../../utils/ajax';

export default class DocHeader extends Component{
    constructor(props) {
        super(props);
    }
    getHead=()=>{
        let {proposer,defendant,role=0,replyFlag=false,oppositeFlag=false,counterFlag=false,singleFlag=false} = this.props;
        if(oppositeFlag){
            if(role == 1){
                role = 0;
            }else{
                role = 1;
            }
        }
        const headList={
            0:<div>
                {proposer.type==0?<div>
                    <p>{!replyFlag?counterFlag?'反请求申请人':'申请人':'答辩人'}：{proposer.name}{proposer.sex&&`，${proposer.sex}`}{proposer.ethnic&&`，${proposer.ethnic.replace(/族/,'')}族`}{proposer.birthday&&`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日出生`}{proposer.cardId&&`，身份证号码：${proposer.cardId}`}</p>
                    {proposer.address&&<p>住所：{proposer.address}</p>}
                </div>:
                <div>
                    <p>{!replyFlag?counterFlag?'反请求申请人':'申请人':'答辩人'}：{proposer.name}</p>
                    {proposer.address&&<p>住所：{proposer.address}</p>}
                    <p>法定代表人：{proposer.certName}，职务：{proposer.certDuties}</p>
                </div>}
                {!singleFlag && <div>{defendant.type==0?<div>
                    <p>{!replyFlag?counterFlag?'反请求被申请人':'被申请人':'被答辩人'}：{defendant.name}{defendant.sex&&`，${defendant.sex}`}{defendant.ethnic&&`，${defendant.ethnic.replace(/族/,'')}族`}{defendant.birthday&&`，${defendant.birthday.substring(0,4)}年${defendant.birthday.substring(4,6)}月${defendant.birthday.substring(6)}日出生`}{defendant.cardId&&`，身份证号码：${defendant.cardId}`}</p>
                    {defendant.address&&<p>住所：{defendant.address}</p>}
                </div>:
                <div>
                    <p>{!replyFlag?counterFlag?'反请求被申请人':'被申请人':'被答辩人'}：{defendant.name}</p>
                    {defendant.address&&<p>住所：{defendant.address}</p>}
                    <p>法定代表人：{defendant.certName}，职务：{defendant.certDuties}</p>
                </div>}</div>}
            </div>,
            1:<div>
                {defendant.type==0?<div>
                    <p>{!replyFlag?counterFlag?'反请求申请人':'申请人':'答辩人'}：{defendant.name}{defendant.sex&&`，${defendant.sex}`}{defendant.ethnic&&`，${defendant.ethnic.replace(/族/,'')}族`}{defendant.birthday&&`，${defendant.birthday.substring(0,4)}年${defendant.birthday.substring(4,6)}月${defendant.birthday.substring(6)}日出生`}{defendant.cardId&&`，身份证号码：${defendant.cardId}`}</p>
                    {defendant.address&&<p>住所：{defendant.address}</p>}
                </div>:
                <div>
                    <p>{!replyFlag?counterFlag?'反请求申请人':'申请人':'答辩人'}：{defendant.name}</p>
                    {defendant.address&&<p>住所：{defendant.address}</p>}
                    <p>法定代表人：{defendant.certName}，职务：{defendant.certDuties}</p>
                </div>}
                {!singleFlag && <div>{proposer.type==0?<div>
                    <p>{!replyFlag?counterFlag?'反请求被申请人':'被申请人':'被答辩人'}：{proposer.name}{proposer.sex&&`，${proposer.sex}`}{proposer.ethnic&&`，${proposer.ethnic.replace(/族/,'')}族`}{proposer.birthday&&`，${proposer.birthday.substring(0,4)}年${proposer.birthday.substring(4,6)}月${proposer.birthday.substring(6)}日出生`}{proposer.cardId&&`，身份证号码：${proposer.cardId}`}</p>
                    {proposer.address&&<p>住所：{proposer.address}</p>}
                </div>:
                <div>
                    <p>{!replyFlag?counterFlag?'反请求被申请人':'被申请人':'被答辩人'}：{proposer.name}</p>
                    {proposer.address&&<p>住所：{proposer.address}</p>}
                    <p>法定代表人：{proposer.certName}，职务：{proposer.certDuties}</p>
                </div>}</div>}
            </div>,
        };
        return headList[role];
    };
    
    render(){
        const {proposer,defendant} = this.props;
        return(
            <div>
                {proposer&&defendant?this.getHead():''}
            </div>
        )
    }
}