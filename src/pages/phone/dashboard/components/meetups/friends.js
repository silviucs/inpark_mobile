import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {common} from '../../../../../../assets/styles/phone/common';
import {MAIN_COLOUR} from '../../../../../system/constants';
import {BalooRegular} from '../../../../../../assets/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const FriendsMeetups = (props) => {

    return (
        <View>
            <Text style={common.h2}>Friends' meet-ups</Text>
            <Text>Your friends didn't add any meet-ups. </Text>
            <TouchableOpacity style={styles.button}
                              onPress={() => {
                                  props.navigation.navigate('Add')
                              }}
            >
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='users' style={styles.icon}/>
                    <Text style={styles.buttonText}>Add one and invite friends</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: MAIN_COLOUR,
        borderRadius: 8,
        padding: 8,
        marginVertical: 8,
    },
    buttonText: {
        color: MAIN_COLOUR,
        fontFamily: BalooRegular,
        fontSize: 18,
    },
    icon: {
        color: MAIN_COLOUR,
        fontSize: 18,
        marginRight: 8,
    },
});
