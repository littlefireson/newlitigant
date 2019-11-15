import cache from '../utils/cache';
const initState = cache.getItem('messageNum')?cache.getItem('messageNum'):0;
export const message = (state=initState,action)=>{
    switch (action.type){
        case 'message':
            cache.setItem('messageNum',);
            return action.payload;
        default:
            return state;
    }
};