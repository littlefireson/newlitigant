import React,{Component} from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import ajax,{baseURL} from '../../utils/ajaxWithoutToken'
export default class Footer extends Component{
    constructor(props){
        super(props)
        this.state={
            recordInfo:"",
            phoneInfo:"",
            adressInfo:"",
            logo: "",
            Icp:''
        }
    }
    componentWillMount = ()=>{
        ajax({
            url:`${baseURL}/websiteConfig/list`,
            method:'get', 
        }).then((data)=>{
            data.forEach(element => {
                if(element.keyName == '备案信息'){
                    this.setState({
                        recordInfo:element.value
                    })
                }else if(element.keyName == '联系信息'){
                    this.setState({
                        phoneInfo:element.value
                    })
                }else if(element.keyName == '地址信息'){
                    this.setState({
                        adressInfo:element.value
                    })
                }
                else if(element.keyName == 'logo'){
                    this.setState({
                        logo:element.value
                    })
                } else if (element.keyName == 'ICP备案') {
                    this.setState({
                        Icp:element.value
                    })
                }
            });
        })
    }
    render(){
        return (
            <footer className="common-footer ant-row-layout clearfix">
                <div className="common-footer-wrapper ant-col-24">
                    <div className="common-footer-bottom clearfix">
                        <div className="common-footer-logo">
                            <img src={this.state.logo?`${baseURL}public/file/preview/${this.state.logo}`:''} alt="logo"/>
                            <span>联系我们</span>
                            <span>新闻公告</span>
                            <span>友情链接</span>
                        </div>
                        <div className=' clearfix'>
                            <p className='common-footer-bottom-remark ant-col-6'>{this.state.recordInfo?this.state.recordInfo:""}</p>
                            <p className='common-footer-bottom-remark ant-col-6'> {this.state.phoneInfo?this.state.phoneInfo:""}</p>
                            <p className='common-footer-bottom-remark ant-col-6'>{this.state.Icp?this.state.Icp:""}</p>
                            <p className='common-footer-bottom-remark ant-col-6'>{this.state.adressInfo?this.state.adressInfo:""}</p>
                        </div>
                        {/* {this.state.recordInfo?<p>{this.state.recordInfo}</p>:""}
                        {this.state.phoneInfo?<p>{this.state.phoneInfo}</p>:""}
                        {this.state.adressInfo?<p>{this.state.adressInfo}</p>:""} */}
                        {/* <p>海南仲裁委员会版权所有 Copyright©2012     主任、法定代表人：高树林</p>
                        <p>电 话：0756-2298233   2296928   2296118   传 真：（0756）2291183</p>
                        <p>地 址：海南市柠溪路双竹街70栋（原人力资源中心） 粤ICP备13088361号</p> 
                        <p>【本网站严禁发布涉密信息】</p>*/}
                    </div>
                </div>
            </footer>
        )
    }
}