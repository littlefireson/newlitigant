import cache from '../utils/cache';
const initState = cache.getItem('userInfo')?JSON.parse(cache.getItem('userInfo')):{};
export const userInfo = (state=initState,action)=>{
    switch (action.type){
        case 'user_change':
            cache.setItem('userInfo',JSON.stringify(action.payload));
            return {
                ...action.payload
            };
        default:
            return state;
    }
};
