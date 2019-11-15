import { combineReducers } from 'redux'
import {token} from "./token";
import {userInfo} from './userInfo'
import {litigantType} from './litigantType'
import {message} from './message'
import {selectValue} from './selectValue'

const rootReducer = combineReducers({
    token,
    userInfo,
    litigantType,
    message,
    selectValue
});

export default rootReducer
