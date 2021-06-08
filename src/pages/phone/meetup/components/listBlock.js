import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UserAvatar} from '../../../components/avatar';
import {common} from '../../../../../assets/styles/phone/common';
import {RobotoLight, RobotoRegular} from '../../../../../assets/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MAIN_COLOUR} from '../../../../system/constants';

export const MeetupListBlock = (props) => {
    const item = props.item;

    return (
        <View style={styles.container}>
            <View style={styles.block}/>
            <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 4, alignSelf: 'stretch'}}>
                <Icon name={(item.privacy === 1 ? 'users' :'lock')} style={{color: MAIN_COLOUR, fontSize: 16}} />
            </View>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <UserAvatar user={props.user}/>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>{props.item.name}</Text>
                    <Text style={styles.owner}>by {props.item.owner.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name={'map-marker-alt'} style={styles.locationIcon}/>
                        <View style={{flex: 1}}><Text style={styles.location}>{props.item.locality}</Text></View>
                        <Text style={styles.date}>{props.item.meetup_date} {props.item.meetup_hour}</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 8, paddingHorizontal: 4}}>
                    <TouchableOpacity style={styles.buttonDetails}>
                        <Icon name={'arrow-right'} style={styles.buttonDetailsIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 8,
        margin: 8,
    },
    block: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FF8A00',
        opacity: 0.1,
        borderRadius: 8,
    },
    title: {
        fontFamily: RobotoRegular,
        fontSize: 20,
        color: 'black',
    },
    owner: {
        fontFamily: RobotoLight,
        fontSize: 12,
    },
    location: {
        fontFamily: RobotoRegular,
        fontSize: 14,
        color: 'black',
    },
    locationIcon: {
        color: '#F84F4F',
        marginRight: 4,
    },
    date: {
        fontFamily: RobotoRegular,
        fontSize: 14,
        color: 'black',
        textAlign: 'right'
    },
    buttonDetails: {
        flex: 1,
        backgroundColor: MAIN_COLOUR,
        padding: 6,
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonDetailsIcon: {
        color: 'white'
    }
});
