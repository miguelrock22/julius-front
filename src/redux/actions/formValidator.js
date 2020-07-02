import { START_VALIDATE_FORM } from '../types/form';

export const validateForm = (payload) => {
    return {
        type: START_VALIDATE_FORM,
        payload
    }
};