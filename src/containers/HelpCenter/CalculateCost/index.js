import React, {Component} from 'react'
import { Input, Button, message } from 'antd'
import CalculateCostBook from '../../../components/CalculateCostBook'
import ajax from '../../../utils/ajax'

export default class CalculateCost extends Component{
    state = {
        accept:0,
        deal:0,
        arbitration:0,
    };
    calc =()=>{

        const value = this.refs.money.value;
        ajax.post(`/arbitrator/calArbiAmt/${value}`).then((data)=>{
            console.log(data)
            let {admissibleAmount,arbitrationAmount,handleAmount} = data
            admissibleAmount = admissibleAmount.toFixed(2)*1;
            handleAmount = handleAmount.toFixed(2)*1;
            arbitrationAmount = arbitrationAmount.toFixed(2)*1;
            this.setState({
                accept:admissibleAmount,
                deal:handleAmount,
                arbitration:arbitrationAmount
            })
        })
        // if(/^\d{1,10}$/.test(value)){
        //      const {deal} = this.state;
        //      let m = parseInt(this.refs.money.value);
        //      let  lv1=40,
        //          lv2=(40 + (m-1000)*0.04).toFixed(2)*1,
        //          lv3=(2000 + (m-50000)*0.03).toFixed(2)*1,
        //          lv4=(3500 + (m-100000)*0.02).toFixed(2)*1,
        //          lv5=(5500 + (m-200000)*0.01).toFixed(2)*1,
        //          lv6=(8500 + (m-500000)*0.005).toFixed(2)*1,
        //          lv7=(11000 + (m-1000000)*0.0025).toFixed(2)*1;
         
        //      m<1000 && this.setState({accept:lv1,arbitration:lv1 + deal});
        //      (m>=1000 && m<=50000) && this.setState({accept:lv2,arbitration:lv2 + deal});
        //      (m>50000 && m<=100000) && this.setState({accept:lv3,arbitration:lv3 + deal});
        //      (m>100000 && m<=200000) && this.setState({accept:lv4,arbitration:lv4 + deal});
        //      (m>200000 && m<=500000) && this.setState({accept:lv5,arbitration:lv5 + deal});
        //      (m>500000 && m<=1000000) && this.setState({accept:lv6,arbitration:lv6 + deal});
        //      m>1000000 && this.setState({accept:lv7,arbitration:lv7 + deal});
        // }else{
        //      message.error('请输入正确的金额')
        // }
        
    }
    render(){
        const {accept,deal,arbitration,calculateCostHtml} = this.state;
        return (
            <div className="help-center-content ant-col-20">
                <div className="help-center-content-main calculate-cost">
                    <h2 className="calculate-cost-title">
                        费用快算
                    </h2>
                    <div className="calculate-cost-content">
                        <p>
                            <label className="label-amt">争议金额</label>
                            <input type="text" className="ant-input" placeholder="请输入争议金额" ref="money"/>
                            <Button type="primary" onClick={this.calc}>提交</Button>
                        </p>
                        <p>
                            <label>受理费：</label><span>{accept || '--'} 元</span>
                            <label>处理费：</label><span>{deal || '--'} 元</span>
                            <label>仲裁费：</label><span>{arbitration || '--'} 元</span>
                        </p>
                        <i className="tips">（以上计算结果如与本会立案室办公管理系统计算结果存在差异，以立案室的计算为准。详情请咨询：010-56236251  ）</i>
                    </div>
                    <div className="calculate-cost-table">
                        <CalculateCostBook />
                    </div>
                </div>
            </div>
        )
    }
}
