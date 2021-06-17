import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RobotoBold, RobotoRegular} from '../../../../../assets/styles';
import {GREY_COLOUR, INACTIVE_COLOUR, SECONDARY_COLOUR} from '../../../../system/constants';

export const ProfileTabs = (props) => {
    let activeTabIndex = 0

    if(props.activeTab){
        activeTabIndex = props.activeTab;
    }

    return (
        <View style={{flexDirection: 'row', margin:8}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16}}>
                <TouchableOpacity
                    onPress={() => {
                        props.onChangeTab(0)
                    }}
                >
                    <Text style={[styles.button, (activeTabIndex === 0 ? styles.active : styles.inactive)]}>Meetups</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.middleTab, {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16}]}>
                <TouchableOpacity
                    onPress={() => {
                        props.onChangeTab(1)
                    }}
                >
                    <Text style={[styles.button, (activeTabIndex === 1 ? styles.active : styles.inactive)]}>Friends</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16}}>
                <TouchableOpacity
                    onPress={() => {
                        props.onChangeTab(2)
                    }}
                >
                    <Text style={[styles.button, (activeTabIndex === 2 ? styles.active : styles.inactive)]}>Memories</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        fontSize: 16
    },
    active: {
        fontFamily: RobotoBold,
        color: SECONDARY_COLOUR
    },
    inactive: {
        fontFamily: RobotoRegular,
        color: GREY_COLOUR
    },
    middleTab: {
        borderLeftColor: INACTIVE_COLOUR,
        borderRightColor: INACTIVE_COLOUR,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    }
})
