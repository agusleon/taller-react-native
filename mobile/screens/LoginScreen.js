/* eslint-disable no-unused-vars */
import  React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, TextInput, TouchableRipple, Button} from 'react-native-paper';
import { auth, db, logInWithEmailAndPassword, sendPasswordReset } from '../firebase';
import { query, collection, getDocs, where } from "firebase/firestore";
import { FiuberContext } from '../context/FiuberContext';
import { getUser } from '../services/users';
import { getDefaultDestination } from '../services/trips'
import { format } from 'react-string-format';

import * as Location from 'expo-location';

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const {setLoggedIn, setRole, setHasDefaultDestination, setDefaultDestination, setCurrentDestination, setUser, role} = useContext(FiuberContext);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await logInWithEmailAndPassword(email, password);
            const user_uid = auth.currentUser.uid;
            const idTokenResult = await auth.currentUser.getIdTokenResult();
            const user_response = await getUser(user_uid, idTokenResult.token);


            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
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
                setHasDefaultDestination(true);
                
                const description = `${street} ${streetNumber}, ${city}`
                const default_destination = {
                    
                    description: description,
                    longitude:location.coords.longitude,
                    latitude:location.coords.latitude
                }
                //asumimos que apunta a lo mismo para simplificar 
                setCurrentDestination(default_destination);
                setDefaultDestination(default_destination);
                setHasDefaultDestination(true);
              
                
            }

            //const destination = await getDefaultDestination(idTokenResult.token);
            
            

            const user = {
                uid: user_response.uid,
                name: user_response.name,
                email: user_response.email,
                wallet: user_response.wallet,
                password: password,
                jwt: idTokenResult.token,
            }
            setUser(user)
            console.log("Usuario se loggeo correctamente: ",user, " con rol ", role);
            setRole(user_response.roles[0])
            setLoggedIn(true)
        } catch (err) {
            console.log("Error buscando el usuario");
            alert(err.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.small_container}>
                <Text style={styles.title}>Login</Text>
                <View style={styles.input_container}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        left={<TextInput.Icon icon="at" />}
                    />
                    <View styles={styles.password_container}>
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={password => setPassword(password)}
                            secureTextEntry
                            left={<TextInput.Icon icon="lock-outline" />}
                        />
                        <TouchableRipple onPress={() => {sendPasswordReset(email)}}>
                            <Text style={styles.text}>Forgot password?</Text>
                        </TouchableRipple>
                    </View>
                </View>
                {loading ? <Text style={styles.text}>Loading...</Text> : <Text></Text>}
                <Button mode="contained" onPress={handleLogin}>
                    Login
                </Button>
                <Text style={{alignSelf:'center'}}>or</Text>
                <Button mode="outlined" onPress={() => navigation.navigate('Onboarding')}>
                    Register here
                </Button>
            </View>
            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    small_container: {
        flexDirection: 'column',
        height: '60%',
        width: '80%',
        justifyContent: 'space-evenly'
    },
    input_container: {
        flexDirection: 'column',
        height: '60%',
        width: '100%',
        justifyContent: 'space-evenly'
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
})