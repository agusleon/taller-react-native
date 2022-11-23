/* eslint-disable no-unused-vars */
import  React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, TextInput, Button, ActivityIndicator} from 'react-native-paper';
import {registerUserWithEmailAndPassword} from '../firebase';
import { FiuberContext } from '../context/FiuberContext';
import { auth } from '../firebase';
import { createUser } from '../services/users';
import { getDefaultDestination } from '../services/trips';

import * as Location from 'expo-location';
export default function RegisterScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [wallet, setWallet] = useState('')
    const [loading, setLoading] = useState(false);
    const [confirmedPassword, setConfirmedPassword] = useState('')



    const {role, setUser, setHasDefaultDestination, setDefaultDestination,setCurrentDestination, setLoggedIn} = useContext(FiuberContext);
    
    const handleRegister = async () => {
        setLoading(true);
        try {
            await registerUserWithEmailAndPassword(username, email, password, role);
            const user_uid = auth.currentUser.uid;
            const idTokenResult = await auth.currentUser.getIdTokenResult();
            
            console.log("Usuario creado en firebase con rol ", role, " y mail ", email);
            const user_response = await createUser(username, wallet, role, user_uid, idTokenResult.token);
            console.log("Usuario creado en base de datos con info ", user_response);
            if (role == 'passenger'){

                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    //setHasDefaultDestination(false);
                    return;
                }
            
                let location = await Location.getCurrentPositionAsync({});
               

                //const destination = await getDefaultDestination(idTokenResult.token);
                //console.log(destination);
                if (location == ''){
                    setHasDefaultDestination(false);
                    console.log("Usuario no tiene default destination");
                } else {
                
                    let { longitude, latitude } = location.coords;

                    let regionName = await Location.reverseGeocodeAsync({
                        longitude,
                        latitude,
                    });
                    const street = (regionName[0].street)
                    const streetNumber = regionName[0].streetNumber
                    const city = regionName[0].city
                    const description = `${street} ${streetNumber}, ${city}`
                    const default_destination = {
                        description: description,
                        longitude:location.coords.longitude,
                        latitude:location.coords.latitude
                    }
                    setCurrentDestination(default_destination);
                    setDefaultDestination(default_destination);
                    setHasDefaultDestination(true);
                    
                }
            }
            const user = {
                uid: user_response.uid,
                name: user_response.name,
                email: user_response.email,
                wallet: user_response.wallet,
                password: password,
                jwt: idTokenResult.token,
            }
            setUser(user)
            setHasDefaultDestination(false);
            setLoggedIn(true);
        } catch (error) {
            console.log(error);
            alert(error.message);
            return;
        }
        
    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.small_container}>
                    <Text style={styles.title}>Register</Text>
                    <View style={styles.input_container}>
                        <TextInput
                            label="Username"
                            value={username}
                            autoCapitalize='none'
                            onChangeText={username => setUserName(username)}
                            left={<TextInput.Icon icon="account" />}
                        />
                        <TextInput
                            label="Email"
                            value={email}
                            autoCapitalize='none'
                            onChangeText={email => setEmail(email)}
                            left={<TextInput.Icon icon="at" />}
                            />
                        <TextInput
                            label="Wallet"
                            value={wallet}
                            autoCapitalize='none'
                            onChangeText={wallet => setWallet(wallet)}
                            left={<TextInput.Icon icon="bitcoin" />}
                            />
                        <TextInput
                            label="Password"
                            value={password}
                            autoCapitalize='none'
                            onChangeText={password => setPassword(password)}
                            secureTextEntry
                            left={<TextInput.Icon icon="lock-outline" />}
                            />
                        <TextInput
                            label="Confirm password"
                            autoCapitalize='none'
                            onChangeText={confirmed => setConfirmedPassword(confirmed)}
                            secureTextEntry
                            left={<TextInput.Icon icon="lock-outline" />}
                            />
                    </View>
                    {(password != confirmedPassword) ? (
                        <Text style={{color:'red'}}>
                            Passwords do not match
                        </Text>
                        ) :  
                        <Text></Text>
                    }
                    {loading ? <><Text style={styles.activityIndicator}>Loading...</Text><ActivityIndicator style={styles.activityIndicator} size="large" visible={loading} textContent={'Loading...'} /></>
                : <Text></Text>}
                    <Button mode="outlined" disabled={(password != confirmedPassword)} onPress={handleRegister}>
                        Register
                    </Button>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    small_container: {
        flexDirection: 'column',
        height: '80%',
        width: '80%',
        justifyContent: 'space-evenly',
    },
    input_container: {
        flexDirection: 'column',
        height: '60%',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    password_container: {
        flexDirection: 'column',
        height: '60%',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#20315f'
    },
    text: {
        margin:15,
        width:'50%',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#20315f',
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