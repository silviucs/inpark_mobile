import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveEntities, saveFeedState, updateEntitiesList, updateEntityLikesSockets} from '../../../redux/actions';
import {ActivityIndicator, ImageBackground, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {getUsersMeetups} from '../../../system/services/meetup';
import {common} from '../../../../assets/styles/phone/common';
import {UserAvatar} from '../../components/avatar';
import {RobotoRegular} from '../../../../assets/styles';
import {MeetupListBlock} from './components/listBlock';
import {NoMeetups} from './empty';

class MeetupsListScreen extends Component {

    state = {
        loading: true,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        getUsersMeetups(this.props.user.profile).then((r) => {
            this.setState({meetups: r.meetups});
            this.setState({loading: false});
        });
    }

    showMeetups() {
        if (this.state.meetups.length === 0) {
            return (
                <View>
                    <Text>There are no meetups</Text>
                </View>
            );
        }
        return this.state.meetups.map((item) => {
            return (
                <MeetupListBlock user={this.props.user.user} item={item}/>
            );
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <ActivityIndicator/>
            );
        }
        if (this.state.meetups.length === 0) {
            return (
                <NoMeetups />
            )
        }
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <ImageBackground source={require('../../../../assets/images/background-meetups-list.png')}
                                 style={{
                                     flex: 1,
                                     resizeMode: 'cover',
                                     justifyContent: 'center',
                                     width: null,
                                     height: null,
                                 }}>
                    <View style={{padding: 8, flex: 1}}>
                        <Text style={common.h1}>My meetups</Text>
                        <ScrollView style={{flex: 1}}>
                            {this.showMeetups()}
                        </ScrollView>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}


const mapStateToProps = (state, props) => {
    const login = state.loginReducer;
    const feed = state.feedReducer;
    const system = state.systemReducer;
    const user = state.userReducer;

    return {login, feed, system, user};
};

export default connect(mapStateToProps, {
    saveEntities,
    updateEntityLikesSockets,
    updateEntitiesList,
    saveFeedState,
})(MeetupsListScreen);
