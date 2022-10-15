import * as React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';


const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: -34.596866, 
    longitude: -58.389186,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
}


const Map = () => {

  return (
    <MapView 
        style={styles.map}
        showsUserLocation={true} 
        initialRegion={INITIAL_POSITION}
        />
  )
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})

export default Map;