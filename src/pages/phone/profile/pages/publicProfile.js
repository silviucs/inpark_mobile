import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {BackButton} from '../../../components/backButton';
import {PoppinsSemiBold} from '../../../../../assets/styles';
import {Header} from 'react-native-elements';

class PublicProfileScreen extends Component {
    state = {};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.navigation)
        console.log(this.props.route.params.uuid);
        this.setState({uuid: this.props.route.params.uuid});
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Header
                    containerStyle={{backgroundColor: 'white'}}
                    leftComponent={BackButton(this.props.navigation, (this.props.route.params.redirectTo ?? null))}
                />
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text>
                        {this.state.uuid}
                    </Text>
                </View>
            </View>
        );
    }
}

export default PublicProfileScreen;
