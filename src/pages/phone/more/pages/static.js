import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Header} from 'react-native-elements';
import {BackButton} from '../../../components/backButton';
import {getStaticPageDetails} from '../../../../system/services/content';
import {PoppinsRegular, PoppinsSemiBold} from '../../../../../assets/styles';
import WebView from 'react-native-webview';

class StaticContentScreen extends Component {

    state = {
        page: {},
    };

    slug = null;

    constructor(props) {
        super(props);
        this.slug = (this.props.route ? this.props.route.params.slug : this.props.slug);
    }

    static navigationOptions = () => {
        return {
            headerShown: false,
        };
    };

    componentDidMount() {
        getStaticPageDetails(this.slug).then((response) => {
            this.setState({page: response});
        });
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                    containerStyle={{backgroundColor: 'white'}}
                    leftComponent={BackButton(this.props.navigation)}
                    centerComponent={{
                        text: 'Static page',
                        style: {fontFamily: PoppinsSemiBold, color: '#ff9d8d', fontSize: 20},
                    }}
                />
                {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
                {/*    <View style={{margin: 10}}>*/}
                {/*        <Text style={{fontFamily: PoppinsRegular, color: '#a0a0a0'}}>{this.state.page.content}</Text>*/}

                {/*    </View>*/}
                {/*</ScrollView>*/}
                <View style={{flex: 1, backgroundColor: 'blue'}}>
                    <WebView
                        startInLoadingState={true}
                        source={{uri: 'https://inpark.today/page/' + this.slug}}
                        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
                        renderLoading={() => {
                            return (
                                <View style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center'}}>
                                    <ActivityIndicator/>
                                </View>
                            );
                        }}
                        />
                </View>
            </View>
        );
    }
}

export default StaticContentScreen;
