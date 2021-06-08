import React, {Component, createRef} from 'react';
import {
    Alert, Image, KeyboardAvoidingView,
    Platform, Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View,
} from 'react-native';
import {common, PoppinsRegular, PoppinsSemiBold} from '../../../../../assets/styles';
import {BackButton} from '../../../components/backButton';
import {Button, Header, Input} from 'react-native-elements';
import {UserAvatar} from '../../components/avatar';
import {connect} from 'react-redux';
import {Modalize} from 'react-native-modalize';
import {AnswerTypeAge} from '../../quiz/answer_types/age';
import AnswerTypeList from '../../quiz/answer_types/list';
import {ChangePasswordBlock} from '../components/changePassword';
import {sendUserChangePassword} from '../../../../system/services/auth';
import moment from 'moment';
import {GendersBlock} from '../components/genders';
import {BirthdayBlock} from '../components/birthday';
import {saveLoginState} from '../../../../redux/actions/user';
import {updateUserDetails} from '../../../../system/services/profile';

class UserProfileScreen extends Component {

    state = {
        loading: true,
        first_name: this.props.user.user.first_name,
        last_name: this.props.user.user.last_name,
        profile: this.props.route.params.profile,
        genders: this.props.route.params.genders,
        selectedGender: [this.props.route.params.profile.gender],
    };

    constructor(props) {
        super(props);
    }

    modalizeRef = createRef();

    onOpen() {
        this.modalizeRef.current?.open();
    };

    onClose() {
        this.modalizeRef.current?.close();
    };

    _renderPageHeader() {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}>
                <View>
                    <UserAvatar user={this.props.user.user} size='small' fontSize={16}/>
                </View>
                <View style={{flexDirection: 'column'}}>
                    <Text
                        style={styles.username}>{this.props.user.user.first_name} {this.props.user.user.last_name}</Text>
                </View>
            </View>
        );
    }

    _renderBirthdateInput() {
        return (
            <Pressable
                style={{alignSelf: 'stretch', flex: 1, flexGrow: 1}}
                onPress={() => {
                    this.setState({modalAction: 'showBirthday'});
                    this.renderModalComponent();
                    this.onOpen();
                }}
            >
                <View style={{alignSelf: 'stretch', flex: 1}} pointerEvents='none'>
                    <Input
                        editable={false}
                        placeholder='Date of birth'
                        onFocus={() => {

                        }}
                        value={moment(this.state.profile.birthdate).format('DD-MM-YYYY')}
                        rightIcon={{type: 'font-awesome', name: 'calendar', color: '#f69689', size: 20}}
                        inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}
                    />
                </View>
            </Pressable>
        );
    }

    _renderGenderInput() {
        return (
            <Pressable
                style={{alignSelf: 'stretch', flex: 1, flexGrow: 1}}
                onPress={() => {
                    this.setState({modalAction: 'showGender'});
                    this.renderModalComponent();
                    this.onOpen();
                }}
            >
                <View style={{alignSelf: 'stretch', flex: 1}} pointerEvents='none'>
                    <Input
                        placeholder='Gender'
                        value={this.state.profile.gender_name}
                        rightIcon={{type: 'font-awesome', name: this.state.profile.gender_icon, color: '#f69689', size: 20}}
                        inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}
                    />
                </View>
            </Pressable>
        );
    }

    _renderPersonalDetails() {
        let view;
        if (this.props.user.user.social_provider) {
            view = (
                <View style={styles.roundBox}>
                    <View style={styles.row}>
                        <Input
                            placeholder='First name'
                            disabled={true}
                            value={this.props.user.user.first_name}
                            rightIcon={{type: 'font-awesome', name: 'user', color: '#f69689', size: 20}}
                            inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}
                        />
                    </View>
                    <View style={styles.row}>
                        <Input
                            placeholder='Last name'
                            disabled={true}
                            value={this.props.user.user.last_name}
                            rightIcon={{type: 'font-awesome', name: 'users', color: '#f69689', size: 20}}
                            inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}

                        />
                    </View>
                    <View style={styles.row}>
                        {this._renderBirthdateInput()}
                    </View>
                    <View style={styles.row}>
                        {this._renderGenderInput()}
                    </View>
                    <View style={{margin: 12}}>
                        <TouchableOpacity
                            onPress={() => {
                                this._handleProfileUpdate();
                            }}
                            style={common.primaryButtonRed}>
                            <Text style={common.primaryButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            view = (
                <View style={styles.roundBox}>
                    <View style={styles.row}>
                        <Input
                            placeholder='First name'
                            value={this.state.first_name}
                            onChangeText={(value) => {
                                this.setState({first_name: value})
                            }}
                            rightIcon={{type: 'font-awesome', name: 'user', color: '#f69689', size: 20}}
                            inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}
                        />
                    </View>
                    <View style={styles.row}>
                        <Input
                            placeholder='Last name'
                            value={this.state.last_name}
                            onChangeText={(value) => {
                                this.setState({last_name: value})
                            }}
                            rightIcon={{type: 'font-awesome', name: 'users', color: '#f69689', size: 20}}
                            inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}

                        />
                    </View>
                    <View style={styles.row}>
                        <Input
                            editable={false}
                            placeholder='Email'
                            value={this.props.user.user.email}
                            rightIcon={{type: 'font-awesome', name: 'envelope', color: '#f69689', size: 20}}
                            inputStyle={{fontSize: 14, fontFamily: PoppinsSemiBold}}
                        />
                    </View>
                    <View style={styles.row}>
                        {this._renderBirthdateInput()}
                    </View>
                    <View style={styles.row}>
                        {this._renderGenderInput()}
                    </View>
                    <View style={{margin: 12}}>
                        <Button
                            refs="detailsButton"
                            // raised
                            large
                            containerStyle={styles.buttonContainer}
                            buttonStyle={common.primaryButtonRed}
                            iconRight
                            icon={{
                                name: 'content-save',
                                type: 'material-community',
                                color: 'white',
                            }}
                            title='Save details'
                            onPress={() => {
                                this._handleProfileUpdate();
                            }}/>
                    </View>
                </View>
            );


        }
        return (
            <View style={{marginTop: 24, marginBottom: 8}}>
                <View style={{paddingHorizontal: 10}}>
                    <Text style={styles.title}>My personal details</Text>
                </View>
                {view}
            </View>
        );
    }

    _handleProfileUpdate() {
        if(!this.state.first_name || !this.state.last_name){
            Alert.alert("Missing fields", "Your first and last name are required.");
            return false;
        }
        const params = {
            user_id: this.props.user.user.id,
            user_uuid: this.props.user.user.uuid,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            gender: this.state.profile.gender,
            birthdate: this.state.profile.birthdate,
        };

        updateUserDetails(params).then((response) => {
            alert('Your profile was update');
            const token = (new Date()).getTime();
            let user = this.props.user.user;
            user.first_name = this.state.first_name;
            user.last_name = this.state.last_name;
            this.props.saveLoginState({prop: 'user', value: user});
            this.props.navigation.navigate('ProfileIndex', {token: token});
        });
    }

    renderModalComponent() {
        const action = this.state.modalAction;
        const entity = this.state.modalEntity;

        switch (action) {
            default:
            case 'showBirthday':
                return (
                    <BirthdayBlock
                        date={this.state.profile.birthdate}
                        onDateChange={this._onBirthdaySelect.bind(this)}
                        onConfirmAnswer={this.onClose.bind(this)}
                    />
                );
                break;
            case 'showGender':
                return (
                    <GendersBlock genders={this.state.genders}
                                  onAnswerClick={this._onGenderSelect.bind(this)}
                                  selectedAnswers={this.state.selectedGender}
                                  onConfirmAnswer={this.onClose.bind(this)}
                    />
                );
                break;
        }
    }

    _onGenderSelect(item) {
        let select = [];
        select.push(item.id);
        let profile = this.state.profile;
        profile.gender_name = item.gender;
        profile.gender_icon = item.icon;
        profile.gender = item.id;

        this.setState({profile: profile});
        this.setState({selectedGender: select});
    }

    _onBirthdaySelect(value) {
        let profile = this.state.profile;
        profile.birthdate = value;
        this.setState({profile: profile});
    }

    _renderChangePassword() {
        if (!this.props.user.user.social_provider) {
            return (
                <View style={{marginVertical: 16}}>
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={styles.title}>Change password</Text>
                    </View>
                    <ChangePasswordBlock
                        onUpdateState={this._updateState.bind(this)}
                        handleChangePassword={this._handleChangePassword.bind(this)}/>
                </View>
            );
        } else {
            return (
                <></>
            );
        }
    }


    _updateState(obj) {
        this.setState(obj);
    }

    _handleChangePassword() {
        if (this.state.newPassword != this.state.confirmPassword) {
            Alert.alert('Confirm password', 'Please be sure your both new and confirm password match!');
            return false;
        }

        const params = {
            user_uuid: this.props.user.user.uuid,
            current_password: this.state.currentPassword,
            new_password: this.state.newPassword,
        };

        console.log(params);

        sendUserChangePassword(params).then(async (response) => {
            console.log(response.status);
            if (response && response.status != 200) {
                Alert.alert('Something went wrong', 'Your current password is wrong ...');
                return false;
            }
            Alert.alert('Password changed', 'Your password was changed', [
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.saveLoginState({prop: 'loggedIn', value: false});
                    },
                },
            ]);
        });
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center'}}>
                <Header
                    containerStyle={{backgroundColor: 'white', borderBottomColor: '#A9A9A9', borderBottomWidth: 1}}
                    centerComponent={this._renderPageHeader()}
                    leftComponent={BackButton(this.props.navigation)}
                    // rightComponent={this.showUpdateButton()}
                />
                <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
                                      behavior={Platform.OS == 'ios' ? 'padding' : 'height'} enabled keyboardVerticalOffset={0}>
                    <ScrollView style={{flex: 1, alignSelf: 'stretch'}} showsVerticalScrollIndicator={false}>
                        {this._renderPersonalDetails()}
                        {this._renderChangePassword()}
                        <View style={styles.logoutBox}>
                            <View style={styles.iconWrapper}>
                                {/*<Icon name='sign-out-alt' style={[styles.icon, {color: '#f69689'}]}/>*/}
                                <Image source={require('../../../../../assets/images/logout.png')}
                                       style={{width: 24, height: 24, marginRight: 8}}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    Alert.alert("Logout", "Are you sure you want to logout?", [
                                        {
                                            text: "Cancel"
                                        },
                                        {
                                            text: "Logout",
                                            style: 'destructive',
                                            onPress: () => {
                                                this.props.saveLoginState({prop: 'loggedIn', value: false});
                                                this.props.saveLoginState({prop: 'user', value: null});
                                                this.props.saveLoginState({prop: 'profile', value: null});
                                            }
                                        }
                                    ])
                                }}
                            >
                                <Text style={{color: '#f69689', fontFamily: PoppinsSemiBold}}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Modalize ref={this.modalizeRef}
                          scrollViewProps={{showsVerticalScrollIndicator: false}}
                          modalHeight={350}
                          closeOnOverlayTap={false}
                          avoidKeyboardLikeIOS={true}
                          keyboardAvoidingBehavior={(Platform.OS === 'ios' ? 'padding' : 'height')}
                          keyboardAvoidingOffset={(Platform.OS === 'ios' ? 40 : 0)}
                >
                    {this.renderModalComponent()}
                </Modalize>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8,
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
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2,
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
    iconWrapper: {
        width: 30,
        alignItems: 'flex-start',
    },
    icon: {
        color: '#f69689',
        fontSize: 16,
    },
    username: {
        fontSize: 16,
        fontFamily: PoppinsSemiBold,
    },
    info: {
        color: '#f69689',
        fontSize: 11,
        fontFamily: PoppinsRegular,
    },
    danger: {
        color: 'red',
        fontSize: 11,
        fontFamily: PoppinsRegular,
    },
    logoutBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 16,
    }
});

const mapStateToProps = (state) => {
    const user = state.userReducer;
    const system = state.systemReducer;

    return {user: user, system: system};
};

export default connect(mapStateToProps, {saveLoginState})(UserProfileScreen);
