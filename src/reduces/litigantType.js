import cache from '../utils/cache';
const initState = cache.getItem('litigantType') || '';

//操作人身份 0申请人 1被申请人 3代理申请人 4代理被申请人
export const litigantType = (state=initState,action)=>{
    switch (action.type){
        case 'litigantType_update':
            cache.setItem('litigantType',action.payload);
            return action.payload;
        default:
            return state;
    }
};
