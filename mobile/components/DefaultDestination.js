import { StyleSheet, View} from 'react-native'
import { Button, Text} from 'react-native-paper'
import React, {useContext, useState} from 'react'
import GooglePlacesInput from './GooglePlacesInput'
import { FiuberContext } from '../context/FiuberContext'
import { createDefaultDestination } from '../services/trips'

const DefaultDestination = () => {

    const address_default = {
        description: '',
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.09,
        longitudDelta: 0.04

    }

    const [address, setAddres] = useState(address_default);
    const {defaultDestination, setCurrentDestination,  setHasDefaultDestination, user} = useContext(FiuberContext);

    const handleSave = async () => {
        try {
            const destination = await createDefaultDestination(user.jwt, address.description, address.latitude,address.longitude );
            
            console.log("en default destination destination ", destination)
            
             const d =  {
                description: destination.address,
                latitude: destination.latitude,
                longitude: destination.longitude,
            
            } 
          
            console.log("default desti ", defaultDestination)
            console.log("curren desti que quiero ", address)
            console.log("la destination devuelta por la api: ", d)
            setCurrentDestination(d);
            setHasDefaultDestination(true)
          
           
           
        } catch (err) {
            
            if(err.includes("has previously registered an address")){
                setHasDefaultDestination(true) 
                const d =  {
                    description: address.description,
                    latitude: address.latitude,
                    longitude: address.longitude,

                } 
                setCurrentDestination(d)
            }
            alert("Tenes que ingresar una direccion!")
            setHasDefaultDestination(false)
            console.log("No se pudo crear la default destination del usuario, err: ",err);
            
        }
    }

    const onPlaceSelected = (details) => {
        console.log("estos son los details destination" ,details)
        const address = {
            description: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        }

        setAddres(address)
      

    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Enter your destination</Text>
        <View style={styles.search_container}>
            <GooglePlacesInput onPlaceSelected={(details) => onPlaceSelected(details)}/>
        </View>
        <Button style={styles.trip_button} mode="contained" onPress={handleSave}>
            SAVE
        </Button>
        </View>
    )
}

export default DefaultDestination

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        position:'absolute',
        width:'80%',
        height:'60%',
        borderRadius:12,
        shadowColor:'black',
        shadowOffset:{width:2,height:2},
        shadowOpacity: 0.5,
        elevation:4,
        padding:8,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    search_container: {
        borderColor:'grey',
        borderWidth:0.5,
        height:50,
        borderRadius:8,
        width:'80%'
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