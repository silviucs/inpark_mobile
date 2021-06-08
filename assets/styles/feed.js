import {StyleSheet, Dimensions} from 'react-native';
import {PoppinsSemiBold} from './fonts';

const win = Dimensions.get('window');

const feed = StyleSheet.create({
    row: {
        marginTop: 8,
        width: '100%',
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderTopColor: '#D3D3D3',
        // borderBottomColor: '#D3D3D3',
        backgroundColor: '#FFF'
    },
    author: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center'
    },
    username: {
        fontFamily: PoppinsSemiBold,
        marginLeft: 5,
        fontSize: 14,
        color: '#d52146',
        fontWeight: '500'
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
    },
    title: {
        padding: 10,
        paddingTop: 0,
        fontSize: 14,
        fontFamily: PoppinsSemiBold,
    },
    actionButton: {

    },
    actionButtonText: {
        textAlign: 'center', color: '#696969', fontWeight: 'bold'
    },
    isLikedEntityText: {
        color: '#E62937'
    },
    commentForm: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'stretch',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    },
    iconButton: {
        fontSize: 22, color: '#d52146', margin: 4
    }
})

export {feed};
