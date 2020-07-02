import {
    START_VALIDATE_FORM,
    SUCCESS_VALIDATE_FORM,
    ERROR_VALIDATE_FORM
} from '../types/form';

const initialState = {
    fields: {},
    isValid: false,
};

function formReducer(state = initialState, action) {
    switch (action.type) {
        case START_VALIDATE_FORM:
            return {
                ...state
            };
        case SUCCESS_VALIDATE_FORM:
            return {
                ...state,
                fields: {},
                isValid: true
            };
        case ERROR_VALIDATE_FORM:
            return {
                ...state,
                fields: action.payload.fields,
                isValid: false
            };
        default:
            return {...state }
    }
};

export default formReducer;