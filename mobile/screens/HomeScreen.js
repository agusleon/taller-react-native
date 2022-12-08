import React, { useContext, useState } from 'react'
import { View, StyleSheet, TextInput, Dimensions } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { ActivityIndicator, Button, Modal, Text, TouchableRipple } from 'react-native-paper'
import Map from '../components/Map'
import TopBar from '../components/TopBar'
import { FiuberContext } from '../context/FiuberContext'
import GooglePlacesInput from '../components/GooglePlacesInput'
import { createCustomDestination, createTrip, estimateFee } from '../services/trips';
import {getDistance} from 'geolib';

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function HomeScreen ({navigation}) {

    const [favoriteName, setFavoriteName] = useState('');
    const {
        user, 
        destination, 
        currentLocation, 
        setDestination, 
        trip, 
        setTrip, 
        setTripStatus,
        tripStatus,
        setOnTrip,
        loadingFee,
        setLoadingFee,
        tripInfo,
        setTripInfo,
        favoriteDestinations, 
        setFavoriteDestinations} = useContext(FiuberContext);

    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleTripButton = async () => {

        console.log(destination)
        console.log(currentLocation)
        setOnTrip(true)
        try {
            const response = await createTrip(user.jwt, currentLocation, destination)
            if(!response.detail){
                const trip = {
                    tripId: response.trip_id,
                    estimatedFee: trip.estimatedFee,
                    totalFee:0
                }
                setTrip(trip)
                setTripStatus(response.trip_state)
            }
            console.log(response)
        } catch (err) {
            alert(err.message)
            console.log(err.message)
        }   

    }

    const checkTrip = () => {

        let seconds = 0; //este seria mi trip status

        let interval = setInterval(async () => {

            // API CALL A TRIP CON GET TRIP_ID, me da la info del trip y me fijo el status si cambio al actual

            // [API_CALL]

            console.log("Estoy llamando a los ", seconds)

            // el status AVAILABLE no lo chequeo

            // si cambio mi status a AWAITING DRIVER sigo llamando pero esta vez me fijo las coordenadas del driver

            // si cambio mi status a ONGOING ahi tengo que seguir llamando pero ademas actualizar mi current location (hay que ver si es viable)

            // si cambio mi status a FINISHED, paro
            if (seconds > 5) {
                console.log("Stopping...")
                clearInterval(interval)
            }

            seconds ++; // cambio mi status
            
        }, 2000);
    }

    const handleFavoriteButton = () => {
        showModal()
    }

    const handleCancelButton = async () => {
        setDestination('')
        setTripInfo(false)
        setOnTrip(false)
    }

    const onPlaceSelected = async (details) => {

        setLoadingFee(true)

        const description = details.formatted_address ? details.formatted_address : details.description;
        const address = {
            description,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            longitudeDelta: LONGITUDE_DELTA,
            latitudeDelta: LATITUDE_DELTA
        }

        setDestination(address)

        const distanceInMeters = getDistance(
            {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
            {latitude: address.latitude, longitude: address.longitude}
        )
        const fee = await estimateFee(distanceInMeters);

        setTrip({estimatedFee: fee.totalCost.toFixed(6)})
        setLoadingFee(false)
    }

    const saveFavoritePlace = async () => {
        try {
            const response = await createCustomDestination(user.jwt, destination.description, favoriteName, destination.latitude, destination.longitude);
            console.log(response)
            if (response.detail){
                console.log(response.detail);
                alert(response.detail);
            } else {
                const new_destinations = favoriteDestinations.concat(response);
                setFavoriteDestinations(new_destinations);
                console.log("Custom destination creada correctamente: ",response);
            }
            setFavoriteName('')
            hideModal()

        } catch(err){
            console.log("No se pudo agregar la custom destination");
        }
    }

    const OnTripComponent=()=> {
        return (
          <View>
            <Text>On trip</Text>
          </View>
        );
    }

    const SearchingDriverComponent=()=> {
        return (
          <View>
            <Text>Searching Driver</Text>
          </View>
        );
    }


    return (
        <View style={styles.container}>
            <Map/>
            <TopBar {...navigation} />
            <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                <Text style={styles.text}>Make it a favorite</Text>
                <TextInput
                    placeholder='Name it'
                    style={styles.favorite_input}
                    value={favoriteName}
                    onChangeText={name => setFavoriteName(name)}
                />
                <Button mode="contained" onPress={saveFavoritePlace}>
                    SAVE
                </Button>
            </Modal>
            
            {!modalVisible &&
                <View style={styles.card}>

                    {/* Confirming the trip */}
                    {(tripInfo && tripStatus == '') &&
                    <View style={styles.small_container}>
                        <View style={styles.location_container}>
                            <MaterialCommunityIcons name="map-marker" size={24} color="black" />
                            <Text style={styles.text}>{destination.description}</Text>
                        </View>
                        <TouchableRipple onPress={handleFavoriteButton}>
                            <Ionicons name="heart-outline" color="#FF6347" size={25}/>
                        </TouchableRipple>
                        {loadingFee ? 
                        <ActivityIndicator style={styles.activityIndicator} size="large" visible={true} textContent={'Loading...'} />:
                        <Text style={styles.text}>
                            Estimated Fee: {trip.estimatedFee} ETH
                        </Text>
                        }
                    </View>
                    }
                    
                    {/* Searching for driver */}
                    {(tripInfo && tripStatus == 'AVAILABLE') &&
                        <SearchingDriverComponent/>
                    }

                    {/* Awaiting the driver to arrive */}
                    {(tripInfo && tripStatus == 'AWAITING_DRIVER_ARRIVAL') &&
                        <OnTripComponent/>
                    }

                    {/* Inputing the destination */}
                    {!tripInfo && <GooglePlacesInput placeholder='Where to?' onPlaceSelected={(details) => onPlaceSelected(details)}/>}
                    
                    {(tripInfo && tripStatus == '') &&
                        <View style={styles.button_container}>
                            <Button style={styles.button} mode="contained" onPress={handleTripButton}>
                                Order car
                            </Button>
                            <Button style={styles.button} mode="outlined" onPress={handleCancelButton}>
                                Cancel
                            </Button> 
                        </View>
                    }
                </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    with_keyboard: {
        height:200
    },
    without_keyboard: {
        height:200
    },
    small_container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    location_container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        // alignItems:'center'
    },
    modal: {
        height:'30%',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor: 'white', 
        padding: 20,
        margin: 20,
        borderRadius:8
    },
    favorite_input: {
        height:50,
        borderWidth: 0.5,
        borderRadius:8,
        borderColor:'grey',
        padding:5,
        width:'80%'
    },
    card: {
        position:'absolute',
        bottom: 50,
        flex:1,
        width:'90%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor:'black',
        shadowOffset:{width:2,height:2},
        shadowOpacity: 0.5,
        elevation:4,
        padding:8,
        borderRadius:12
    },
    text:{
        marginBottom:10,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#20315f'
    },
    button_container: {
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    button: {
        width:'90%',
        padding:8,
        borderRadius:8,
        margin:5
    }
})