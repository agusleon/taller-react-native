import React, { useContext,useState, useEffect } from 'react';
import {View, SafeAreaView, StyleSheet, Button, FlatList} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  
} from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FiuberContext } from '../context/FiuberContext';
import {getUserInfo} from '../services/metrics';

const DriverInfoScreen = ({navigation}) => {
  
  const {user, driver, userReviewed, setDriver} = useContext(FiuberContext);
  const [rating, setRating] = useState(''); 
  const [comments, setComments] = useState([]);

  const getDriverInfo = async () => {  

      try {
        const response =  await getUserInfo(driver.id,user.jwt)
        console.log("get info ",response)
        if (response.avg_driver_rating != null) {
          setRating(response.avg_driver_rating.toFixed(1))
        }
        setComments(comments.concat(response.driver_ratings.map((r) =>  r.text)))
        console.log("los comments ",response.driver_ratings.map((r) =>  r.text))

      } catch (err) {console.log("Error en review al driver", err)}     

  }

  const handleFinish = () => {
    setDriver(false)
    navigation.navigate('Home')
  }
  
  useEffect(()=>{
    getDriverInfo()
},[userReviewed])

  const renderItem=({item})=>{
    return (
        <View style={styles.listContainer}>
          <View style={styles.listCommentsText}>
            <Ionicons name="chatbox-ellipses-outline" size={20} />
            <Text style={styles.text}>{item}</Text>
          </View>
        </View>
    )
  }
  const ListEmptyComponent=()=> {
    return (
      <View>
        <Text>No Comments.</Text>
      </View>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', alignItems:'center', marginTop: 10}}>
            <Avatar.Image
              size={100}
              source={{uri:'https://avatars.dicebear.com/api/big-smile/'+driver.id+'.png'}}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 15,
                }]}>{driver.name}
              </Title>
            </View>
          </View>

          <View style={styles.carDetails}>
            <Ionicons name="car" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{driver.car_model} - {driver.car_patent}</Text>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBoxDriverDetails}> 
      
                <View style={styles.infoBoxDriver}>
                  <Title>{rating}</Title>
                  <Ionicons name="star" color="#777777" size={20}/>
                </View>
                  <Caption>Rating</Caption>
            </View>
            {!userReviewed &&
            <View style={styles.rate}>
              <Button
                title="Review"
                onPress={() => {navigation.navigate('Review Driver')}}
                color="#BF0AFF"
                accessibilityLabel="Review"
              />
            </View>
            } 
          </View>
          <View style={styles.list_big_container}>
            <FlatList
              renderItem={renderItem}
              data={comments}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={ListEmptyComponent}
              vertical={false}
              />
          </View>
          <Button onPress={handleFinish}>FINISH</Button>
        </View>
      </SafeAreaView>
   
  );
};


  
export default DriverInfoScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    list_big_container: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center'
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 20,
      marginTop: 150,
      backgroundColor: 'red'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: 'green'
    },
    text: {
      fontSize: 20,
      backgroundColor: 'white',
      color: '#555555'
   
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    carDetails: {
      flexDirection: 'row',
      marginBottom: 10,
      justifyContent: 'flex-start',
      display: 'flex',
      alignItems: 'flex-start',
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    infoBox: {
      width: '30%',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    infoBoxDriver: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
  
      
    },
    rate: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
  
      
    },
    infoBoxDriverDetails: {
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      
      
    },
    listContainer: {
      marginTop: 10,
      margin:1,
      height:'100%',
      width:350,
      backgroundColor:'red',
      justifyContent:'flex-start',
      alignItems:'flex-start'
  },
    listCommentsText:{
      display:'flex',
      flexDirection: 'row',
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
  });