import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';

const TopBar = (navigation) => {

  return (
    <View style={styles.container}>
        <View style={styles.container_button}>
            <TouchableRipple
                onPress={() => navigation.openDrawer()}
                
                >
                <Ionicons name="menu" size={40}/>
            </TouchableRipple>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        width:'100%',
        position: 'absolute',
        top: Constants.statusBarHeight,
        flex: 1,
    },
    container_button: {
        width:45,
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor: '#FFF',
        borderRadius:10,
        marginTop:'5%',
        marginLeft:'10%',
    }
})

export default TopBar;