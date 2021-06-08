import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {common} from '../../../../../assets/styles/phone/common';
import {MAIN_COLOUR, SECONDARY_COLOUR} from '../../../../system/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {BalooRegular} from '../../../../../assets/styles';
import React, {useState} from 'react';

export const MeetupPrivacy = (props) => {
    return (
        <View style={{alignSelf: 'stretch', marginVertical: 8}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[common.secondaryButtonTextRed, {alignSelf: 'stretch', flex: 1}]}>This meetup is</Text>
                <Icon name={'info-circle'} style={styles.iconInfo} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => {
                        props.selectPrivacy(1)
                    }}
                    style={{flex: 1, marginVertical: 8}}
                >
                    <View style={props.privacy == 1 ? styles.containerSelected : styles.container}>
                        <Icon name={'users'} style={props.privacy == 1 ? styles.iconSelected : styles.icon}/>
                        <Text style={props.privacy == 1 ? styles.textSelected : styles.text}>Open</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width: 16}}></View>
                <TouchableOpacity
                    onPress={() => {
                        props.selectPrivacy(2)
                    }}
                    style={{flex: 1, marginVertical: 8}}
                >
                    <View style={props.privacy == 2 ? styles.containerSelected : styles.container}>
                        <Icon name={'user-lock'} style={props.privacy == 2 ? styles.iconSelected : styles.icon}/>
                        <Text style={props.privacy == 2 ? styles.textSelected : styles.text}>Private</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLOUR,
        borderRadius: 8,
        borderColor: MAIN_COLOUR,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    containerSelected: {
        backgroundColor: SECONDARY_COLOUR,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    icon: {
        fontSize: 24,
        color: 'white',
    },
    iconSelected: {
        fontSize: 24,
        color: 'white',
    },
    iconInfo: {
        fontSize: 16,
        color: MAIN_COLOUR,
    },
    text: {
        fontFamily: BalooRegular,
        color: 'white',
        fontSize: 20,
    },
    textSelected: {
        fontFamily: BalooRegular,
        color: 'white',
        fontSize: 20,
    },
});
