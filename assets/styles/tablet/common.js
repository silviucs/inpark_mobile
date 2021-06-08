import React from 'react'
import {StyleSheet} from 'react-native';
import {PoppinsSemiBold} from '../fonts';

export const common = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'white'
    },
    loginButton: {
        // backgroundColor: 'transparent',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        // borderWidth: 1,
        // borderColor: '#29001C',
        borderColor: '#FFF',
        borderRadius: 26,
        height: 44,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'stretch',
        width: '50%'
    },
    loginButtonText: {
        fontFamily: PoppinsSemiBold,
        color: '#29001C',
        // color: '#FFF',
        // color: '#000',
        fontSize: 14
    },
    buttonIcon: {
        marginRight: 8,
        fontSize: 24,
        color: 'white'
    },

    inputBox: {
        // width: 264,
        // alignSelf: 'stretch',
        backgroundColor: '#F1F2F6',
        padding: 10,
        height: 40,
        marginVertical: 5,
        borderRadius: 8,
        color: '#E62937',
        width: '50%'
    },
    primaryButton: {
        height: 44,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'stretch',
        // width: 264,
        marginVertical: 8,
        backgroundColor: '#E62937',
        width: '50%'
    },
    primaryButtonText: {
        fontFamily: PoppinsSemiBold,
        color: 'white',
        fontSize: 14,
    },
    secondaryButton: {
        marginVertical: 15,
    },
    secondaryButtonTextRed: {
        color: '#29001C',
        fontSize: 14,
        fontFamily: PoppinsSemiBold
    },
})
