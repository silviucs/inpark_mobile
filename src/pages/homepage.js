import React, {Component} from 'react';
import DeviceInfo from 'react-native-device-info';
import PhoneApp from './phone';
import {Platform, NativeModules, AppState, Appearance, View, Text, TouchableOpacity, Linking} from 'react-native';
import {LoadingActivityIndicator} from './components/loadingActivityIndicator';
import {generatePlatformToken, getSystemTranslations, setDeviceId} from '../system/services/system';
import {connect} from 'react-redux';
import {saveSystemVariable} from '../redux/actions';
import TabletApp from './tablet';
import OneSignal from 'react-native-onesignal';
import {ONESIGNAL_APP_ID} from '../system/constants';
import * as RootNavigation from '../navigation/phone/rootNavigation'
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {common} from '../../assets/styles/phone/common';

class Homepage extends Component {

    state = {
        loading: true,
        appState: AppState.currentState,
        lastActive: 0,
        labels: [],
        redirectTo: null,
        permissionBlocked: null,

    };

    constructor(props) {
        super(props);
        this._handleOpenNotification.bind(this);
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        OneSignal.setAppId(ONESIGNAL_APP_ID);
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);

        if (Platform.OS == 'ios') {
            OneSignal.promptForPushNotificationsWithUserResponse(response => {
                this.OSLog('Prompt response:', response);
            });
        }
        /* O N E S I G N A L  H A N D L E R S */
        OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
            this.OSLog('OneSignal: notification will show in foreground:', notifReceivedEvent);
            let notif = notifReceivedEvent.getNotification();

            const button1 = {
                text: 'Cancel',
                onPress: () => {
                    notifReceivedEvent.complete();
                },
                style: 'cancel',
            };

            const button2 = {
                text: 'Complete', onPress: () => {
                    notifReceivedEvent.complete(notif);
                },
            };

            // Alert.alert('Complete notification?', 'Test', [button1, button2], {cancelable: true});
        });
        OneSignal.setNotificationOpenedHandler(notification => {
            this._handleOpenNotification(notification)
        });
        OneSignal.setInAppMessageClickHandler(event => {
            this.OSLog('OneSignal IAM clicked:', event);
        });
        OneSignal.addEmailSubscriptionObserver((event) => {
            this.OSLog('OneSignal: email subscription changed: ', event);
        });
        OneSignal.addSubscriptionObserver(async event => {
            // this.setState({isSubscribed: event.to.isSubscribed});
            if (event.to.isSubscribed) {
                const state = await OneSignal.getDeviceState();
                this.handleNotificationDevice(state).then((r) => {
                    console.log(r);
                });
            }
        });

        OneSignal.addPermissionObserver(async event => {
            console.log('OneSignal: permission changed:' + JSON.stringify(event));

            const state = await OneSignal.getDeviceState();
            if(state.userId) {
                this.handleNotificationDevice(state).then((response) => {
                    console.log('device id stored');
                });
            }
        });

        this.checkForPermissions();
        this.getDeviceType();
        this.getSystemLocale();
    }

    _handleOpenNotification(notification){
        console.log('OneSignal: notification opened:', notification);
        const data = notification.notification.additionalData;
        if(data.type == 'friendship_invitation_accept'){
            console.log('notification first');
            console.log('uuid', data.uuid);
            // this.props.navigation.navigate('PublicProfile', {uuid: data.uuid});
            // this.props.saveSystemVariable({prop: 'redirectTo', value: 'MeetupsList'});
            // this.setState({redirectTo: 'MeetupsList'});
            RootNavigation.navigate('Profile', { screen: 'PublicProfile', params: {uuid: data.uuid, redirectTo: 'ProfileIndex' }});
        }
    }

    _handleAppStateChange = nextAppState => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
            const lastActive = this.props.system.lastActive;
            const newTime = (new Date()).getTime();
            const diff = newTime - lastActive;
            console.log((diff / 1000) / 60);
            if (Math.floor((diff / 1000) / 60) >= 15) {
                console.log('diff: ' + diff);
                this.props.saveSystemVariable({prop: 'token', value: (new Date()).getTime()});
            }
        } else {
            console.log('app went to background');
            const lastActive = (new Date()).getTime();
            this.props.saveSystemVariable({prop: 'lastActive', value: lastActive});
        }
        this.setState({appState: nextAppState});

    };

    checkForPermissions(){
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    console.log('The permission has not been requested / is denied but requestable');
                    // this.setState({permissionBlocked: true});
                    break;
                case RESULTS.LIMITED:
                    console.log('The permission is limited: some actions are possible');
                    break;
                case RESULTS.GRANTED:
                    console.log('The permission is granted');
                    break;
                case RESULTS.BLOCKED:
                    console.log('The permission is denied and not requestable anymore');
                    this.setState({permissionBlocked: true});
                    break;
            }
        })
    }

    OSLog = (message: string, optionalArg?: Object) => {

        if (optionalArg) {
            message = message + JSON.stringify(optionalArg);
        }

        let consoleValue;

        if (this.state.consoleValue) {
            consoleValue = this.state.consoleValue + '\n' + message;
        } else {
            consoleValue = message;
        }
        this.setState({consoleValue});
    };

    async handleNotificationDevice(event) {
        setDeviceId(event.userId).then(() => {
            console.log('deviceID saved ' + event.userId);
        });
        generatePlatformToken(event).then((response) => {
            // this.setState({loading: false});
        });

    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    getDeviceType() {
        let deviceType = 'phone';

        if (DeviceInfo.isTablet()) {
            deviceType = 'tablet';
        }

        this.props.saveSystemVariable({prop: 'deviceType', value: deviceType});
    }

    getSystemLocale() {
        let locale;
        if (Platform.OS === 'ios') {
            // iOS:
            locale = NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
        } else {
            // Android:
            locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
        }

        const language = locale.substring(0, 2);

        getSystemTranslations(language).then(async (response) => {
            const json = await response.json();
            const labels = json.labels;

            this.props.saveSystemVariable({prop: 'labels', value: labels});
            this.setState({loading: false});
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        if(this.state.permissionBlocked){
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 16}}>
                    <Text style={common.h1}>Required permissions missing</Text>
                    <Text style={common.h3}>InParkToday doesn't have the required permissions to deliver you the best experience.</Text>
                    <Text style={common.h3}>Please go to Settings and make sure you enable them.</Text>
                    <TouchableOpacity
                        style={common.primaryButton}
                        onPress={() => {
                            Linking.openURL('app-settings:')
                        }}
                    >
                        <Text style={common.primaryButtonText}>Open settings</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        if (this.state.loading) {
            return (
                <LoadingActivityIndicator/>
            );
        }

        if(this.props.system.redirectTo == 'MeetupsList'){
            // this.props.navigation.navigate(this.state.redirectTo)
        }

        if (this.props.system.deviceType === 'tablet') {
            return (
                <TabletApp/>
            );
        } else {
            return (
                <PhoneApp/>
            );
        }
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

export default connect(mapStateToProps, {saveSystemVariable})(Homepage);
