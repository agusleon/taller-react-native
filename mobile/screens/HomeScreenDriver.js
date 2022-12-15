import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button, Text, Avatar, ActivityIndicator } from 'react-native-paper'
import Map from '../components/MapDriver'
import TopBar from '../components/TopBar'
import { FiuberContext } from '../context/FiuberContext'
import { getTrip, updateDriverPosition, updateTripStatus } from '../services/trips';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getDistanceBetweenTwoPoints } from '../utils/methods';
import { 
    ON_GOING,
    TRIP_FINISHED,
    BEGIN } from '../utils/vars';
import { makeWithdrawal, putPayment } from '../services/payments'

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function HomeScreenDriver ({navigation}) {

    const [awaitingPayment, setAwaitingPayment] = useState(true);
    const [awaitingCollection, setAwaitingCollection] = useState(true);

    const {
        user,
        status,
        destination,
        gotDriver,
        passenger,
        focusLocation,
        setFocusLocation,
        setShowDirections,
        setStatus,
        setDestination,
        setIntervalID,
        setUserReviewed
    } = useContext(FiuberContext);

    useEffect(() => {
        updatePosition();
    }, []);

    // HANDLERS

    const handleTripButton = () => {

        navigation.navigate('Trips Available')
        
    }

    const updatePosition = () => {
        let interval = setInterval(async () => {
            try {
                // se busca la current location
                let location = await Location.getCurrentPositionAsync({});
                const response = await updateDriverPosition(location.coords, user.jwt)
                if (response.latitude) {
                    console.log("Setting position to: ", location.coords.latitude, location.coords.longitude)
                    const new_location = {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }

                    setFocusLocation(new_location)

                } else {
                    console.log("Could not update position");
                }

                setIntervalID(interval)

            } catch (err) {
                console.log("Could not update position: ", err.message)
            }


        }, 10000)
        
    }

    const awaitPayment = () => {
        let interval = setInterval(async () => {
            try {
                const response = await getTrip(passenger.trip_id, user.jwt);

                if (!response.detail) {
                    if ((response.paid == 1) && (response.collected == 0)) {
                        setAwaitingPayment(false)
                        const response_withdrawal = await makeWithdrawal(passenger.trip_id.toUpperCase(), user.jwt);
                        const response_payment = await putPayment(user.jwt, response.trip_id, response.amount, 1, 1)
                        console.log(JSON.stringify(response_withdrawal))
                        console.log(JSON.stringify(response_payment))
                        setAwaitingCollection(false)
                        clearInterval(interval)
                    }
                } 
            } catch (err) {
                console.log(err.message)
            }

        }, 5000)
    }

    const handleReviewPassenger = () => {
        
        navigation.navigate('Passenger Info Screen')
        setDestination(false)
        setStatus(BEGIN)
        setShowDirections(false)
        setAwaitingPayment(true)
        setAwaitingCollection(true)
        setUserReviewed(false)
    }

    const handleGoingButton = async () => {
        try {
            const response = await updateTripStatus(user.jwt, passenger.trip_id, ON_GOING);
            
            if (!response.detail) {
                setStatus(response.trip_state)

            } else {
                alert(JSON.stringify(response.detail))
                console.log(JSON.stringify(response.detail))
            }

            
        } catch (err) {
            alert(err.message)
            console.log(err.message)
        }
    }

    const handleFinishButton = async () => {
        try {
            const distanceInMeters = getDistanceBetweenTwoPoints(focusLocation, destination)

            if (distanceInMeters < 500){

                setShowDirections(false)
                try {

                    const response = await updateTripStatus(user.jwt, passenger.trip_id, TRIP_FINISHED);
                    setStatus(response.trip_state);
                    awaitPayment()

                } catch (error) {
                    alert(error.message)
                    console.log(error.message)
                }

                
                
            } else {
                alert("You are too far from the destination")
            }

        } catch (err) {
            alert(err.message)
            console.log(err.message)
        }
    }


    // COMPONENTS
    const OnTripComponent=()=> {
        return (
            <View style={styles.container}>
                <View style={styles.horizontal_container}>
                    <Avatar.Image
                    size={80}
                    source={{uri:'https://avatars.dicebear.com/api/big-smile/'+passenger.id+'.png'}}
                    />
                    <View>
                        <Text style={styles.small_text}>Heading to destination with passenger</Text>
                        <Text style={styles.text}>{passenger.name}</Text>
                    </View>
                </View>
                <Button style={styles.button} mode="contained" onPress={handleFinishButton}>
                    Finish
                </Button>
            </View>
        );
    }

    const GoingToSourceComponent=()=> {
        return (
          <View style={styles.container}>
            <View style={styles.horizontal_container}>
                <Avatar.Image
                size={80}
                source={{uri:'https://avatars.dicebear.com/api/big-smile/'+passenger.id+'.png'}}
                />
                <View>
                    <Text style={styles.text}>Picking up {passenger.name} at origin</Text>
                </View>
            </View>
            <Button style={styles.button} mode="contained" onPress={handleGoingButton}>
                Going
            </Button>
          </View>
        );
    }

    const TripFinishedComponent =()=> {
        return (
            <View style={styles.container}>
                
                {awaitingPayment && 
                    <View style={styles.small_container}>
                        <Text style={styles.text}>Trip finished!</Text>
                        <Text>Awaiting payment...</Text>
                        <ActivityIndicator style={styles.activityIndicator} size="large" visible={true} textContent={'Loading...'} />
                    </View>
                }

                {(!awaitingPayment && awaitingCollection) &&
                
                    <View style={styles.small_container}>
                        <Text>Awaiting collection...</Text>
                        <ActivityIndicator style={styles.activityIndicator} size="large" visible={true} textContent={'Loading...'} />
                    </View>
                }

                {(!awaitingPayment && !awaitingCollection) &&
                
                    <View style={styles.small_container}>
                        <AntDesign name="checkcircleo" size={24} color="green" />
                        <Text style={styles.text}>Payment collected!</Text>
                        <Button style={styles.button} mode="outlined" onPress={handleReviewPassenger}>
                            Review Passenger
                        </Button>
                    </View>
                }

          </View>
        );
    }

    const AvailableTripsComponent = () => {
        return(
            <View style={styles.button_container}>
                <Button style={styles.button} mode="contained" onPress={handleTripButton}>
                    Make Trip
                </Button>
            </View>
            );
    }

    return (
        <View style={styles.container}>

            <Map gotDriver={gotDriver}/>
            
            <TopBar {...navigation} />

            <View style={styles.card}>

                    {/* ESTADO 0: WHERE TO? DESTINATION: NULL CURRENT_LOCATION: SOME */}
                    {(status == 0) && 
                        <AvailableTripsComponent/>
                    }

                    {/* ESTADO 2: AWAITING FOR DRIVER TO ARRIVE DESTINATION: SOME CURRENT_LOCATION: SOME TRIP.DRIVER: SOME */}
                    {(status == 2) &&
                        <GoingToSourceComponent/>
                    }

                    {/* ESTADO 3: ON GOING TRIP DESTINATION: SOME CURRENT_LOCATION: SOME TRIP.DRIVER: SOME */}
                    {(status == 3) &&
                        <OnTripComponent/>
                    }
                    
                    {/* ESTADO 4: TRIP FINISHED DESTINATION: SOME CURRENT_LOCATION: SOME TRIP.DRIVER: SOME */}
                    {(status == 4) &&
                        <TripFinishedComponent/>
                    }
                    
                </View>

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
    vertical_container: {
        flex:1,
        width: '100%',
        flexDirection: 'column',
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
    small_text:{
        marginBottom:10,
        fontWeight: 'bold',
        fontSize: 10,
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