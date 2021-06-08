import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {feed} from '../../../../assets/styles';

export const BookmarkButton = (props) => {
    let icon = 'bookmark-outline';

    if(props.bookmarked){
        icon = 'bookmark';
    }
    return (
        <TouchableOpacity>
            <Icon name={icon} style={feed.iconButton}/>
        </TouchableOpacity>
    )
}
