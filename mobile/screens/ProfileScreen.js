import React, { useContext, useState, useReducer } from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  TextInput,
  Button,
} from 'react-native-paper';

import Ionicons from '@expo/vector-icons/Ionicons';

import TopBar from '../components/TopBar'
import { FiuberContext } from '../context/FiuberContext';
import { updateUserInfo, getUser } from '../services/users';
import { auth } from '../firebase';
import { NavigationEvents } from 'react-navigation';

// import { getDefaultDestination } from '../services/trips';


const ProfileScreen = ({navigation}) => {

    const PASSENGER = 'passenger';
    const DRIVER = 'DRIVER';
    const SAVE = 'Save';
    const SETTINGS = 'Settings'
    const {user, role, currentDestination, defaultDestination, setUser} = useContext(FiuberContext);
    const [editable,setEditable] = useState(false);
    const [name, setName] = React.useState(user.name);
    const [setting,setSetting] = useState('Settings');
    const [newRole, setRole] = useState(role);
    //const [setting, dispatch] = useReducer(reducer, 'Settings')

    const onSetting = async () => {
    
      if(setting == SETTINGS){
        console.log("Se vuelve editable")
        setSetting(SAVE)
        setEditable(true);
        console.log("el name ingresado ",name)
        
      }
      if(setting == SAVE){
   
        if(newRole.toLowerCase() != PASSENGER && newRole.toLowerCase() != DRIVER) {
          setRole(role)
          alert("Ups! El rol ingresado no existe")
      
          return;
        } 
        const user_uid = auth.currentUser.uid;
        const idTokenResult = await auth.currentUser.getIdTokenResult();
        console.log("el idTokenResult ", idTokenResult)
        
        try{
          await updateUserInfo(user_uid, idTokenResult.token, name,user.wallet, newRole.toLowerCase())
          const user_response = await getUser(user_uid, idTokenResult.token);
          console.log("User response GET", user_response)
          
          const index = user_response.roles.findIndex( r =>  (r == newRole.toLowerCase()));
          const updateUser = {
            uid: user_response.uid,
            name: user_response.name,
            email: user_response.email,
            wallet: user_response.wallet,
            password: user.password,
            jwt: idTokenResult.token,
          }
          setUser(updateUser)
          setName(user_response.name)
          setRole(user_response.roles[index])
        }catch (err) {
          console.log("Error buscando el usuario");
          alert(err.message);
        }
        setEditable(false)
        setSetting(SETTINGS)
      }
    }

  
 
    // const fetchDestination = async() => {
    //   const response = await getDefaultDestination(user.jwt);
    //   if (!response.detail){
    //     setDestination(response.address)
    //   }
    // }

    // useEffect(() => {
    //   if (role=='passenger'){

    //     fetchDestination();
    //   } else {
    //     return;
    //   }
    // }, [])

    return (
      <SafeAreaView style={styles.container}>
        <TopBar {...navigation} />
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image 
              size={60}
            />
            <View style={{marginLeft: 20}}>
      
              <TextInput placeholder={user.name} onChangeText={setName} value={name} editable={editable} style={styles.title} ></TextInput>

            </View>
          </View>
        </View>
  
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Ionicons name="mail" color="#777777" size={20}/>
            <TextInput editable={false}   style={{color:"#777777", marginLeft: 20, backgroundColor: 'white'}}>{user.email}</TextInput>
          </View>
          <View style={styles.row}>
            <Ionicons name="person-outline" color="#777777" size={20}/>
            <TextInput autoCorrect={true} style={{color:"#777777", marginLeft: 20, backgroundColor: 'white'}} placeholder={'Passenger or Driver'} onChangeText={setRole} value={newRole} editable={editable} ></TextInput>
          </View>
          {(role=='passenger') ? 
          <View style={styles.row}>
            <Ionicons name="heart-outline" color="#777777" size={20}/>
            <TextInput editable={false} style={{color:"#777777", marginLeft: 20, backgroundColor: 'white'}}>{defaultDestination.description}</TextInput>
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
          <TouchableRipple onPress={() => {onSetting}}>
            <View style={styles.menuItem}>
              <Ionicons name="settings-outline" color="#FF6347" size={25}/>
              <Button onPress={onSetting} style={styles.menuItemText}>{setting}</Button>
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
      marginBottom: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: 'white'
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