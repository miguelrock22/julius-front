import { START_GET_POSTS, START_CREATE_POSTS, START_DELETE_POSTS } from '../types/post';

export const getPosts = (payload) => {
    return {
        type: START_GET_POSTS,
        payload
    }
};

export const createPosts = (payload) => {
    return {
        type: START_CREATE_POSTS,
        payload
    }
};

export const deletePosts = (payload) => {
    return {
        type: START_DELETE_POSTS,
        payload
    }
};