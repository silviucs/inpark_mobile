import React, {Component} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity, ImageBackground} from 'react-native';
// import FacebookLogin from '../../components/social/facebook';
// import AppleLogin from '../../components/social/apple';
import Icon from 'react-native-vector-icons/FontAwesome';
import {authStyles} from '../../../../assets/styles/auth';
import {connect} from 'react-redux';
import {saveSystemVariable} from '../../../redux/actions';
import {commonStyles} from '../../../../assets/styles';
import {getTranslationForLabel} from '../../../system/services/system';
import FacebookLogin from '../../components/social/facebook';
import AppleLogin from '../../components/social/apple';
import GoogleLogin from '../../components/social/google';
import {SocialConnect} from '../../components/social/social';

class AuthIndexScreen extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = () => {
        return {
            headerShown: false,
        };
    };

    render() {
        const {auth} = authStyles();
        const {common} = commonStyles(this.props.system.deviceType);

        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                width: '100%',
                alignSelf: 'stretch',
            }}>
                {/*<LinearGradient colors={['#FFFFFF', '#ff9d8d', '#EC2024']} style={{flex: 1, width: '100%'}}>*/}
                <ImageBackground source={require('../../../../assets/images/background.jpg')}
                                 style={{
                                     flex: 1,
                                     resizeMode: 'cover',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     width: null,
                                     height: null,
                                 }}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf:'stretch', backgroundColor:'rgba(255,255,255,0.35)'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 30}}>
                        <Image source={require('../../../../assets/images/logo.png')}
                               style={{width: 200, height: 200, marginTop: 50}}
                        />
                    </View>
                    <View style={{
                        flex: 2,
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        marginHorizontal: 24,
                    }}>
                        <TouchableOpacity style={common.loginButton}
                                          onPress={() => {
                                              this.props.navigation.navigate('Login');
                                          }}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="sign-in" style={[common.buttonIcon, {color: '#29001C'}]}/>
                                <Text
                                    style={common.loginButtonText}>{getTranslationForLabel('lblLogin', this.props.system.labels)}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={common.loginButton}
                                          onPress={() => {
                                              this.props.navigation.navigate('RegisterDetails');
                                          }}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Icon name="user" style={[common.buttonIcon, {color: '#29001C'}]}/>
                                <Text
                                    style={common.loginButtonText}>{getTranslationForLabel('lblRegister', this.props.system.labels)}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <SocialConnect />
                    </View>
                </ImageBackground>
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

export default connect(mapStateToProps)(AuthIndexScreen);
