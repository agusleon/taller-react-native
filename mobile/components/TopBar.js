import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';

const TopBar = (navigation) => {

  return (
    <View style={styles.container}>
        <TouchableRipple
            onPress={() => navigation.openDrawer()}
        >
            <Ionicons name="menu" size={35}/>
        </TouchableRipple>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
        width:'90%',
        position:'absolute',
        top:40,
        flex:1,
        alignSelf: 'stretch', 
        right: 0,
        left: 0,
        height: 50,
        padding:10,
        flexDirection:'row',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})

export default TopBar;