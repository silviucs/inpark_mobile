import React, {Component} from 'react';

import {View, FlatList, ActivityIndicator, Linking, RefreshControl, Text, Dimensions, TextInput} from 'react-native';
import {getLatestEntities} from '../../../system/services/feed';
import {connect} from 'react-redux';
import {saveEntities, updateEntityLikesSockets, updateEntitiesList, saveFeedState} from '../../../redux/actions';
import io from 'socket.io-client';
import {LoadingActivityIndicator} from '../../components/loadingActivityIndicator';
import {Entity} from '../../components/entity/entity';
import {commonStyles, map} from '../../../../assets/styles';
import {AppHeader} from '../../components/appHeader';
// import AppHeader from './components/appHeader';
import MapView, {Callout, PROVIDER_GOOGLE, AnimatedRegion} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {UserAvatar} from '../../components/avatar';
import {updateUserLocation} from '../../../system/services/location';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
let _mapView: MapView;
const latitudeDelta = 0.009;
const longitudeDelta = 0.009;

class FollowGroupScreen extends Component {

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
        longitudeDelta: longitudeDelta
    };

    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.page = 0;
    }

    _handleOpenURL(event) {
        this.props.navigation.navigate('UpdatePassword');
    }

    componentDidMount() {

        // Linking.addEventListener('url', this._handleOpenURL.bind(this));
        //
        const socket = io('https://sockets.silviuks.info/', {
            forceNew: true,
        });
        socket.connect();
        socket.on('inparkMeetup', (payload) => {
            this.onReceivedMessage(payload)
        });

        this.findCoordinates();
    }

    onReceivedMessage(payload) {
        this.setState({coordinates: {latitude: payload.coordinates.latitude, longitude: payload.coordinates.longitude}});
        let markers = [];

        markers.push({
            coordinates: {latitude: payload.coordinates.latitude, longitude: payload.coordinates.longitude},
            title: payload.user,
            id: 1,
        });

        this.setState({markers: markers});
        const region = {
            latitude: payload.coordinates.latitude,
            longitude: payload.coordinates.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
        };

        this.setState({
            regionX: region,
        });
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchId);
    }

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

    findCoordinates = () => {
        console.log('find coordinates')
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

            this.setState({loading: false});
        });

    };


    updateLikesFromSockets(message) {
        this.props.updateEntityLikes({entityId: entity_id, value: parseInt(responseJson.total)});
    }

    _keyExtractor = (item, index) => item.hash;



    showActivityIndicator() {
        if (this.props.feed.loading) {
            return (
                <LoadingActivityIndicator/>
            );
        }
    }

    markerCalloutView() {

        return (
            <Text>Add .dot here!</Text>
        );

    }

    zoomIn(){
        alert('zoom in');
        return false;
    }

    render() {
        console.log(this.state.loading);
        if (this.state.loading) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                </View>
            );
        }

        const {common} = commonStyles(this.props.system.deviceType);
        return (
            <View style={[common.container, {
                backgroundColor: 'white',
                marginHorizontal: (this.state.orientation === 'landscape' ? 40 : 0),
            }]} ref="rootView">
                {/*<AppHeader />*/}
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={map => {
                        this.map = map;
                    }}
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}
                    showUserLocation={true}
                    followsUserLocation={true}
                    region={this.state.regionX}
                    zoomControlEnabled={false}
                    onDoublePress={() => {
                        this.zoomIn()
                    }}
                    // region={this.getMapRegion()}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker.Animated
                            key={marker.id}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        >
                            <UserAvatar user={this.props.user.user} size='small'/>

                            <Callout>
                                {this.markerCalloutView()}
                            </Callout>
                        </MapView.Marker.Animated>
                    ))}
                </MapView>
                <View style={map.searchBoxContainer}>
                    <TextInput style={map.searchInput}
                               placeholder='Where do you want to go today?'
                               returnKeyLabel='Search'
                               returnKeyType='search'
                               autoCorrect={false}
                               onSubmitEditing={(event) => {
                                   const query = event.nativeEvent.text;
                                   alert(query);
                                   // this.searchAddress(query);
                               }}
                    />
                </View>
            </View>
        );

    }
}

const mapStateToProps = (state, props) => {
    const login = state.loginReducer;
    const feed = state.feedReducer;
    const system = state.systemReducer;
    const user = state.userReducer;
    console.log(user);

    return {login, feed, system, user};
};

export default connect(mapStateToProps, {
    saveEntities,
    updateEntityLikesSockets,
    updateEntitiesList,
    saveFeedState,
})(FollowGroupScreen);
