import { React } from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function OnboardingScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.title}>FIUBER</Text>
          </View>
          <Button style={styles.button} icon="chevron-right" mode="contained" onPress={() => navigation.navigate('Login')}>
            start
          </Button>
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
    button: {
      width:'90%',
      display: 'flex', 
      justifyContent: 'center',
      height: '5%'
    }
  });