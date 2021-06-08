import React from 'react';
import {StyleSheet} from 'react-native'
import {PoppinsSemiBold} from './fonts';

export const map = StyleSheet.create({
    searchBoxContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // position: 'absolute',
        width: '100%',
        // top: 50,

    },
    searchInput: {
        fontSize: 16,
        color: '#000',
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: '100%',
        padding: 8,
        borderRadius: 10,
    },
    rightAbsoluteButtonContainer: {
        position: 'absolute',
        // bottom: 50,
        right: 20,
        padding: 20,
    },
    absoluteTopRightUserAvatarContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
    },
    absoluteToRightUserContextualMenuContainer: {
        position: 'absolute',
        top: 105,
        right: 20,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'flex-start',
        padding: 10,
    },
    contextMenuHeaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    contextMenuHeader: {
        fontSize: 18,
    },
    absoluteTopRightMenuContainer: {
        position: 'absolute',
        top: 120,
        right: 20,
        backgroundColor: 'rgba(105,105,105, 0.9)',
        borderRadius: 10
    },
    menuButton: {
        padding: 5,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuButtonIcon: {
        color: 'white',
        fontSize: 18
    },
    text_01d: {
        fontSize: 36,
    },
    colour_01d: {
        color: 'white'
    },
    text: {
        fontSize: 12,
        fontFamily: PoppinsSemiBold
    },
    icon: {
        fontSize: 24,
    }
})
