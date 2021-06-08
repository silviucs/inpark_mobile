import React from 'react'
import {StyleSheet} from 'react-native';
import {BalooRegular, PoppinsBold, PoppinsSemiBold, RobotoBold, RobotoRegular} from '../fonts';
import {MAIN_COLOUR, SECONDARY_COLOUR} from '../../../src/system/constants';

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
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        // borderWidth: 1,
        // borderColor: '#29001C',
        borderColor: '#FFF',
        borderRadius: 26,
        height: 44,
        marginVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    loginButtonText: {
        fontFamily: BalooRegular,
        color: '#29001C',
        // color: '#FFF',
        // color: '#000',
        fontSize: 15
    },
    buttonIcon: {
        marginRight: 8,
        fontSize: 24,
        color: 'white'
    },

    inputBox: {
        // width: 264,
        alignSelf: 'stretch',
        backgroundColor: '#F1F2F6',
        padding: 10,
        height: 40,
        marginVertical: 5,
        borderRadius: 8,
        color: 'darkgrey',
        fontSize: 14
    },
    primaryButton: {
        height: 44,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        // width: 264,
        marginVertical: 8,
        backgroundColor: MAIN_COLOUR,
    },
    primaryButtonIcon: {
        height: 50,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        marginVertical: 8,
        paddingHorizontal: 8,
        marginHorizontal: 8,
        backgroundColor: MAIN_COLOUR,
    },
    primaryButtonText: {
        fontFamily: RobotoBold,
        color: 'white',
        fontSize: 18,
    },
    secondaryButton: {
        marginVertical: 15,
    },
    secondaryButtonTextRed: {
        color: '#29001C',
        fontSize: 14,
        fontFamily: PoppinsSemiBold
    },
    facebookButton: {
        backgroundColor: '#4267B2'
    },
    appleButton: {
        backgroundColor: '#D8D9EA'
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#0F9D58'
    },
    h1: {
        color: SECONDARY_COLOUR,
        fontSize: 24,
        fontFamily: BalooRegular,
        marginVertical: 8
    },
    h2: {
        color: SECONDARY_COLOUR,
        fontSize: 20,
        fontFamily: BalooRegular,
        marginVertical: 8
    },
    h3: {
        color: SECONDARY_COLOUR,
        fontSize: 16,
        fontFamily: BalooRegular,
        marginVertical: 8
    },
    block: {
        margin: 8,
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: MAIN_COLOUR
    }
})
