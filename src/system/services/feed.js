import React from 'react';
import {
    API_URL,
    APP_AUTHORIZATION_TOKEN,
    ENDPOINT_BOOKMARK_ENTITY,
    ENDPOINT_ENTITY_DELETE,
    ENDPOINT_ENTITY_DETAILS,
    ENDPOINT_ENTITY_REPORT,
    ENDPOINT_LATEST_ENTITIES,
    ENDPOINT_LIKE_ENTITY,
} from '../constants';

import {Alert, Text, TouchableOpacity, View} from 'react-native';
import MaterialIconsCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

export const getLatestEntities = async (session_user_id, page) => {
    let url = API_URL + ENDPOINT_LATEST_ENTITIES;

    if(!page)
        page = 0;

    url += "?session_user_id=" + session_user_id + "&page=" + page;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-PHTP-Authorization': APP_AUTHORIZATION_TOKEN,
        },
    }).catch((error) => {
        console.log(error);
    });

    return await response.json();
};

export const getEntityDetails = async (session_user_id, entity) => {
    const url = API_URL + ENDPOINT_ENTITY_DETAILS;

    const params = {
        hash: entity.hash,
        slug: entity.slug,
        session_user_id: session_user_id,
    };

    const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-PHTP-Authorization': APP_AUTHORIZATION_TOKEN,
            },
            params: JSON.stringify(params),
        },
    ).catch((error) => {
        console.log(error);
    });

    const responseJson = response.json();

    return responseJson;
};

export const sendLikeRequest = async (user, entity_id) => {
    const url = API_URL + ENDPOINT_LIKE_ENTITY;

    const params = {
        session_user_id: user.id,
        session_user_hash: user.hash,
        entity_id: entity_id,
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-PHTP-Authorization': APP_AUTHORIZATION_TOKEN,
        },
        body: JSON.stringify(params),
    }).catch((error) => {
        console.log(error);
    });

    return await response.json();
};

export const sendBookmarkRequest = async (entity, session_user_id) => {
    const url = API_URL + ENDPOINT_BOOKMARK_ENTITY;

    const params = {
        session_user_id: session_user_id,
        entity_id: entity.id,
        action: 'bookmark_entity',
    };

    console.log(params);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-PHTP-Authorization': APP_AUTHORIZATION_TOKEN,
        },
        body: JSON.stringify(params),
    }).catch((error) => {
        Alert.alert("Error", "Something went wrong. Please try again later");
        console.log(error);
    });

    console.log(response);
    return await response.json().catch((error) => {
        Alert.alert("Error", "Something went wrong. Please try again later");
        console.log(error);
    });
};

export const sendDeleteRequest = async (entity, session_user_id) => {
    let url = API_URL + ENDPOINT_ENTITY_DELETE;

    const params = {
        action: 'delete_entity',
        entity_id: entity.id,
        session_user_id: session_user_id
    };

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-PHTP-Authorization': APP_AUTHORIZATION_TOKEN,
        },
        body: JSON.stringify(params)
    }).catch((error) => {
        console.log(error);
    });

    console.log(response);
    return await response.json();
}

export const sendReportRequest = async (entity, session_user_id) => {
    let url = API_URL + ENDPOINT_ENTITY_REPORT;

    const params = {
        action: 'report_entity',
        entity_id: entity.id,
        session_user_id: session_user_id
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-PHTP-Authorization': APP_AUTHORIZATION_TOKEN,
        },
        body: JSON.stringify(params)
    }).catch((error) => {
        console.log(error);
    });

    return await response.json();
}

export const renderLikesNumber = (likes_number) => {
    if (likes_number > 0) {
        return (
            <View style={{flexDirection: 'row', width: '50%'}}>
                <MaterialIconsCommunity name='heart' style={{fontSize: 20, color: '#696969'}}/>
                <Text
                    style={{marginLeft: 5, fontSize: 16, fontWeight: '500', color: '#696969'}}>{likes_number}</Text>
            </View>
        );
    } else {
        return (
            <View style={{flexDirection: 'row', width: '50%'}}>
                <MaterialIconsCommunity name='heart-outline' style={{fontSize: 20, color: '#696969'}}/>
            </View>
        );
    }
};

export const renderCommentsNumber = (entity, session_user_id, props) => {
    if (entity.comments_number > 0) {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '50%'}}>
                <MaterialIconsCommunity name='comment' style={{fontSize: 16, color: '#696969'}}/>
                <Text style={{
                    marginLeft: 5,
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#696969',
                }}>{entity.comments_number}</Text>
            </View>
        );
    } else {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: '50%'}}>
                {/*{renderEntityTools(entity, session_user_id, props)}*/}
                <MaterialIconsCommunity name='comment-outline' style={{fontSize: 20, color: '#696969'}}/>
            </View>
        );
    }
};

export const renderEntityTools = (entity, session_user_id, props) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {renderBookmarkButton(entity, session_user_id, props)}
            {renderDeleteButton(entity, session_user_id, props)}
            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Report', 'Long press if you want to report this image!');
                }}
                onLongPress={() => {
                    Alert.alert('Report', 'Thank you for your report. We\'re going to review the content as soon as possible!!');
                }}
            >
                <MaterialIconsCommunity name='flag' style={{fontSize: 20, color: '#FF4500', marginRight: 10}}/>
            </TouchableOpacity>
        </View>
    );
};

const renderBookmarkButton = (entity, session_user_id, navigation) => {
    if(session_user_id){
        return (
            <TouchableOpacity
                onPress={() => sendBookmarkRequest(session_user_id, entity.id)}
            >
                <MaterialIconsCommunity name={entity.is_bookmarked ? 'bookmark-check' : 'bookmark-outline'} style={{
                    fontFamily: 'Verdana',
                    fontSize: 20,
                    color: entity.is_bookmarked ? '#008080' :  '#696969',
                    marginRight: 10,
                }}/>
            </TouchableOpacity>
        )
    }else{
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
            >
                <MaterialIconsCommunity name='bookmark-outline' style={{
                    fontFamily: 'Verdana',
                    fontSize: 20,
                    color: '#696969',
                    marginRight: 10,
                }}/>
            </TouchableOpacity>
        )
    }
}

const renderDeleteButton = (entity, session_user_id, navigation) => {
    if(entity.user_id == session_user_id){
        return (
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert('Delete',
                    'Are you sure you want to delete this image?',
                    [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                            text: 'Delete', onPress: async () => {
                                await sendDeleteRequest(entity, session_user_id).then(() => {
                                    props.navigation.navigate('Feed');
                                })
                            },
                            style: 'destructive'
                    },
                      ],
                      {cancelable: false},
                    );
                }}
            >
                <MaterialIconsCommunity name='delete' style={{
                    fontFamily: 'Verdana',
                    fontSize: 20,
                    color: '#E62937',
                    marginRight: 10,
                }}/>
            </TouchableOpacity>
            {/*<TouchableOpacity*/}
            {/*    onPress={() => {*/}
            {/*        navigation.navigate('EntityUpdate', {*/}
            {/*            'entityTitle': entity.title*/}
            {/*        });*/}
            {/*        console.log('update entity info');*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <MaterialIconsCommunity name='pen' style={{*/}
            {/*        fontFamily: 'Verdana',*/}
            {/*        fontSize: 20,*/}
            {/*        color: '#1CAADC',*/}
            {/*        marginRight: 10,*/}
            {/*    }}/>*/}
            {/*</TouchableOpacity>*/}

        </View>
        )
    }
}

