import axios from 'axios';
// import qs from 'qs
import {message} from "antd";
import baseURL from "./config"
import store from '../store';
import { shim } from 'promise.prototype.finally';
import cache from './cache';
shim();
const ajax = axios.create({
    baseURL,
});
// 添加请求拦截器
ajax.interceptors.request.use(function (config) {
    let {params} =config;
    let {token}=store.getState();
    params ={
        ...params,
        access_token:token 
    };
    return {
        ...config,
        params
    };
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
ajax.interceptors.response.use(function (response) {
    let { auth, head, body}=response.data;
    if(auth&&auth.timeout){
        // message.error('登录超时，请重新登录');
        location.hash = '#/login';
    }
    if(head == undefined){
        return response.data;
    }
    if(head.retCode=='0000'){
        return body;
    }
    else if(head.retCode=='9000'){
        if(cache.getItem('isAuth')){
            message.error(head.msg);
        }
        cache.clear('isAuth');
        return Promise.reject(head);
    }
    else{
        message.error(head.msg);
        return Promise.reject(head);
    }
}, function (error) {
    message.error('系统错误');
    return Promise.reject(error);
});
export {baseURL};
export default ajax;