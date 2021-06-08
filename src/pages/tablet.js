import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveSystemVariable} from '../redux/actions/system';
import AnonymousStackNavigator from '../navigation/tablet/anonymous';
import AuthenticatedTabNavigator from '../navigation/tablet/authenticated';

class TabletApp extends Component{

    render() {
        if (!this.props.user.loggedIn) {
            return (
                <AnonymousStackNavigator/>
            );
        }
        return (
            <AuthenticatedTabNavigator />
        );
    }
}

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    return {user: user, system: system};
};

export default connect(mapStateToProps, {saveSystemVariable})(TabletApp);
