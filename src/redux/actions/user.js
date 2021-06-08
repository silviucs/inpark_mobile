import {SAVE_PROFILE} from './types';

export const savePublicProfile = ({prop, value}) => {
    return {
        type: SAVE_PROFILE,
        payload: {prop, value},
    };
};
