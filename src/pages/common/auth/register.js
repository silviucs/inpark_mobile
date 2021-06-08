import React, {Component, createRef} from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    TextInput,
    TouchableOpacity,
    Alert, ScrollView, ActivityIndicator, Platform, ImageBackground,
} from 'react-native';
import {auth, authStyles, common, commonStyles} from '../../../../assets/styles';
import {Password} from '../../components/passwordInputText';
import {Header} from 'react-native-elements';
import {BackButton} from '../../components/backButton';
// import {sendGenerateValidationCodeRequest, sendRegistrationDetails} from '../../../system/services/auth';
import {connect} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import StaticContentModal from '../../components/modals/static';
import {TextBox} from '../../components/textbox';
import {getTranslationForLabel} from '../../../system/services/system';
import {MAIN_COLOUR, SECONDARY_COLOUR} from '../../../system/constants';
import {sendGenerateValidationCodeRequest, sendRegistrationDetails} from '../../../system/services/auth';
// import {getStaticPageDetails} from '../../../system/services/content';
import {saveLoginState} from '../../../redux/actions';

const slug = 'terms-and-conditions';

class RegisterDetailsScreen extends Component {

    state = {
        loading: true,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        loadingValidationButton: false,
    };

    modalizeRef = createRef();

    onOpen() {
        this.modalizeRef.current?.open();
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // getStaticPageDetails(slug).then((response) => {
        //     this.setState({page: response});
        //     this.setState({loading: false});
        // });
    }

    handleRegister() {
        if (!this.state.firstName) {
            Alert.alert('Missing field', 'Please enter your first name!');
            return false;
        }

        if (!this.state.lastName) {
            Alert.alert('Missing field', 'Please enter your last name!');
            return false;
        }

        if (!this.state.email) {
            Alert.alert('Missing field', 'Please enter your email!');
            return false;
        }

        if (!this.state.validationCode) {
            Alert.alert('Missing field', 'Please enter your validation code!');
            return false;
        }

        if (!this.state.password || this.state.password != this.state.confirmPassword) {
            Alert.alert('Missing or wrong password', 'Please enter your password correctly!');
            return false;
        }

        const params = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            provider: 'email',
            value: this.state.email,
            validation_code: this.state.validationCode,
            password: this.state.password,
        };

        sendRegistrationDetails(params).then(async (response) => {
            console.log(response.status);
            switch (response.status) {
                case 409:
                    Alert.alert('User exists', 'User exists. Login or reset your password!');
                    return false;
                case 422:
                    Alert.alert('Invalid code', 'Your validation code is incorrect!');
                    return false;
                case 200:
                    response.json().then((json) => {
                        console.log(json)
                        const user = json.user;
                        this.props.saveLoginState({prop: 'user', value: user});
                        this.props.saveLoginState({prop: 'profile', value: json.profile});
                        this.props.saveLoginState({prop: 'loggedIn', value: true});
                        // this.props.navigation.navigate('ValidationCode');
                    });
                    return true;
            }
        });
    }

    _handleSendValidationCode() {
        if (!this.state.email) {
            Alert.alert('Missing email', 'You need to provide a valid email address in order to get the verification code!');
            return false;
        }
        this.setState({loadingValidationButton: true});
        const params = {
            email: this.state.email,
        };

        sendGenerateValidationCodeRequest(params).then((response) => {
            Alert.alert('Email sent', 'We sent you an email with the validation code!');
            this.setState({loadingValidationButton: false});
        });

    }

    _renderValidationCodeButton() {
        if (this.state.loadingValidationButton) {
            return (
                <ActivityIndicator animating={true} size="small" style={{opacity: 1}} color={MAIN_COLOUR}/>
            );
        } else {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this._handleSendValidationCode();
                    }}
                >
                    <Text style={{color: 'blue'}}>Get code</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        const {auth} = authStyles(this.props.system.deviceType);
        const {common} = commonStyles(this.props.system.deviceType);

        return (
            // <ImageBackground source={require('../../../../assets/images/register-background.jpg')}
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
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Header
                        containerStyle={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}
                        leftComponent={BackButton(this.props.navigation)}
                    />
                    {/*<LinearGradient colors={['#FFFFFF', '#ff9d8d', '#EC2024']} style={{flex: 1, width: '100%'}}>*/}

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
                                    justifyContent: 'flex-start',
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    marginHorizontal: 24,
                                }}>
                                    <View >
                                        <Image source={require('../../../../assets/images/logo.png')}
                                               style={{width: 130, height: 130}}
                                        />
                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextBox placeholder={getTranslationForLabel('lblUserFirstName', this.props.system.labels)}
                                                 label={getTranslationForLabel('lblUserFirstName', this.props.system.labels)}
                                                 icon={'user'}
                                                   onChangeText={(value) => {
                                                       this.setState({firstName: value});
                                                   }}
                                                 placeholderTextColor={SECONDARY_COLOUR}
                                                   style={[common.inputBox, auth.textbox]}/>
                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextBox placeholder={getTranslationForLabel('lblUserLastName', this.props.system.labels)}
                                                 label={getTranslationForLabel('lblUserLastName', this.props.system.labels)}
                                                 icon={'user'}
                                                   onChangeText={(value) => {
                                                       this.setState({lastName: value});
                                                   }}
                                                 placeholderTextColor={SECONDARY_COLOUR}
                                                   style={[common.inputBox, auth.textbox]}/>
                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextBox placeholder={getTranslationForLabel('lblEmailAddress', this.props.system.labels)}
                                                 label={getTranslationForLabel('lblEmailAddress', this.props.system.labels)}
                                                 icon={'envelope'}
                                                   keyboardType='email-address'
                                                   autoCapitalize={'none'}
                                                   onChangeText={(value) => {
                                                       this.setState({email: value});
                                                   }}
                                                 placeholderTextColor={SECONDARY_COLOUR}
                                                   style={[common.inputBox, auth.textbox]}/>
                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <TextBox placeholder={getTranslationForLabel('lblAuthRegisterValidationCode', this.props.system.labels)}
                                                 label={getTranslationForLabel('lblAuthRegisterValidationCode', this.props.system.labels)}
                                                 icon={'lock'}
                                                   onChangeText={(value) => {
                                                       this.setState({validationCode: value});
                                                   }}
                                                 placeholderTextColor={SECONDARY_COLOUR}
                                                   style={[common.inputBox, auth.textbox]}
                                                 rightComponent={this._renderValidationCodeButton()}
                                        />

                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <Password placeholder={getTranslationForLabel('lblAuthPassword', this.props.system.labels)}
                                                  label={getTranslationForLabel('lblAuthPassword', this.props.system.labels)}
                                                  icon={'lock'}
                                                  secureTextEntry={true}
                                                  onChange={(value) => {
                                                      this.setState({password: value});
                                                  }}
                                                  onBlur={() => {
                                                  }}
                                                  placeholderTextColor={SECONDARY_COLOUR}
                                                  style={common.inputBox}/>
                                    </View>
                                    <View style={{alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}>
                                        <Password placeholder={getTranslationForLabel('lblAuthConfirmPassword', this.props.system.labels)}
                                                  label={getTranslationForLabel('lblAuthConfirmPassword', this.props.system.labels)}
                                                  icon={'lock'}
                                                  secureTextEntry={true}
                                                  onChange={(value) => {
                                                      this.setState({confirmPassword: value});
                                                  }}
                                                  onBlur={() => {
                                                  }}
                                                  placeholderTextColor={SECONDARY_COLOUR}
                                                  style={common.inputBox}/>
                                    </View>
                                    <TouchableOpacity style={common.primaryButton}
                                                      onPress={() => {
                                                          this.handleRegister();
                                                      }}
                                    >
                                        <Text style={common.primaryButtonText}>
                                            {getTranslationForLabel('lblRegister', this.props.system.labels)}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={[common.h4, {marginRight: 4}]}>By pressing "Register" you agree
                                            to our</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.onOpen();
                                            }}
                                        >
                                            <Text style={[common.h4, common.secondaryButtonTextRed]}>Terms &
                                                conditions</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    {/*</LinearGradient>*/}
                    <Modalize ref={this.modalizeRef}
                              scrollViewProps={{showsVerticalScrollIndicator: false}}
                              modalTopOffset={200}
                              closeOnOverlayTap={false}
                              avoidKeyboardLikeIOS={true}
                              keyboardAvoidingBehavior={(Platform.OS === 'ios' ? 'padding' : 'height')}
                              keyboardAvoidingOffset={(Platform.OS === 'ios' ? 40 : 0)}
                              onOverlayPress={() => {
                                  alert('test');
                              }}
                    >
                        <StaticContentModal page={this.state.page}/>
                    </Modalize>
                </View>
            // </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    console.log(user);

    return {user: user,
        system: system
    };
};

export default connect(mapStateToProps, {saveLoginState})(RegisterDetailsScreen);
