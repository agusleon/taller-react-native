import { StatusBar } from 'expo-status-bar';
import { useState, React } from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function App() {

  const [mobile, setInfoMobile] = useState('');
  const [web, setInfoWeb] = useState('');

  const handleClickMobile = async () => {


    const stringUrlMobile = 'https://fiuber-api-gateway-nginx.herokuapp.com/api/mobile/';
    const responsemob = await fetch(stringUrlMobile, {
      method: 'GET',
      headers: {
        Accept: 'application/text',
      },
    });
    if (!responsemob.ok) {
      throw new Error(`Error! status: ${responsemob.status}`);
    }

    const resultMobile = await responsemob.text();

    setInfoMobile(resultMobile);

    console.log(mobile)

  };

  const handleClickWeb = async () => {

    const stringUrlWeb = 'https://fiuber-api-gateway-nginx.herokuapp.com/api/web/';
    const responsweb = await fetch(stringUrlWeb, {
      method: 'GET',
      headers: {
        Accept: 'application/text',
      },
    });
    if (!responsweb.ok) {
      throw new Error(`Error! status: ${responsweb.status}`);
    }

    const resultWeb = await responsweb.text();

    setInfoWeb(resultWeb);

    console.log(web)

  };


  const clearData = async () => {
    setInfoMobile('');
    setInfoWeb('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>FIUBER</Text>
        <Button mode="contained" onPress={handleClickMobile}>
            Backend Python
        </Button>
        <Text>{mobile}</Text>
        <Button mode="outlined" onPress={handleClickWeb}>
            Backend Node
        </Button>
        <Text>{web}</Text>
        <Button mode="contained-tonal" onPress={clearData}>
            Clear
        </Button>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 25,
    fontWeight: 'bold',
    fontSize: 50
  }
});
