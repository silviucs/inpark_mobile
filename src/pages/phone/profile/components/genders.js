import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {renderAnswerImage} from '../../quiz/components/answerImage';
import {common, PoppinsSemiBold} from '../../../../../assets/styles';

export const GendersBlock = (props) => {

    const genders = props.genders;

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', margin: 8}}>
            <FlatList
                style={{flexGrow: 0, alignSelf: 'stretch'}}
                showsVerticalScrollIndicator={false}
                data={genders}
                numColumns={2}
                renderItem={({item}) =>
                    <TouchableOpacity
                        style={{flex: 1, margin: 8}}
                        onPress={() => {
                            props.onAnswerClick(item);
                        }}>
                        <View style={{
                            backgroundColor: (!props.selectedAnswers.includes(item.id) ? '#FFF' : '#cFcFcF'),
                            borderRadius: 8,
                            borderColor: '#ff9d8d',
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                        }}>
                            {renderAnswerImage(item, props.selectedAnswers)}
                            <Text style={[common.h4, {
                                textAlign: 'center',
                                fontFamily: PoppinsSemiBold,
                                fontWeight: 'bold',
                                color: (props.selectedAnswers.includes(item.id) ? '#FFF' : '#ff9d8d'),
                            }]}>{item.answer}</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
            <TouchableOpacity style={common.primaryButtonRed}
                              onPress={() => {
                                  props.onConfirmAnswer();
                              }}
            >
                <Text style={common.primaryButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};
