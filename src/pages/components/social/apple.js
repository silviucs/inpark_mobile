import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {sendSocialUserRegistration} from '../../../system/services/auth';
import {saveLoginState} from '../../../redux/actions';
import {connect} from 'react-redux';
import {commonStyles} from '../../../../assets/styles';

class AppleLogin extends Component {

    async doAppleLogin() {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [
                    appleAuth.Scope.EMAIL,
                    appleAuth.Scope.FULL_NAME,
                ],
            });

            if (appleAuthRequestResponse['realUserStatus']) {
                this.registerAppleUser(appleAuthRequestResponse);
            }
        } catch (error) {
            if (error.code === appleAuth.Error.CANCELED) {
            }
            if (error.code === appleAuth.Error.FAILED) {
                alert('Unable to authenticate with Apple');
            }
            if (error.code === appleAuth.Error.INVALID_RESPONSE) {
                alert('Unable to authenticate with Apple');
            }
            if (error.code === appleAuth.Error.NOT_HANDLED) {
            }
            if (error.code === appleAuth.Error.UNKNOWN) {
                alert('Unable to authenticate with Apple');
            }
        }
    }

    registerAppleUser(result) {

        const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const params = {
            email: result.email,
            password: random,
            name: result.fullName.givenName + ' ' + result.fullName.familyName,
            avatar: '',
            social_id: result.user,
            social_provider: 'apple',
        };

        sendSocialUserRegistration(params).then(async (response) => {
            const r = await response.json();
            switch (response.status) {
                case 409:
                    Alert.alert(
                        'User already exists',
                        'Your email address is already in use.',
                        [
                            {
                                text: 'Login',
                                onPress: () => {
                                    this.props.navigation.navigate('Login');
                                },
                                style: 'destructive',
                            },
                            {
                                text: 'Reset password',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'destructive',
                            },
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                        ],
                        {cancelable: false},
                    );
                    break;
                case 500:
                    Alert.alert('Ups', 'Something went wrong. Try again later!');
                    break;
                case 200:
                    const user = r.user;
                    this.props.saveLoginState({prop: 'user', value: user});
                    this.props.saveLoginState({prop: 'profile', value: r.profile});
                    this.props.saveLoginState({prop: 'loggedIn', value: true});
                    break;
            }
        });
    }

    render() {
        const {common} = commonStyles(this.props.system.deviceType);

        if (Platform.OS !== 'ios' || !appleAuth.isSupported) {
            return (
                <View></View>
            );
        }
        if (!this.props.logoOnly) {
            return (
                <View style={{marginTop: 16}}>
                    <TouchableOpacity style={common.secondaryButton}
                                      onPress={() => {
                                          this.doAppleLogin();
                                      }}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Icon name="apple" style={common.secondaryButtonIcon}/>
                            <Text style={common.secondaryButtonText}>Sign up with Apple</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <View >
                <TouchableOpacity style={[common.primaryButtonIcon, common.appleButton]}
                                  onPress={() => {
                                      this.doAppleLogin();
                                  }}
                >
                    <Icon name="apple" style={[common.buttonIcon, {color: 'black', marginRight: 0, fontSize: 30}]}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) =>
{
    const user = state.userReducer;
    const system = state.systemReducer;

    return {
        user: user,
        system: system,
    };
}
;

// export default AppleLogin
export default connect(mapStateToProps,
{
    saveLoginState,
},
)(AppleLogin);
