import React, { useContext, useState } from 'react'
import { View, StyleSheet, TextInput, Dimensions } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import { ActivityIndicator, Button, Modal, Text, TouchableRipple, Avatar } from 'react-native-paper'
import Map from '../components/MapPassenger'
import TopBar from '../components/TopBar'
import { FiuberContext } from '../context/FiuberContext'
import GooglePlacesInput from '../components/GooglePlacesInput'
import { createCustomDestination, createTrip, estimateFee, getTotalFee, getTrip } from '../services/trips';
import { AntDesign } from '@expo/vector-icons'; 
import {getDistance} from 'geolib';
import { getUser } from '../services/users';
import { getDistanceBetweenTwoPoints } from '../utils/methods';
import { 
    BEGIN,
    AVAILABLE,
    AWAITING_DRIVER,
    ON_GOING,
    TRIP_FINISHED,
    TRIP_INFO,
    CREATING_TRIP } from '../utils/vars';
import { createTransaction, makeDeposit, putPayment } from '../services/payments';

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function HomeScreen ({navigation}) {

    const [favoriteName, setFavoriteName] = useState('');
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [paymentMade, setPaymentMade] = useState(false);

    const {
        user,
        fee,
        status,
        destination,
        loadingFee,
        driver,
        gotDriver,
        focusLocation,
        setFocusLocation,
        favoriteDestinations,
        setShowDirections,
        currentLocation,
        setLoadingFee,
        setFavoriteDestinations,
        setFee,
        setDestination,
        setStatus,
        setDriver,
        setGotDriver,
        setDriverLocation,
        setOnGoing,
        setCurrentLocation
    } = useContext(FiuberContext);

    const [modalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    // HANDLERS

    const handleTripButton = async () => {

        setStatus(CREATING_TRIP)
        setShowDirections(true)

        try {
            const response = await createTrip(user.jwt, currentLocation, destination)
            if(!response.detail){
                const response_payment = await putPayment(user.jwt, response.trip_id, fee, 0, 0)
                console.log(JSON.stringify(response_payment))
                setStatus(AVAILABLE)
                waitForDriver(response.trip_id, AVAILABLE)
            }
            else {
                alert("You have an on going trip")
                setStatus(BEGIN)
                setShowDirections(false)
                console.log(JSON.stringify(response))
            }
            // waitForDriver("5c4a2de1-a744-4e67-afdd-c6282320292b")

        } catch (err) {
            alert(err.message)
            console.log(err.message)
        }   

    }

    const waitForDriver = (trip_id) => {

        let interval = setInterval(async () => {

            try {
                const response = await getTrip(trip_id,user.jwt);
                console.log("Searching for driver...")

                if (response.trip_state == AWAITING_DRIVER) {
                    console.log("Ive got driver")
                    const response_driver = await getUser(response.driver_id, user.jwt);
                    
                    const driver_state = {
                        id: response_driver.uid,
                        car_model: response_driver.car_description,
                        car_plate: response_driver.plate,
                        name: response_driver.name,
                        trip_id,
                    }

                    const driver_location = {
                        longitude: response.driver_longitude,
                        latitude: response.driver_latitude,
                    }

                    const total_fee = await getTotalFee(response.distance, user.uid, response_driver.uid)
                    setFee(Number(total_fee.totalCost.toFixed(6)))

                    const tx = await createTransaction(total_fee.totalCost.toFixed(6), trip_id, response_driver.uid, user.jwt);

                    console.log(JSON.stringify(tx))

                    clearInterval(interval)
                    setDriverLocation(driver_location)
                    setGotDriver(true)
                    setDriver(driver_state)
                    setStatus(response.trip_state)
                    checkTrip(trip_id)
                    

                }

            } catch (err) {
                alert(err.message)
                handleCancelButton()
                clearInterval(interval)
            }

        }, 10000)
    }


    const checkTrip = (trip_id) => {

        

        let interval = setInterval(async () => {

            // API CALL A TRIP CON GET TRIP_ID, me da la info del trip y me fijo el status si cambio al actual

            const response = await getTrip(trip_id, user.jwt);
            
            let new_status = response.trip_state

            if (new_status == AWAITING_DRIVER){ // si cambio mi status a AWAITING DRIVER sigo llamando pero esta vez me fijo las coordenadas del driver
                
                console.log("Awaiting for driver")

                const driver_location = {
                    longitude: response.driver_longitude,
                    latitude: response.driver_latitude,
                }
                setDriverLocation(driver_location)
                setGotDriver(true)

            } else if (new_status == ON_GOING) { // si cambio mi status a ONGOING ahi tengo que seguir llamando pero ademas actualizar mi current location (hay que ver si es viable)

                console.log("Going to my destination")

                const driver_location = {
                    longitude: response.driver_longitude,
                    latitude: response.driver_latitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }

                setFocusLocation(driver_location)
                setDriverLocation(driver_location)
                setOnGoing(true)

                const distanceInMeters = getDistanceBetweenTwoPoints(focusLocation, destination)
                console.log(distanceInMeters)

                if (distanceInMeters < 10){
                    setShowDirections(false)
                    
                }

            } else if (new_status == TRIP_FINISHED){ // si cambio mi status a FINISHED, paro
                console.log("Stopping...")

                setCurrentLocation({...focusLocation})
                setShowDirections(false)
                // setGotDriver(false)
                setOnGoing(false)
                clearInterval(interval)

            } else {

                console.log("Unrecognized ", status)

            }

            setStatus(new_status)
            
            
        }, 10000);
        
    }

    const handleReviewDriver = () => {
        
        navigation.navigate('Driver Info Screen')
        setDestination(false)
        setFocusLocation({...currentLocation})
        setStatus(BEGIN)
        setGotDriver(false)
        setShowDirections(false)
        setOnGoing(false)
    }

    const handleFavoriteButton = () => {
        showModal()
    }

    const handlePaymentButton = async () => {

        setLoadingPayment(true)

        try {

            await makeDeposit(driver.trip_id, user.jwt);

            const response_payment = await putPayment(user.jwt, driver.trip_id, fee, 1, 0)
            console.log(response_payment)
            
            setPaymentMade(true)
            setLoadingPayment(false)
            
        } catch(err) {
            alert("Could not make payment: ", err.message)
            console.log("Could not make payment: ", err.message)
            setLoadingPayment(false)
        }

    }

    const handleCancelButton = async () => {
        setDestination(false)
        setFocusLocation({...currentLocation})
        setStatus(BEGIN)
        setDriver(false)
        setGotDriver(false)
        setShowDirections(false)
        setOnGoing(false)
    }

    const handlePlaceSelected = async (details) => {
        
        setStatus(TRIP_INFO)
        setLoadingFee(true)
        
        // retrieve destination
        const description = details.formatted_address ? details.formatted_address : details.description;
        const address = {
            description,
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            longitudeDelta: LONGITUDE_DELTA,
            latitudeDelta: LATITUDE_DELTA
        }

        setDestination(address)

        // retrieve estimated fee
        const distanceInMeters = getDistance(
            {latitude: currentLocation.latitude, longitude: currentLocation.longitude},
            {latitude: address.latitude, longitude: address.longitude}
        )
        const estimated_fee = await estimateFee(distanceInMeters);

        setFee(Number(estimated_fee.totalCost.toFixed(6)))
        setLoadingFee(false)
    }

    const handleFavoritePlace = async () => {
        try {
            const response = await createCustomDestination(user.jwt, destination.description, favoriteName, destination.latitude, destination.longitude);

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
            console.log("No se pudo agregar la custom destination", err.message);
        }
    }


    // COMPONENTS
    const OnTripComponent=()=> {
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Avatar.Image
                    size={80}
                    source={{uri:'https://avatars.dicebear.com/api/big-smile/'+driver.id+'.png'}}
                    />
                    <View>
                        <Text style={styles.text}>Going to destination with {driver.name}</Text>
                        <Text style={styles.car_text}>{driver.car_model} - {driver.car_plate}</Text>
                    </View>
                </View>
                <Text style={styles.text}>Heading to destination</Text>
            </View>
        );
    }

    const AwaitingDriverComponent=()=> {
        return (
          <View style={styles.container}>
            <View style={styles.horizontal_container}>
                <Avatar.Image
                size={80}
                source={{uri:'https://avatars.dicebear.com/api/big-smile/'+driver.id+'.png'}}
                />
                <View>
                    <Text style={styles.text}>Waiting for {driver.name} to arrive</Text>
                    <Text style={styles.car_text}>{driver.car_model} - {driver.car_plate}</Text>
                </View>
            </View>
          </View>
        );
    }

    const SearchingDriverComponent=()=> {
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Text style={styles.text}>Searching for driver...</Text>
                </View>
                <ActivityIndicator style={styles.activityIndicator} size="large" visible={true} textContent={'Loading...'} />
          </View>
        );
    }

    const TripFinishedComponent =()=> {

        if(loadingPayment) {
            return (
                <View style={styles.container}>
                    <View style={styles.horizontal_container}>
                        <Text style={styles.text}>Making payment...</Text>
                    </View>
                    <ActivityIndicator style={styles.activityIndicator} size="large" visible={true} textContent={'Loading...'} />
                </View>
            )
        } else{

            return (
                <View style={styles.container}>
                {!paymentMade ?
                    <View style={styles.small_container}>
                        <Text style={styles.text}>Trip finished!</Text>
                        <Text style={styles.text}>Your total fee is: {fee}</Text>
                        <Button style={styles.button} mode="outlined" onPress={handlePaymentButton}>
                            Pay
                        </Button>
                    </View> :
                    <View style={styles.small_container}>
                        <Text style={styles.text}>Payment made</Text>
                        <AntDesign name="checkcircleo" size={24} color="green" />
                        <Button style={styles.button} mode="outlined" onPress={handleReviewDriver}>
                            Review Driver
                        </Button>
                    </View>
                }
                </View>
            );
        }
    }

    const TripInfoComponent = () => {
        return(<View style={styles.small_container}>
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
                Estimated Fee: {fee} ETH
            </Text>
            }
        </View>
        );
    }

    const CreatingTripComponent = () => {
        return(
        <View style={styles.button_container}>
            <View style={styles.horizontal_container}>
                <Text style={styles.text}>Creating trip...</Text>
            </View>
            <ActivityIndicator style={styles.activityIndicator} size="large" visible={true} textContent={'Loading...'} />
        </View>
        );
    }

    const ButtonComponent = () => {
        return(
        <View style={styles.button_container}>
            <Button style={styles.button} mode="contained" onPress={handleTripButton}>
                Order car
            </Button>
            <Button style={styles.button} mode="outlined" onPress={handleCancelButton}>
                Cancel
            </Button> 
        </View>
        );
    }

    return (
        <View style={styles.container}>

            <Map gotDriver={gotDriver}/>
            
            <TopBar {...navigation} />

            <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                <Text style={styles.text}>Make it a favorite</Text>
                <TextInput
                    placeholder='Name it'
                    style={styles.favorite_input}
                    value={favoriteName}
                    onChangeText={name => setFavoriteName(name)}
                />
                <Button mode="contained" onPress={handleFavoritePlace}>
                    SAVE
                </Button>
            </Modal>

            {!modalVisible &&
                <View style={styles.card}>

                    {/* ESTADO 0: WHERE TO? DESTINATION: NULL CURRENT_LOCATION: SOME */}
                    {(status == BEGIN) && 
                        <GooglePlacesInput placeholder='Where to?' onPlaceSelected={(details) => handlePlaceSelected(details)}/>
                    }

                    {/* ESTADO 5: INFO TRIP DESTINATION: SOME CURRENT_LOCATION: SOME */}
                    {status == TRIP_INFO &&
                        <TripInfoComponent/>
                    }

                    {(status == TRIP_INFO) &&
                        <ButtonComponent/>
                    }

                    {/* ESTADO 6: CREATING TRIP DESTINATION: SOME CURRENT_LOCATION: SOME TRIP: NULL */}
                    {(status == CREATING_TRIP) &&
                        <CreatingTripComponent/>
                    }

                    {/* ESTADO 1: SEARCHING FOR DRIVER DESTINATION: SOME CURRENT_LOCATION: SOME TRIP.DRIVER: FALSE */}
                    {(status == AVAILABLE) &&
                        <SearchingDriverComponent/>
                    }

                    {/* ESTADO 2: AWAITING FOR DRIVER TO ARRIVE DESTINATION: SOME CURRENT_LOCATION: SOME TRIP.DRIVER: SOME */}
                    {(status == AWAITING_DRIVER) &&
                        <AwaitingDriverComponent/>
                        
                    }

                    {/* ESTADO 3: ON GOING TRIP DESTINATION: SOME CURRENT_LOCATION: SOME TRIP.DRIVER: SOME */}
                    {(status == ON_GOING) &&
                        <OnTripComponent/>
                    }
                    
                    {/* ESTADO 4: TRIP FINISHED DESTINATION: SOME CURRENT_LOCATION: SOME TRIP.DRIVER: SOME */}
                    {(status == TRIP_FINISHED) &&
                        <TripFinishedComponent/>
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
    horizontal_container: {
        flex:1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center'
    },
    car_text: {
        margin: 5,
        size:12,
        color: '#575150',
        fontWeight: 'bold',
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