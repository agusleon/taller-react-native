/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { FiuberContext } from '../context/FiuberContext';


const Router = () => {
    
    const {loggedIn, setLoggedIn, role, setRole} = useContext(FiuberContext);

    return (
    <NavigationContainer>
        {loggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
    )
}

export default Router;
