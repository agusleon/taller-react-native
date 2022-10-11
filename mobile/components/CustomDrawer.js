import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { logout} from '../firebase'
const CustomDrawer = (props) => {
   
    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text>Agustina</Text>
            </View>
            <DrawerContentScrollView {...props} >
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
            <View>
                <Button onPress={logout}  style={styles.button_logout}>
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