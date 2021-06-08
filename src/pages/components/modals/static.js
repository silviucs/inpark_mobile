import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {common} from '../../../../assets/styles';

export const StaticContentModal = (props) => {

    const page = props.page;

    return (
        <View style={{flex: 1}}>
            <View style={{margin: 10}}>
                <Text style={common.h2}>{page.title}</Text>
                <Text style={common.h4}>{page.content}</Text>
            </View>
        </View>
    );

};

export default StaticContentModal;
