import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {feed} from '../../../../assets/styles';

export const CommentButton = (props) => {
    let icon = 'comment-outline';

    if(props.bookmarked){
        icon = 'bookmark';
    }
    return (
        <TouchableOpacity>
            <Icon name={icon} style={feed.iconButton}/>
        </TouchableOpacity>
    )
}
