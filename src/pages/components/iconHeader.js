import {Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

const height = Dimensions.get('screen').height;
const height20 = height * 0.15;

export const IconHeader = (props) => {
    return (
        <View style={[{height: height20, alignItems: 'center', justifyContent: 'center'}, props.containerStyle]}>
            <View style={{backgroundColor: '#E62937', borderRadius: 100, width: 100, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={props.icon} style={{fontSize: 50, color: 'white'}}/>
            </View>
        </View>
    )
}
