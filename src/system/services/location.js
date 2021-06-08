
import {executeServerPostRequest} from './system';
import {ENDPOINT_SEARCH_GEOCODING, SERVER_API_URL} from '../constants';

export const updateUserLocation = async (params) => {
    let url = SERVER_API_URL + 'location/save'

    const response = await executeServerPostRequest(url, params)
    return await response.json();
}

export const checkLocationWeather = async (params) => {
    let url = SERVER_API_URL + 'location/weather'

    const response = await executeServerPostRequest(url, params)
    return await response.json();
}

export const searchGeocoding = async (query) => {
    const url = SERVER_API_URL + ENDPOINT_SEARCH_GEOCODING;

    const params = {
        query: query
    }

    const response = await executeServerPostRequest(url, params)
    return await response.json();

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-PHTP-Authorization': APP_AUTHORIZATION_TOKEN,
            },
            body: JSON.stringify(params),
        }).catch((error) => {
            console.log(error);
        });

        const responseJson = await response.json();
        return responseJson;
    }catch (e) {
        console.log(e.toString());
    }
}
