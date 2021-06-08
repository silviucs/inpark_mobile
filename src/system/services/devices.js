import React from 'react';

import {SERVER_API_URL,} from '../constants'

export const sendDevice = async (deviceId) => {
    let url = SERVER_API_URL + 'devices/add';

    console.log(url);

    const params = {
        userId: deviceId
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    }).catch((error) => {
        console.log(error);
    });

    return await response.json();
};
