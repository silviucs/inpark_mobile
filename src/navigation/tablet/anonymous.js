import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import AuthIndexScreen from "../../pages/common/auth";
import LoginScreen from "../../pages/common/auth/login";
// import AuthRegisterIndexScreen from "../pages/phone/auth/register";
import RegisterDetailsScreen from "../../pages/common/auth/register";
import ResetPasswordScreen from '../../pages/common/auth/resetPassword';
// import ResetPasswordCodeScreen from '../pages/phone/auth/resetPassword/resetPasswordCode';
// import ChangePasswordScreen from '../pages/phone/auth/resetPassword/changePassword';

const Stack = createStackNavigator()

function AnonymousStackNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator
                headerMode={'none'}
            >
                <Stack.Screen name='Index' component={AuthIndexScreen} />
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
                {/*<Stack.Screen name='ResetPasswordCode' component={ResetPasswordCodeScreen} />*/}
                {/*<Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />*/}
                {/*<Stack.Screen name="Register" component={AuthRegisterIndexScreen} />*/}
                <Stack.Screen name="RegisterDetails" component={RegisterDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AnonymousStackNavigator;
