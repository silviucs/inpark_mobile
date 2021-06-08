import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {feed} from '../../../../assets/styles';

export const LikeButton = (props) => {
    let icon = 'heart-outline';

    if(props.liked){
        icon = 'heart';
    }
    return (
        <TouchableOpacity>
            <Icon name={icon} style={feed.iconButton}/>
        </TouchableOpacity>
    )
}
