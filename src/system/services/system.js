import {APP_PLATFORM_KEY, ENDPOINT_TOKEN, LOCALISR_TOKEN, SERVER_API_URL} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {sendDevice} from './devices';
// import {sendDevice} from './devices';

export const getPlatformToken = async (deviceId) => {
    let url = SERVER_API_URL + ENDPOINT_TOKEN;

    const params = {
        device_id: deviceId
    }
    console.log(url);
    console.log(params);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SKS-Authorization': APP_PLATFORM_KEY,
        },
        body: JSON.stringify(params)
    }).catch((error) => {
        console.log(error);
    });

    const responseJson = await response.json();

    console.log(responseJson);
    return responseJson;
};

export const setPlatformToken = async (token) => {
    await AsyncStorage.setItem('platformToken', token);
}

export const setDeviceId = async (deviceId) => {
    console.log(deviceId);
    await AsyncStorage.setItem('deviceId', deviceId);
}

export const getDeviceId = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("deviceId")
            .then(res => {
                if (res !== null) {
                    resolve(res);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    })
}

export const hasPlatformToken = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("platformToken")
            .then(res => {
                if (res !== null) {
                    resolve(res);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    })
}

export const getAPIPlatformToken = async (deviceId) => {
    const token = await getPlatformToken(deviceId);
    console.log(token);
    // if(!token) {
    let url = SERVER_API_URL + ENDPOINT_TOKEN;

    const params = {
        device_id: deviceId,
        type: 'long',
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SKS-Authorization': APP_PLATFORM_KEY,
        },
        body: JSON.stringify(params),
    }).catch((error) => {
        console.log(error);
    });
    const responseJson = await response.json();
    return responseJson.token.token;
    // }

    // return token;
};

export const generatePlatformToken = async (device) => {
    // send device to server and get token

    // const token = await getAPIPlatformToken(device.userId);
    // await setPlatformToken(token);

    sendDevice(device.userId).then((response) => {
        // this.setState({loading: false});
    }).catch((error) => {
        console.log(error);
        Alert.alert('API error', 'Something went wrong. Please try again later!');
        return false;
    });
};

export const executeServerPostRequest = async (url, params) => {
    const deviceId = await getDeviceId();

    const token = await hasPlatformToken();

    console.log(APP_PLATFORM_KEY);
    console.log(token);
    console.log(deviceId);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SKS-Authorization': APP_PLATFORM_KEY,
            'X-SKS-Token': token,
            'X-SKS-Device': deviceId
        },
        body: JSON.stringify(params),
    }).catch((error) => {
        console.log(error);
    });

    return response;
}

export const executeServerGetRequest = async (url) => {
    const deviceId = await getDeviceId();

    const token = await hasPlatformToken();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SKS-Authorization': APP_PLATFORM_KEY,
            'X-SKS-Token': token,
            'X-SKS-Device': deviceId
        },
    }).catch((error) => {
        console.log(error);
    });

    return response;
}

export const executeServerRequest = async (method, url) => {
    const deviceId = await getDeviceId();

    const token = await hasPlatformToken();

    const response = await fetch(url, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-SKS-Authorization': APP_PLATFORM_KEY,
            'X-SKS-Token': token,
            'X-SKS-Device': deviceId
        },
    }).catch((error) => {
        console.log(error);
    });

    return response;
}

export const getSystemTranslations = async (language) => {
    // const url = 'https://api.localisr.com/v1/' + language;
    const url = 'https://api.localisr.com/v1/en';

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + LOCALISR_TOKEN,
        },
    }).catch((error) => {
        console.log(error);
    });

    return response
}

export const getTranslationForLabel = (label, labels) => {
    const index = labels.findIndex(item => item.label === label);

    if (index !== -1) {
        return labels[index].translations[0].translation_body;
    }

    return 'translation not found';
}

export const plural = (singular, plural, number) => {
    return number == 1 ? singular : plural;
}
