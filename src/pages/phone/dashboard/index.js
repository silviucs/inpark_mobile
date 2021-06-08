import React, {Component} from 'react';

import {
    View,
    ActivityIndicator,
    Text,
    ScrollView, Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {saveEntities, updateEntityLikesSockets, updateEntitiesList, saveFeedState} from '../../../redux/actions';
import io from 'socket.io-client';
import {LoadingActivityIndicator} from '../../components/loadingActivityIndicator';
import {commonStyles, map} from '../../../../assets/styles';
import MapView, {Callout, PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {UserAvatar} from '../../components/avatar';
import {updateUserLocation} from '../../../system/services/location';
import {MAIN_COLOUR} from '../../../system/constants';
import {showPublicMeetups} from './components/meetups/public';
import {FriendsMeetups, showFriendsMeetups} from './components/meetups/friends';
import {common} from '../../../../assets/styles/phone/common';
import WeatherWidget from '../../widgets/weather/weather';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

let _mapView: MapView;
const latitudeDelta = 0.009;
const longitudeDelta = 0.009;

class FeedScreen extends Component {

    state = {
        loading: true,
        count: 0,
        isRefreshing: false,
        lastUpdate: Date.now(),
        endReached: false,
        orientation: '',
        columns: 1,
        time: new Date().getTime(),
        markers: [],
        regionX: {},
        coordinates: {},
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    };

    constructor(props) {
        super(props);
    }

    _handleOpenURL(event) {
        this.props.navigation.navigate('UpdatePassword');
    }

    componentDidMount() {

        // Linking.addEventListener('url', this._handleOpenURL.bind(this));
        //
        // const socket = io('https://sockets.photopya.com/', {
        //     forceNew: true,
        // });
        // socket.connect();
        // socket.on('connect', () => console.log('Connection'));

        this.findCoordinates();
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchId);
    }

    updatePosition = () => {
        const {regionX} = this.state;

        this.watchId = Geolocation.watchPosition(
            (position) => {
                // this.setState({coordinates: {
                //         latitude: position.coords.latitude,
                //         longitude: position.coords.longitude,
                //     },
                //     error: null,
                //
                // });
                let markers = [];

                markers.push({
                    coordinates: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                    title: 'You are here!',
                    id: this.props.user.user.id,
                });

                this.setState({markers: markers});

                const newCoordinate = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };

                // if (Platform.OS === 'android') {
                //     if (this.marker) {
                //         this.marker._component.animateMarkerToCoordinate(
                //             newCoordinate,
                //             500, // 500 is the duration to animate the marker
                //         );
                //     }
                // } else {
                //     regionX.timing(newCoordinate).start();
                // }
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta,
                };

                this.setState({
                    regionX: region,
                });
                //TODO: send user location to server

                const params = {
                    coordinates: {latitude: position.coords.latitude, longitude: position.coords.longitude},
                    user_id: this.props.user.user.id,
                    user_uuid: 12345,
                    event_uuid: 1234,
                    event_id: 1,
                };

                // updateUserLocation(params).then((response) => {
                //     console.log(response)
                // }).catch((error) => {
                //     console.log(error)
                // })

            },
            (error) => this.setState({error: error.message}),
            {
                enableHighAccuracy: true,
                timeout: 2000,
                maximumAge: 1000,
                distanceFilter: 500,
            },
        );
    };

    getMapRegion = () => ({
        latitude: this.state.coordinates.latitude,
        longitude: this.state.coordinates.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
    });

    onRegionChange(region) {
        this.setState({
            region: region,
        });
    }

    findCoordinates = async () => {
        const granted = await request(
            Platform.select({
              android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
              ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            }),
            {
              title: 'InParkToday',
              message: 'InParkToday would like access to your location.',
            },
          );

          if(granted === 'granted'){
              Geolocation.getCurrentPosition(location => {
                  this.setState({coordinates: {latitude: location.coords.latitude, longitude: location.coords.longitude}});
                  let markers = [];

                  markers.push({
                      coordinates: {latitude: location.coords.latitude, longitude: location.coords.longitude},
                      title: 'You are here',
                      id: this.props.user.user.id,
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

                  this.setState({loading: false});
              });
          }
        // let { status } = await PERMISSIONS.askAsync(Permissions.LOCATION);


    };

    showActivityIndicator() {
        if (this.props.feed.loading) {
            return (
                <LoadingActivityIndicator/>
            );
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

        const {common} = commonStyles(this.props.system.deviceType);
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView style={{backgroundColor: 'white', paddingVertical: 50, paddingHorizontal: 8, paddingBottom: 50}}
                            ref="rootView">
                    <Text style={common.h1}>Hello {this.props.user.user.first_name}</Text>
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
                        // showUserLocation={true}
                        // followsUserLocation={true}
                        region={this.state.regionX}
                        zoomControlEnabled={false}
                        // region={this.getMapRegion()}
                    >
                        {this.state.markers.map(marker => (
                            <MapView.Marker.Animated
                                key={marker.id.toString()}
                                coordinate={marker.coordinates}
                                title={marker.title}
                            >
                                {/*<UserAvatar user={this.props.user.user} size='small'/>*/}
                            </MapView.Marker.Animated>
                        ))}
                    </MapView>
                    <WeatherWidget location={this.state.coordinates} />
                    {/*{showPublicMeetups()}*/}
                    <FriendsMeetups navigation={this.props.navigation}  />
                </ScrollView>
            </View>
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
})(FeedScreen);

/*
<EntityRow
                        id={item.id}
                        user_id={item.user_id}
                        session_user_id={this.props.login.user.id}
                        title={item.title}
                        image={item.image}
                        avatar={item.avatar}
                        username={item.username}
                        created={item.created}
                        size={item.size}
                        likes_number={item.likes_number}
                        comments_number={item.comments_number}
                    />
 */
