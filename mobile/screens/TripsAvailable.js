import { StyleSheet, View, FlatList} from 'react-native';
import {Button, Text} from 'react-native-paper';
import React, {useContext, useEffect, useState, useRef} from 'react';
import { FiuberContext } from '../context/FiuberContext';
import TopBar from '../components/TopBar';
import { getUser } from '../services/users';
import { getAvailableTrips, updateTripStatus } from '../services/trips';
import { AWAITING_DRIVER, BEGIN } from '../utils/vars';
import { registerForPushNotificationsAsync } from '../services/notifications';


const TripsAvailableScreen = ({navigation}) => {

    const {user, focusLocation, setPassenger, setDestination, setShowDirections, setStatus, status} = useContext(FiuberContext);
    const [trips, setTrips] = useState([]);
    const notificationListener = useRef();
    const [notification, setNotification] = useState(false);


    const ListEmptyComponent=()=> {
      return (
        <View>
          <Text>No trips available.</Text>
        </View>
      );
    }

    const startTrip = async (item) => {
      console.log("Taking trip!", JSON.stringify(item))

      try {
        const user_response = await getUser(item.user_id, user.jwt);

        if (user_response.uid) {

          try {

            const response = await updateTripStatus(user.jwt, item.trip_id, AWAITING_DRIVER);

            if (response.trip_id) {

              const passenger = {
                id: item.user_id,
                name: user_response.name,
                trip_id: item.trip_id,
                source_address: item.source_address,
                source_latitude: item.source_latitude,
                source_longitude: item.source_longitude,
                gotPassenger: true
              }
            
              const destination = {
                address: item.destination_address,
                latitude: item.destination_latitude,
                longitude: item.destination_longitude,
              }
            
              setStatus(response.trip_state)
              setPassenger(passenger)
              setDestination(destination)
              setShowDirections(true)

            } else {
                alert("There was a problem gathering passenger information.")
                console.log("There was a problem gathering passenger information: ", JSON.stringify(response))
            }

          } catch(err) {
              alert("There was a problem gathering passenger information.")
              console.log("There was a problem gathering passenger information: ", err.message)
          }

        } else {

            alert("There was a problem gathering passenger information.")
            console.log("There was a problem gathering passenger information: ", JSON.stringify(user_response))

        }

      } catch (err) {
        alert("There was a problem gathering passenger information.")
        console.log("There was a problem gathering passenger information: ", err.message)
      }

      navigation.navigate('Home')
    }
    
    const fetchAvailableTrips = async () => {
        try {
            console.log("Searching for trips")
            const trips = await getAvailableTrips(user.jwt);
            console.log(trips)
            if(trips.length>0 && !notification){
              registerForPushNotificationsAsync("New notification", "You have new trips available", notificationListener)
              setNotification(true)
            }
             
            setTrips(trips)
            
        } catch (e) {
          console.log(e);
        }
      }
    
      useEffect(() => {
        if (status == BEGIN) {
          fetchAvailableTrips();
        }
      }, [focusLocation]);

    const renderItem=({item})=>{
      return (
          <View style={styles.destination_container}>

            <View style={styles.title_container}>
              <Text style={styles.title}>To:</Text>
              <Text>{item.destination_address}</Text>
            </View>
            <View>
              <Text style={styles.title}>From:</Text>
              <Text>{item.source_address}</Text>
            </View>
            <Button style={styles.trip_button} mode='contained' onPress={() => startTrip(item)}>Take</Button>
          </View>
      )
    }


    return (
      <View style={styles.container}>
          <FlatList
            renderItem={renderItem}
            data={trips}
            contentContainerStyle={styles.list_container}
            keyExtractor={(item) => String(item.trip_id)}
            ListEmptyComponent={ListEmptyComponent}/>
        <TopBar {...navigation} />
      </View>

    )
}

export default TripsAvailableScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title_container:{
    flexDirection:'column',
    justifyContent:'space-between'
  },
  modal: {
    height:100,
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor: 'white', 
    padding: 20,
    margin: 20,
    borderRadius:8
  },
  confirmation_cancel:{
    flexDirection:'row'
  },
  confirmation_button: {
    margin:5
  },
  list_container: {
      marginTop: 100,
      margin:1,
      height:'100%',
      width:350,
      backgroundColor:'white',
      justifyContent:'flex-start',
      alignItems:'center'
  },
  destination_container: {
    height:160,
    width:350,
    justifyContent:'space-around',
    marginTop:5,
    borderRadius:8,
    backgroundColor:'white',
    shadowColor:'black',
    shadowOffset:{width:2,height:2},
    shadowOpacity: 0.5,
    elevation:4,
    padding:8,
  },
  title: {
      fontWeight: 'bold',
      fontSize: 15,
      color: '#20315f',
      marginLeft:10
  },
  content: {
    fontSize: 15,
    color: '#20315f',
    marginLeft:10
  },
  trip_button: {
      width:'40%',
      shadowColor:'black',
      shadowOffset:{width:2,height:2},
      shadowOpacity: 0.5,
      elevation:4,
      borderRadius:8,
  },
})