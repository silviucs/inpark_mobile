import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    Image,
    ScrollView,
    Switch,
    StyleSheet,
    Alert,
    SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {PoppinsRegular, PoppinsSemiBold} from '../../../../assets/styles';
import {getUserConcerns, getUserDetails} from '../../../system/services/profile';
import {saveSystemVariable} from '../../../redux/actions/system';
import {saveLoginState} from '../../../redux/actions';
import {ProfileHeader} from './blocks/profileHeader';
import {ProfileTabs} from './blocks/tabs';
import {UserFriends} from './pages/friends';
import {UserMeetups} from './pages/meetups';
import {UserMemories} from './pages/memories';

let navigation = null;

class ProfileIndexScreen extends Component {

    state = {
        activeTab: 0
    };

    constructor(props) {
        super(props);
        navigation = props.navigation;
    }

    componentDidMount() {
        this.props.saveSystemVariable({prop: 'hasUpdates', value: false});
        this._getUserData();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps.system.token !== this.props.system.token) {

            this._getUserData();
        }
    }

    _getUserData() {
        getUserDetails({user_id: this.props.user.user.id}).then((response) => {
            this.setState({profile: response.profile});
            this.setState({genders: response.genders});
            this.setState({loadingProfile: false});
        });

    }

    _removeUserConcern(item) {
        alert(item.id);
    }

    static navigationOptions = () => {
        return {
            headerShown: false,
        };
    };

    async changeFaceIdSettings(value) {
        this.props.saveLoginState({prop: 'faceIdEnabled', value: value});
    }

    changeTab(value){
        this.setState({activeTab: value})
    }

    showPage(){
        switch (this.state.activeTab){
            case 0:
                return (
                    <UserMeetups />
                )
            case 1:
                return (
                    <UserFriends user={this.props.user} />
                )
            case 2:
                return (
                    <UserMemories />
                )
        }
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <ProfileHeader user={this.props.user}/>

                    <ProfileTabs activeTab={this.state.activeTab} onChangeTab={this.changeTab.bind(this)} />

                    {this.showPage()}

                    {/*<TouchableOpacity*/}
                    {/*    onPress={() => {*/}
                    {/*        doLogout().then((r) => {*/}
                    {/*            console.log(r);*/}
                    {/*            this.props.saveLoginState({prop: 'loggedIn', value: false});*/}
                    {/*        });*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <Text>Logout</Text>*/}
                    {/*</TouchableOpacity>*/}


                </ScrollView>
            </SafeAreaView>
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
        color: '#666',
        fontWeight: 'bold',
        fontFamily: PoppinsSemiBold,
        fontSize: 16,
    },
    roundBox: {
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 16,
        padding: 16,
    },
    box: {
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 12,
        marginVertical: 8,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    infoText: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 12,
        alignSelf: 'center',
    },
    icon: {
        color: '#f69689',
        fontSize: 16,
    },
    danger: {
        color: 'red',
        fontSize: 11,
        fontFamily: PoppinsRegular,
    },
});

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    return {user: user, system: system};
};

export default connect(mapStateToProps, {saveLoginState, saveSystemVariable})(ProfileIndexScreen);
