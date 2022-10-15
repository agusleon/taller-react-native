/* eslint-disable no-unused-vars */
import  React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, TextInput, Button} from 'react-native-paper';
import {registerDriverWithEmailAndPassword, registerPassengerWithEmailAndPassword, registerWithEmailAndPassword} from '../firebase';
import { FiuberContext } from '../context/FiuberContext';
import { auth } from '../firebase';
import GooglePlacesInput from '../components/GooglePlacesInput';


export default function RegisterScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [disabledRegister, setDisabledRegister] = useState(true)

    const {role, setUser} = useContext(FiuberContext);

    const registerUser = async () => {
        const user = {
            name:username,
            email: email,
            password: password,
            jwt:'',
            address: {name:'', description:'', latitude:0,longitude:0}
        }
        setUser(user)
        if (role == 'driver') {
            navigation.navigate('Driver')
            //registerDriverWithEmailAndPassword(username, email, password, licensePlate, carModel, role)
        } else {
            // const result = await registerPassengerWithEmailAndPassword(username, email, password, address, role);
            navigation.navigate('Passenger')
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
                    <Button mode="outlined" disabled={(password != confirmedPassword)} onPress={registerUser}>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    small_container: {
        flexDirection: 'column',
        height: '70%',
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