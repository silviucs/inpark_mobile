import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, ImageBackground,
} from 'react-native';
import {Password} from '../../components/passwordInputText';
import {BackButton} from '../../components/backButton';
import {Header} from 'react-native-elements';
// import {
//     sendGenerateResetPasswordCodeRequest,
//     sendGenerateValidationCodeRequest, sendResetPasswordRequest,
// } from '../../../system/services/auth';
import {common} from '../../../../assets/styles/phone/common';
import {auth} from '../../../../assets/styles/phone/auth';
import {TextBox} from '../../components/textbox';
import {getTranslationForLabel} from '../../../system/services/system';
import {connect} from 'react-redux';
import {saveLoginState} from '../../../redux/actions';
import {MAIN_COLOUR, SECONDARY_COLOUR} from '../../../system/constants';
import { sendGenerateResetPasswordCodeRequest } from '../../../system/services/auth';

class ResetPasswordScreen extends Component {

    state = {};

    constructor(props) {
        super(props);
    }

    _renderValidationCodeButton() {
        if (this.state.loadingValidationButton) {
            return (
                <ActivityIndicator animating={true} size="small" style={{opacity: 1}} color={MAIN_COLOUR} />
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this._handleSendResetPasswordCode();
                    }}
                >
                    <Text style={{color: 'blue'}}>Get code</Text>
                </TouchableOpacity>
            );
        }
    }

    _handleSendResetPasswordCode() {
        if (!this.state.email) {
            Alert.alert('Missing email', 'You need to provide the email address you registered with in order to get the code!');
            return false;
        }
        this.setState({loadingValidationButton: true});
        const params = {
            email: this.state.email,
        };

        sendGenerateResetPasswordCodeRequest(params).then((response) => {
            console.log(response);
            Alert.alert('Password reset', 'If the address you provided is in the system, we sent you an email with the reset code!');
            this.setState({loadingValidationButton: false});
        });
    }

    _handleResetPassword() {

        const params = {
            email: this.state.email,
            reset_code: this.state.reset_code,
            new_password: this.state.newPassword,
        };

        sendResetPasswordRequest(params).then(async (response) => {
            const json = await response.json();
            console.log(json);
            switch (response.status) {
                case 200:
                    Alert.alert('Password changed', 'Your password was successfully reset.', [
                        {
                            text: 'Login',
                            onPress: () => {
                                this.props.navigation.navigate('Login');
                            },
                        },
                    ]);
                    break;
                case 422:
                    Alert.alert('Invalid code', 'Your code is invalid or expired. Please enter the correct one or generate a new one!');
                    return false;
                default:
                case 500:
                    Alert.alert('Reset password error', 'Something went wrong. Please try again later!');
                    return false;
            }
        });
    }

    render() {
        return (
            <ImageBackground source={require('../../../../assets/images/login-background.jpg')}
                             style={{
                                 flex: 1,
                                 resizeMode: 'cover',
                                 justifyContent: 'center',
                                 width: null,
                                 height: null,
                             }}>
                <View style={common.container}>
                    <Header
                        containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}
                        leftComponent={BackButton(this.props.navigation)}
                    />
                    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                                          keyboardVerticalOffset={20}
                                          style={{flex: 1, flexDirection: 'column', width: '100%'}}>
                        <ScrollView showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                        justifyContent: 'space-between',
                                        flexDirection: 'column',
                                    }}
                                    style={{flex: 1, width: '100%'}}
                        >
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    marginHorizontal: 24,
                                }}>
                                    {/*<IconHeader icon={'lock'} containerStyle={{paddingTop: 50}}/>*/}
                                    <View style={{alignSelf: 'stretch'}}>
                                        <TextBox
                                            placeholder={getTranslationForLabel('lblEmailAddress', this.props.system.labels)}
                                            keyboardType='email-address'
                                            autoCapitalize={'none'}
                                            label={getTranslationForLabel('lblEmailAddress', this.props.system.labels)}
                                            onChangeText={(value) => {
                                                this.setState({email: value});
                                            }}
                                            icon={'envelope'}
                                            placeholderTextColor={SECONDARY_COLOUR}
                                            style={[common.inputBox, auth.textbox]}/>
                                    </View>
                                    <View style={{alignSelf: 'stretch'}}>
                                        <View style={{flex: 1, alignItems: 'center'}}>
                                            <TextBox
                                                placeholder={getTranslationForLabel('lblAuthPasswordResetCode', this.props.system.labels)}
                                                label={getTranslationForLabel('lblAuthPasswordResetCode', this.props.system.labels)}
                                                onChangeText={(value) => {
                                                    this.setState({reset_code: value});
                                                }}
                                                placeholderTextColor={SECONDARY_COLOUR}
                                                style={[common.inputBox, auth.textbox]}
                                                icon={'lock'}
                                                rightComponent={this._renderValidationCodeButton()}
                                            />
                                        </View>

                                    </View>
                                    <View style={{alignSelf: 'stretch'}}>
                                        <Password
                                            placeholder={getTranslationForLabel('lblAuthNewPassword', this.props.system.labels)}
                                            label={getTranslationForLabel('lblAuthNewPassword', this.props.system.labels)}
                                            secureTextEntry={true}
                                            onChange={(value) => {
                                                this.setState({newPassword: value});
                                            }}
                                            onBlur={() => {
                                            }}
                                            placeholderTextColor={SECONDARY_COLOUR}
                                            icon={'lock'}
                                            style={common.inputBox}/>
                                    </View>
                                    <View style={{alignSelf: 'stretch'}}>
                                        <Password
                                            placeholder={getTranslationForLabel('lblAuthConfirmPassword', this.props.system.labels)}
                                            label={getTranslationForLabel('lblAuthConfirmPassword', this.props.system.labels)}
                                            secureTextEntry={true}
                                            onChange={(value) => {
                                                this.setState({confirmPassword: value});
                                            }}
                                            onBlur={() => {
                                            }}
                                            placeholderTextColor={SECONDARY_COLOUR}
                                            icon={'lock'}
                                            style={common.inputBox}/>
                                    </View>
                                    <TouchableOpacity style={common.primaryButton}
                                                      onPress={() => {
                                                          this._handleResetPassword();
                                                      }}
                                    >
                                        <Text style={common.primaryButtonText}>Reset password</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    return {user: user, system: system};
};

export default connect(mapStateToProps, {saveLoginState})(ResetPasswordScreen);
