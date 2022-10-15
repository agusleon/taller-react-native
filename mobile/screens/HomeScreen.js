import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import GooglePlacesInput from '../components/GooglePlacesInput'
import Map from '../components/Map'
import TopBar from '../components/TopBar'

export default function HomeScreen ({navigation}) {
        return (
            <View style={styles.container}>
                <Map/>
                <TopBar {...navigation} />
                <GooglePlacesInput/>
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
    }
})