import { START_LOGIN_USER, START_CREATE_USER, START_CHECK_USER, START_LOGOUT_USER } from '../types/user';

export const loginUser = (payload) => {
    return {
        type: START_LOGIN_USER,
        payload
    }
};

export const createUser = (payload) => {
    return {
        type: START_CREATE_USER,
        payload
    }
};

export const checkUser = () => {
    return {
        type: START_CHECK_USER
    }
};

export const logout = () => {
    return {
        type: START_LOGOUT_USER
    }
};