import React, { useContext, useEffect, useState } from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Ionicons from '@expo/vector-icons/Ionicons';

import TopBar from '../components/TopBar'
import { FiuberContext } from '../context/FiuberContext';
import { getDefaultDestination } from '../services/trips';


const ProfileScreen = ({navigation}) => {

    
    const {user, role} = useContext(FiuberContext);
    const [destination, setDestination] = useState('');

    const fetchDestination = async() => {
      const response = await getDefaultDestination(user.jwt);
      if (!response.detail){
        setDestination(response.address)
      }
    }

    useEffect(() => {
      if (role=='passenger'){

        fetchDestination();
      } else {
        return;
      }
    }, [])

    return (
      <SafeAreaView style={styles.container}>
        <TopBar {...navigation} />
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 

              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>{user.name}</Title>
            </View>
          </View>
        </View>
  
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Ionicons name="mail" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="person-outline" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{role}</Text>
          </View>
          {(role=='passenger') ? 
          <View style={styles.row}>
            <Ionicons name="heart-outline" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{destination}</Text>
          </View>
          :
          <View style={styles.row}>
            <Ionicons name="car-outline" color="#777777" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}></Text>
          </View>
        }
        </View>
  
        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, {
              borderRightColor: '#dddddd',
              borderRightWidth: 1
            }]}>
              <Title>0</Title>
              <Caption>Trips</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>x</Title>
              <Caption>Other info</Caption>
            </View>
        </View>
  
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={()=>{navigation.navigate('My Destinations')}}>
            <View style={styles.menuItem}>
              <Ionicons name="heart-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>My Destinations</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {navigation.navigate('Wallet')}}>
            <View style={styles.menuItem}>
              <Ionicons name="logo-bitcoin" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Wallet</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Ionicons name="settings-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View>
      </SafeAreaView>
    );
  };
  
  export default ProfileScreen;
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
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