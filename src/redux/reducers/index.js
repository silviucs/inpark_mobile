import {combineReducers} from "redux";
import loginReducer from './login';
import feedReducer from './feed';
import userReducer from './user';
import uploadReducer from './upload';
import systemReducer from './system';

export default combineReducers({
    loginReducer: loginReducer,
    feedReducer: feedReducer,
    userReducer: userReducer,
    uploadReducer: uploadReducer,
    systemReducer: systemReducer
})
