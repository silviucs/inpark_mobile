import {SERVER_API_URL} from '../constants';
import {executeServerGetRequest, executeServerPostRequest, getDeviceId} from './system';

export const acceptFriendInvite = async (params) => {
    let url = SERVER_API_URL + 'friends/invite/accept'

    const deviceId = await getDeviceId();
    params.device_id = deviceId;

    const response = await executeServerPostRequest(url, params)
    return await response.json();
}

export const getProfileFriends = async (params) => {
    let url = SERVER_API_URL + 'profile/friends?profile_uuid=' + params.profile_uuid

    const response = await executeServerGetRequest(url)
    return await response.json();
}
