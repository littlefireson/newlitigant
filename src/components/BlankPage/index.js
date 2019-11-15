import React,{Component} from 'react';
import {Icon} from 'antd';
const BlankPage = (props)=>{
    return(<div className="blankPage">
        <Icon type="frown-o"/>
        <span> 暂无数据 </span>
    </div>)
}
export default BlankPage