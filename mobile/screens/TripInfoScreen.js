import { StyleSheet,View} from 'react-native'
import TopBar from '../components/TopBar'
import React, {useState, useContext} from 'react'
import { Button, TouchableRipple, Text, TextInput } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons';
import GooglePlacesInput from '../components/GooglePlacesInput';
import { createCustomDestination } from '../services/trips';
import { FiuberContext } from '../context/FiuberContext';
// import { FiuberContext } from '../context/FiuberContext';

const TripInfoScreen = ({navigation}) => {

    const address = {
        name: '',
        description: '',
        latitude: '',
        longitude: ''
    }
    const [name,setName] = useState('');
    const [destination, setDestination] = useState(address);
    const {user} = useContext(FiuberContext);

    // useEffect(() => {
    //     // make get call to retrieve already saved destinations
    //     // we are going to use it to display them in the google autocomplete
    //   }, [])

    const onPlaceSelected = (details) => {
        const address = {
            description: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        }
        setDestination(address)
        console.log("Se seteo un viaje a ",destination)
    }

    const saveAddress = async () => {
        try {
            const response = await createCustomDestination(user.jwt, destination.description, name);
            if (response.detail){
                console.log(response);
                console.log("No se pudo agregar la custom destination");
                alert("No se pudo agregar la destination");
            } else {
                console.log("Custom destination creada correctamente: ",response);
            }
        } catch(err){
            console.log("No se pudo agregar la custom destination");
        }
    }

    return (
        <View style={styles.container}>
            <TopBar {...navigation} />
            <View style={styles.small_container}>
                <Text style={styles.title}>Where to?</Text>
                <View style={styles.address_container}>
                    <GooglePlacesInput placeholder='Destination' onPlaceSelected={(details) => onPlaceSelected(details)}/>
                    <TextInput
                            label="Give it a name"
                            value={name}
                            autoCapitalize='none'
                            onChangeText={name => setName(name)}
                            left={<TextInput.Icon icon="home" />}
                        />
                    <TouchableRipple onPress={saveAddress}>
                        <View style={styles.favorite}>
                            <Ionicons name="heart-outline" color="#FF6347" size={25}/>
                            <Text style={styles.menuItemText}>Make it a favorite</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
            <View style={styles.button_container}>
                <Button style={styles.trip_button} mode="contained" onPress={() => {navigation.navigate('Home')}}>
                    START TRIP
                </Button>
                <Button style={styles.trip_button} mode="outlined" onPress={() => {navigation.navigate('Home')}}>
                    CANCEL
                </Button>
            </View>
        </View>
    )
}

export default TripInfoScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    search_input: {
        width:'50%',
        flex:'flex-grow'
    },  
    small_container: {
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        height:'40%',
        width:'100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#20315f'
    },
    address_container: {
        padding:8,
        backgroundColor:'white',
        shadowColor:'black',
        shadowOffset:{width: 2, height: 2},
        shadowOpacity: 0.5,
        elevation:3,
        borderRadius: 8,  
        height:180,
        width:'90%',
        flexDirection:'column',
        justifyContent:'space-evenly'
    },
    trip_button: {
        width:'40%',
        padding:8,
        borderRadius:8,
    },
    button_container: {
        width:'100%',
        bottom:0,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent: 'space-evenly'
    },
    favorite: {
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        width:'50%'
    }
})