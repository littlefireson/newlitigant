import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {Icon} from 'antd'
import PropTypes from 'prop-types'
class TimeTip extends Component{
    constructor(props){
        super(props);
        this.state={
            currentTime:Date.now(),
            endTime:Date.now()+parseInt(props.duringTime),
            countdown:' 0天 0时 0分 0秒 ',
        }
        this.getTime();
    }
    getTime=()=>{
        this.timer=setInterval(()=>{
            const {currentTime,endTime}=this.state;
            const leftTime=new Date(new Date(endTime)-new Date(currentTime)).getTime();
            if(leftTime>0){
                const days = parseInt(leftTime / 1000 / 60 / 60 / 24),
                    hours = parseInt(leftTime / 1000 / 60 / 60 % 24),
                    minutes = parseInt(leftTime / 1000 / 60 % 60),
                    seconds = parseInt(leftTime / 1000 % 60);
                this.setState((prevState, props)=>({
                    currentTime:1000+new Date(prevState.currentTime).getTime(),
                    countdown:`${days}天 ${hours}时 ${minutes}分 ${seconds}秒`
                }))
            }else{
                this.setState({
                    countdown:' 0天 0时 0分 0秒 ',
                });
                clearInterval(this.timer)
            }

        },1000)
    }
    componentWillUnmount(){
       this.timer && clearInterval(this.timer);
    }
    render(){
        const {title,msg,to} = this.props;
        const {countdown} = this.state;
        return(<div className="time-tip">
            <Icon type="clock-circle-o" style={{ fontSize: 14, color: '#FBDA77' }}/>
            <article>
                <h3>{title}</h3>
                <time>{countdown}</time>
                {msg && (<em>{msg}</em>)}
                {to && (<Link className="fr" to={to}>处理></Link>)}
            </article>
        </div>)
    }
}
TimeTip.propTypes={
    duringTime:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}
export default TimeTip;