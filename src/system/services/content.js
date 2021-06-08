import {SERVER_API_URL} from '../../system/constants'
import {ENDPOINT_GET_STATIC_PAGE_CONTENT, ENDPOINT_GET_STATIC_PAGES} from "../../system/constants/content";

export const getStaticPages = async () => {
    let url = SERVER_API_URL + ENDPOINT_GET_STATIC_PAGES;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).catch((error) => {
        console.log(error);
    });

    const responseJson = await response.json();
    return responseJson['pages'];
};

export const getStaticPageDetails = async (slug) => {
    let url = SERVER_API_URL + ENDPOINT_GET_STATIC_PAGE_CONTENT + slug;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).catch((error) => {
        console.log(error);
    });

    const responseJson = await response.json();
    return responseJson['page'];
};
