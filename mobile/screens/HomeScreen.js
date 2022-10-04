import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TopBar from '../components/TopBar'
import app from '../firebase'


export default function HomeScreen ({navigation}) {
        return (
            <View style={styles.container}>
                <TopBar {...navigation} />
                <View style={styles.body}>
                    <Text>Home</Text>
                </View>
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
    }
})