import { StyleSheet, View } from 'react-native'
import { Button, TextInput, TouchableRipple, Text} from 'react-native-paper'
import React, {useContext, useState} from 'react'
import { FiuberContext } from '../context/FiuberContext'
import { createCustomDestination } from '../services/trips'
import Ionicons from '@expo/vector-icons/Ionicons';

const MakeItAFavoriteScreen = ({navigation}) => {

    const [name,setName] = useState('');
    const {user, destination, destinations, setDestinations} = useContext(FiuberContext);

    const saveAddress = async () => {
        try {
            const response = await createCustomDestination(user.jwt, destination.description, name, destination.latitude, destination.longitude);
            
            if (response.detail){
                console.log("response detail ",response.detail);
                console.log("No se pudo agregar la custom destination");
                alert("No se pudo agregar la destination");
            } else {
                const new_destinations = destinations.concat(response);
                setDestinations(new_destinations);
                navigation.navigate('Make a Trip')
                console.log("Custom destination creada correctamente: ",response);
            }
        } catch(err){
            console.log("No se pudo agregar la custom destination");
        }
    }

    return (

        <View style={styles.container}>

            <TextInput
                    label="Give it a name"
                    value={name}
                    autoCapitalize='none'
                    onChangeText={name => setName(name)}
                    left={<TextInput.Icon icon="home" />}
                />

            <Button style={styles.trip_button} mode="contained" onPress={saveAddress}>
                Save
            </Button>

            <TouchableRipple onPress={() => navigation.navigate('Make a Trip')}>

                <View style={styles.favorite}>
                    
                    <Ionicons name="heart-outline" color="#FF6347" size={25}/>

                    <Text style={styles.menuItemText}>Make it a favorite</Text>

                </View>

            </TouchableRipple>


        </View>

    )
}

export default MakeItAFavoriteScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        position:'absolute',
        elevation:1,
        width:'80%',
        height:'60%',
        borderRadius:12,
        shadowColor:'black',
        shadowOffset:{width:2,height:2},
        shadowOpacity: 0.5,
        padding:8,
        justifyContent:'space-evenly',
        alignItems:'center'
    },
})