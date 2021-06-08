import {Alert, Linking, Platform} from "react-native";
import {
    ENDPOINT_SEND_CONTACT_EMAIL,
    ENDPOINT_SEND_FEEDBACK_EMAIL,
    SERVER_API_URL
} from "../../system/constants";

export const callPhoneNumber = () => {
    const phone = '00447493559855';
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    } else {
        phoneNumber = `tel:${phone}`;
    }

    Linking.canOpenURL(phoneNumber).then(supported => {
        if (!supported) {
            Alert.alert('Phone number is not available');
        } else {
            return Linking.openURL(phoneNumber);
        }
    }).catch(err => console.log(err));
};

export const sendContactEmail = async (name, email, phone, message) => {
    let url = SERVER_API_URL + ENDPOINT_SEND_CONTACT_EMAIL;

    const params = {
        name: name,
        email: email,
        phone: phone,
        message: message
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

    return response;
};

export const sendFeedbackEmail = async (happyness, options, recommend, message) => {
    let url = SERVER_API_URL + ENDPOINT_SEND_FEEDBACK_EMAIL;

    const params = {
        happyness: happyness,
        options: options,
        recommend: recommend,
        message: message
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

    return response;
};
