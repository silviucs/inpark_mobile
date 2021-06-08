import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveSystemVariable} from '../redux/actions/system';
import AnonymousStackNavigator from '../navigation/phone/anonymous';
import AuthenticatedTabNavigator from '../navigation/phone/authenticated';
import {LoadingActivityIndicator} from './components/loadingActivityIndicator';
import {View} from 'react-native';
import {OverlayActivityIndicator} from './components/overlayActivityIndicator';

class PhoneApp extends Component {

    render() {
        if (!this.props.user.loggedIn) {
            return (
                <View style={{flex: 1}}>
                    <AnonymousStackNavigator/>
                    {/*<OverlayActivityIndicator />*/}
                </View>
            );
        }
        return (
            <AuthenticatedTabNavigator/>
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    return {user: user, system: system};
};

export default connect(mapStateToProps, {saveSystemVariable})(PhoneApp);
