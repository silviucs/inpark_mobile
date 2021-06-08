import React, {Component} from 'react';

import {View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BackButton} from '../../../components/backButton';
import {common, PoppinsSemiBold} from '../../../../../assets/styles';
import {IconHeader} from '../../../components/iconHeader';
import {sendContactEmail} from '../../../../system/services/contact';

class ContactFormScreen extends Component {

    state = {
        name: '',
        email: '',
        message: ''
    }

    constructor(props) {
        super(props);
    }

    sendContactEmail(){

        if (!this.state.name.trim() || !this.state.email.trim() || !this.state.message.trim()) {
            Alert.alert("Missing information", "Please fill in all the fields!");
            return false;
        }

        sendContactEmail(this.state.name, this.state.email, this.state.phone, this.state.message).then((response) => {
            if (response.status === 200) {
                Alert.alert('Message sent', "Your message was sent. We'll get back to you as soon as possible");
                this.txtName.clear();
                this.txtEmail.clear();
                this.txtMessage.clear();
            }
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Header
                    containerStyle={{backgroundColor: 'white'}}
                    leftComponent={BackButton(this.props.navigation)}
                    centerComponent={{
                        text: 'Contact us',
                        style: {color: '#ff9d8d', fontSize: 18, fontFamily: PoppinsSemiBold}
                    }}
                />
                <ScrollView>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8}}>
                        <IconHeader icon={'envelope'}/>
                        <View style={{width: '100%', padding: 10}}>
                            <TextInput placeholder="Name"
                                       style={{
                                           borderWidth: 1,
                                           borderColor: '#CCC',
                                           padding: 10,
                                           borderRadius: 10,
                                           width: '100%',
                                           backgroundColor: '#FFF'
                                       }}
                                       placeholderTextColor='#aaa'
                                       ref={input => {
                                           this.txtName = input
                                       }}
                                       onChangeText={(value) => {
                                           this.setState({name: value})
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
                                           backgroundColor: '#FFF'
                                       }}
                                       placeholderTextColor='#aaa'
                                       ref={input => {
                                           this.txtEmail = input
                                       }}
                                       onChangeText={(value) => {
                                           this.setState({email: value})
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
                                backgroundColor: '#FFF'
                            }}
                                       multiline={true}
                                       numberOfLines={5}
                                       placeholderTextColor='#aaa'
                                       ref={input => {
                                           this.txtMessage = input
                                       }}
                                       onChangeText={(value) => {
                                           this.setState({message: value})
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
            </View>
        )
    }
}

export default ContactFormScreen
