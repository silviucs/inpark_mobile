import React from 'react';
import {Image, Text, View} from 'react-native';
import {map} from '../../../../assets/styles';
import {showWeatherIcon} from './common';

export const DailyWeather = (props) => {

    const daily = props.weather.daily;

    const dailyWeather = () => {
        return daily.map((item, index) => {
            console.log(item.day_name);
            return (
                <View style={{flex: 1, paddingVertical: 4, justifyContent: 'center', alignItems: 'center'}} key={index}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={showWeatherIcon(item.weather_icon)} style={{height: 30, width: 30}} />
                        <View style={{flex: 1, marginHorizontal: 4}}>
                            <Text style={[map.text, map.colour_01d]}>{item.day_name}</Text>
                        </View>
                        <View>
                        <Text style={[map.text, map.colour_01d]}>H: {item.temp_max}&deg; L: {item.temp_min}&deg;</Text>
                        </View>
                    </View>
                </View>
            );
        });
    };

    return (
        <View style={{flex: 1, paddingVertical: 8}}>
            {dailyWeather()}
        </View>
    );
};
