import React, {Component} from 'react';
import {TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {MAIN_COLOUR} from '../../system/constants';
import * as RootNavigation from '../../navigation/phone/rootNavigation';

export function BackButton(navigation, navigateTo) {
    return (
        <TouchableOpacity
            onPress={() => {
                if(navigateTo){
                    // navigation.goBack(navigateTo);
                    RootNavigation.navigate('Profile', {screen: 'ProfileIndex'});
                }else{
                    navigation.goBack();
                }
            }}
        >
            <Icon name='chevron-left' style={{color: MAIN_COLOUR, fontSize: 18, padding: 8}}/>
        </TouchableOpacity>
    );
}
