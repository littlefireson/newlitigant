import React, {Component} from 'react'
import {connect,dispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {userChange,messageChange} from '../../actions'
import ajax from '../../utils/ajax'
import {Spin} from 'antd'
import {AsyncComponent} from '../../components'

const SidebarMenu = AsyncComponent(() => import(/* webpackChunkName: "sidebarMenu" */ "./SidebarMenu"));
const IdentifyInfo = AsyncComponent(() => import(/* webpackChunkName: "identifyInfo" */ "./IdentifyInfo"));
const BasicInfo = AsyncComponent(() => import(/* webpackChunkName: "basicInfo" */ "./BasicInfo"));
const AccountInfo = AsyncComponent(() => import(/* webpackChunkName: "accountInfo" */ "./AccountInfo"));
const MessageInfo = AsyncComponent(() => import(/* webpackChunkName: "messageInfo" */ "./MessageInfo"));
const UploadID = AsyncComponent(() => import(/* webpackChunkName: "uploadID" */ "./UploadID"));

@withRouter
@connect(
    state =>({
        userInfo:state.userInfo
    })
)
export default class PersonalCenter extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            info:null,
            total:0,
            unReadNum:0,
            messages:[]
        }
    }

    getDom=()=>{
        let nowIndex = 1;
        const {info,total,messages} = this.state;
        const {userInfo} = this.props;
        const id = this.props.match.params.id || '';
        let obj = userInfo;
        if(id != '' && id == false){
            nowIndex = 1;
        }else if(id != '' && id==true && userInfo.realAuth=='0'){
            obj.realAuth = '1';
            this.props.dispatch(userChange(obj));
        }else{
            if((userInfo.verifyStatus == '1'&&userInfo.type=='0')||(userInfo.realAuth == '0'&&userInfo.type=='1')){
                nowIndex = 0;
            }else{
                if(id != '' && id!=true && id!=false){
                    nowIndex = id;
                }
            }
          
            // if(userInfo.verifyStatus == '1' && (userInfo.realAuth == '0'&&userInfo.type=='1')){
            //     nowIndex = 0;
            // }else if(userInfo.verifyStatus == '0' && (userInfo.realAuth == '0'&&userInfo.type=='1')){
            //     obj.realName = info.name;
            //     this.props.dispatch(userChange(obj));
            // }else{
            //     if(id != '' && id!=true && id!=false){
            //         nowIndex = id;
            //     }
            // }
        }
        const domList = {
            0:<IdentifyInfo userInfo={userInfo} {...this.props}/>,
            1:<BasicInfo userInfo={userInfo} {...this.props} info={info}/>,
            2:<AccountInfo userInfo={userInfo} {...this.props} info={info}/>,
            3:<MessageInfo userInfo={userInfo} {...this.props} getMessage={this.getMessage} checkMessage={this.checkMessage} checkAllMessage={this.checkAllMessage} total={total} messages={messages} />,
            4:<UploadID userInfo={userInfo} {...this.props}/>
        };
        return domList[nowIndex];
    };
    getMessage=(pageNum,pageSize)=>{
        // console.log('pageNum:'+pageNum+',pageSize:'+pageSize);
        ajax.get('common/message/litigantList',{
            params:{
                pageNum,
                pageSize
            }
        }).then((data)=>{
            this.setState({
                unReadNum:data.unReadNum,
                total:data.list.total,
                messages:data.list.list
            })
            this.props.dispatch(messageChange(data.unReadNum));
        })
    };
    getInfo=()=>{
        const {userInfo} = this.props;
        if(userInfo.verifyStatus == 0){
            this.setState({
                loading:true
            });
            ajax.get(`person/center/getBaseInfo`).then((data)=>{
                this.setState({
                    info:data
                });
                // let obj = userInfo;
                // obj.realName = data.name;
                // this.props.dispatch(userChange(obj));
            }).finally(()=>{
                this.setState({
                    loading:false
                });
            })
        }
    }
    componentDidMount(){
        this.getInfo();
        this.getMessage(1,10);
    }
    componentWillReceiveProps(){
        this.getInfo();
    }
    checkMessage=(id)=>{
        let {messages,unReadNum} = this.state;
        for(let i = 0; i < messages.length; i++){
            if(messages[i].status==0 && messages[i].id==id){
                ajax({
                    url:`common/message/${id}`,
                    method:'put',
                    data:{
                        id
                    }
                }).then(()=>{
                    messages[i].status = 1;
                    unReadNum--;
                    this.setState({
                        messages,
                        unReadNum
                    })
                    this.props.dispatch(messageChange(unReadNum));
                })
            }
        }
        
    }
    checkAllMessage=()=>{
        let {messages,unReadNum} = this.state;
        ajax({
            url:`common/message/readAll`,
            method:'put'
        }).then(()=>{
            for(var i in messages){
                messages[i].status = 1;
            }
            unReadNum = 0;
            this.setState({
                messages,
                unReadNum
            })
            this.props.dispatch(messageChange(unReadNum));
        })

    }
    render(){
        const {unReadNum,loading} = this.state;
        return (
            <Spin spinning={loading}>
                <section className="personal-center ant-row-layout clearfix upload-wrapper">
                    <SidebarMenu {...this.props} unReadNum={unReadNum} />
                    {this.getDom()}
                </section>
            </Spin>
        )
    }
}