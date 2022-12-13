import { StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {Button, Text, TouchableRipple, Modal} from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import React, {useContext, useEffect, useState} from 'react';
import { getFavoriteDestinations } from '../services/trips';
import { FiuberContext } from '../context/FiuberContext';
import TopBar from '../components/TopBar';
import { estimateFee } from '../services/trips';
import {getDistance} from 'geolib';

const TripsAvailableScreen = ({navigation}) => {

    const {user} = useContext(FiuberContext);
    const [trips, setTrips] = useState(null);
    // const showModal = () => setModalVisible(true);
    // const hideModal = () => setModalVisible(false);


    const ListEmptyComponent=()=> {
      return (
        <View>
          <Text>No destinations to show.</Text>
        </View>
      );
    }
    
    const fetchAvailableTrips = async () => {
        try {
            console.log("Searching for trips")
        } catch (e) {
          console.log(e);
        }
      }
    
      useEffect(() => {
        fetchAvailableTrips();
      }, []);

    const renderItem=({item})=>{
      return (
          <View style={styles.destination_container}>

            <View style={styles.title_container}>
              <Text style={styles.title}>{item.custom_name}</Text>
              <TouchableRipple onPress={() => { setNameToDelete(item.custom_name)
                                                showModal()}}>
                <Entypo name="cross" size={24} color="black" />
              </TouchableRipple>
            </View>
              <Text style={styles.content}>{item.address}</Text>
            <Button style={styles.trip_button} mode='contained' onPress={() => startTrip(item)}>Go</Button>
          </View>
      )
    }

    useEffect(() => {
        async function fetchDestination(){
          const fetched_destinations = await getFavoriteDestinations(user.jwt);
          if (!fetched_destinations.detail){
            console.log("Destinations customs:",fetched_destinations);
            setFavoriteDestinations(fetched_destinations);
            return;
          }
        }

        fetchDestination();
      }, [])


    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <FlatList
            renderItem={renderItem}
            data={favoriteDestinations}
            contentContainerStyle={styles.list_container}
            keyExtractor={(item) => String(item.address)}
            ListEmptyComponent={ListEmptyComponent}/>
        </ScrollView>
        <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Text style={styles.text}>Are you sure you want to delete it?</Text>
          <View style={styles.confirmation_cancel}>
              <Button mode="outlined" onPress={handleDelete} style={styles.confirmation_button}>
                yes
              </Button>
              <Button mode="contained" onPress={handleCancelDelete} style={styles.confirmation_button}>
                no
              </Button>
          </View>
        </Modal>
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
    flexDirection:'row',
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
      fontSize: 20,
      color: '#20315f',
      marginLeft:10
  },
  content: {
    fontSize: 15,
    color: '#20315f',
    marginLeft:10
  },
  trip_button: {
      width:'20%',
      shadowColor:'black',
      shadowOffset:{width:2,height:2},
      shadowOpacity: 0.5,
      elevation:4,
      marginLeft:250,
      borderRadius:8,
  },
  text:{
    fontWeight:'bold'
  }
})