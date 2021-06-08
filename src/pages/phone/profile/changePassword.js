import React, {Component} from 'react';
import {common} from '../../../../assets/styles';
import {Alert, View, StyleSheet} from 'react-native';
import {Password} from '../../components/passwordInputText';
import {Button, Header} from 'react-native-elements';
import {BackButton} from '../../components/backButton';
// import {updateUserPassword} from "../../system/apis/account";
import {connect} from 'react-redux';
import {saveLoginState} from '../../../redux/actions/user';
import * as Animatable from 'react-native-animatable';
import {IconHeader} from '../../components/iconHeader';
import {sendUserChangePassword} from '../../../system/services/auth';

class ChangePasswordScreen extends Component {

    state = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    static navigationOptions = () => {
        return {
            headerShown: false,
        };
    };

    handleChangePassword() {
        if (this.state.newPassword != this.state.confirmPassword) {
            Alert.alert('Confirm password', 'Please be sure your both new and confirm password match!');
            return false;
        }

        const params = {
            user_uuid: this.props.user.user.uuid,
            current_password: this.state.currentPassword,
            new_password: this.state.newPassword
        }

        console.log(params);

        sendUserChangePassword(params).then(async (response) => {
            console.log(response.status);
            if(response && response.status != 200) {
                Alert.alert('Something went wrong', "Your current password is wrong ...");
                return false;
            }
            Alert.alert('Password changed', 'Your password was changed', [
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.saveLoginState({prop: 'loggedIn', value: false});
                    }
                }
            ]);
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    containerStyle={{backgroundColor: 'white'}}
                    centerComponent={{
                        text: 'Change password',
                        style: {color: '#f69689', fontSize: 18, fontWeight: 'bold'},
                    }}
                    leftComponent={BackButton(this.props.navigation)}
                    barStyle='light-content'
                />
                <View style={common.container}>
                    <IconHeader icon={'lock'} containerStyle={{paddingTop: 50}} />
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 16,
                        alignSelf: 'stretch',
                    }}>
                        <View style={{alignSelf: 'stretch'}}>
                            <Password placeholder='Current password'
                                      style={common.inputBox}
                                      onChange={(password) => {
                                          this.setState({currentPassword: password});
                                      }}
                            />
                        </View>
                        <View style={{alignSelf: 'stretch'}}>
                            <Password placeholder='New password'
                                      style={common.inputBox}
                                      onChange={(password) => {
                                          this.setState({newPassword: password});
                                      }}
                            />
                        </View>
                        <View style={{alignSelf: 'stretch'}}>
                            <Password placeholder='Confirm password'
                                      style={common.inputBox}
                                      onChange={(password) => {
                                          this.setState({confirmPassword: password});
                                      }}
                            />
                        </View>
                        <Animatable.View animation="fadeInUp" useNativeDriver duration={200} delay={600}
                                         style={{alignSelf: 'stretch'}}
                        >
                            <Button
                                refs="loginButton"
                                // raised
                                large
                                containerStyle={loginPageStyles.buttonContainer}
                                buttonStyle={common.primaryButtonRed}
                                iconRight
                                icon={{
                                    name: 'lock-reset',
                                    type: 'material-community',
                                    color: 'white',
                                }}
                                title='Change password'
                                onPress={() => {
                                    this.handleChangePassword();
                                }}/>
                        </Animatable.View>
                    </View>
                </View>
            </View>
        );
    }
}

const loginPageStyles = StyleSheet.create({
    logo: {
        height: 100,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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

const mapStateToProps = (state) => {
    const user = state.userReducer;

    return {user: user};
};

export default connect(mapStateToProps, {saveLoginState})(ChangePasswordScreen);
