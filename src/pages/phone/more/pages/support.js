import React, {Component} from 'react';

import {View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, Dimensions} from 'react-native';
import {Header, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackButton} from '../../../components/backButton';
import {common, PoppinsRegular, PoppinsSemiBold} from '../../../../../assets/styles';
import {IconHeader} from '../../../components/iconHeader';
import {sendContactEmail} from '../../../../system/services/contact';

const width = Dimensions.get('window').width;

class SupportFormScreen extends Component {

    state = {
        name: '',
        email: '',
        message: '',
        visible: false
    };

    constructor(props) {
        super(props);
    }

    sendContactEmail() {

        if (!this.state.name.trim() || !this.state.email.trim() || !this.state.message.trim()) {
            Alert.alert('Missing information', 'Please fill in all the fields!');
            return false;
        }

        sendContactEmail(this.state.name, this.state.email, this.state.phone, this.state.message).then((response) => {
            if (response.status === 200) {
                this.toggleOverlay();
                this.txtName.clear();
                this.txtEmail.clear();
                this.txtMessage.clear();
            }
        });
    }

    toggleOverlay() {
        const visible = this.state.visible
        this.setState({visible: !visible});
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Header
                    containerStyle={{backgroundColor: 'white'}}
                    leftComponent={BackButton(this.props.navigation)}
                    centerComponent={{
                        text: 'We\'re here to help',
                        style: {color: '#ff9d8d', fontSize: 18, fontFamily: PoppinsSemiBold},
                    }}
                />
                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8}}>
                        <IconHeader icon={'headset'}/>
                        <View style={{width: '100%', padding: 10}}>
                            <Text style={{fontFamily: PoppinsRegular, color: '#a0a0a0'}}>Faced an issue within our app? Let us know as much as possible
                                details in the below window and we'll get back to you as soon as possible.</Text>
                        </View>
                        <View style={{width: '100%', padding: 10}}>
                            <TextInput placeholder="Name"
                                       style={{
                                           borderWidth: 1,
                                           borderColor: '#CCC',
                                           padding: 10,
                                           borderRadius: 10,
                                           width: '100%',
                                           backgroundColor: '#FFF',
                                       }}
                                       placeholderTextColor='#aaa'
                                       ref={input => {
                                           this.txtName = input;
                                       }}
                                       onChangeText={(value) => {
                                           this.setState({name: value});
                                       }}
                            />
                        </View>
                        <View style={{width: '100%', padding: 10}}>
                            <TextInput placeholder="Email"
                                       keyboardType='email-address'
                                       style={{
                                           borderWidth: 1,
                                           borderColor: '#CCC',
                                           padding: 10,
                                           borderRadius: 10,
                                           width: '100%',
                                           backgroundColor: '#FFF',
                                       }}
                                       placeholderTextColor='#aaa'
                                       ref={input => {
                                           this.txtEmail = input;
                                       }}
                                       onChangeText={(value) => {
                                           this.setState({email: value});
                                       }}
                            />
                        </View>
                        <View style={{width: '100%', padding: 10}}>
                            <TextInput placeholder="Message" style={{
                                borderWidth: 1,
                                borderColor: '#CCC',
                                padding: 10,
                                borderRadius: 10,
                                width: '100%',
                                height: 100,
                                backgroundColor: '#FFF',
                            }}
                                       multiline={true}
                                       numberOfLines={5}
                                       placeholderTextColor='#aaa'
                                       ref={input => {
                                           this.txtMessage = input;
                                       }}
                                       onChangeText={(value) => {
                                           this.setState({message: value});
                                       }}
                            />
                        </View>
                        <View style={{width: '100%', padding: 10, margin: 10}}>
                            <TouchableOpacity style={common.primaryButtonRed}
                                              onPress={() => {
                                                  this.sendContactEmail();
                                              }}
                            >
                                <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 16}}>Send message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <Overlay isVisible={this.state.visible} onBackdropPress={this.toggleOverlay.bind(this)}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        {/*<Image source={require('../../../../../assets/images/support.jpg')}*/}
                        {/*       style={{width: 350, height: 200, borderRadius: 8}}*/}
                        {/*/>*/}
                        <View style={{width: width*0.8}}>
                            <Text style={common.h4}>Hi {this.state.name}, thank you for letting us know about this issue. We’ll reach out to you once we have an update or if we need any additional information.</Text>
                        </View>
                    </View>
                </Overlay>
            </View>
        );
    }
}

export default SupportFormScreen;
