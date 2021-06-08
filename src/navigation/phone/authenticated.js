import React, {forwardRef} from 'react';
import {View} from 'react-native';
import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import ProfileIndexScreen from '../pages/phone/profile';
import {createStackNavigator} from '@react-navigation/stack';
import MoreIndexScreen from '../../pages/phone/more';
import ContactFormScreen from '../../pages/phone/more/pages/contact';
import StaticContentScreen from '../../pages/phone/more/pages/static';
import ChangePasswordScreen from '../../pages/phone/profile/changePassword';
import SupportFormScreen from '../../pages/phone/more/pages/support';
// import UserProfileScreen from '../pages/phone/profile/pages/profile';
import MarketingScreen from '../../pages/phone/more/pages/marketing';
import FeedScreen from '../../pages/phone/dashboard';
import ProfileIndexScreen from '../../pages/phone/profile';
import FollowGroupScreen from '../../pages/phone/meetup/follow';
import MeetupDetailsScreen from '../../pages/phone/meetup/details';
import NewMeetupScreen from '../../pages/phone/meetup/add';
import {INACTIVE_COLOUR, MAIN_COLOUR, SECONDARY_COLOUR} from '../../system/constants';
import FriendsRequestsScreen from '../../pages/phone/profile/pages/friendsRequests';
import AcceptInviteScreen from '../../pages/phone/profile/pages/acceptInvite';
import MeetupsListScreen from '../../pages/phone/meetup';
import {navigationRef} from './rootNavigation';
import PublicProfileScreen from '../../pages/phone/profile/pages/publicProfile';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const linking = {
    prefixes: [
        'inpark://',
    ],
    config: {
        screens: {
            MeetUp: {
                screens: {
                    MeetupDetails: {
                        path: 'details/:id',
                    },
                },
            },
            Profile: {
                screens: {
                    AcceptInvite: {
                        path: 'friend/invite/:uuid',
                    },
                },
            },
        },
    },
};

function HomepageStackNavigator() {
    return (
        <Stack.Navigator
            headerMode={'none'}
        >
            <Stack.Screen name="Home" component={FeedScreen}/>
        </Stack.Navigator>
    );
}

function MeetupStackNavigator() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="MeetupsList" component={MeetupsListScreen}/>
            <Stack.Screen name="MeetupDetails" component={MeetupDetailsScreen}/>
        </Stack.Navigator>
    );
}

function NewMeetupStackNavigator() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="NewMeetup" component={NewMeetupScreen}/>
        </Stack.Navigator>
    );
}

function ProfileStackNavigator() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="ProfileIndex" component={ProfileIndexScreen}/>
            <Stack.Screen name="FriendsRequests" component={FriendsRequestsScreen}/>
            <Stack.Screen name="AcceptInvite" component={AcceptInviteScreen}/>
            <Stack.Screen name="PublicProfile" component={PublicProfileScreen}/>
            {/*<Stack.Screen name='ProfileIndex' component={ProfileIndexScreen} />*/}
            {/*<Stack.Screen name='UserProfile' component={UserProfileScreen} />*/}
            {/*<Stack.Screen name='ProfileChangePassword' component={ChangePasswordScreen} />*/}
        </Stack.Navigator>
    );
}

function MoreStackNavigator() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="MoreIndex" component={MoreIndexScreen}/>
            <Stack.Screen name="Contact" component={ContactFormScreen}/>
            <Stack.Screen name="Support" component={SupportFormScreen}/>
            <Stack.Screen name="Marketing" component={MarketingScreen}/>
            <Stack.Screen name="StaticContent" component={StaticContentScreen}/>
        </Stack.Navigator>
    );
}

const customTabBarStyle = {
    activeTintColor: SECONDARY_COLOUR,
    inactiveTintColor: INACTIVE_COLOUR,
    style: {backgroundColor: 'white', borderTopWidth: 2, borderTopColor: 'white', },
};

function AuthenticatedTabNavigator() {
    return (
        <NavigationContainer linking={linking} ref={navigationRef}>
            <Tab.Navigator
                initialRouteName="Home"
                activeColor="red"
                tabBarOptions={customTabBarStyle}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name === 'Add') {
                            color = MAIN_COLOUR;
                        }
                    },
                })}
                shifting="false">
                <Tab.Screen
                    name="Home"
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({color}) => (
                            <Icon name="home" color={color} size={18}/>
                        ),
                    }}
                    component={HomepageStackNavigator}/>
                <Tab.Screen
                    name="MeetUp"
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({color}) => (
                            <Icon name="list-alt" color={color} size={18}/>
                        ),
                    }}
                    component={MeetupStackNavigator}
                />
                <Tab.Screen
                    name="Add"
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({focused, color}) => {
                            return (
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 0, // space from bottombar
                                        borderRadius: 12,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: (focused ? SECONDARY_COLOUR : MAIN_COLOUR),
                                        paddingVertical: 6,
                                        paddingHorizontal: 12
                                    }}
                                >
                                    <Icon name="plus" color={'white'} size={20}/>
                                </View>
                            );
                        },
                    }}
                    component={NewMeetupStackNavigator}
                />
                <Tab.Screen
                    name="Profile"
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({color}) => (
                            <Icon name="user" color={color} size={18}/>
                        ),
                    }}
                    component={ProfileStackNavigator}
                />
                <Tab.Screen
                    name="More"
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({color}) => (
                            <Icon name="info" color={color} size={18}/>
                        ),
                    }}
                    component={MoreStackNavigator}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function AuthenticatedTabNavigatorX() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                headerMode={'none'}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Routine') {
                            iconName = focused ? 'clock' : 'clock-outline';
                        } else if (route.name === 'Blog') {
                            iconName = focused ? 'book-open' : 'book-open-outline';
                        } else if (route.name === 'More') {
                            iconName = 'dots-horizontal';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'account' : 'account-outline';
                        }

                        // You can return any component that you like here!
                        return <Icon name={iconName} size={size} color={color}/>;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#d52146',
                    inactiveTintColor: '#16bdba',
                    showLabel: false,
                }}
            >
                {/*options={{unmountOnBlur: true}}*/}
                <Tab.Screen name="Home" component={HomepageStackNavigator}/>
                {/*<Tab.Screen name='Routine' component={RoutineStackNavigator} />*/}
                {/*<Tab.Screen name='Blog' component={BlogStackNavigator} />*/}
                <Tab.Screen name="Profile" component={ProfileStackNavigator}/>
                <Tab.Screen name="More" component={MoreStackNavigator}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default forwardRef(AuthenticatedTabNavigator);
