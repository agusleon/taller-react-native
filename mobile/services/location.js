
import * as Location from 'expo-location';

const getCurrentLocation = async () => {
    // se pide acceso a current location (esto se haria nada mas en register)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
    }

    // se busca la current location
    let location = await Location.getCurrentPositionAsync({});

    return location;
}

export {getCurrentLocation}