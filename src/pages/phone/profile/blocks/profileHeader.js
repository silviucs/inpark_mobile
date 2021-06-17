import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserAvatar} from '../../../components/avatar';
import React from 'react';
import {PoppinsRegular, PoppinsSemiBold, RobotoBold, RobotoRegular} from '../../../../../assets/styles';
import {GREY_COLOUR, MAIN_COLOUR, SECONDARY_COLOUR} from '../../../../system/constants';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ProfileHeader = (props) => {
    const profile = props.user.profile;
    const user = props.user.user;

    return (
        <View
            style={{flex: 1, padding: 16, marginBottom: 10}}
        >
            <View style={{alignSelf: 'stretch', alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                <Icon name={'edit'} style={styles.icon}/>
            </View>
            <View style={{
                alignSelf: 'stretch',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                height: 300,
            }}>
                <ImageBackground source={require('../../../../../assets/images/blob.png')}
                    style={{height: 250, width: 265, alignItems: 'center',
                        justifyContent: 'center',}}
                >
                    <View style={{alignItems: 'center', alignSelf: 'stretch'}}>
                        <View>
                            <UserAvatar user={profile} size={'large'}/>
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <Text
                                style={styles.username}>{user.first_name} {user.last_name}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    username: {
        fontSize: 25,
        fontFamily: RobotoBold,
        color: GREY_COLOUR,
    },
    info: {
        color: MAIN_COLOUR,
        fontSize: 11,
        fontFamily: PoppinsRegular,
    },
    icon: {
        color: SECONDARY_COLOUR,
        fontSize: 20,
    },
});
