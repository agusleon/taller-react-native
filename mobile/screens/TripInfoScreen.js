import { StyleSheet,View} from 'react-native'
import TopBar from '../components/TopBar'
import React, {useContext, useState} from 'react'
import { Button, Text, ActivityIndicator} from 'react-native-paper'
import GooglePlacesInput from '../components/GooglePlacesInput';
import { FiuberContext } from '../context/FiuberContext';

const TripInfoScreen = ({navigation}) => {

    const {destination, setDestination, setOnTrip} = useContext(FiuberContext);
    const [estimatedFee, setFee] = useState(0);
    const [loading, setLoading] = useState(false);

    const onPlaceSelected = (details) => {
        const address = {
            description: details.formatted_address,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng
        }
        setDestination(address);
        console.log("Se seteo un viaje a ",destination)
    }

    const handleStartTrip = () => {
        setOnTrip(true)
        navigation.navigate('Home');
    }

    const estimateFee = () => {
        // calcular distancia entre destination y current location
        // llamar motor de reglas
        setLoading(false)
    }

    return (
        <View style={styles.container}>

            <TopBar {...navigation} />

            <View style={styles.small_container}>

                <Text style={styles.title}>Where to?</Text>

                <View style={styles.address_container}>

                    <GooglePlacesInput placeholder='Destination' onPlaceSelected={(details) => onPlaceSelected(details)}/>

                </View>

                <View>
                    <Button mode="outlined" onPress={estimateFee}>

                        <Text>Calculate estimative fee</Text>

                    </Button>
                    {loading ? 
                        <ActivityIndicator style={styles.activityIndicator} size="large" visible={loading} textContent={'Loading...'} />
                        : <Text></Text>}
                    <Text  style={styles.title}>{estimatedFee} ETH</Text>                
                </View>
            </View>


            <View style={styles.button_container}>
                <Button style={styles.trip_button} mode="contained" onPress={handleStartTrip}>
                    CONFIRM
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
    },
    menuItemText: {
        marginLeft: 5
    },

    activityIndicator: {
        margin:15,
        width:'50%',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#20315f',
        alignSelf:'center',
    },
})