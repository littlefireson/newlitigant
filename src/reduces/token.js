import cache from '../utils/cache';
const initState = cache.getItem('token') || '';
export const token = (state=initState,action)=>{
    switch (action.type){
        case 'token_update':
            cache.setItem('token',action.payload);
            return action.payload;
        case 'token_reset':
            cache.removeItem('token');
            return '';
        default:
            return state;
    }
};
