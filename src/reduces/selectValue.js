
const initState = {
  payload: {}
};
export const selectValue = (state=initState,action)=>{
    switch (action.type){
        case 'case_head_select_value':
            return [action.selectValue,action.value]
        default:
            return state;
    }
};