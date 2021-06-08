import React from 'react';
import DatePicker from 'react-native-date-picker';
import {Text, TouchableOpacity, View} from 'react-native';
import {common} from '../../../../../assets/styles';

export const BirthdayBlock = (props) => {
    const date = new Date(props.date);

    const maximumDate = setMaximumDate()

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingVertical: 16, paddingHorizontal: 8}}>
            <DatePicker
                textColor='#DD0000'
                date={date}
                maximumDate={maximumDate}
                mode={'date'}
                onDateChange={value => {
                    props.onDateChange(value)
                }}
            />


            <TouchableOpacity style={common.primaryButtonRed}
                              onPress={() => {
                                  props.onConfirmAnswer();
                              }}
            >
                <Text style={common.primaryButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    )
}

const setMaximumDate = () => {
    const date = new Date(); //.toLocaleString('en-US');
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getUTCDate();

    return new Date(Date.UTC(year - 17, month, day));
}
