import React,{Component} from 'react';
import ajax from '../../utils/ajax'; 
 
export default class CalculateCostBook extends Component{
    state = {
        calculateCostHtml:""
    };
    componentDidMount(){
        ajax.get('/arbitrator/getArbiAmtCalHtml').then((data)=>{
            this.setState({
                calculateCostHtml:data
            })
        })
    }
    render(){
        const {calculateCostHtml} = this.state;
        return  <div dangerouslySetInnerHTML = {{__html:calculateCostHtml}}></div>
    } 
}