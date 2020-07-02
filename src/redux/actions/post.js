import { START_GET_POSTS } from '../types/post';

export const getPosts = () => {
    return {
        type: START_GET_POSTS
    }
};