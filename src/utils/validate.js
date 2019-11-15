/***
 *
 * @param validateType 验证的类型
 * @param rules 新增的验证规则
 * @param errorTip 新增的错误提示
 * @param nullTip 新增的为空提示
 * @returns {Function} 返回一个加工好的验证方法 接受values对象用之前配置的验证规则来验证
 */
export default function validate({validateType={},rules={},errorTip={},nullTip={}}){
    let defaultPattern={
        "*": /[\w\W]+/,
        "*6-16": /^[\w\W]{6,16}$/,
        "*1-150": /^[\w\W]{1,150}$/,
        "n": /^\d+$/,
        "num": /^[0-9]*([.]{1}[0-9]{1,2})?$/,
        "n6-16": /^\d{6,16}$/,
        "s": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
        "s6-18": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{6,18}$/,
        "p": /^[0-9]{6}$/,
        "m": /^1[0-9]{10}$/,
        "e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/,
        "name":/^([\u4E00-\u9FA5]{2,12})$/,
        "msgcode": /^(\d{6})$/,
        "bank":/^[0-9]{16,19}$/,
        "pwd":/^[0-9a-zA-Z]{6,20}$/,
        "idcard": function (value, values) {
            //该方法由佚名网友提供;
            var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子;
            var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值，10代表X;

            if (value.length == 15) {
                return isValidityBrithBy15IdCard(value);
            } else if (value.length == 18) {
                var a_idCard = value.split(""); // 得到身份证数组
                if (isValidityBrithBy18IdCard(value) && isTrueValidateCodeBy18IdCard(a_idCard)) {
                    return true;
                }
                return false;
            }
            return false;

            function isTrueValidateCodeBy18IdCard(a_idCard) {
                var sum = 0; // 声明加权求和变量
                if (a_idCard[17].toLowerCase() == 'x') {
                    a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
                }
                for (var i = 0; i < 17; i++) {
                    sum += Wi[i] * a_idCard[i]; // 加权求和
                }
                var valCodePosition = sum % 11; // 得到验证码所位置
                if (a_idCard[17] == ValideCode[valCodePosition]) {
                    return true;
                }
                return false;
            }
            function isValidityBrithBy18IdCard(idCard18) {
                var year = idCard18.substring(6, 10);
                var month = idCard18.substring(10, 12);
                var day = idCard18.substring(12, 14);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day), 1, 0, 0);

                // 这里用getFullYear()获取年份，避免千年虫问题
                if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                    return false;
                }
                return true;
            }

            function isValidityBrithBy15IdCard(idCard15) {
                var year = idCard15.substring(6, 8);
                var month = idCard15.substring(8, 10);
                var day = idCard15.substring(10, 12);
                var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
                if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                    return false;
                }
                return true;
            }
        }
    };
    let defaultNullTip ={
        "def":"数据不能为空",
    };
    let defaultErrorTip={
        "*": "不能为空",
        "*6-16": "请填写6到16位任意字符",
        "*1-150": "请填写1到150位任意字符",
        "n": "请填写数字",
        "num": "请填写非负整数或小数并保留小数点后两位",
        "n6-16": "请填写6到16位数字",
        "s": "不能输入特殊字符",
        "s6-18": "请填写6到18位字符",
        "p": "请填写邮政编码",
        "m": "手机号输入有误",
        "e": "邮箱地址输入有误",
        "url": "网址输入有误",
        "idcard":"身份证号输入有误",
        "name": "姓名格式为2-10位的汉字",
        "msgcode":"短信验证码输入有误",
        "bank": "银行卡号输入有误",
        "pwd":"密码格式为6-20位字符，不支持特殊字符",
        "def":'请填写正确信息'
    };
    const _pattern=Object.assign({},defaultPattern,rules);
    const _errorTip=Object.assign({},defaultErrorTip,errorTip);
    const _nullTip=Object.assign({},defaultNullTip,nullTip);
    const scheme=validateType;

    function check(rule,key,values,error){
        const ruleType = _pattern[rule] || ((typeof rule === 'function')? rule:/[\w\W]+/);
        const _check = (ruleType.test && ruleType.test.bind(ruleType)) || ruleType;
        let flag = _check(values[key],values);
        if(flag === true) return true;
        if(flag === false){
            error[key] = _errorTip[rule] || _errorTip.def;
        }else{
            error[key] = flag
        }
        return false;
    }
    return function(values){
        let error = {};
        let _keys = Object.keys(scheme);
        if(_keys.length<=0) return false;
        _keys.forEach((key)=>{
            let rules =scheme[key];
            if(!values[key]){
                if(!(rules.indexOf('ignore')!== -1)){
                    error[key] = _nullTip[key] || _nullTip.def ;
                };
            }else{
                switch (Object.prototype.toString.call(rules)){
                    case '[object String]':
                    case '[object Function]':
                        check(rules,key,values,error);
                        break;
                    case '[object Array]':
                        rules.every((rule)=>check(rule,key,values,error));
                        break;
                }
            }
        });
        let errorArry = Object.keys(error);
        if(errorArry.length>0){
            error._error = error[errorArry[0]]
        }
        return  error;
    }
}