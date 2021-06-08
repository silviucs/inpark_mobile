import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {MAIN_COLOUR} from '../../system/constants';


export const LoadingActivityIndicator = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}>
            {/*<Image source={require('../../../assets/images/loading.gif')} />*/}
            <ActivityIndicator color={MAIN_COLOUR} size={'large'} />
        </View>
    );
};

