import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import {AsyncComponent} from '../../components'

const SidebarMenu = AsyncComponent(() => import(/* webpackChunkName: "sidebarMenu" */ "./SidebarMenu"));
const CalculateCost = AsyncComponent(() => import(/* webpackChunkName: "calculateCost" */ "./CalculateCost"));
const TemplateDownload = AsyncComponent(() => import(/* webpackChunkName: "templateDownload" */ "./TemplateDownload"));
const ArbitrationClause = AsyncComponent(() => import(/* webpackChunkName: "arbitrationClause" */ "./ArbitrationClause"));

export default class HelpCenter extends Component{
    state={
        nowIndex:0
    };
    selectMenu=(e)=>{
        this.setState(()=>{
            switch(e){
                case 'calculate':
                    return({
                        nowIndex:0
                    });
                case 'download':
                    return({
                        nowIndex:1
                    });
                default:
                    return({
                        nowIndex:2
                    });
            }
        })
    };
    getDom=()=>{
        const {nowIndex} = this.state;
        const domList = {
            0:<CalculateCost/>,
            1:<TemplateDownload/>,
            2:<ArbitrationClause/>
        }
        return domList[nowIndex];
    }
    render(){
        return (
            <section className="help-center ant-row-layout clearfix">
                <SidebarMenu selectMenu={this.selectMenu}/>
                {this.getDom()}
            </section>
        )
    }
}
