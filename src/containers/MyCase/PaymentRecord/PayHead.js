import React, {Component} from 'react'
import { Select, Icon, Input, DatePicker } from 'antd'
const Option = Select.Option;
const Search = Input.Search;

export default class PayHead extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        };
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value) => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };

    searchPay=(value)=>{
        let {startValue,endValue} = this.state;
        const {getSources} = this.props;
        if(startValue!=null&&endValue!=null){
            startValue = new Date(startValue).getTime();
            endValue = new Date(endValue).getTime();
        }
        getSources(1,8,startValue,endValue,value);
    }

    render(){
        const { startValue, endValue, endOpen } = this.state;
        return (
            <div className="my-case-head clearfix">
                <div className="my-case-head-left">
                    <label>缴费时间</label>
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={startValue}
                        placeholder="请选择时间"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                    />
                    <span className="time-to">至</span>
                    <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={endValue}
                        placeholder="请选择时间"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                    />
                </div>
                <div className="my-case-head-right">
                    <Search
                        placeholder="搜索案号、被申请人、代理人"
                        style={{ width: 200 }}
                        onSearch={(value)=>{this.searchPay(value)}}
                    />
                </div>
            </div>
        )
    }
}