import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MAIN_COLOUR} from '../../../../system/constants';
import {BalooRegular} from '../../../../../assets/styles';

export const InviteFriends = (props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                }}
            >
                <View style={styles.container}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.text}>
                            Search for a friend
                        </Text>
                    </View>
                    <Icon name={"search"} style={styles.icon}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLOUR, alignItems: 'center', justifyContent: 'center',
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontFamily: BalooRegular,
        fontSize: 18
    },
    icon: {
        color: 'white',
        fontSize: 18
    }
})
