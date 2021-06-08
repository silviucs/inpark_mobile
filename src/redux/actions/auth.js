import {SAVE_LOGIN_STATE} from '../types/types';

export const saveLoginState = ({ prop, value }) => {
    return {
        type: SAVE_LOGIN_STATE,
        payload: { prop, value }
    };
};
