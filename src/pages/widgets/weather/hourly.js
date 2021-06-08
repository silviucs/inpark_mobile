import React from 'react';
import {Image, Text, View} from 'react-native';
import {map} from '../../../../assets/styles';
import {showWeatherIcon} from './common';

export const HourlyWeather = (props) => {

    const hourly = [{hour: 'now', temp: props.weather.current.temp_current, weather_icon: props.weather.current.weather_icon}, ...props.weather.hourly];

    const hours = () => {
        return hourly.map((item, index) => {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} key={index}>
                    <Text style={[map.text, map.colour_01d]}>{item.hour}</Text>
                    {/*<Text style={[map.text, map.colour_01d]}>{item.weather_icon}</Text>*/}
                    <Image source={showWeatherIcon(item.weather_icon)} style={{height: 30, width: 30}} />
                    <Text style={[map.text, map.colour_01d]}>{item.temp}&deg;</Text>
                </View>
            )
        })
    }

    return (
        <View style={{flexDirection: 'row'}}>
            {hours()}
        </View>
    )
}
