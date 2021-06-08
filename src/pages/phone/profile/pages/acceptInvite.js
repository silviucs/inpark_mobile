import React, {Component} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {AppHeader} from '../../../components/appHeader';
import {MAIN_COLOUR} from '../../../../system/constants';
import {BalooRegular} from '../../../../../assets/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getUserDetails} from '../../../../system/services/profile';
import {common} from '../../../../../assets/styles/phone/common';
import {connect} from 'react-redux';
import {saveLoginState} from '../../../../redux/actions';
import {acceptFriendInvite} from '../../../../system/services/friends';
import * as RootNavigation from '../../../../navigation/phone/rootNavigation';
import {Avatar} from 'react-native-elements';
import {UserAvatar} from '../../../components/avatar';

class AcceptInviteScreen extends Component {

    state = {
        loading: true,
        uuid: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.route.params);

        if (this.props.route.params) {
            const uuid = this.props.route.params.uuid;


            getUserDetails({uuid: uuid}).then((response) => {
                this.setState({profile: response.profile});
                this.setState({loading: false});
            });
        }
    }

    acceptFriendRequest() {
        const params = {
            profile_id: this.props.user.profile.id,
            profile_uuid: this.props.user.profile.uuid,
            friend_profile_id: this.state.profile.id,
            friend_profile_uuid: this.state.profile.uuid,
        };

        console.log(params);

        acceptFriendInvite(params).then((r) => {
            this.props.navigation.navigate('Home');
        });
    }

    render() {

        if (this.state.loading) {
            return (
                <ActivityIndicator/>
            );
        }
        return (
            <View style={{flex: 1}}>
                <AppHeader/>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 8,
                    backgroundColor: 'white',
                }}>
                    <Text style={common.h2}>Hello {this.props.user.user.first_name},</Text>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('PublicProfile', {uuid: this.state.profile.user_uuid});
                    }}>
                        <UserAvatar user={this.state.profile} size={'large'}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('PublicProfile', {uuid: this.state.profile.user_uuid});
                        }}
                    >
                        <Text style={common.h3}>{this.state.profile.name} wants to be your friend</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.acceptFriendRequest();
                                }}
                            >
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon name="check" style={{color: MAIN_COLOUR, marginRight: 8, fontSize: 20}}/>
                                    <Text
                                        style={{color: MAIN_COLOUR, fontFamily: BalooRegular, fontSize: 24}}>Accept</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    RootNavigation.navigate('Profile', {screen: 'ProfileIndex'});
                                }}
                            >
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon name="times" style={{color: 'red', marginRight: 8, fontSize: 20}}/>
                                    <Text style={{color: 'red', fontFamily: BalooRegular, fontSize: 24}}>Decline</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
    }
;

export default connect(mapStateToProps, {saveLoginState})(AcceptInviteScreen);

