/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FiuberContext } from '../context/FiuberContext';
import { auth, logout } from '../firebase';

const CustomDrawer = (props) => {
    
    const {setStatus, setDriver, setShowDirections, setLoggedIn, setDestination, setCurrentLocation, setRole, user} = useContext(FiuberContext);

    const handleLogout = () => {
        
        logout(auth);
        setRole('');
        setCurrentLocation('');
        setLoggedIn(false);
        setDestination(false)
        setStatus(0)
        setDriver(false)
        setShowDirections(false)
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.user_container}>
                <Avatar.Image
                size={100}
                source={{uri:'https://avatars.dicebear.com/api/big-smile/'+user.uid+'.png'}}
                />
                <Text style={styles.user_name}>{user.name}</Text>
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
    user_container: {
        height:'30%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    user_name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10
    },
    button_logout: {
        margin:10
    }
})

export default CustomDrawer