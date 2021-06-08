import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PoppinsRegular} from '../../../../assets/styles';

export const CommentsNumber = (props) => {
    if(props.comments_number > 0) {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name='comments' style={styles.text} />
                <Text style={styles.text}>{props.comments_number} comment(s)</Text>
            </View>
        )
    }
    return (
        <></>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#999',
        fontFamily: PoppinsRegular,
        fontSize: 12,
        marginHorizontal: 2
    }
})
