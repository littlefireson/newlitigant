import React, {Component} from 'react'
import {Button} from 'antd';

export default class TimeBtn extends Component{
    constructor(props){
        super(props);
        this.state={
            innerText:props.txt,
            disable:false
        }
    };

    timer=()=>{
        const {thisTime} = this.props;
        const _this = this;
        if(interval) clearInterval(interval);
        let times = thisTime;
        let interval = setInterval(function(){
            _this.setState({
                innerText:times+'秒后重发',
                disable:true
            });
            if(times===0){
                clearInterval(interval);
                _this.setState({
                    innerText:'重发获取验证码',
                    disable:false
                })
            }
            times--;
        },1000)
    };

    changeDisableCode=(text)=>{
        this.setState({
            innerText:text,
            disable:true
        });
    };

    changeAbleCode=(text)=>{
        this.setState({
            innerText:text,
            disable:false
        });
    };

    componentDidMount(){
        const {hasSend} = this.props;
        if(hasSend){
            this.timer();
        }
    };

    render(){
        const {thisClass,thisClick} = this.props;
        const {innerText,disable} = this.state;
        return(
            <Button size="large" disabled={disable} className={thisClass} onClick={thisClick}>{innerText}</Button>
        )
    }
}