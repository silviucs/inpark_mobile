import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Password} from '../../../components/passwordInputText';
import {common, PoppinsSemiBold} from '../../../../../assets/styles';
import * as Animatable from 'react-native-animatable';
import {Button, Input} from 'react-native-elements';
import {sendUserChangePassword} from '../../../../system/services/auth';

export const ChangePasswordBlock = (props) => {

    return (
        <View style={styles.roundBox}>
            <View style={styles.row}>
                <Input
                    onChangeText={(value) => {
                        props.onUpdateState({currentPassword: value});
                    }}
                    placeholder='Current password'
                    secureTextEntry={true}
                    rightIcon={{type: 'font-awesome', name: 'lock', color: '#f69689', size: 20}}
                    inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}
                />
            </View>
            <View style={styles.row}>
                <Input
                    onChangeText={(password) => {
                        props.onUpdateState({newPassword: password});
                    }}
                    placeholder='New password'
                    secureTextEntry={true}
                    rightIcon={{type: 'font-awesome', name: 'lock', color: '#f69689', size: 20}}
                    inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}

                />
            </View>
            <View style={styles.row}>
                <Input
                    onChangeText={(password) => {
                        props.onUpdateState({confirmPassword: password});
                    }}
                    placeholder='Confirm password'
                    secureTextEntry={true}
                    rightIcon={{type: 'font-awesome', name: 'lock', color: '#f69689', size: 20}}
                    inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}
                />
            </View>
            <View style={{margin: 12}}>
                <Animatable.View animation="fadeInUp" useNativeDriver duration={200} delay={600}
                                 style={{alignSelf: 'stretch'}}
                >
                    <Button
                        refs="loginButton"
                        // raised
                        large
                        containerStyle={styles.buttonContainer}
                        buttonStyle={common.primaryButtonRed}
                        iconRight
                        icon={{
                            name: 'lock-reset',
                            type: 'material-community',
                            color: 'white',
                        }}
                        title='Change password'
                        onPress={() => {
                            props.handleChangePassword();
                        }}/>
                </Animatable.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    roundBox: {
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    inputContainer: {
        marginBottom: 10,
        marginLeft: '10%',
        maxWidth: '82%',
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 0,
    },
    buttonContainer: {
        marginTop: 32,
    },
    button: {
        backgroundColor: '#f69689',
        borderRadius: 5,
        // height: 45
    },
});
