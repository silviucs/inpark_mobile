import {
    API_URL,
    APP_AUTHORIZATION_TOKEN,
    ENDPOINT_LOGIN,
    ENDPOINT_LOGOUT,
    ENDPOINT_SEND_GENERATE_RESET_PASSWORD_CODE,
    ENDPOINT_SEND_GENERATE_VALIDATION_CODE,
    ENDPOINT_SEND_REGISTRATION_DETAILS,
    SERVER_API_URL,
} from '../constants';
import {executeServerPostRequest, getDeviceId} from './system';

export const doLogin = async (login, password) => {
    const url = SERVER_API_URL + ENDPOINT_LOGIN;

    const params = {
        username: login,
        password: password,
    };

    const deviceId = await getDeviceId();

    params.device_id = deviceId;

    const response = executeServerPostRequest(url, params);
    return response;

};

export const doLogout = async () => {
    const url = SERVER_API_URL + ENDPOINT_LOGOUT;

    const deviceId = await getDeviceId();

    const params = {
        device_id: deviceId
    };

    const response = executeServerPostRequest(url, params);
    return response;

};

export const sendGenerateValidationCodeRequest = async (params) => {
    let url = SERVER_API_URL + ENDPOINT_SEND_GENERATE_VALIDATION_CODE;

    const deviceId = await getDeviceId();

    params.device_id = deviceId;

    const response = executeServerPostRequest(url, params);
    return response;
}

export const sendGenerateResetPasswordCodeRequest = async (params) => {
    let url = SERVER_API_URL + ENDPOINT_SEND_GENERATE_RESET_PASSWORD_CODE;

    const deviceId = await getDeviceId();

    params.device_id = deviceId;

    const response = executeServerPostRequest(url, params);
    return response;
}

export const sendResetPasswordRequest = async (params) => {
    let url = SERVER_API_URL + ENDPOINT_SEND_GENERATE_RESET_PASSWORD;

    const deviceId = await getDeviceId();

    params.device_id = deviceId;

    const response = executeServerPostRequest(url, params);
    return response;
}

export const sendRegistrationDetails = async (params) => {
    let url = API_URL + ENDPOINT_SEND_REGISTRATION_DETAILS;

    const deviceId = await getDeviceId();

    params.device_id = deviceId;

    const response = executeServerPostRequest(url, params);
    return response;
};

export const sendSocialUserRegistration = async (params) => {
    let url = API_URL + ENDPOINT_SEND_REGISTRATION_DETAILS;

    console.log(url);

    const deviceId = await getDeviceId();

    params.device_id = deviceId;

    const response = executeServerPostRequest(url, params);
    return response;
};
