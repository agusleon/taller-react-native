import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Button } from 'react-native-paper'
import Map from '../components/Map'
import TopBar from '../components/TopBar'

export default function HomeScreen ({navigation}) {

    const handleTripButton = async () => {
        navigation.navigate('Make a Trip')
    }

    return (
        <View style={styles.container}>
            <Map/>
            <TopBar {...navigation} />
            <Button style={styles.trip_button} mode="contained" onPress={handleTripButton}>
                Make Trip
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    body: {
        height:'80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    trip_button: {
        position:'absolute',
        width:'90%',
        shadowColor:'black',
        shadowOffset:{width:2,height:2},
        shadowOpacity: 0.5,
        elevation:4,
        padding:8,
        borderRadius:8,
        bottom:50
    },
    trip_container :{
        position:'absolute',
        width:'100%',
        backgroundColor:'white',
        height:'50%'
    },
    search_container :{
        width:'100%',
        backgroundColor:'white',
        height:'50%'
    }
})