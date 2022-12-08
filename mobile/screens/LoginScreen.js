import  React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, Keyboard} from 'react-native';
import { Text, TextInput, TouchableRipple, Button, ActivityIndicator} from 'react-native-paper';
import { auth, logInWithEmailAndPassword, sendPasswordReset } from '../firebase';
import { FiuberContext } from '../context/FiuberContext';
import { getUser } from '../services/users';
import { getCurrentLocation } from '../services/location';
import * as Location from 'expo-location';
import { getFavoriteDestinations } from '../services/trips';

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const {setLoggedIn, setRole, role, setCurrentLocation, setUser, setFavoriteDestinations, user} = useContext(FiuberContext);

    Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardOpen(true)
        }
    );
    Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardOpen(false)
        }
    );

    const handleLogin = async () => {

        setLoading(true);
      
        try {
            console.log("Buscando usuario...");

            // se loggea el usuario en firebase
            await logInWithEmailAndPassword(email, password);
            const user_uid = auth.currentUser.uid;
            const idTokenResult = await auth.currentUser.getIdTokenResult();
            console.log(idTokenResult.token)

            // se busca al usuario
            const user_response = await getUser(user_uid, idTokenResult.token);
            console.log(user_response)

            const location = await getCurrentLocation();

            let { longitude, latitude } = location.coords;

            let regionName = await Location.reverseGeocodeAsync({
                longitude,
                latitude,
            });

            const street = (regionName[0].street)
            const streetNumber = regionName[0].streetNumber
            const city = regionName[0].city

            const description = `${street} ${streetNumber}, ${city}`

            console.log(description)

            const address = {
                description: description,
                longitude:location.coords.longitude,
                latitude:location.coords.latitude,
                longitudeDelta:  LONGITUDE_DELTA,
                latitudeDelta:  LATITUDE_DELTA
            }

            setCurrentLocation(address);
            

            // se guarda el usuario actual en el context
            const current_user = {
                uid: user_response.uid,
                name: user_response.name,
                password: password,
                email: user_response.email,
                wallet: user_response.wallet,
                jwt: idTokenResult.token,
            }

            //mock user
            // const current_user = {
            //     uid: "Jtxxfo39VzcbqumHxjdDlgUjdkk2",
            //     name: "Agus",
            //     password: "password",
            //     email: "agusleonw@gmail.com",
            //     wallet: "123",
            //     jwt: idTokenResult.token
            // }


            console.log(current_user)
            
            setUser(current_user)
            // setRole(user_response.roles[0])
            setRole("passenger")
            // se cambia el contexto
            setLoggedIn(true)
            setLoading(false)
           

        } catch (err) {
            console.log("Login: Error buscando el usuario");
            setLoading(false)
            alert(err.message);
        }
    };

    useEffect(() => {
        async function fetchaData() {
            if(role && role == "passenger"){
                const fetched_destinations = await getFavoriteDestinations(user.jwt);
                console.log(fetched_destinations)
                if (!fetched_destinations.detail && fetched_destinations.length > 0){
                    console.log("Destinations customs:",fetched_destinations);
                    setFavoriteDestinations(fetched_destinations);
            }
        }
        }
        fetchaData()
        
      }, [role]);

    if(loading){

        return (
            <View style={styles.container}>
                <Text style={styles.title}>FIUBER</Text>
                <ActivityIndicator style={styles.activityIndicator} size="large" visible={true} textContent={'Loading...'} />
            </View>
        )
    } else {

        return (
            <SafeAreaView style={styles.container}>
            
            <View style={keyboardOpen ? styles.small_container_with_keyboard : styles.small_container_without_keyboard}>

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

                <Button mode="contained" style={styles.button} onPress={handleLogin}>
                    Login
                </Button>

                <Button mode="outlined" style={styles.button} onPress={() => navigation.navigate('Onboarding')}>
                    Register here
                </Button>

            </View>
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    small_container_with_keyboard: {
        flexDirection: 'column',
        height: '80%',
        width: '80%',
        justifyContent: 'space-evenly',
    },
    small_container_without_keyboard: {
        flexDirection: 'column',
        height: '60%',
        width: '80%',
        justifyContent: 'space-evenly',
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
    activityIndicator: {
        margin:15,
        width:'50%',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#20315f',
        alignSelf:'center',
    },
    button: {
        height:50,
        justifyContent:'center',
        marginBottom:15
    }
})