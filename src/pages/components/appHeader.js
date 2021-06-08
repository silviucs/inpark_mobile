import {Image, View} from 'react-native';
import React from 'react';
import {Header} from 'react-native-elements';



export const AppHeader = (props) => {

    const logo = () => {
        return (
            <Image source={require('../../../assets/images/logo-horizontal.png')}
                   style={{width: 206, height: 35}}
            />
        )
    }

    return (
        <Header
            containerStyle={{backgroundColor: 'white'}}
            centerComponent={logo}
        />
    );
}
