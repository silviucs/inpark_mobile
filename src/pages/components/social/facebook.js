import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, TouchableOpacity, View, Alert} from 'react-native';
import {AccessToken, GraphRequest, GraphRequestManager, LoginManager} from 'react-native-fbsdk';
import {sendSocialUserRegistration} from '../../../system/services/auth';
import {saveLoginState} from '../../../redux/actions';
import {connect} from 'react-redux';
import {commonStyles} from '../../../../assets/styles';

class FacebookLogin extends Component {

    constructor(props) {
        super(props);
    }

    doFacebookLogin() {
        if (Platform.OS === 'android') {
            LoginManager.setLoginBehavior('web_only');
        }

        LoginManager.logInWithPermissions(['public_profile', 'email']).then(
            (result) => {
                if (result.isCancelled) {
                    console.log('Login was cancelled');
                } else {
                    this.getFacebookUserDetails();
                }
            },
            function (error) {
                alert('Login failed with error: ' + error);
            },
        );
    }

    getFacebookUserDetails() {
        AccessToken.getCurrentAccessToken().then((data) => {
            const {accessToken} = data;
            const infoRequest = new GraphRequest(
                '/me?fields=name,picture,email',
                null,
                (error, result) => {
                    if (error) {
                        alert(error.toString());
                    } else {
                        this.registerFacebookUser(result);
                    }
                },
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
        });
    }

    registerFacebookUser(result) {

        const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const params = {
            email: result.email,
            password: random,
            name: result.name,
            avatar: result.picture.data.url,
            social_id: result.id,
            social_provider: 'facebook',
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

        if (!this.props.logoOnly) {
            return (
                <TouchableOpacity style={[common.primaryButton, common.facebookButton]}
                                  onPress={() => {
                                      this.doFacebookLogin();
                                  }}
                >
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="facebook" style={common.buttonIcon}/>
                        <Text style={[common.primaryButtonText, {color: 'white'}]}>Connect with Facebook</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <View>
                <TouchableOpacity style={[common.primaryButtonIcon, common.facebookButton]}
                                  onPress={() => {
                                      this.doFacebookLogin();
                                  }}
                >
                    <Icon name="facebook" style={[common.buttonIcon, {marginRight: 0, fontSize: 30}]}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    return {
        user: user,
        system: system,
    };
};

export default connect(mapStateToProps, {saveLoginState})(FacebookLogin);
