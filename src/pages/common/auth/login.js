import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Image,
    Alert, ImageBackground,
} from 'react-native';
import {Password} from '../../components/passwordInputText';
import {authStyles, commonStyles, PoppinsRegular} from '../../../../assets/styles';
import {Header} from 'react-native-elements';
import {BackButton} from '../../components/backButton';
// import {sendLogin} from '../../../system/services/auth';
import {connect} from 'react-redux';
import {saveLoginState} from '../../../redux/actions/auth';
import {doLogin} from '../../../system/services/auth';
import {getTranslationForLabel} from '../../../system/services/system';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TextBox} from '../../components/textbox';
import {SECONDARY_COLOUR} from '../../../system/constants';
import {SocialConnect} from '../../components/social/social';

class LoginScreen extends Component {
    state = {
        username: null,
        password: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    doLogin() {

        if (!this.state.username || !this.state.password) {
            const errorTitle = getTranslationForLabel('lblLoginErrorMissingFieldsTitle', this.props.system.labels)
            const errorMessage = getTranslationForLabel('lblLoginErrorMissingFieldsMessage', this.props.system.labels)
            Alert.alert(errorTitle, errorMessage);
            return false;
        }

        doLogin(this.state.username, this.state.password).then((response) => {
            console.log(response);
            switch (response.status) {
                case 401:
                    Alert.alert('Wrong credentials', 'Sorry, couldn\'t log you in.');
                    return false;
                case 200:
                    response.json().then((json) => {
                        const user = json.user;
                        this.props.saveLoginState({prop: 'user', value: user});
                        this.props.saveLoginState({prop: 'loggedIn', value: true});
                    });
                    break;
                default:
                    console.log(response);
                    Alert.alert('Server error', 'We\'re sorry, something went wrong. Please try again later.');
                    return false;
            }
        });
    }

    render() {

        const {auth} = authStyles(this.props.system.deviceType);
        const {common} = commonStyles(this.props.system.deviceType);

        return (
            // <ImageBackground source={require('../../../../assets/images/login-background.jpg')}
            //                  style={{
            //                      flex: 1,
            //                      resizeMode: 'cover',
            //                      justifyContent: 'center',
            //                      width: null,
            //                      height: null,
            //                  }}>
                <View style={{
                    width: '100%',
                    flex: 1,
                    // backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Header
                        containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}
                        leftComponent={BackButton(this.props.navigation)}
                    />
                    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                                          style={{flex: 1, flexDirection: 'column', width: '100%'}}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 2,
                                }}>
                                    <Image source={require('../../../../assets/images/logo.png')}
                                           style={{width: 200, height: 200}}
                                    />
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'flex-start',
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    marginHorizontal: 24,
                                }}>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextBox placeholder='Email address'
                                                 label={getTranslationForLabel('lblAuthUsername', this.props.system.labels)}
                                                 keyboardType='email-address'
                                                 autoCapitalize={'none'}
                                                 onChangeText={(value) => {
                                                     this.setState({username: value});
                                                 }}
                                                 icon={'envelope'}
                                                 placeholderTextColor={SECONDARY_COLOUR}
                                        />
                                    </View>
                                    <View
                                        style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-start'}}>
                                        <Password placeholder='Password'
                                                  secureTextEntry={true}
                                                  label={getTranslationForLabel('lblAuthPassword', this.props.system.labels)}
                                                  onChange={(value) => {
                                                      this.setState({password: value});
                                                  }}
                                                  onBlur={() => {
                                                  }}
                                                  style={[auth.textbox]}
                                                  icon={'lock'}
                                                  placeholderTextColor={SECONDARY_COLOUR}
                                        />
                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <TouchableOpacity style={common.secondaryButton}
                                                          onPress={() => {
                                                              this.props.navigation.navigate('ResetPassword');
                                                          }}
                                        >
                                            <Text style={common.secondaryButtonTextRed}>Forgot my password</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <TouchableOpacity style={common.primaryButton}
                                                          onPress={() => {
                                                              this.doLogin();
                                                          }}
                                        >
                                            <Text
                                                style={common.primaryButtonText}>{getTranslationForLabel('lblLogin', this.props.system.labels)}</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                                <SocialConnect />
                            </View>

                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            // </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    return {user: user, system: system};
};

export default connect(mapStateToProps, {saveLoginState})(LoginScreen);
