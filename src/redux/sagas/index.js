import { put, takeLatest, call } from 'redux-saga/effects';
import { validateEmail, isFileImage } from './helpers';
import {
    START_LOGIN_USER,
    SUCCESS_LOGIN_USER,
    ERROR_LOGIN_USER,
    START_CREATE_USER,
    SUCCESS_CREATE_USER,
    ERROR_CREATE_USER,
    START_CHECK_USER,
    SUCCESS_CHECK_USER,
    ERROR_CHECK_USER
} from '../types/user';
import {
    START_VALIDATE_FORM,
    SUCCESS_VALIDATE_FORM,
    ERROR_VALIDATE_FORM
} from '../types/form';

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
} from '../types/post'

import { apiCall } from '../index';

/* ========= USER ========= */

function* loginUser({ payload }) {
    try {
        const { response, error } = yield call(apiCall, 'api/login', 'POST', payload);
        if (response.ok) {
            yield put({ type: SUCCESS_LOGIN_USER, payload: response });
        } else {
            yield put({ type: ERROR_LOGIN_USER, payload: response });
        }
    } catch (e) {
        yield put({ type: ERROR_LOGIN_USER, payload: { err: `Ocurrio un error: ${e}`, error: true } });
    }
}

function* createUser({ payload }) {
    try {
        const { response, error } = yield call(apiCall, 'api/user', 'POST', payload);
        if (response.ok) {
            yield put({ type: SUCCESS_CREATE_USER, payload: response });
        } else {
            yield put({ type: ERROR_CREATE_USER, payload: response });
        }
    } catch (e) {
        yield put({ type: ERROR_CREATE_USER, payload: { err: `Ocurrio un error: ${e}`, error: true } });
    }
}

function* checkUser() {
    try {
        const { response, error } = yield call(apiCall, 'api/user/check', 'GET', null, {auth:true});
        if (response.ok) {
            yield put({ type: SUCCESS_CHECK_USER, payload: response });
        } else {
            yield put({ type: ERROR_CHECK_USER, payload: response });
        }
    } catch (e) {
        yield put({ type: ERROR_CHECK_USER, payload: { err: `Ocurrio un error: ${e}`, error: true } });
    }
}

/* ========= FORM ========= */
function* validateForm({ payload }) {
    let error = false;
    const fields = payload.map((field) => {
        if (field.required) {
            if (field.value.trim() === "") {
                field.error = true;
                field.msg = "Este campo es obligatorio"
                error = true
                return field;
            }
        }
        if (field.type != null) {
            switch (field.type) {
                case 'email':
                    if (!validateEmail(field.value)) {
                        field.error = true;
                        field.msg = "Debes ingresar un correo electronico"
                        error = true
                    }
                    break;
                case 'file':
                    if(field.value.size > 0){
                        if (!isFileImage(field.value)){
                            field.error = true;
                            field.msg = "Debes ingresar una imagen"
                            error = true
                        }
                    }else{
                        if(field.requiredFile){
                            field.error = true;
                            field.msg = "Este campo es obligatorio"
                            error = true
                        }
                    }
                    break;
                default:
                    break;
            } 
            return field;
        }
        return field;
    });

    if (error)
        yield put({ type: ERROR_VALIDATE_FORM, payload: { fields, isValid: false } });
    else
        yield put({ type: SUCCESS_VALIDATE_FORM, payload: { isValid: true } });
}

/* ========= POST ========= */

function* getPosts({payload}) {
    try {
        const { response } = yield call(apiCall, `api/post?from=${payload.from}`, 'GET', null, {auth:true});
        if (response.ok) {
            yield put({ type: SUCCESS_GET_POSTS, payload: response });
        } else {
            if (!response.auth)
                yield put({ type: ERROR_CHECK_USER, payload: response });
            else
                yield put({ type: ERROR_GET_POSTS, payload: response });
        }
    } catch (e) {
        yield put({ type: ERROR_GET_POSTS, payload: { err: `Ocurrio un error: ${e}`, error: true } });
    }
}

function* createPost({payload}) {
    try {
        const { response } = yield call(apiCall, 'api/post', 'POST', payload, {auth:true,file:true});
        if (response.ok) {
            yield put({ type: SUCCESS_CREATE_POSTS, payload: response });
        } else {
            if (response.auth.length > 0 && !response.auth)
                yield put({ type: ERROR_CHECK_USER, payload: response });
            else
                yield put({ type: ERROR_CREATE_POSTS, payload: response });
        }
    } catch (e) {
        yield put({ type: ERROR_CREATE_POSTS, payload: { err: `Ocurrio un error: ${e}`, error: true } });
    }
}

function* deletePosts({payload}) {
    try {
        const { response } = yield call(apiCall, `api/post/${payload}`, 'DELETE', null, {auth:true});
        if (response.ok) {
            yield put({ type: SUCCESS_DELETE_POSTS, payload: response });
        } else {
            if (!response.auth)
                yield put({ type: ERROR_CHECK_USER, payload: response });
            else
                yield put({ type: ERROR_DELETE_POSTS, payload: response });
        }
    } catch (e) {
        yield put({ type: ERROR_DELETE_POSTS, payload: { err: `Ocurrio un error: ${e}`, error: true } });
    }
}

export default function* userSaga() {
    yield takeLatest(START_LOGIN_USER, loginUser);
    yield takeLatest(START_CREATE_USER, createUser);
    yield takeLatest(START_VALIDATE_FORM, validateForm);
    yield takeLatest(START_CHECK_USER, checkUser);
    yield takeLatest(START_GET_POSTS, getPosts);
    yield takeLatest(START_CREATE_POSTS, createPost);
    yield takeLatest(START_DELETE_POSTS, deletePosts);
}