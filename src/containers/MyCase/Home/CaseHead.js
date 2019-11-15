import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Select, Icon, Input, Button,Modal } from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const confirm = Modal.confirm;


class CaseHead extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            selectValue:'',
            inputValue:''
            
        }
    }
    handleChange=(value) => {
        this.setState({
            selectValue:value
        });
    }
    applyCase=()=>{
        const {userInfo,history} = this.props;
        if(userInfo.verifyStatus == '1'||userInfo.realAuth == '0'){
            confirm({
                title: '',
                content: '您还未进行身份认证',
                okText: '去认证',
                cancelText: '取消',
                onOk() {
                    history.push('/personal');
                },
                onCancel() {

                }
            })
        }else{
            history.push('/myCase/apply');
        }
    };
    searchCase=(value)=>{
        // debugger;
        const {selectValue} = this.state;
        const {sendSelectValue} = this.props;
        this.setState({
            inputValue:value,
            selectValue
        });
        sendSelectValue({
            type:'case_head_select_value',
            selectValue,
            value
          });
        this.props.getList(1,selectValue,value);
    }
    // 0:'待提交',
    // 1:'待审核',
    // 2:'立案失败',
    // 3:'待缴费',
    // 4:'答辩期',
    // 5:'审理期',
    // 6:'裁决期',
    // 7:'已结案',
    // 8:'补正期',
    // 9:'案件转线下',
    // 10:'和解中',
    // 11:'案件中止'
    // 12:'已撤案'
    render(){
        const {userInfo} = this.props;
        return (
            <div className="my-case-head clearfix">
                <div className="my-case-head-left">
                    <label>案件状态</label>
                    <Select className="my-case-head-select" defaultValue="" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="">全部</Option>
                        <Option value="0">待提交</Option>
                        <Option value="1">待审核</Option>
                        <Option value="2">立案失败</Option>
                        <Option value="3">待缴费</Option>
                        <Option value="4">答辩期</Option>
                        <Option value="5">审理期</Option>
                        <Option value="6">裁决期</Option>
                        <Option value="7">已结案</Option>
                        <Option value="8">补正期</Option>
                        <Option value="9">案件转线下</Option>
                        <Option value="10">和解中</Option>
                        <Option value="11">案件中止</Option>
                        <Option value="12">已撤案</Option>
                    </Select>
                    <Search
                        placeholder="搜索案号、被申请人、代理人"
                        style={{ width: 200 }}
                        onSearch={value => {this.searchCase(value)}}
                    />
                </div>
                <div className="my-case-head-right">
                    <Link to="/myCase/payment">查看缴费记录</Link>
                    <Button onClick={this.applyCase} type="primary" style={{"display":userInfo.role==1?"none":"inline-block"}}>申请立案</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    
  }
}
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    sendSelectValue: (action) => {
      dispatch(action);
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CaseHead)