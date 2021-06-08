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
import {Card, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PoppinsRegular, PoppinsSemiBold} from '../../../../assets/styles';
import {UserAvatar} from '../../components/avatar';
import {getUserConcerns, getUserDetails} from '../../../system/services/profile';
import {saveSystemVariable} from '../../../redux/actions/system';
import {MAIN_COLOUR} from '../../../system/constants';
import {saveLoginState} from '../../../redux/actions';
import {FriendsBlock} from './blocks/friendsBlock';
import {doLogout} from '../../../system/services/auth';

let navigation = null;

class ProfileIndexScreen extends Component {

    state = {
        biometryType: '',
        faceIdEnabled: false,
        pushNotificationsEnabled: true,
        loadingConcerns: true,
        loadingTreatments: false,
        loadingTools: true,
        loadingProducts: true,
        loadingProfile: true,
        treatments: this.props.system.treatments,
        total: this.props.system.total,
        key: this.props.system.token
    };

    constructor(props) {
        super(props);
        navigation = props.navigation;
    }

    componentDidMount() {
        this.props.saveSystemVariable({prop: "hasUpdates", value: false});
        this._getUserData()
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps.system.token !== this.props.system.token) {

            this._getUserData();
        }
    }

    _getUserData(){
        getUserDetails({user_id: this.props.user.user.id}).then((response) => {
            this.setState({profile: response.profile});
            this.setState({genders: response.genders});
            this.setState({loadingProfile: false});
        })

    }

    _removeUserConcern(item){
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

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1, alignSelf: 'stretch'}}>
                    <View style={{
                        alignSelf: 'stretch',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        backgroundColor: 'white',
                        padding: 16,
                        marginBottom: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('UserProfile', {profile: this.state.profile, genders: this.state.genders})
                            }}
                            style={{alignSelf: 'stretch'}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
                                <View>
                                    <UserAvatar user={this.props.user.user}/>
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Text
                                        style={styles.username}>{this.props.user.user.first_name} {this.props.user.user.last_name}</Text>
                                    <Text style={styles.info}>My account details</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FriendsBlock loadingFriends={false} user={this.props.user} />
                        <TouchableOpacity
                            onPress={() => {
                                doLogout().then((r) => {
                                    console.log(r);
                                    this.props.saveLoginState({prop: 'loggedIn', value: false})
                                })
                            }}
                        >
                            <Text>Logout</Text>
                        </TouchableOpacity>


                    </ScrollView>
                </View>
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
    username: {
        fontSize: 18,
        fontFamily: PoppinsSemiBold,
    },
    info: {
        color: MAIN_COLOUR,
        fontSize: 11,
        fontFamily: PoppinsRegular,
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

    console.log(user)
    return {user: user, system: system};
};

export default connect(mapStateToProps, {saveLoginState, saveSystemVariable})(ProfileIndexScreen);
