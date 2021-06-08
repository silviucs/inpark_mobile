import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MAIN_COLOUR} from '../../../../system/constants';
import {BalooRegular} from '../../../../../assets/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';

export const MeetupDateAndTime = (props) => {

    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 2}}>
            <TouchableOpacity onPress={() => {
                props.onDatePress()
            }}>
                <View style={{
                    marginVertical: 8,
                    backgroundColor: MAIN_COLOUR,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    margin: 4,
                    padding: 8,
                    flexDirection: 'row'
                }}>
                    <Icon name='calendar-alt' style={styles.icon} />
                    <Text style={styles.text}>Date</Text>
                </View>
            </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => {
                props.onTimePress()
            }}>
                <View style={{
                    flex: 1,
                    marginVertical: 8,
                    backgroundColor: MAIN_COLOUR,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    margin: 4,
                    padding: 8,
                    flexDirection: 'row'
                }}>
                    <Icon name='clock' style={styles.icon} />
                    <Text style={styles.text}>Hour</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontFamily: BalooRegular,
        fontSize: 18
    },
    icon: {
        color: 'white',
        fontSize: 18,
        marginRight: 4
    }
})
