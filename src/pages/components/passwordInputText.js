import React from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {MAIN_COLOUR} from '../../system/constants';
import {common} from '../../../assets/styles/phone/common';

export const Password = props => {
    const [value, onChangeText] = React.useState(props.value);
    const [visible, setVisibility] = React.useState(false);
    const [errorStatus, displayErrors] = React.useState(false);

    const icon = !visible ? 'eye-slash' : 'eye';
    const height = (props.height);

    const showLabel = () => {
        return (
            <Text style={common.secondaryButtonTextRed}>{props.label}</Text>
        );
    };

    return (
        <View
            style={{
                display: 'flex',
                marginVertical: (5),
                alignSelf: 'stretch'
            }}>
            {showLabel()}
            <View style={[styles.container]}>
                <Icon
                    name={props.icon}
                    color={MAIN_COLOUR}
                    style={styles.icons}
                />
                <View style={{flex: 1}}>
                    <TextInput style={{color: MAIN_COLOUR, paddingHorizontal: 10}}
                               placeholderTextColor={props.placeholderTextColor}
                               onChangeText={text => {
                                   onChangeText(text);
                                   props.onChange(text);
                               }}
                               value={value}
                               placeholder={props.placeholder}
                               secureTextEntry={!visible}
                    />
                </View>
                <View style={{marginRight: 8}}>
                    <Icon
                        name={icon}
                        color={MAIN_COLOUR}
                        onPress={() => setVisibility(!visible)}
                        style={styles.icons}
                    />
                </View>
            </View>
        </View>
    );
};
Password.defaultProps = {
    label: '',
    height: (25),
};
const styles = StyleSheet.create({
    container: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F1F2F6',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: MAIN_COLOUR,
        paddingHorizontal: 4
    },
    icons: {
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16,
    },
});
