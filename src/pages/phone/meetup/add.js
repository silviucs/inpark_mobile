import React, {Component, createRef} from 'react';
import {ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {common} from '../../../../assets/styles/phone/common';
import {AppHeader} from '../../components/appHeader';
import {BalooRegular, map, PoppinsRegular, PoppinsSemiBold} from '../../../../assets/styles';
import {TextBox} from '../../components/textbox';
import {searchGeocoding} from '../../../system/services/location';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Callout, PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';
import {connect} from 'react-redux';
import {saveEntities, saveFeedState, updateEntitiesList, updateEntityLikesSockets} from '../../../redux/actions';
import {UserAvatar} from '../../components/avatar';
import {MAIN_COLOUR} from '../../../system/constants';
import WeatherWidget from '../../widgets/weather/weather';
import DailyWeatherWidget from '../../widgets/weather/dailyWeather';
import CalendarPicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {saveUserMeetup} from '../../../system/services/meetup';
import {MeetupPrivacy} from './components/meetup_privacy';
import {MeetupDateAndTime} from './components/meetup_when';
import {MeetupType} from './components/meetup_type';
import {Modalize} from 'react-native-modalize';
import {InviteFriends} from './components/friends';
import {getCoreMeetupTypes} from '../../../system/services/core';

let _mapView: MapView;
const latitudeDelta = 0.009;
const longitudeDelta = 0.009;
let date = new Date();
date.setMinutes(0);


class NewMeetupScreen extends Component {

    state = {
        loading: true,
        searchResults: null,
        latitudeDelta: longitudeDelta,
        longitudeDelta: longitudeDelta,
        meetupHour: date,
        meetupDate: date,
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        // let locationLoaded = false;
        await this.findCoordinates();
        const types = await getCoreMeetupTypes();
        this.setState({types: types.types});
        this.setState({loading: false});
    }

    modalizeRef = createRef();

    onOpen() {
        this.modalizeRef.current?.open();
    };

    findCoordinates = async () => {
        Geolocation.getCurrentPosition(location => {
            this.setState({coordinates: {latitude: location.coords.latitude, longitude: location.coords.longitude}});
            let markers = [];

            markers.push({
                coordinates: {latitude: location.coords.latitude, longitude: location.coords.longitude},
                title: 'You are here',
                id: 1,
            });

            this.setState({markers: markers});
            const region = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.longitudeDelta,
            };

            this.setState({
                regionX: region,
            });

            // save user's initial location
            // const params = {
            //     coordinates: {latitude: location.coords.latitude, longitude: location.coords.longitude},
            //     user_id: this.props.user.user.id,
            //     user_uuid: 12345,
            //     event_uuid: 1234,
            //     event_id: 1,
            // };

            // updateUserLocation(params).then((response) => {
            //     console.log(response);
            //
            // }).catch((error) => {
            //     console.log(error);
            // });

            // this.setState({loading: false});
            return true;
        });
    };

    async searchAddress(query) {
        // this.setState({loading: true});
        try {
            await searchGeocoding(query).then((locations) => {
                const addresses = locations['addresses'];

                if (addresses.length == 0) {
                    Alert.alert('Not found', 'The address you enter was not found. Try to be more explicit!');
                    return false;
                }

                this.setState({searchResults: addresses});
                console.log(locations);

                const markers = [{
                    coordinates: {latitude: addresses[0].latitude, longitude: addresses[0].longitude},
                    title: addresses[0].formatted_address,
                }];
                this.setState({coordinates: {longitude: addresses[0].longitude, latitude: addresses[0].latitude}});
                this.setState({markers: markers});
                this.setState({loadingGPSDetails: false});

                const region = {
                    latitude: addresses[0].latitude,
                    longitude: addresses[0].longitude,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta,
                };

                this.setState({
                    regionX: region,
                });

                this._mapView.animateToRegion({
                    latitude: addresses[0].latitude,
                    longitude: addresses[0].longitude,
                }, 1000);

                this._mapView.setCamera({
                    center: {
                        latitude: addresses[0].latitude,
                        longitude: addresses[0].longitude,
                    },
                }, {duration: 1200});
                // this.setState({loading: false});
            });
        } catch (e) {
            console.log(e);
        }
    }

    showSearchResults() {
        if (this.state.searchResults.length > 0) {
            return this.state.searchResults.map((item) => {
                return (
                    <View>
                        <Text>{item.formatted_address}</Text>
                    </View>
                );
            });
        }
    }

    markerCalloutView() {
        return (
            <View style={{flex: 1}}>
                <Text>Add MeetUp here!</Text>
            </View>
        );

    }

    showSearchIconButton() {
        return (
            <TouchableOpacity
                onPress={() => {
                    const query = this.state.query;

                    this.searchAddress(query).then(r => {
                        console.log(r);
                    });
                }}
            >
                <Icon name={'search'}/>
            </TouchableOpacity>
        );
    }

    selectPrivacy(value) {
        this.setState({privacy: value});
    }

    selectCategory(value) {
        this.setState({category: value});
    }

    openCalendarDate() {
        this.setState({modalAction: 'selectDate'});
        this.onOpen();
    }

    openCalendarHour() {
        this.setState({modalAction: 'selectHour'});
        this.onOpen();
    }

    showInviteFriends() {
        if (this.state.privacy === 2) {
            return (
                <InviteFriends/>
            );
        }

        return (
            <View>
                <Text style={{fontFamily: PoppinsRegular}}>This meetup will be visible to all your friends so they can
                    join!</Text>
            </View>
        );
    }

    renderModalComponent() {
        const action = this.state.modalAction;
        const entity = this.state.modalEntity;

        switch (action) {
            default:
            case 'selectHour':
                return (
                    <View style={{marginHorizontal: 8, marginVertical: 25}}>
                        <CalendarPicker
                            style={{fontSize: 12}}
                            date={this.state.meetupHour}
                            value={this.state.meetupHour}
                            mode={'time'}
                            display="spinner"
                            minuteInterval={15}
                            onChange={(event, value) => {
                                this.setState({meetupHour: value});
                            }}
                        />
                        <TouchableOpacity style={common.primaryButton}
                                          onPress={() => {
                                              this.modalizeRef.current?.close();
                                          }}
                        >
                            <Text style={common.primaryButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                );
                break;
            case 'selectDate':
                return (
                    <View style={{marginHorizontal: 8, marginVertical: 25}}>
                        <CalendarPicker
                            style={{fontSize: 12}}
                            date={this.state.meetupDate}
                            value={this.state.meetupDate}
                            mode={'date'}
                            display="spinner"
                            onChange={(event, value) => {
                                this.setState({meetupDate: value});
                            }}
                        />
                        <TouchableOpacity style={common.primaryButton}
                                          onPress={() => {
                                              this.modalizeRef.current?.close();
                                          }}
                        >
                            <Text style={common.primaryButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                );
                break;
        }
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (

            <View style={{flex: 1}}>
                <AppHeader/>
                <ScrollView style={{backgroundColor: 'white', paddingVertical: 0, paddingHorizontal: 8}}
                            showsVerticalScrollIndicator={false}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={common.h1}>Create new meetup</Text>
                    </View>
                    <View style={{marginVertical: 8}}>
                        <TextBox placeholder="MeetUp name"
                                 label="Meetup name"
                                 autoCorrect={false}
                                 onChangeText={(value) => {
                                     this.setState({name: value});
                                 }}
                                 icon="info"
                        />
                    </View>
                    <MeetupPrivacy privacy={this.state.privacy} selectPrivacy={this.selectPrivacy.bind(this)}/>
                    <MeetupType categories={this.state.types} category={this.state.category}
                                selectCategory={this.selectCategory.bind(this)}/>
                    <View style={{marginVertical: 16}}>
                        <Text
                            style={[common.secondaryButtonTextRed, {
                                alignSelf: 'stretch',
                                flex: 1,
                                marginVertical: 4,
                            }]}>Invite
                            your friends</Text>
                        {this.showInviteFriends()}
                    </View>
                    <View style={{marginVertical: 8}}>
                        <TextBox
                            placeholder="Where do you want to go today?"
                            label={'Where this meetup will take place?'}
                            returnKeyLabel="Search"
                            returnKeyType="search"
                            autoCorrect={false}
                            onChangeText={(value) => {
                                this.setState({query: value});
                            }}
                            onSubmitEditing={(event) => {
                                const query = event.nativeEvent.text;
                                this.searchAddress(query).then(r => {
                                    console.log(r);
                                });
                            }}
                            icon="map-marker-alt"
                            rightComponent={this.showSearchIconButton()}
                        />
                        {/*{this.showSearchResults()}*/}
                        <View style={{marginVertical: 8}}>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                ref={map => {
                                    this.map = map;
                                }}
                                style={{
                                    height: 200,
                                    borderColor: MAIN_COLOUR,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                }}
                                showUserLocation={true}
                                // followsUserLocation={true}
                                region={this.state.regionX}
                                zoomControlEnabled={false}
                                onDoublePress={() => {
                                    this.zoomIn();
                                }}
                                // region={this.getMapRegion()}
                            >
                                {this.state.markers.map(marker => (
                                    <MapView.Marker.Animated
                                        key={marker.id}
                                        coordinate={marker.coordinates}
                                        title={marker.title}
                                    >
                                        {/*<UserAvatar user={this.props.user.user} size='small'/>*/}

                                        <Callout>
                                            {this.markerCalloutView()}
                                        </Callout>
                                    </MapView.Marker.Animated>
                                ))}
                            </MapView>
                            <View style={{alignItems: 'flex-end', marginVertical: 4}}>
                                <TouchableOpacity>
                                    <Text style={{fontFamily: PoppinsSemiBold, color: 'blue'}}>Use current
                                        location</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/*<DailyWeatherWidget location={this.state.coordinates} key={this.state.coordinates.latitude}/>*/}

                    <MeetupDateAndTime date={this.state.meetupDate} time={this.state.meetupHour}
                                       onDatePress={this.openCalendarDate.bind(this)}
                                       onTimePress={this.openCalendarHour.bind(this)}/>

                    <TextBox
                        placeholder="MeetUp description"
                        multiline={true}
                        numberOfLines={6}
                        onChangeText={(value) => {
                            this.setState({description: value});
                        }}
                        style={{height: 120}}
                    />

                    <TouchableOpacity style={common.primaryButton}
                                      onPress={() => {
                                          this.saveMeetup();
                                      }}
                    >
                        <Text style={common.primaryButtonText}>Let's go</Text>
                    </TouchableOpacity>

                    <View style={{height: 80}}></View>

                </ScrollView>
                <Modalize ref={this.modalizeRef}
                          scrollViewProps={{showsVerticalScrollIndicator: false}}
                    // snapPoint={300}
                    // modalHeight={300}
                    //       modalTopOffset={200}
                          adjustToContentHeight={true}
                          withHandle={false}
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

    saveMeetup() {
        const params = {
            name: this.state.name,
            profile_id: this.props.user.profile.id,
            profile_uuid: this.props.user.profile.uuid,
            privacy: this.state.privacy,
            category: this.state.category,
            meetup_date: this.state.meetupDate,
            meetup_hour: this.state.meetupHour,
            latitude: (this.state.searchResults ? this.state.searchResults[0].latitude : this.state.coordinates.latitude),
            longitude: (this.state.searchResults ? this.state.searchResults[0].longitude : this.state.coordinates.longitude),
            formatted_address: (this.state.searchResults ? this.state.searchResults[0].formatted_address : null),
            postal_town: (this.state.searchResults ? this.state.searchResults[0].postal_town : null),
            country_code: (this.state.searchResults ? this.state.searchResults[0].country_code : null),
            locality: (this.state.searchResults ? this.state.searchResults[0].locality : null),
        };

        console.log(params);

        saveUserMeetup(params).then((r) => {
            this.props.navigation.navigate('MeetUp');
        });
    }
}

const mapStateToProps = (state, props) => {
        const login = state.loginReducer;
        const feed = state.feedReducer;
        const system = state.systemReducer;
        const user = state.userReducer;

        return {login, feed, system, user};
    }
;

export default connect(mapStateToProps,
    {
        saveEntities,
        updateEntityLikesSockets,
        updateEntitiesList,
        saveFeedState,
    },
)(NewMeetupScreen);

