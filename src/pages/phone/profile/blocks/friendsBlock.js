import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {MAIN_COLOUR} from '../../../../system/constants';
import {common} from '../../../../../assets/styles/phone/common';
import {inviteFriends} from '../actions/actions';
import {getProfileFriends} from '../../../../system/services/friends';
import {plural} from '../../../../system/services/system';

export const FriendsBlock = (props) => {

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    const showLoading = () => {
        if (loading) {
            return (
                <ActivityIndicator color={MAIN_COLOUR}/>
            );
        }
    };

    const getFriends = async () =>{
        const friends = await getProfileFriends({profile_uuid: props.user.profile.uuid})
        setFriends(friends.friends);
    }

    useEffect( () => {
        getFriends();
        setLoading(false);
    }, [])

    return (
        <View style={common.block}>
            <Text style={common.h3}>Friends</Text>
            {showLoading()}
            <View>
                <Text>You have {friends.length} {plural('friend', 'friends', friends.length)}!</Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => {
                        inviteFriends(props.user.profile)
                    }}>
                        <Text style={common.secondaryButtonTextRed}>Invite </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity>
                        <Text style={common.secondaryButtonTextRed}>Search friends</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity>
                        <Text style={common.secondaryButtonTextRed}>Requests</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
