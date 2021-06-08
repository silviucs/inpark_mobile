import React, {Component} from 'react';
import {commonStyles} from '../../../../assets/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Alert, Platform, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {sendSocialUserRegistration} from '../../../system/services/auth';
import {saveLoginState} from '../../../redux/actions';
import {connect} from 'react-redux';
import {GOOGLE_WEB_CLIENT_ID} from '../../../system/keys/keys';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {auth} from '../../../../assets/styles/phone/auth';

class GoogleLogin extends Component {

    async doGoogleLogin() {
        console.log('google login');
        GoogleSignin.configure({
            webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server(needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: 'inPark', // [Android] specifies an account name on the device that should be used
        });

        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });

            GoogleSignin.signIn().then((userInfo) => {
                this.registerGoogleUser(userInfo);
                console.log(userInfo);
            });

        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
                console.log(error);
            }
        }
    }

    registerGoogleUser(result) {

        const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const params = {
            email: result.user.email,
            password: random,
            name: result.user.givenName + ' ' + result.user.familyName,
            avatar: result.user.photo,
            social_id: result.user.id,
            social_provider: 'google',
        };

        console.log(params);

        sendSocialUserRegistration(params).then(async (response) => {
            const r = await response.json();
            console.log(r);
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
                    console.log(r);
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

        if (!this.props.logoOnly) {
            return (
                <TouchableOpacity style={[common.primaryButton, common.googleButton]}
                                  onPress={() => {
                                      this.doGoogleLogin().then(r => {
                                          console.log(r);
                                      });
                                  }}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="google" style={[common.buttonIcon, {color: '#DB4437'}]}/>
                        <Text style={[common.primaryButtonText, {color: '#4285F4'}]}>Sign up with Google</Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return (
            <View>
                <TouchableOpacity style={[common.primaryButtonIcon, common.googleButton]}
                                  onPress={() => {
                                      this.doGoogleLogin();
                                  }}
                >
                    <Icon name="google" style={[common.buttonIcon, {color: '#DB4437', marginRight: 0,fontSize: 30}]}/>
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

export default connect(mapStateToProps, {saveLoginState,},)(GoogleLogin);
