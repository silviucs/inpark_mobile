import {SERVER_API_URL} from '../constants';
import {executeServerGetRequest, executeServerPostRequest, getDeviceId} from './system';

export const getUserDetails = async (params) => {
    let url = SERVER_API_URL + 'profile/details?uuid=' + params.uuid

    const response = await executeServerGetRequest(url)
    return await response.json();
}

export const updateUserDetails = async (params) => {
    let url = SERVER_API_URL + 'profile/details'

    const deviceId = await getDeviceId();
    params.device_id = deviceId;

    const response = await executeServerPostRequest(url, params)
    return await response.json();
}
