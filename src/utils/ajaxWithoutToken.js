import axios from 'axios';
import {message} from "antd";
import baseURL from "./config";
const ajax = axios.create({
    baseURL,
});
ajax.interceptors.response.use(function (response) {
    let { auth, head, body}=response.data;
    if(head.retCode=='0000'){
        return body;
    }else{
        message.error(head.msg,5);
        return Promise.reject(head);
    }
}, function (error) {
    console.dir(error)
    message.error('系统错误',5);
    return Promise.reject(error);
});
export {baseURL};
export default ajax;