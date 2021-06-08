import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {common} from '../../../../assets/styles/phone/common';
import {RobotoBold, RobotoRegular} from '../../../../assets/styles';
import { useNavigation } from '@react-navigation/native';

export const NoMeetups = () => {
    const navigation = useNavigation();

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <Text style={styles.text}>No meetups?</Text>

            <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{position: 'absolute', top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', transform: [{rotate: '140.9deg'}]}}>
                    <Image source={require('../../../../assets/images/no-meetup-background.png')} style={{height: 190, width: 230, opacity: 0.25}} />
                </View>
                <Image source={require('../../../../assets/images/no-meetups.png')} style={{height: 231, width: 300}} />
            </View>

            <Text style={styles.text}>No problem!</Text>

            <View style={{alignSelf: 'stretch', margin: 16}}>
                <TouchableOpacity style={common.primaryButton}
                                  onPress={() => {
                                      navigation.navigate('Add')
                                  }}
                >
                    <Text style={common.primaryButtonText}>Create new meetup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        color: '#3D423C',
        fontFamily: RobotoBold
    },
    green: {
        position: 'absolute',
        backgroundColor: 'rgba(162, 206, 2, 0.25)',
        top: '27%',
        left: '22%',
        right: '24.5%',
        bottom: '19%',
        borderRadius: 52
    }
})
