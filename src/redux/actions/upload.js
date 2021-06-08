import {SAVE_UPLOAD_SELECTED_IMAGE} from './types';

export const saveUploadSelectImage = ({prop, value}) => {
    return {
        type: SAVE_UPLOAD_SELECTED_IMAGE,
        payload: {prop, value},
    };
};
