import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Row, Col, Timeline } from 'antd';
import ajax,{baseURL} from '../../utils/ajax'
import cache from '../../utils/cache'

const token = cache.getItem('token');

const BookListItem = ({time,title,fileId})=>(<li className="book-list-item">
    <header>
        <time>{time}</time>
        <strong>{title}</strong>
    </header>
    <footer>
        <a href={`${baseURL}public/file/preview/${fileId}?access_token=${token}`} target='_blank'>预览</a>
        <a href={`${baseURL}public/file/downloads?id=${fileId}&access_token=${token}`}>下载</a>
    </footer>
</li>)

@withRouter
export default class Bookshelves extends Component{
    state = {
        docList:[]
    }
    getBookList=()=>{
        const caseId = this.props.match.params.caseId.split('/')[0];
        ajax.get(`litigant/case/${caseId}/getCaseDocList`,{params:{caseId}}).then((data)=>{
            if(data){
                this.setState({
                    docList:data
                })
            }
        })
    }
    componentDidMount(){
        this.getBookList();
    }
    render(){
        const {docList} = this.state;
        return(<section className="bookshelves">
            <Row className="ant-row-layout">
                <Col span={24}>
                    <ul className="book-list">
                        {docList.length>0 && docList.map((item,index)=>(<BookListItem key={index} time={item.createTime} title={item.docName} fileId={item.fileId}/>))}
                    </ul>
                </Col>
            </Row>
        </section>)
    }
}