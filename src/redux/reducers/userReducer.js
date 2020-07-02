import {
    START_LOGIN_USER,
    SUCCESS_LOGIN_USER,
    ERROR_LOGIN_USER,
    START_CHECK_USER,
    SUCCESS_CHECK_USER,
    ERROR_CHECK_USER,
    START_LOGOUT_USER,
    START_CREATE_USER,
    ERROR_CREATE_USER,
    SUCCESS_CREATE_USER,
} from '../types/user';

const initialState = {
    user: {},
    error: false,
    msg: null,
    loading: false
};

function userReducer(state = initialState, action) {
    switch (action.type) {
        case START_CREATE_USER:
        case START_CHECK_USER:
        case START_LOGIN_USER:
            return {
                ...state,
                loading: true
            };
        case SUCCESS_LOGIN_USER:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', action.payload.user.name);
            return {
                ...state,
                loading: false,
                error: false,
                user: action.payload.user,
                msg: null
            };
        case SUCCESS_CREATE_USER:
            return {
                ...state,
                error: false,
                loading: false,
                msg: action.payload.msg,
            }
        case ERROR_CREATE_USER:
        case ERROR_LOGIN_USER:
            return {
                ...state,
                loading: false,
                error: true,
                msg: action.payload.err
            };
        case SUCCESS_CHECK_USER:
            return {
                ...state,
                user: action.payload.user
            };
        case START_LOGOUT_USER:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return initialState;
        case ERROR_CHECK_USER:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                ...state,
                user: {},
                error: true,
                msg: action.payload.err
            };
        default:
            return {...state }
    }
};

export default userReducer;