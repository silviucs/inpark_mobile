import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {AppHeader} from '../../../components/appHeader';

class FriendsRequestsScreen extends Component {

    state = {
        uuid: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.route.params);

        if(this.props.route.params) {
            const uuid = this.props.route.params.uuid;
            console.log(uuid);
            // this.setState({id: id})
        }
    }

    render() {

        return (
            <View style={{flex: 1}}>
                <AppHeader />
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>Friends requests</Text>
                </View>
            </View>
        );
    }
}

export default FriendsRequestsScreen;
