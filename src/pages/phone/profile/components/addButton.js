import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AddProductButton = (props) => {

    return (
        <TouchableOpacity
            style={{padding: 8}}
            onPress={() => {
                props.handlePress()
            }}
        >
            <Icon name='plus' style={{color: '#ff9d8d', fontSize: 20}}/>
        </TouchableOpacity>
    );
}
