import React, {Component} from 'react';
import {View, Text, Platform, TouchableOpacity, Image, ScrollView, Switch, StyleSheet, Linking} from 'react-native';
import {connect} from 'react-redux';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {saveLoginState} from '../../../redux/actions/user';
// import TouchID from 'react-native-touch-id';
import {aboutUsBlock} from './components/aboutUsBlock';
import {BackButton} from '../../components/backButton';
import {PoppinsSemiBold, RobotoBold} from '../../../../assets/styles';
import {AppHeader} from '../../components/appHeader';
import {MAIN_COLOUR} from '../../../system/constants';

let navigation = null;

const date = new Date();

class MoreIndexScreen extends Component {

    state = {
        biometryType: '',
        faceIdEnabled: false,
        pushNotificationsEnabled: true,
        newsletterEnabled: true,
    };

    constructor(props) {
        super(props);
        navigation = props.navigation;
    }

    componentDidMount() {
        // TouchID.isSupported()
        //     .then(biometryType => {
        //         console.log(biometryType);
        //         this.setState({biometryType: biometryType});
        //     });

    }


    static navigationOptions = () => {
        return {
            headerShown: false,
        };
    };

    async changeFaceIdSettings(value) {
        this.props.saveLoginState({prop: 'faceIdEnabled', value: value});
    }

    showFaceIdToggle = () => {
        if (Platform.OS === 'ios') {
            return (
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Icon name="fingerprint" style={styles.icon}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Text>FaceID / TouchId</Text>
                    </View>
                    <View style={{alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center', height: 40}}>
                        <Switch
                            style={{transform: [{scaleX: .8}, {scaleY: .8}]}}
                            trackColor={{false: '#FCFCFC', true: '#4faede'}}
                            thumbColor={this.props.user.faceIdEnabled ? '#FCFCFC' : '#FFF'}
                            ios_backgroundColor="#FCFCFC"
                            onValueChange={(value) => {
                                this.changeFaceIdSettings(value);
                            }}
                            value={this.props.user.faceIdEnabled}
                        />
                    </View>
                </View>
            );
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <AppHeader/>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{flex: 1, alignSelf: 'stretch', marginVertical: 24}}>

                        {aboutUsBlock(navigation)}
                        <View>
                            <View style={{paddingHorizontal: 10}}>
                                <Text style={styles.title}>Let's talk</Text>
                            </View>
                            <View style={styles.roundBox}>

                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Icon name="envelope" style={styles.icon}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('Contact');
                                        }}>
                                            <Text>Contact us</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.iconWrapper}>
                                        <Icon name="comment-dots" style={styles.icon}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate('Feedback');
                                            }}
                                        >

                                            <Text>Feedback</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.rowBorderless}>
                                    <View style={styles.iconWrapper}>
                                        <Icon name="headset" style={styles.icon}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate('Support');
                                            }}
                                        >

                                            <Text>Support</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{paddingHorizontal: 10}}>
                                <Text style={styles.title}>Follow us on</Text>
                            </View>
                            <View style={styles.roundBox}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Linking.openURL('https://www.facebook.com/InParkToday/');
                                            }}
                                        >
                                            <Icon name="facebook" style={[styles.socialIcon, {color: '#1877f2'}]}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Linking.openURL('https://www.instagram.com/appbeautysecrets/');
                                            }}
                                        >
                                            <Icon name="instagram" style={[styles.socialIcon, {color: '#8a3ab9'}]}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                Linking.openURL('https://twitter.com/InParkToday');
                                            }}
                                        >
                                            <Icon name="twitter" style={[styles.socialIcon, {color: '#00acee'}]}/>
                                        </TouchableOpacity>
                                    </View>
                                    {/*<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>*/}
                                    {/*    <TouchableOpacity*/}
                                    {/*        onPress={() => {*/}
                                    {/*            Linking.openURL('https://www.linkedin.com/company/beauty-secrets-uk');*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        <Icon name='linkedin' style={[styles.socialIcon, {color: '#0e76a8'}]}/>*/}
                                    {/*    </TouchableOpacity>*/}
                                    {/*</View>*/}
                                </View>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: 10}}>
                            <Text style={styles.title}>Communication</Text>
                        </View>
                        <View style={styles.roundBox}>

                            <View style={styles.row}>
                                <View style={styles.iconWrapper}>
                                    <Icon name="bell" style={styles.icon}/>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text>Push Notifications</Text>
                                </View>
                                <View style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40,
                                }}>
                                    <Switch
                                        style={{transform: [{scaleX: .8}, {scaleY: .8}]}}
                                        trackColor={{false: '#FCFCFC', true: MAIN_COLOUR}}
                                        thumbColor={this.state.pushNotificationsEnabled ? '#FCFCFC' : '#FFF'}
                                        ios_backgroundColor="#FCFCFC"
                                        onValueChange={(value) => this.setState({pushNotificationsEnabled: value})}
                                        value={this.state.pushNotificationsEnabled}
                                    />
                                </View>
                            </View>
                            <View style={styles.rowBorderless}>
                                <View style={styles.iconWrapper}>
                                    <Icon name="mail-bulk" style={styles.icon}/>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text>Newsletters</Text>
                                </View>
                                <View style={{
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 40,
                                }}>
                                    <Switch
                                        style={{transform: [{scaleX: .8}, {scaleY: .8}]}}
                                        trackColor={{false: '#FCFCFC', true: MAIN_COLOUR}}
                                        thumbColor={this.state.newsletterEnabled ? '#FCFCFC' : '#FFF'}
                                        ios_backgroundColor="#FCFCFC"
                                        onValueChange={(value) => this.setState({newsletterEnabled: value})}
                                        value={this.state.newsletterEnabled}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{marginVertical: 16}}>
                        <Text style={styles.infoText}>
                            1.0.0
                        </Text>
                        <Text style={styles.infoText}>
                            @{date.getFullYear()} InPark Today.
                        </Text>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={styles.infoText}>
                                developed by
                            </Text>
                            <TouchableOpacity style={{marginVertical: 4}}
                                              onPress={() => {
                                                  Linking.openURL('https://siantech.net');
                                              }}
                            >
                                <Image source={require('../../../../assets/images/logo-siantech.png')} style={{height: 50, width: 150}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', height: 40, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC',
    },
    rowBorderless: {
        flexDirection: 'row', height: 40, alignItems: 'center',
    },
    title: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 14,
    },
    roundBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 16,
        padding: 16,
    },
    infoText: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 12,
        alignSelf: 'center',
    },
    buttonText: {
        color: MAIN_COLOUR,
        fontWeight: 'bold',
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: RobotoBold,
    },
    iconWrapper: {
        width: 30,
        alignItems: 'flex-start',
    },
    icon: {
        color: MAIN_COLOUR,
        fontSize: 16,
    },
    socialIcon: {
        fontSize: 40,
        marginHorizontal: 8,
    },
});

const mapStateToProps = (state) => {
    const user = state.userReducer;

    return {user: user};
};

export default connect(mapStateToProps, {saveLoginState})(MoreIndexScreen);
