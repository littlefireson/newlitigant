import {put,call,take} from 'redux-saga/effects';
import {customer,AJAX_SEND,tokenUpdate,tokenReset} from '../actions';
import ajax from '../utils/ajax';
/**
 * 抽象公共异步action转化成常用3总形式
 */
export default function* watchAjax() {
    while(true){
        const action = yield take(AJAX_SEND);
        const {config,success,failed,error} = action;
        if(action.loading){
            //todo
        }
        try{
            const response =yield call(ajax,config);

            const { auth, head, body }=response.data;
            if(auth.timeout){
                put(tokenReset());
            }
            if(auth.token && auth.token.length>0){
                put(tokenUpdate(auth.token));
            }
            if(head.retCode === '0000' && typeof success === 'function'){
                success(body,head.msg);
            }else{
                if(typeof failed === 'function'){
                    failed(head.msg)
                }else{
                    //todo
                }
            }
        }catch (e){
            //todo
            if(typeof error === 'function'){
                error(e);
            }
        }
    }
}