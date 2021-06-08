import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MAIN_COLOUR} from '../../system/constants';
import {common} from '../../../assets/styles/phone/common';

export const TextBox = (props) => {
    const [value, onChangeText] = React.useState(props.value);
    const [labelVisible, changeLabelVisibility] = React.useState(false);

    const showRightComponent = () => {
        if (props.rightComponent) {
            return (
                <View style={{marginRight: 4}}>
                    {props.rightComponent}
                </View>
            );
        }
    };

    const showLabel = () => {
        return (
            <Text style={common.secondaryButtonTextRed}>{props.label}</Text>
        );
    };

    return (
        <View
            style={{
                display: 'flex',
                marginVertical: 5,
                alignSelf: 'stretch',
                // height: 60,
                justifyContent: 'flex-end',
            }}>
            {showLabel()}
            <View style={[styles.container, props.style]}>
                <View>
                    <Icon
                        name={props.icon}
                        color={MAIN_COLOUR}
                        style={styles.icons}
                    />
                </View>
                <View style={{flex: 1}}>
                    <TextInput style={{color: MAIN_COLOUR, paddingHorizontal: 10, alignSelf: 'stretch'}}
                               onChangeText={text => {
                                   onChangeText(text);
                                   props.onChangeText(text);
                               }}
                               value={value}
                               keyboardType={props.keyboardType}
                               autoCapitalize={props.autoCapitalize}
                               multiline={props.multiline}
                               numberOfLines={props.numberOfLines}
                               returnKeyLabel={props.returnKeyLabel}
                               returnKeyType={props.returnKeyType}
                               autoCorrect={props.autoCorrect}
                               placeholder={props.placeholder}
                               placeholderTextColor={props.placeholderTextColor}
                               onFocus={() => {
                                   changeLabelVisibility(!labelVisible);
                               }}
                               onBlur={() => {
                                   changeLabelVisibility(!labelVisible);
                               }}
                               onSubmitEditing={(event) => {
                                   if (props.onSubmitEditing) {
                                       props.onSubmitEditing(event);
                                   }
                               }}
                    />
                </View>
                {showRightComponent()}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: MAIN_COLOUR,
        alignSelf: 'stretch',
        paddingHorizontal: 4,
    },
    icons: {
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
    },
});
