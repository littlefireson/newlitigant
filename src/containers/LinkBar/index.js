import React,{Component} from 'react';
import {Link, withRouter,matchPath } from 'react-router-dom';
import {Row,Breadcrumb} from 'antd';

const routerMap=[
    {
        path:'/myCase',
        title:'我的案件'
    },{
        path:'/myCase/apply',
        title:'申请立案'
    },{
        path:'/myCase/accept',
        title:'代理受理'
    },{
        path:'/myCase/apply',
        title:'委托代理'
    },{
        path:'/myCase/payment',
        title:'缴费记录'
    },{
        path:'/myCase/caseDetail/:caseId',
        title:'处理案件'
    },{
        path:'/myCase/caseDetail/:caseId+/bookshelves',
        title:'案件相关文书'
    },{
        path:'/myCase/caseDetail/:caseId+/withdrawn',
        title:'撤回仲裁申请'
    },{
        path:'/myCase/caseDetail/:caseId+/addProof',
        title:'添加举证材料'
    },{
        path:'/myCase/caseDetail/:caseId+/reply',
        title:'答辩'
    },{
        path:'/myCase/caseDetail/:caseId+/alterApply',
        title:'变更仲裁请求'
    },{
        path:'/myCase/caseDetail/:caseId+/launchCounterclaim',
        title:'申请反请求'
    },{
        path:'/myCase/caseDetail/:caseId+/avoidSec',
        title:'请求回避'
    },{
        path:'/myCase/caseDetail/:caseId+/settlement',
        title:'和解协议申请'
    },{
        path:'/personal',
        title:'个人中心'
    },{
        path:'/help',
        title:'帮助中心'
    },{
        path:'/myCase/caseDetail/:caseId+/challenge',
        title:'管辖权异议'
    },{
        path:'/myCase/caseDetail/:caseId+/delay',
        title:'延期答辩'
    },{
        path:'/myCase/caseDetail/:caseId+/correction',
        title:'申请补正'
    }
]
@withRouter
export default class LinkBar extends Component{
    getItems=()=>{
        const { location } = this.props;
        const pathSnippets = location.pathname.split('/').filter(i => i);
        const urlArr= pathSnippets.map((val,index)=>(`/${pathSnippets.slice(0, index + 1).join('/')}`)).reverse();
        let depot=null;

        const BreadcrumbList = urlArr.map((url,index)=>{
            const matchs=routerMap.filter((item)=>{
                const match = matchPath(url,{
                    path: item.path
                });
                if(match){
                    if(match.url === url)
                        return true;
                }
            });
            if(matchs.length>0){
                if(depot){
                    let result=(<Breadcrumb.Item key={depot+index}>
                        <Link to={depot}>
                            {matchs[0].title}
                        </Link>
                    </Breadcrumb.Item>);
                    depot=null;
                    return result;
                }else{
                    return(<Breadcrumb.Item key={url+index}>
                        <Link to={url}>
                            {matchs[0].title}
                        </Link>
                    </Breadcrumb.Item>)
                }
            }else if(!depot){
                depot = url;
            }
        }).reverse();
        if(BreadcrumbList[0]){
            return (<Breadcrumb>
                {BreadcrumbList}
            </Breadcrumb>)
        }
    }
    render(){
        return (<Row className="ant-row-layout linkBar">
                {this.getItems()}
        </Row>)
    }
}