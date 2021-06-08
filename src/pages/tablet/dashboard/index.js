import React, {Component} from 'react';

import {View, FlatList, ActivityIndicator, Linking, RefreshControl, Text, Platform, Dimensions} from 'react-native';
import {getLatestEntities} from '../../../system/services/feed';
import {connect} from 'react-redux';
import {saveEntities, updateEntityLikesSockets, updateEntitiesList, saveFeedState} from '../../../redux/actions';
import io from 'socket.io-client';
import {LoadingActivityIndicator} from '../../components/loadingActivityIndicator';
import {Entity} from '../../components/entity/entity';
import {commonStyles} from '../../../../assets/styles';
// import AppHeader from './components/appHeader';

class FeedScreen extends Component {

    state = {
        feed: [],
        loading: true,
        spinner: false,
        spinnerText: 'Loading ...',
        count: 0,
        isRefreshing: false,
        lastUpdate: Date.now(),
        endReached: false,
        orientation: '',
        columns: 2,
        time: new Date().getTime()
    };

    constructor(props) {
        super(props);
        this.onEndReachedCalledDuringMomentum = true;
        this.page = 0;
        this.props.saveFeedState({prop: 'loading', value: false});
    }

    _handleOpenURL(event){
        this.props.navigation.navigate('UpdatePassword');
    }

    async componentDidMount() {

        Linking.addEventListener('url', this._handleOpenURL.bind(this));

        const socket = io('https://sockets.photopya.com/', {
            forceNew: true
        });
        socket.connect();
        socket.on('connect', () => console.log('Connection'));

        if(this.props.login.loggedIn){
            socket.on('like_update_auth_' + this.props.login.user.hash, (message) => {
                this.props.updateEntityLikesSockets({entityId: message.entity_id, value: {total: message.total, is_liked: (message.data_action == 'shouldLike' ? false : true)}});
                this.setState({count: this.state.count++})
            });
        }else{
            socket.on('like_update', (message) => {
                this.props.updateEntityLikesSockets({entityId: message.entity_id, value: {total: message.total}});
                this.setState({count: this.state.count++})
            });
        }

        this.getEntities(this.state.page);

        this.getOrientation();

        Dimensions.addEventListener( 'change', () =>
        {
            this.getOrientation();
        });
    }

    getOrientation = () =>
    {
        if( this.refs.rootView )
        {
            if( Dimensions.get('window').width < Dimensions.get('window').height )
            {
                this.setState({ orientation: 'portrait' });
                this.setState({columns: 2})
                this.setState({time: new Date().getTime()})
                console.log(new Date().getTime());
            }
            else
            {
                this.setState({ orientation: 'landscape' });
                this.setState({columns: 3})
                this.setState({time: new Date().getTime()})
                console.log(new Date().getTime())
            }
        }
    }

    async getEntities(page){
        this.setState({ loading: true })
        await getLatestEntities(this.props.login.user.id, page).then((response) => {
            if(response.length > 0) {
                let listData = this.state.feed
                let entities = listData.concat(response);
                this.props.saveEntities({prop: 'entities', value: entities});
                this.setState({feed: entities});
                this.setState({loading: false});
            }else{
                this.setState({endReached: true});
                this.setState({loading: false});
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    updateLikesFromSockets(message){
        this.props.updateEntityLikes({entityId: entity_id, value: parseInt(responseJson.total)});
    }

    _keyExtractor = (item, index) => item.hash;

    onEndReached = async () => {

        if (!this.state.loading && !this.state.endReached) {
            this.page = this.page + 1;
            this.getEntities(this.page);
        }
    };

    renderFooter = () => {

        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        if (!this.state.loading) return null;
        return (
            <ActivityIndicator
                style={{ color: '#000', padding: 10 }}
            />
        );
    };

    onRefresh() {
        this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
        this.page = 0;
        getLatestEntities(this.props.login.user.id, this.page).then((response) => {

            // console.log(response);
            this.props.saveEntities({prop: 'entities', value: response});
            this.setState({feed: response});
            this.setState({isRefreshing: false});
        });
    }

    showActivityIndicator() {
        if (this.props.feed.loading) {
            return (
                <LoadingActivityIndicator />
            );
        }
    }

    render() {
        const {common} = commonStyles(this.props.system.deviceType);

        return (
            <View style={[common.container, {marginTop: 40}]} ref="rootView">
                {/*<AppHeader />*/}
                <FlatList
                    style={{alignSelf: 'stretch', backgroundColor: 'white', margin: 0, padding: 0, flexGrow: 1, width: '100%'}}
                    showsVerticalScrollIndicator={false}
                    key={this.state.columns}
                    numColumns={this.state.columns}
                    extraData={this.state}
                    data={this.props.feed.entities}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0.4}
                    onEndReached={this.onEndReached.bind(this)}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    renderItem={({item}) => (
                        <Entity entity={item} />
                    )}
                />
                {this.showActivityIndicator()}
            </View>
        );

    }
}

const mapStateToProps = (state, props) => {
    const login = state.loginReducer;
    const feed = state.feedReducer;
    const system = state.systemReducer;

    return {login, feed, system};
};

export default connect(mapStateToProps, {saveEntities, updateEntityLikesSockets, updateEntitiesList, saveFeedState})(FeedScreen);

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
