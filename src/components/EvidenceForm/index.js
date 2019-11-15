import React, {Component} from 'react'
import { Icon, Form, Input, Button, Upload, message } from 'antd'
const FormItem = Form.Item;
import {baseURL} from '../../utils/ajax'
import cache from '../../utils/cache'


const fileSrc = require('../../assets/images/upload-file.png');
class EvidenceForm extends Component{
    constructor( props,context) {
        super(props,context);
        this.state= {
            imageUrl:'',
            clear:false
        }
    }
    isImage=(type)=>{
        if(type&&type.indexOf('image/') != -1){
            return true;
        }else{
            return false;
        }
    }
    onChange = (info) => {
        if (info.file.status === 'done') {
            if(info.file.response.head.retCode==='0000'){
                message.success(`${info.file.name} 文件上传成功`);
                this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                    imageUrl:this.isImage(info.file.type)?imageUrl:fileSrc,
                    clear:false
                }));
                this.props.setType(this.props.keyMs,info.file.type)
            }else{
                message.error(info.file.response.head.msg);
                this.setState({
                    imageUrl:'',
                    clear:true
                })
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
        }
    }
    infoInput=()=>{
        const {evidenceInfo} = this.props || {evidenceInfo:null};
        const token = cache.getItem('token');
        if(evidenceInfo){
            this.setState({
                imageUrl:this.isImage(evidenceInfo.docType)?`${baseURL}public/file/downloads?id=${evidenceInfo.fileId}&access_token=${token}`:fileSrc
            })
            delete evidenceInfo.docType;
            this.props.form.setFieldsValue(evidenceInfo);
        }
    }
    
    getBase64=(img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    componentDidMount(){
        this.infoInput();
    }
    componentWillUpdate(){
        const {clear} = this.state;
        if(clear){
            this.props.form.setFieldsValue({'fileId':''});
            this.setState({
                clear:false
            })
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const token = cache.getItem('token');
        const {keyIndex,evidenceDelete,keyMs,arrLength} = this.props;
        const {imageUrl} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            }
        };
        const props = {
            name: 'uploadFile',
            //action: baseURL+'public/uploadDoc',
            action: `${baseURL}public/file/uploads?access_token=${token}`,
            data:{
                buzzType:'C_0001'
            },
            onChange:this.onChange,
            showUploadList:false
        };
        return (
            <div className="upload-wrapper">
                <FormItem>
                    <p className="my-case-second-identity">
                        <span>证据清单{keyIndex}</span><em></em><b>(如营业执照、法人证明材料及身份证扫描件、持卡人资料、信用卡合同、办卡进度表、银行流水或账户欠款信息、催收记录)</b>
                        {keyIndex>1 || arrLength>1?<i className="evidence-delete" keyindex={keyMs} onClick={evidenceDelete}>删除</i>:''}
                    </p>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="证据材料"
                >
                    {getFieldDecorator('evidenceMat', {
                        rules: [
                            { required: true, message: '请输入证据材料' }
                        ],
                    })(
                        <Input type="text" placeholder="" maxLength="60"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="证据目的"
                >
                    {getFieldDecorator('purposeEvidence', {
                        rules: [
                            { required: true, message: '请输入证据目的' }
                        ],
                    })(
                        <Input type="text" placeholder="" maxLength="200"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="证据来源"
                >
                    {getFieldDecorator('sourceEvidence', {
                        rules: [
                            { required: false, message: '请输入证据来源' }
                        ],
                    })(
                        <Input type="text" placeholder="" maxLength="30"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="文件上传"
                >
                    {getFieldDecorator('fileId', {
                        rules: [
                            { required: true, message: '请上传文件' }
                        ]
                    })(
                        <Upload {...props}>
                            {imageUrl?<img src={imageUrl}/>:
                                <div>
                                    <Button>
                                        <Icon type="upload"/>上传
                                    </Button>
                                    <span className="tips">多份文件可上传压缩包</span>
                                </div>}
                        </Upload>
                    )}
                </FormItem>
            </div>
        )
    }
}

export default EvidenceForm;