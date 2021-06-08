import {SAVE_SYSTEM_VARIABLE} from '../types/types';

export const saveSystemVariable = ({prop, value}) => {
    return{
        type: SAVE_SYSTEM_VARIABLE,
        payload: {prop, value}
    }
}
