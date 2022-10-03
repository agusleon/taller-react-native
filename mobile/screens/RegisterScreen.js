import  React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, TextInput, Button} from 'react-native-paper';
import app from '../firebase'


export default function RegisterScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUserName] = useState('')
    const [disabledRegister, setDisabledRegister] = useState(true)

    const handleCreateAccount = () => {
        app.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('Account created')
                console.log(email, password)
            })
            .catch(error => console.log(error))
        navigation.navigate('Onboarding')
    }

    const checkConfirmedPassword = (confirmed) => {
        if (confirmed != password) {
            setDisabledRegister(true)

        } else {
            console.log("password match")
            setDisabledRegister(false)
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
                    <Button mode="outlined" disabled={disabledRegister} onPress={handleCreateAccount}>
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