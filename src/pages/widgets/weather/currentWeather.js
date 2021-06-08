import React from 'react';
import {common} from '../../../../assets/styles/phone/common';
import {Text, View} from 'react-native';
import {map} from '../../../../assets/styles';

export const CurrentWeather = (props) => {
    const current = props.weather.current;

    return (
        <View>
            <Text style={[map.text_01d, map.colour_01d]}>{current.temp_current}&deg;</Text>
            <Text style={[map.text_01d, map.text, map.colour_01d]}>Feels like: {current.feels_like}&deg;</Text>
            <Text style={[map.text_01d, map.text, map.colour_01d]}>Wind speed: {current.wind_speed}</Text>
        </View>
    )
}
