import  React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView,TouchableOpacity,Image} from 'react-native';
import { Text, TextInput, Button} from 'react-native-paper';


import { sendPasswordReset,signInWithGoogle} from '../firebase'

export default function ResetScreen({navigation}) {

    const [email, setEmail] = useState('')

     

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.small_container}>
                <Text style={styles.title}>Reset Password</Text>
                <View style={styles.input_container}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={email => setEmail(email)}
                        left={<TextInput.Icon icon="at" />}
                    />

                <Button mode="contained" onPress={()=>sendPasswordReset(email)}>
                    Send reset password email
                </Button>
           
                </View>
                    
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
                    <Button style={styles.googleButtonText} onPress={signInWithGoogle}>Register with Google</Button>
                   
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