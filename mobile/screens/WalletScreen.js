import { StyleSheet, View } from 'react-native'
import {Text, Button} from 'react-native-paper'
import React, { useContext } from 'react'
import { FiuberContext } from '../context/FiuberContext'

const WalletScreen = ({navigation}) => {

    const {user} = useContext(FiuberContext);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your wallet</Text>
            <Text style={styles.title}>{user.wallet}</Text>
            <Button style={styles.trip_button} mode="contained" onPress={() => {navigation.navigate('Profile')}}>
                Go to Profile
            </Button>
        </View>
    )
}

export default WalletScreen

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'100%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#20315f'
    },
    trip_button: {
        width:'90%',
        shadowColor:'black',
        shadowOffset:{width:2,height:2},
        shadowOpacity: 0.5,
        elevation:4,
        padding:8,
        borderRadius:8,
    },
})