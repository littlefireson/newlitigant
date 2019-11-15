import React,{Component} from 'react';
import {Button} from 'antd';
import {withRouter} from 'react-router-dom';
import ajax from '../../utils/ajax';

// 申请撤案("11","本请求申请撤案"),
// 变更仲裁请求("12","变更仲裁请求"),
// 申请秘书回避("13","申请秘书回避"),
// 反请求管辖权异议("14","反请求管辖权异议"),
// 申请延期答辩("15","申请延期答辩"),
// 反请求("16","反请求申请"),
// 本请求管辖权异议("17","管辖权异议"),
// 反请求变更("18","反请求变更"),
// 仲裁员回避("19","仲裁员回避"),
// 反请求申请撤案("27","反请求申请撤案"),
// 申请补正("28","申请补正"),

@withRouter
export default  class BtnBox extends Component{
    constructor(props){
        super(props);
        const {match:{params:{caseId}}}=props;
        this.state={
            caseId,
            btnList:[],
            btnType:{
                '11':{
                    name:'本请求申请撤案',
                    to:'/withdrawn'
                },
                '12':{
                    name:'变更仲裁请求',
                    to:'/alterApply'
                },
                '13':{
                    name:'申请秘书回避',
                    to:'/avoidSec/0'
                },
                '14':{
                    name:'反请求管辖权异议',
                    to:'/challenge'
                },
                '15':{
                    name:'申请延期答辩',
                    to:'/delay'
                },
                '16':{
                    name:'反请求申请',
                    to:'/launchCounterclaim'
                },
                '17':{
                    name:'管辖权异议',
                    to:'/challenge'
                },
                '18':{
                    name:'反请求变更',
                    to:'/alterApply'
                },
                '19':{
                    name:'仲裁员回避',
                    to:'/avoidSec/1'
                },
                '27':{
                    name:'反请求申请撤案',
                    to:'/withdrawn'
                },
                '28':{
                    name:'申请补正',
                    to:'/correction'
                },
                '29':{
                    name:'仲裁中止',
                    to:'/suspension',
                },
                '30':{
                    name:'申请补正',
                    to:'/correction',
                }
            }
        }
    }
    goTo=(path)=>{
        const {history,location} = this.props;
        history.push(`${location.pathname}${path}`);
    }
    componentDidMount(){
        const {caseId} = this.state;
        ajax.get(`/menu/${caseId}/list`).then((btnList)=>{
            this.setState({
                btnList
            })
        })
    }
    render(){
        const {btnList,btnType} = this.state;
        return (<div className="btn-box">
            {
                btnList.length>0 && btnList.map((item)=>{
                    const btn = btnType[item.menuId];
                    return (<Button size="large" key={btn.name} type={btn.type || 'primary' } onClick={this.goTo.bind(this,btn.to)}>{btn.name}</Button>)
                })
            }
        </div>)
    }
};

// const {history,location} = props;
// const btns=[{
//     text:'申请撤案',
//     onClick:()=>{
//         history.push(`${location.pathname}/withdrawn`)
//     },
//     type:'primary',
// },{
//     text:'申请反请求',
//     onClick:()=>{
//         history.push(`${location.pathname}/launchCounterclaim`)
//     },
//     type:'primary'
// },{
//     text:'变更仲裁请求',
//     onClick:()=>{
//         history.push(`${location.pathname}/alterApply`)
//     },
//     type:'primary'
// },{
//     text:'管辖权异议',
//     onClick:()=>{
//         history.push(`${location.pathname}/challenge`)
//     },
//     type:'primary'
// },{
//     text:'申请秘书回避',
//     onClick:()=>{
//         history.push(`${location.pathname}/avoidSec/0`)
//     },
//     type:'primary'
// },{
//     text:'申请仲裁员回避',
//     onClick:()=>{
//         history.push(`${location.pathname}/avoidSec/1`)
//     },
//     type:'primary'
// }];
// const result=btns.map((btn)=>{
//     return (<Button size="large" key={btn.text} type={btn.type} onClick={btn.onClick}>{btn.text}</Button>)
// });
// return (<div className="btn-box">
//     {result}
// </div>)