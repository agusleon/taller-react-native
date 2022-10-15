/* eslint-disable no-unused-vars */
import  React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, TextInput, TouchableRipple, Button} from 'react-native-paper';
import { auth, logInWithEmailAndPassword } from '../firebase';
import { FiuberContext } from '../context/FiuberContext';



export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {loggedIn, setLoggedIn, role, setRole} = useContext(FiuberContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            setLoggedIn(true)
          }
        })
    
        return unsubscribe
      }, [])

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
                        <TouchableRipple onPress={() => {}}>
                            <Text style={styles.text}>Forgot password?</Text>
                        </TouchableRipple>
                    </View>
                </View>
                <Button mode="contained" onPress={() => logInWithEmailAndPassword(email, password)}>
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