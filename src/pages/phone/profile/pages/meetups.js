import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RobotoRegular} from '../../../../../assets/styles';
import {GREY_COLOUR, MAIN_COLOUR, SECONDARY_COLOUR} from '../../../../system/constants';

export const UserMeetups = (props) => {
    return (
        <View style={{flex: 1, margin: 16}}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                    <Text style={styles.text}>Upcoming meetups</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Text style={[styles.text, styles.link]}>View all</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: RobotoRegular,
        color: GREY_COLOUR,
        fontSize: 16
    },
    link: {
        color: SECONDARY_COLOUR
    }
})
