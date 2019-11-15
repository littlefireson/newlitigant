import React, {Component} from 'react'
import { Icon, Form, Input, Button, Modal } from 'antd'
const FormItem = Form.Item;

import {baseURL} from '../../../utils/ajax'
import cache from '../../../utils/cache'

export default class LegalPersonInfo extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            imgVisible:false,
            enlargeSrc:'',
            ...props
        };
    }
    enlargeCancel=()=>{
        this.setState({
            imgVisible:false,
        })
    };
    enlargeImg=(src)=>{
        this.setState({
            imgVisible:true,
            enlargeSrc:src
        })
    };
    alertMessage=()=>{
        const {userInfo:{realAuth}} = this.props;
        if(realAuth == 0){
            message.warning('请继续进行打款认证');
        }
    }
    transImgSrc=(id)=>{
        const token = cache.getItem('token')
        return `${baseURL}public/file/downloads?id=${id}&access_token=${token}`;
    }
    componentWillReceiveProps(props){
        const {info} = props;
        this.setState({
            info
        })
    }
    render(){
        const {formItemLayout,info,imgVisible} = this.state;
        return(
            <div>
                <div className="personal-center-content-main">
                    <Form className="personal-center-content-form">
                        <FormItem
                            {...formItemLayout}
                            label="名称"
                        >
                            <span>{info.name}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="统一社会信用代码"
                        >
                            <span>{info.unifiedSocialCode}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="邮箱"
                        >
                            <span>{info.email}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="法定代表人姓名"
                        >
                            <span>{info.certName}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="住址"
                        >
                            <span>{info.address}</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="法定代表人身份证正面照"
                        >
                            <span className="img-wrapper" onClick={()=>{this.enlargeImg(this.transImgSrc(info.cardPicture))}}><img src={this.transImgSrc(info.cardPicture)}/></span>
                            <span className="tips">点击查看大图</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="法定代表人身份证背面照"
                        >
                            <span className="img-wrapper" onClick={()=>{this.enlargeImg(this.transImgSrc(info.backCardPicture))}}><img src={this.transImgSrc(info.backCardPicture)}/></span>
                            <span className="tips">点击查看大图</span>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="彩色三证合一营业执照"
                        >
                            <span className="img-wrapper" onClick={()=>{this.enlargeImg(this.transImgSrc(info.busiImgId))}}><img src={this.transImgSrc(info.busiImgId)}/></span>
                            <span className="tips">点击查看大图</span>
                        </FormItem>
                        {/* {info.authorDoc&&
                        <FormItem
                            {...formItemLayout}
                            label="授权书扫描件"
                        >
                            <span className="img-wrapper" onClick={()=>{this.enlargeImg(this.transImgSrc(info.authorDoc))}}><img src={this.transImgSrc(info.authorDoc)}/></span>
                            <span className="tips">点击查看大图</span>
                        </FormItem>} */}
                    </Form>
                </div>
                <Modal
                    visible={imgVisible}
                    title=""
                    onCancel={this.enlargeCancel}
                    footer={null}
                    closable={false}
                >
                    <img className="enlarge-img" src={this.state.enlargeSrc}/>
                </Modal>
            </div>
        )
    }
}