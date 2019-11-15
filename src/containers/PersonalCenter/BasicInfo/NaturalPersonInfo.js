import React, {Component} from 'react'
import { Icon, Form, Input, Button, Modal, Upload, message } from 'antd'
import {dispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
const FormItem = Form.Item;

import ajax,{baseURL} from '../../../utils/ajax'
import cache from '../../../utils/cache'
import { userInfo } from '../../../reduces/userInfo';
import {userChange} from '../../../actions'

@withRouter
export default class NaturalPersonInfo extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            info:{},
            modify:false,
            visible:false,
            loading:false,
            imgVisible:false,
            enlargeSrc:'',
            livingShow:false,
            uploadCard:false,
            uploading:false,
            livingLoad:false,
            frontImg:'',
            ...props
        };
        this.localUrl = location.href.split('#')[0];
        this.handCard = '';
        
    }
    edit=()=>{
        this.setState({
            visible:true
        })
    };
    cancelEdit=()=>{
        document.getElementById('address').value = '';
        this.setState({
            modify:false
        })
    }
    handleOk=()=>{
        this.setState({
            loading:true
        });
        let password = document.getElementById('password').value;
        if(password){
            ajax({
                url:'person/center/passwordValid',
                method:'post',
                data:{
                    password
                }
            }).then(()=>{
                document.getElementById('password').value = '';
                this.setState({
                    visible:false,
                    modify:true
                });
            }).finally(()=>{
                this.setState({
                    loading:false
                })
            })
        }else{
            message.error('请输入密码');
        }
        
    };
    handleCancel = ()=>{
        document.getElementById('password').value = '';
        this.setState({
            visible:false
        })
    };
    submitInfo = ()=>{
        let address = document.getElementById('address').value;
        if(address){
            ajax({
                url:'person/center/modifyInfo',
                method:'post',
                data:{
                    address
                }
            }).then(()=>{
                let obj = this.state.info;
                obj.address = address;
                this.setState({
                    modify:false,
                    info:obj
                })
            }).finally(()=>{
                document.getElementById('address').value = '';
            })
        }else{
            message.error('地址不能为空');
        }
        
    };
    enlargeCancel=()=>{
        this.setState({
            imgVisible:false,
        })
    };
    enlargeImg=(id)=>{
        const token = cache.getItem('token');
        this.setState({
            imgVisible:true,
            enlargeSrc:`${baseURL}public/file/downloads?id=${id}&access_token=${token}`
        })
    };
    livingIdentify=()=>{
        ajax({
            url:'/sys/user/livenessToken',
            method:'get',
            params:{
                returnUrl:`${this.localUrl}`,
                // failUrl:`${this.localUrl}/personal/false`
            }
        }).then((bodyData)=>{
            location.href = bodyData.url+'?token='+bodyData.token;
        }).catch((e)=>{
            if(e.retCode == '4025'){
                this.setState({
                    uploadCard:true
                })
            }
        })
    };
    uploadCancel=()=>{
        this.setState({
            uploadCard:false
        })
    }
    uploadSubmit=()=>{
        this.setState({
            uploading:true
        })
        ajax({
            url:'/sys/user/labourRealName',
            method:'post',
            data:{
                idCard:this.handCard
            }
        }).then(()=>{
            // this.props.history.goBack();
        }).finally(()=>{
            this.setState({
                uploading:false,
            })
        })
    }
    positiveUpload=(info)=>{
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 上传成功`);
                this.handCard = info.file.response.body;
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    frontImg:imageUrl
                }));
            }else{
                message.error(info.file.response.head.msg);
            }
            
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
        }
    };
    alertMessage=()=>{
        const {userInfo:{realAuth}} = this.props;
        if(realAuth == 0){
            message.warning('请继续进行活体认证');
        }
    }
    componentWillReceiveProps(props){
        const {info} = props;
        this.setState({
            info,
        })
    }
    getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    render(){
        const {formItemLayout,modify,visible,loading,imgVisible,enlargeSrc,uploadCard,uploading,livingShow,livingLoad,info,frontImg} = this.state;
        // const {info} = this.props;
        const token = cache.getItem('token');
        const props = {
            name:'uploadFile',
            accept:"image/jpeg,image/png,image/jpg",
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'S_0022'
            },
            beforeUpload:(file)=>{
                if(file.type!='image/jpeg' && file.type!='image/jpg' && file.type!='image/png'){
                    message.error('请上传jpg,jpeg,png格式的文件');
                    return false;
                }
                if(file.size/1024/1024 >1){
                    message.error('请上传小于1M的文件');
                    return false;
                }
            },
            showUploadList:false
        };
        const item = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 }
            }
        }
        return(
            <div>
                {/* {this.alertMessage()} */}
                {info && <div className="personal-center-content-main">
                    {(!livingShow&&!modify)&&<span className="personal-center-content-main-edit" onClick={this.edit}>
                        <Icon type="edit"/>
                    </span>}
                    <Form className="personal-center-content-form">
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                        >
                            <span>{info.name}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="性别"
                        >
                            <span>{info.sex}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="身份证号"
                        >
                            <span>{info.cardId?`${info.cardId.substring(0,3)}***********${info.cardId.substring(14)}`:''}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="银行卡号"
                        >
                            <span>{info.bankCardId?`${info.bankCardId.substring(0,6)}*********${info.bankCardId.substring(15)}`:''}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="银行预留手机号"
                        >
                            <span>{info.phone}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="住址"
                        >
                            <Input id="address" style={{"display":modify?"block":"none"}} defaultValue={info.address}/>
                            <span style={{"display":modify?"none":"inline-block"}}>{info.address}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="身份证正面照"
                        >
                            <span className="img-wrapper" onClick={()=>{this.enlargeImg(info.cardPicture)}}><img src={`${baseURL}public/file/downloads?id=${info.cardPicture}&access_token=${token}`}/></span>
                            <span className="tips">点击查看大图</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="身份证反面照"
                        >
                            <span className="img-wrapper" onClick={()=>{this.enlargeImg(info.backCardPicture)}}><img src={`${baseURL}public/file/downloads?id=${info.backCardPicture}&access_token=${token}`}/></span>
                            <span className="tips">点击查看大图</span>
                        </FormItem>
                        {modify&&<div className="personal-center-content-btn-box">
                            <Button onClick={this.cancelEdit}>取消</Button>
                            <Button type="primary" onClick={this.submitInfo}>提交</Button>
                        </div>}
                        {livingShow&&<div className="personal-center-content-btn-box">
                            <Button id="btn-living" type="primary" loading={livingLoad} onClick={this.livingIdentify}>继续进行活体认证</Button>
                            <p className="living-tip">温馨提醒：活体验证时动作不要太快，太快会导致认证失败</p>
                        </div>}
                    </Form>
                </div>}
                <Modal
                    visible={visible}
                    title="输入您的登录密码"
                    width="200px"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
                          确定
                        </Button>,
                     ]}
                >
                    <Input id="password" type="password" placeholder="请输入登录密码"/>
                </Modal>
                <Modal
                    visible={imgVisible}
                    title=""
                    onCancel={this.enlargeCancel}
                    footer={null}
                    closable={false}
                >
                    <img className="enlarge-img" src={enlargeSrc}/>
                </Modal>
                <Modal
                    width={600}
                    visible={uploadCard}
                    title="超出验证次数，请上传手持身份证认证"
                    onCancel={this.uploadCancel}
                    onOk={this.uploadSubmit}
                    className="ant-row"
                    maskClosable={false}
                    confirmLoading={uploading}
                >
                    <Form>
                        <FormItem
                            {...item}
                            label="手持身份证照片"
                        >
                            <Upload {...props} onChange={this.positiveUpload}>
                                {frontImg?<img src={frontImg}/>:
                                <div>
                                    <Button>
                                        <Icon type="upload" />
                                    </Button>
                                    <span className="tips">支持JPG、JPEG、PNG格式图片，大小不超过1M</span>
                                </div>}
                            </Upload>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
    componentDidMount(){
        const {userInfo} = this.props;
        if(userInfo.realAuth == 0){
            ajax.get('person/center/checkAuthor').then((data)=>{
                if(data){
                    userInfo.realAuth=1;
                    this.props.dispatch(userChange(userInfo));
                }else{
                    this.setState({
                        livingShow:true
                    })
                }
            })
        }
    }
}