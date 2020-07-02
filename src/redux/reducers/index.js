import { combineReducers } from 'redux';
import userReducer from './userReducer';
import formReducer from './formReducer';
import postReducer from './postReducer';

export default combineReducers({
    user: userReducer,
    form: formReducer,
    post: postReducer
})