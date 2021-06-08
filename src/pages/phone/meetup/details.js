import React, {Component} from 'react';
import {Text, View} from 'react-native';

class MeetupDetailsScreen extends Component{

    state = {
        id: 'xyz'
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.route.params);

    }

    componentWillUnmount() {
    }

    render() {
        let id = this.state.id;

        if(this.props.route.params) {
            id = this.props.route.params.id;
            console.log(id);
            // this.setState({id: id})
        }

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Meetup details {id}</Text>
            </View>
        );
    }
}

export default MeetupDetailsScreen
