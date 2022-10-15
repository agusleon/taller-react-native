/* eslint-disable no-unused-vars */
import  React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, TextInput, Button} from 'react-native-paper';
import {registerDriverWithEmailAndPassword, registerPassengerWithEmailAndPassword, registerWithEmailAndPassword} from '../firebase';
import { FiuberContext } from '../context/FiuberContext';
import { auth } from '../firebase';


export default function RegisterScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [address, setAddress] = useState('')
    const [licensePlate, setLicensePlate] = useState('')
    const [carModel, setCarModel] = useState('')
    const [disabledRegister, setDisabledRegister] = useState(true)

    const {role, setLoggedIn} = useContext(FiuberContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            setLoggedIn(true)
          }
        })
    
        return unsubscribe
      }, [])

    const checkConfirmedPassword = (confirmed) => {
        if (confirmed != password) {
            setDisabledRegister(true)

        } else {
            console.log("password match")
            setDisabledRegister(false)
        }
        
    }

    const registerUser = () => {
        if (role == 'driver') {
            registerDriverWithEmailAndPassword(username, email, password, licensePlate, carModel, role)
        } else {
            registerPassengerWithEmailAndPassword(username, email, password, address, role)
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
                        {role === 'driver' ? 
                            <View>
                                <TextInput
                                    label="License Plate"
                                    value={licensePlate}
                                    autoCapitalize='none'
                                    onChangeText={licensePlate => setLicensePlate(licensePlate)}
                                    left={<TextInput.Icon icon="numeric-1-box" />}
                                    />
                                <TextInput
                                    label="Car Model"
                                    value={carModel}
                                    autoCapitalize='none'
                                    onChangeText={carModel => setCarModel(carModel)}
                                    left={<TextInput.Icon icon="car-outline" />}
                                    />
                            </View>
                            :
                            <TextInput
                                label="Your address"
                                value={address}
                                autoCapitalize='none'
                                onChangeText={address => setAddress(address)}
                                left={<TextInput.Icon icon="home" />}
                                />
                        }
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
                            onChangeText={confirmed => checkConfirmedPassword(confirmed)}
                            secureTextEntry
                            left={<TextInput.Icon icon="lock-outline" />}
                            />
                    </View>
                    {disabledRegister ? (
                        <Text style={{color:'red'}}>
                            Passwords do not match
                        </Text>
                        ) :  
                        <Text></Text>
                    }
                    <Button mode="outlined" disabled={disabledRegister} onPress={registerUser}>
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