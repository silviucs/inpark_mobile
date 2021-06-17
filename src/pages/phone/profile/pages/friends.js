import React from 'react';
import {Text, View} from 'react-native';
import {FriendsBlock} from '../blocks/friendsBlock';

export const UserFriends = (props) => {
    return (
        <View>
            <FriendsBlock loadingFriends={false} user={props.user}/>
        </View>
    )
}
