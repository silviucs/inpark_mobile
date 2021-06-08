import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {MAIN_COLOUR} from '../../system/constants';


export const OverlayActivityIndicator = () => {
    return (
        <View style={{
            position: 'absolute',
            top: 0, left: 0,
            right: 0, bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}>
            {/*<Image source={require('../../../assets/images/loading.gif')} />*/}
            <View style={{padding: 40, backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 16}}>
                <ActivityIndicator color={MAIN_COLOUR} size={'large'}/>
            </View>
        </View>
    );
};

