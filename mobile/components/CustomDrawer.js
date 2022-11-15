/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FiuberContext } from '../context/FiuberContext';
import { auth, logout } from '../firebase';

const CustomDrawer = (props) => {
    
    const {loggedIn, setLoggedIn, role, setRole, user} = useContext(FiuberContext);

    const handleLogout = () => {
        logout(auth);
        setLoggedIn(false);
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text>{user.name}</Text>
            </View>
            <DrawerContentScrollView {...props} >
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <View>
                <Button onPress={handleLogout} style={styles.button_logout}>
                    Log out
                </Button>
            </View>
        </View>
        

    )
}

const styles = StyleSheet.create({
    container: {
        height:'30%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_logout: {
        margin:10
    }
})

export default CustomDrawer