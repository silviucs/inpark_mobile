import React, {Component} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, Text, View} from 'react-native';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {common} from '../../../../assets/styles/phone/common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {checkLocationWeather} from '../../../system/services/location';
import {MinMaxTemperature} from './minMaxTemp';
import {MAIN_COLOUR, SECONDARY_COLOUR} from '../../../system/constants';
import {CurrentWeather} from './currentWeather';
import {HourlyWeather} from './hourly';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class WeatherWidget extends Component {
    state = {
        loading: true,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        const params = {...this.props.location, country_code: 'uk'};
        checkLocationWeather(params).then((response) => {
            this.setState({weather: response.weather});
            this.setState({loading: false});
        });
    }

    showWeatherBackground(){
        const now = Math.floor((new Date()).getTime() / 1000);
        let backgroundImg;

        if(now >= this.state.weather.current.sunrise /*&& now <= this.state.weather.current.sunset*/){
            backgroundImg = require('../../../../assets/images/weather/background_day1.png');
        }else{
            backgroundImg = require('../../../../assets/images/weather/background_night.png');
        }

        return backgroundImg
    }

    showWeatherWidget() {
        return (
            <View style={{marginVertical: 16}}>
                <BackgroundImage
                    style={{width: (screenWidth - 16), resizeMode: 'contain', paddingHorizontal: 16}}
                    source={this.showWeatherBackground()}
                    imageStyle={{borderRadius: 8, borderWidth: 1, borderColor: MAIN_COLOUR,}}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View>
                            <CurrentWeather weather={this.state.weather} />
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <MinMaxTemperature weather={this.state.weather} />
                        </View>
                    </View>
                    <View>
                        <HourlyWeather weather={this.state.weather} />
                    </View>
                </BackgroundImage>
            </View>
        );
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator/>
                </View>
            );
        } else {
            return (
                this.showWeatherWidget()
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default WeatherWidget;
