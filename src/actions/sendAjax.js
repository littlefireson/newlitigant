export const AJAX_SEND = "ajax_send";
// export const AJAX_SUCCESS = "ajax_success";
// export const AJAX_FAILED = "ajax_failed";
// export const AJAX_ERROR = "ajax_error";
/***
 * 配置action参考
 * @param loading 是否需要加载中动画
 * @param config 具体的ajax请求配置
 * @param success ajax成功处理回调
 * @param failed ajax失败处理回调
 * @param error ajax错误处理回调
 * @returns {{type: string, loading: *, config: {}, success: *, failed: *}}
 */
export const ajaxSend=({loading=true,config={},success,failed,error})=>{
    return{
        type:AJAX_SEND,
        loading,
        config,
        success,
        failed,
        error
    }
}