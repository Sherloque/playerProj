import {combineReducers} from 'redux';
import authReducer from './auth.reducer';
import chartReducer from './topchart.reducer';

export default combineReducers({
    auth:authReducer,
    chart:chartReducer

});