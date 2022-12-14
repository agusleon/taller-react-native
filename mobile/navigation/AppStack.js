import { React, useContext } from 'react';
import { FiuberContext } from '../context/FiuberContext';
import RateUserScreen from '../screens/RateUserScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerStackPassenger from './DrawerNavigatorPassenger';
import DrawerStackDriver from './DrawerNavigatorDriver';
import DriverInfoScreen from '../screens/DriverInfoScreen';
import PassengerInfoScreen from '../screens/PassengerInfoScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {

    const {role} = useContext(FiuberContext);

    if (role=='passenger'){
        return (

            <Stack.Navigator>
                <Stack.Screen
                    name="Menu"
                    component={DrawerStackPassenger}
                    headerShown={false}
                    options={{headerMode: 'none', headerShown: false}}
                    />
                <Stack.Screen
                    name="Review Driver"
                    component={RateUserScreen}
                    />
                <Stack.Screen
                    name="Driver Info Screen"
                    component={DriverInfoScreen}
                    />
            </Stack.Navigator>
        );
    } else {
        return (

            <Stack.Navigator> 
                <Stack.Screen
                    name="Menu"
                    component={DrawerStackDriver}
                    headerShown={false}
                    options={{headerMode: 'none', headerShown: false}}
                    />
                <Stack.Screen
                    name="Review Passenger"
                    component={RateUserScreen}
                    />
                <Stack.Screen
                    name="Passenger Info Screen"
                    component={PassengerInfoScreen}
                    />
            </Stack.Navigator>
        )
    }
}

export default AppStack;