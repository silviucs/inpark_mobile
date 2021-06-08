import React, {Component} from 'react';

import {View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackButton} from '../../../components/backButton';
import {common, PoppinsRegular, PoppinsSemiBold} from '../../../../../assets/styles';
import {IconHeader} from '../../../components/iconHeader';
import {sendContactEmail} from '../../../../system/services/contact';

class MarketingScreen extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        message: '',
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Header
                    containerStyle={{backgroundColor: 'white'}}
                    leftComponent={BackButton(this.props.navigation)}
                    centerComponent={{
                        text: 'Marketing',
                        style: {color: '#ff9d8d', fontSize: 18, fontFamily: PoppinsSemiBold},
                    }}
                />
                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8}}>
                        <IconHeader icon={'envelope'} containerStyle={{marginVertical: 40}}/>
                        <View style={{marginHorizontal: 10}}>
                            <Text style={{fontFamily: PoppinsRegular, color: '#a0a0a0'}}>
                                Are you a beauty content creator, a beautician or you do represent a beauty company, and
                                complement the same vision and value as ours? we will be happy to discuss a future
                                collaboration.
                            </Text>
                        </View>

                        <View style={{width: '100%', padding: 10, margin: 10}}>
                            <TouchableOpacity style={common.primaryButtonRed}
                                              onPress={() => {
                                                  this.props.navigation.navigate('Contact');
                                              }}
                            >
                                <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 16}}>I want to
                                    collaborate</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default MarketingScreen;
