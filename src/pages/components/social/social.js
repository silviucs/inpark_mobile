import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FacebookLogin from './facebook';
import AppleLogin from './apple';
import GoogleLogin from './google';
import {BalooRegular} from '../../../../assets/styles';

export const SocialConnect = () => {
    return (
        <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
            <View>
                <Text style={styles.text}>or connect with</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                // alignSelf: 'stretch',
                // alignItems: 'center',
                // justifyContent: 'center',
            }}>
                <FacebookLogin logoOnly={true}/>
                <AppleLogin logoOnly={true}/>
                <GoogleLogin logoOnly={true}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: BalooRegular,
        fontSize: 20
    }
})
