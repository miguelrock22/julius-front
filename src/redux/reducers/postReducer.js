import {
    START_GET_POSTS,
    SUCCESS_GET_POSTS,
    ERROR_GET_POSTS
} from '../types/post';

const initialState = {
    posts: [],
    error: false,
    msg: null,
    loading: false
};

function postReducer(state = initialState, action) {
    switch (action.type) {
        case START_GET_POSTS:
            return {
                ...state,
                loading: true
            }
        case SUCCESS_GET_POSTS:
            return {
                ...state,
                posts: action.payload.postsDb,
                loading: false,
                error: false
            }
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