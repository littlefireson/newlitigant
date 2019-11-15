import React, {Component} from 'react'
import { Icon, Form, Button, Upload, message } from 'antd'
import cache from '../../../utils/cache'
import {baseURL} from '../../../utils/ajax'
const FormItem = Form.Item;

class UploadForm extends Component{
    state={
        imageUrl:''
    };
    handelSubmit=()=>{
        this.props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
               
            }
        })
    };
    handelCancel=()=>{
        this.props.history.push('/personal');
    };
    imgUpload=(info)=>{
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    imageUrl
                }));  
            }else{
                message.error(info.file.response.head.msg);
            }
        } else if (info.file.status === 'error') {
            message.error(`上传失败`);
        }
    };
    getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const token = cache.getItem('token');
        const {imageUrl} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            }
        };
        const props = {
            name:'uploadFile',
            accept:"image/jpeg,image/png,image/jpg",
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'S_0022'
            },
            beforeUpload:(file)=>{
                if(file.type!='image/jpeg' && file.type!='image/jpg' && file.type!='image/png' && file.type!='application/png'){
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
        return(
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="手持身份证照片"
                >
                    {getFieldDecorator('cardImage', {
                        rules: [
                            { required: true, message: '请上传手持身份证照片' },
                        ],
                    })(
                        <Upload {...props} onChange={this.imgUpload}>
                            {imageUrl?<img src={imageUrl}/>:
                            <div>
                                <Button>
                                    <Icon type="upload" />
                                </Button>
                                <span className="tips">支持JPG、JPEG、PNG格式图片，大小不超过1M</span>
                            </div>}
                        </Upload>
                    )}
                </FormItem>
                <div className="personal-center-content-btn-box">
                    <Button onClick={this.handelCancel}>取消</Button>
                    <Button onClick={this.handelSubmit} type="primary">提交</Button>
                </div>
            </Form>
        )
    }
}

UploadForm = Form.create()(UploadForm);

export default class UploadID extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="personal-center-content ant-col-20">
                <div className="personal-center-content-main">
                    <UploadForm {...this.props}/>
                </div>
            </div>
        )
    }
}