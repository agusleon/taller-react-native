import { StyleSheet, View, SafeAreaView} from 'react-native'
import { Text, TextInput, Button} from 'react-native-paper';
import React, {useContext, useEffect, useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { FiuberContext } from '../context/FiuberContext';
import {registerPassengerWithEmailAndPassword} from '../firebase';

export default function PassengerInfoScreen() {
    const [addressName, setAddressName] = useState('')
    const [address, setAddress] = useState('')

    const {user, role} = useContext(FiuberContext);

    const registerPassenger = () => {
        registerPassengerWithEmailAndPassword(user.name, user.email, user.password, address.description, role)
        // create user in database
        // create address in database
    }

    const onPlaceSelected = (details) => {
        const address = {
            description: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        }
        setAddress(address)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.small_container}>
                <Text style={styles.title}>Enter your address</Text>
                <View style={styles.input_container}>
                    <GooglePlacesInput placeholder="Search" style={styles.icon_text_container} onPlaceSelected={(details) => onPlaceSelected(details)}/>
                    <View style={styles.icon_text_container}>
                        <Ionicons name="heart" size={22}/>
                        <TextInput
                            style={styles.text_container}
                            onChangeText={address => setAddressName(address)}
                            value={addressName}
                            placeholder="Name your address"
                            keyboardType="text"
                        />
                    </View>
                </View>
                {((addressName.length == 0) || (address.description.length == 0)) ? (
                    <Text style={{color:'red'}}>
                        All fields are mandatory
                    </Text>
                    ) :  
                    <Text></Text>
                }
                <Button mode="outlined" disabled={false} onPress={registerPassenger}>
                    Save Address
                </Button>
            </View>
        </SafeAreaView>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    small_container: {
        flexDirection: 'column',
        height: '70%',
        width: '80%',
        justifyContent: 'space-evenly'
    },
    input_container: {
        flexDirection: 'column',
        height: '60%',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#20315f'
    },
    icon_text_container: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: 80,
        backgroundColor:'white',
        borderRadius:5,
        shadowColor:'black',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        elevation: 4,
        padding: 8
    },
    text_container: {
        backgroundColor:'white',
        borderWidth:0,
        borderStartColor:'black',
        borderBottomColor:'white',
        width: '90%',  
    }
})