import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-animatable';
import {Avatar} from 'react-native-elements';
import {feed} from '../../../../assets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BookmarkButton} from './bookmarkButton';
import {LikeButton} from './likeButton';
import {CommentButton} from './commentButton';
import {ShareButton} from './shareButton';
import {LikesNumber} from './likesNumber';
import {CommentsNumber} from './commentsNumber';
import FastImage from 'react-native-fast-image';

export const Entity = (props) => {
    console.log(props.entity);
    return (
        <View style={styles.box}>
            <View style={{flexDirection: 'row', marginVertical: 4}}>
                <View>
                    <Avatar
                        rounded
                        source={{uri: props.entity.avatar}}
                        overlayContainerStyle={{backgroundColor: 'white'}}
                    />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={feed.username}>{props.entity.username}</Text>
                    {/*<Text style={{marginLeft: 5, fontSize: 12, color: '#CCC'}}>{props.entity.created}</Text>*/}
                </View>
            </View>
            <FastImage
                style={{width: '100%', height: props.entity.size.height, alignSelf: 'stretch'}}
                source={{uri: props.entity.image,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={'contain'}
                cache={'only-if-cached'}
                // PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{borderBottomColor: '#CCC', borderBottomWidth: 1, marginHorizontal: 8, paddingVertical: 4, flexDirection: 'row'}}>
                <View style={{justifyContent: 'flex-start', flex: 1}}>
                    <LikesNumber likes_number={props.entity.likes_number}/>
                </View>
                <View style={{justifyContent: 'flex-end'}}>
                    <CommentsNumber comments_number={props.entity.comments_number}/>
                </View>
            </View>
            <View style={{marginVertical: 4, marginHorizontal: 4, flexDirection: 'row'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <LikeButton liked={props.entity.is_liked}/>
                    <CommentButton/>
                    <ShareButton/>
                </View>
                <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <BookmarkButton bookmarked={props.entity.is_bookmarked}/>
                </View>
            </View>

            <View style={{marginVertical: 4}}>
                <Text style={feed.title}>{props.entity.title}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        marginVertical: 4,
        flex: 1,
        paddingVertical: 4,
        backgroundColor: 'white',
    },
});
