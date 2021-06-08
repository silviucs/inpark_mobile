import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import ProfileIndexScreen from '../pages/phone/profile';
import {createStackNavigator} from '@react-navigation/stack';
import MoreIndexScreen from '../../pages/phone/more';
import ContactFormScreen from '../../pages/phone/more/pages/contact';
import StaticContentScreen from '../../pages/phone/more/pages/static';
import ChangePasswordScreen from '../../pages/phone/profile/changePassword';
import SupportFormScreen from '../../pages/phone/more/pages/support';
// import UserProfileScreen from '../pages/phone/profile/pages/profile';
import MarketingScreen from '../../pages/phone/more/pages/marketing';
import FeedScreen from '../../pages/tablet/dashboard';
import ProfileIndexScreen from '../../pages/phone/profile';

const Tab = createBottomTabNavigator()

const Stack = createStackNavigator()

function HomepageStackNavigator(){
    return (
        <Stack.Navigator
            headerMode={'none'}
        >
            <Stack.Screen name='Home' component={FeedScreen} />
        </Stack.Navigator>
    )
}

function ProfileStackNavigator(){
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name='ProfileIndex' component={ProfileIndexScreen} />
            {/*<Stack.Screen name='UserProfile' component={UserProfileScreen} />*/}
            {/*<Stack.Screen name='ProfileChangePassword' component={ChangePasswordScreen} />*/}
        </Stack.Navigator>
    )
}

function MoreStackNavigator(){
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name='MoreIndex' component={MoreIndexScreen} />
            <Stack.Screen name='Contact' component={ContactFormScreen} />
            <Stack.Screen name='Support' component={SupportFormScreen} />
            <Stack.Screen name='Marketing' component={MarketingScreen} />
            <Stack.Screen name='StaticContent' component={StaticContentScreen} />
        </Stack.Navigator>
    )
}

function AuthenticatedTabNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                headerMode={'none'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Routine') {
                            iconName = focused ? 'clock' : 'clock-outline';
                        }else if (route.name === 'Blog') {
                            iconName = focused ? 'book-open' : 'book-open-outline';
                        }else if (route.name === 'More') {
                            iconName = 'dots-horizontal';
                        }else if (route.name === 'Profile') {
                            iconName = focused ? 'account' : 'account-outline';
                        }

                        // You can return any component that you like here!
                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#d52146',
                    inactiveTintColor: '#16bdba',
                    showLabel: false
                }}
            >
                {/*options={{unmountOnBlur: true}}*/}
                <Tab.Screen name='Home' component={HomepageStackNavigator}  />
                {/*<Tab.Screen name='Routine' component={RoutineStackNavigator} />*/}
                {/*<Tab.Screen name='Blog' component={BlogStackNavigator} />*/}
                <Tab.Screen name='Profile' component={ProfileStackNavigator} />
                <Tab.Screen name='More' component={MoreStackNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AuthenticatedTabNavigator;
