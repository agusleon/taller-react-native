import { React } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import DriverInfoScreen from '../screens/DriverInfoScreen';
import PassengerInfoScreen from '../screens/PassengerInfoScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen component={LoginScreen} name="Login"/>
            <Stack.Screen component={OnboardingScreen} name="Onboarding"/>
            <Stack.Screen component={RegisterScreen} name="Register"/>
            <Stack.Screen component={DriverInfoScreen} name="Driver"/>
            <Stack.Screen component={PassengerInfoScreen} name="Passenger"/>
        </Stack.Navigator>
    )
}

export default AuthStack;