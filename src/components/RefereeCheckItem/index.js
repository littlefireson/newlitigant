import React,{Componet} from 'react';
import classnames from 'classnames'
import { Button } from 'antd';
import {baseURL} from '../../utils/ajax'
import cache from '../../utils/cache'
const RefereeCheckItem = (props) =>{
    const token = cache.getItem('token');
    const commInfo =JSON.parse(cache.getItem('commInfo'));
    const {progress,litigantType} = commInfo
    const {currentProgress = 0} = progress
    const {title,referee={},enable=false,current=false,...other} = props;
    // console.log('currentProgress',currentProgress);
    console.log(props);
    const articleName=classnames({
        'referee-detail':true,
        'referee-detail-current':current
    });
    if(referee&&current == true){
        if(referee.type=='1'){
            referee.type = '4';
        }else if(referee.type=='0'){
            referee.type = '3';
        }
        
    }
    let content=(<p className="no-check"><i className="dot">•</i>未选择</p>);

    if(referee && Object.keys(referee).length>0){
        const {portrait,name,age,job,specialty,type} = referee;

        content=(<article className={articleName}>
            <header><img src={`${baseURL}public/file/downloads?id=${portrait}&access_token=${token}`}/></header>
            <footer>
                <h3>{(type =='0'&&(litigantType=='0'||litigantType=='3'))||(type=='4')||(type =='1'&&(litigantType=='1'||litigantType=='4'))?name:name.slice(0,1) + '*'.repeat(name.length-1)}</h3>  
                <span>{age}</span>
                <span>{job}</span>
                <span>{specialty}</span>
            </footer>
        </article>)
    }else if(enable){
        content=(<Button type="primary" {...other}>去选择</Button>)
    }
    return (<div className="referee-check-item">
        <header>{title?title:(referee && referee.status =='2'?'已选仲裁员':'候选仲裁员')}</header>
        {content}
    </div>)
};
export default RefereeCheckItem;