import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BalooRegular, map, PoppinsRegular, PoppinsSemiBold} from '../../../../assets/styles';
import {showWeatherIcon} from './common';

export const MinMaxTemperature = (props) => {

    return (
        <View style={styles.container}>
            {/*<Icon name={'cloud'} style={[map.icon, map.text_01d, map.colour_01d]}/>*/}
            <Image source={showWeatherIcon(props.weather.current.weather_icon)} style={{height: 60, width: 60}} />
            <Text style={[map.text_01d, map.text, map.colour_01d]}>{props.weather.current.weather_description}</Text>
            <Text style={[map.text_01d, map.text, map.colour_01d]}>H:{props.weather.today.temp_max}&deg; L:{props.weather.today.temp_min}&deg;</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

})
