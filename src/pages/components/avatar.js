import React from 'react';
import {Avatar} from 'react-native-elements';
import {View, Text} from 'react-native';
import {PoppinsSemiBold} from '../../../assets/styles';
import {INACTIVE_COLOUR, SECONDARY_COLOUR} from '../../system/constants';

export const UserAvatar = (props) => {
    const user = props.user;

    // return (
    //     <View style={{marginHorizontal: 8, alignItems: 'center', justifyContent: 'center'}}>
    //         <Avatar
    //             rounded
    //             // icon={{name: 'user', type: 'font-awesome'}}
    //             size={(props.size ? props.size : 'medium')}
    //             activeOpacity={0.7}
    //             overlayContainerStyle={{backgroundColor: '#F1F2F6'}}
    //             // icon={{name: 'user', color: 'red', type: 'font-awesome', size: 30}}
    //             title={<Text style={{color: '#ff9d8d', fontSize: (props.fontSize ? props.fontSize : 20), fontFamily: PoppinsSemiBold}}>SS</Text>}
    //         />
    //     </View>
    // );

    if (!user.avatar) {
        let initials = user.name.slice(0, 2).toUpperCase()
        return (
            <View style={{marginHorizontal: 8, alignItems: 'flex-end'}}>
                <Avatar
                    rounded
                    // icon={{name: 'user', type: 'font-awesome'}}
                    size={(props.size ? props.size : 'medium')}
                    activeOpacity={0.7}
                    overlayContainerStyle={{backgroundColor: INACTIVE_COLOUR}}
                    // icon={{name: 'user', color: 'red', type: 'font-awesome', size: 30}}
                    title={<Text style={{color: SECONDARY_COLOUR, fontSize: (props.fontSize ? props.fontSize : 20), fontFamily: PoppinsSemiBold}}>{initials}</Text>}
                />
            </View>
        );
    } else {
        return (
            <View style={{marginHorizontal: 8, alignItems: 'flex-end'}}>
                <Avatar
                    rounded
                    containerStyle={{backgroundColor: 'white', borderColor: SECONDARY_COLOUR, borderWidth: 2}}
                    // icon={{name: 'user', type: 'font-awesome'}}
                    size={(props.size ? props.size : 'medium')}
                    source={{uri: user.avatar}}
                    activeOpacity={0.7}
                />
            </View>
        );
    }
};
