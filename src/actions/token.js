const TOKEN_UPDATE='token_update';
const TOKEN_RESET='token_reset';
export const tokenUpdate =(payload)=>({
    type:TOKEN_UPDATE,
    payload
});
export const tokenReset = ()=>({
    type:TOKEN_RESET
});