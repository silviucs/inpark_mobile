import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import React from "react";
import Share from 'react-native-share';
import {MAIN_COLOUR} from '../../../../system/constants';

const shareAppUrl = () => {
    const url = 'https://photopya.com/';
    const title = 'Photopya';
    const subject = 'Photopya';
    const message = 'Please check out how BeautySecrets app can help you with your beauty routines.';
    const options = Platform.select({
        ios: {
            activityItemSources: [
                { // For sharing url with custom title.
                    placeholderItem: {type: 'url', content: url},
                    item: {
                        default: {type: 'url', content: url},
                    },
                    subject: {
                        default: title,
                    },
                    linkMetadata: {originalUrl: url, url, title},
                },
                { // For sharing text.
                    placeholderItem: {type: 'text', content: message},
                    item: {
                        default: {type: 'text', content: message},
                        message: null, // Specify no text to share via Messages app.
                    },
                    linkMetadata: { // For showing app icon on share preview.
                        title: message
                    },
                },
                { // For using custom icon instead of default text icon at share preview when sharing with message.
                    placeholderItem: {
                        type: 'url',
                        // content: icon
                    },
                    item: {
                        default: {
                            type: 'text',
                            content: `${message} ${url}`
                        },
                    },
                    linkMetadata: {
                        title: message,
                        // icon: icon
                    }
                },
            ],
        },
        default: {
            title,
            subject: title,
            message: `${message} ${url}`,
        },
    });

    const options2 = {
        title: title,
        message: message,
        url: url,
        subject: subject
    }

    Share.open(options2)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            err && console.log(err);
        });
}

export function aboutUsBlock(navigation) {
    return (
        <View>
            <View style={{paddingHorizontal: 10}}>
                <Text style={styles.title}>About</Text>
            </View>
            <View style={styles.roundBox}>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Icon name='share-alt' style={styles.icon}/>
                    </View>
                    <TouchableOpacity onPress={() => {
                        shareAppUrl();
                    }}>
                        <Text>Share InPark Today</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Icon name='info' style={styles.icon}/>
                    </View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('StaticContent', {slug: 'about-app'});
                    }}>
                        <Text>About the project</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>
                        <Icon name='file-alt' style={styles.icon}/>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('StaticContent', {slug: 'privacy-policy'});
                        }}
                    >
                        <Text>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rowBorderless}>
                    <View style={styles.iconWrapper}>
                        <Icon name='info-circle' style={styles.icon}/>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('StaticContent', {slug: 'terms-and-conditions'});
                        }}
                    >
                        <Text>Terms & conditions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row', height: 40, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#CCC'
    },
    rowBorderless: {
        flexDirection: 'row', height: 40, alignItems: 'center'
    },
    title: {
        color: '#999',
        fontWeight: 'bold',
        fontSize: 14,
    },
    roundBox: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 16,
        padding: 16
    },
    infoText:{
        color: '#999',
        fontWeight: 'bold',
        fontSize: 12,
        alignSelf: "center"
    },
    iconWrapper: {
        width: 30,
        alignItems: 'flex-start'
    },
    icon: {
        color: MAIN_COLOUR,
        fontSize: 16
    }
})
