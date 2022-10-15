import { React, useContext } from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { FiuberContext } from '../context/FiuberContext';

export default function OnboardingScreen({navigation}) {

    // eslint-disable-next-line no-unused-vars
    const {role,setRole} = useContext(FiuberContext);

    const registerRole = (role) => {
      setRole(role);
      navigation.navigate('Register')
    }

    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.title}>FIUBER</Text>
            <Text>{role}</Text>
          </View>
          <View  style={styles.small_container} >
            <Button style={styles.button} icon="chevron-right" mode="contained" onPress={() => registerRole('passenger')}>
              I am a passenger
            </Button>
            <Button style={styles.button} icon="chevron-right" mode="outlined" onPress={() => registerRole('driver')}>
              I am a driver
            </Button>
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#20315f'
    },
    small_container: {
      width: '100%',
      height: '30%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    button: {
      width:'80%',
      display: 'flex', 
      justifyContent: 'center',
      height: '20%'
    }
  });