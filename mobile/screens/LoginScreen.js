import  React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView,TouchableOpacity,Image} from 'react-native';
import { Text, TextInput, TouchableRipple, Button} from 'react-native-paper';

import { signInWithGoogle,logInWithEmailAndPassword} from '../firebase'

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


 
    const handleSignIn = () => {
        
        /* app.auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Signed In!')
                console.log(email, password)
            })
            .catch(error => console.log(error)) */
        
    } 

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
                        <TouchableRipple onPress={() => {navigation.navigate('Reset')}}>
                            <Text style={styles.text}>Forgot password?</Text>
                        </TouchableRipple>
                    </View>
                </View>
                <Button mode="contained" onPress={()=> logInWithEmailAndPassword(email,password, navigation)   }>
                    Login
                </Button>
                
                    
                <Text style={{alignSelf:'center'}}>or</Text>
                <Button mode="outlined" onPress={() => navigation.navigate('Register')}>
                    Dont have an account? Register here!
                </Button>

                <TouchableOpacity style={styles.googleButton}>
                    <Image
                        style={styles.googleIcon}
                        source={{
                            uri: "https://i.ibb.co/j82DCcR/search.png",
                        }}
                    />
                    <Button style={styles.googleButtonText} onPress={() => signInWithGoogle(navigation)}>Login with Google</Button>
                   
                </TouchableOpacity>
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
    googleButtonText:{
        marginLeft: 16,
        fontSize: 18,
        fontWeight: '600'
    },
    googleIcon: {
        height: 24,
        width: 24
    },
    googleButton: {
    backgroundColor: "white",
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    },
  
})