import { StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import React, {useContext, useEffect} from 'react';
import { getFavoriteDestinations } from '../services/trips';
import { FiuberContext } from '../context/FiuberContext';
import TopBar from '../components/TopBar';

const FavoriteDestinationsScreen = ({navigation}) => {

    const {user, destinations, setDestinations} = useContext(FiuberContext);

    const ListEmptyComponent=()=> {
      return (
        <View>
          <Text>No destinations to show.</Text>
        </View>
      );
    }

    // const handlePressGo = (item) => {
    //   const destination = {
    //     description:item.address,
    //     latitude:item.latitude,
    //     longitude:item.longitude
    //   }
    //   setCurrentDestination(destination)
    //   navigation.navigate('Home');
    // }

    const renderItem=({item})=>{
      return (
          <View style={styles.destination_container}>
            <Text style={styles.title}>{item.custom_name}</Text>
            <Text style={styles.content}>{item.address}</Text>
            <Button style={styles.trip_button} mode='contained' onPress={()=>navigation.navigate('Home')}>Go</Button>
          </View>
      )
    }

    useEffect(() => {
        async function fetchDestination(){
          const fetched_destinations = await getFavoriteDestinations(user.jwt);
          if (!fetched_destinations.detail){
            console.log("Destinations customs:",fetched_destinations);
            setDestinations(fetched_destinations);
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
            data={destinations} 
            contentContainerStyle={styles.list_container}
            keyExtractor={(item) => String(item.address)}
            ListEmptyComponent={ListEmptyComponent}/> 
        </ScrollView>
        <TopBar {...navigation} />   
      </View>

    )
}

export default FavoriteDestinationsScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
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
})