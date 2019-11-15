import React, {Component} from 'react'
import { Icon, Form, Input, Button, Upload, message } from 'antd'
const FormItem = Form.Item;
const { TextArea } = Input;
import {baseURL} from '../../utils/ajax'

export default class AttachmentForm extends Component{
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 }
            }
        };
        const props = {
            name: 'uploadFile',
            action: baseURL+'public/uploadDoc',
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if(info.file.response.head.retCode==='0000'){
                        message.success(`${info.file.name} 文件上传成功`);
                    }else{
                        message.error(info.file.response.head.msg);
                    }
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传失败`);
                }
            }
        };
        return (
            <div>
                <FormItem
                    {...formItemLayout}
                    label="附件名称"
                >
                    <Input type="text" placeholder="请输入名称"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="内容"
                >
                    <TextArea  placeholder="请输入内容" autosize={{ minRows: 2, maxRows: 8 }}/>
                    <em className="attachment-tip">内容”和“文件”必须有一项是有内容的</em>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="文件上传"
                >
                    <Upload {...props}>
                        <Button>
                            <Icon type="upload"/>上传
                        </Button>
                    </Upload>
                </FormItem>
            </div>
        )
    }
}