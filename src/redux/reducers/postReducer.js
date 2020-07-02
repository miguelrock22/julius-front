import {
    START_GET_POSTS,
    SUCCESS_GET_POSTS,
    ERROR_GET_POSTS,
    START_CREATE_POSTS,
    SUCCESS_CREATE_POSTS,
    ERROR_CREATE_POSTS,
    START_DELETE_POSTS,
    SUCCESS_DELETE_POSTS,
    ERROR_DELETE_POSTS
} from '../types/post';

const initialState = {
    posts: [],
    count: null,
    error: false,
    msg: null,
    loading: false
};

function postReducer(state = initialState, action) {
    switch (action.type) {
        case START_CREATE_POSTS:
        case START_GET_POSTS:
        case START_DELETE_POSTS:
            return {
                ...state,
                loading: true
            }
        case SUCCESS_GET_POSTS:
            return {
                ...state,
                posts: action.payload.postsDb,
                count: action.payload.count,
                loading: false,
                error: false
            }
        case SUCCESS_DELETE_POSTS:
        case SUCCESS_CREATE_POSTS: 
            return {
                ...state,
                loading: false,
                error: false,
                msg:action.payload.msg
            }
        case ERROR_DELETE_POSTS:
        case ERROR_CREATE_POSTS:
        case ERROR_GET_POSTS:
            return {
                ...state,
                loading: false,
                error: true,
                msg: action.payload.err
            }
        default:
            return {...state }
    }
};

export default postReducer;