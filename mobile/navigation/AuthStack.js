import { React } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen component={OnboardingScreen} name="Onboarding"/>
            <Stack.Screen component={LoginScreen} name="Login"/>
            <Stack.Screen component={RegisterScreen} name="Register"/>
            <Stack.Screen component={AppStack} name="App"/>
        </Stack.Navigator>
    )
}

export default AuthStack;