import {SERVER_API_URL} from '../constants';
import {executeServerGetRequest, executeServerPostRequest} from './system';

export const saveUserMeetup = async (params) => {
    let url = SERVER_API_URL + 'meetup/save'

    const response = await executeServerPostRequest(url, params)
    return await response.json();
}

export const getUsersMeetups = async (params) => {
    let url = SERVER_API_URL + 'meetups/owner?uuid=' + params.uuid

    console.log(url)
    const response = await executeServerGetRequest(url)
    return await response.json();
}
