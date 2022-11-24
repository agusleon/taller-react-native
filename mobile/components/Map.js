import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import { FiuberContext } from '../context/FiuberContext';
import MapViewDirections from 'react-native-maps-directions';

const {width, height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
    const GOOGLE_API_KEY = 'AIzaSyCkRY5LLU7MR3J1XGHzJG9CXrvEypQpdJM'

    const {currentLocation, destination, setCurrentLocation, onTrip} = useContext(FiuberContext);

    console.log("la current desti del map ", currentLocation)
    console.log("la default desti del map ", destination)
    const mapRef = useRef(MapView);

    useEffect(() => {

       // moveTo(currentDestination);

    }, []);

    return (
        <MapView 
            region={currentLocation}
            zoomEnabled={true}
            zoomTapEnabled={true}
            scrollDuringRotateOrZoomEnabled={true}
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
            onRegionChangeComplete={region => setCurrentLocation(region)}
            
  
        >
            {/* <Marker coordinate={{latitude: currentDestination.latitude, longitude: currentDestination.longitude}} /> */}
            {/* cambiaria current destination a directamente destination */}
            {onTrip &&
                <MapViewDirections
                    origin={currentLocation}
                    destination={destination}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor="blue"
                />
            }

        </MapView>
        
    )
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})

export default Map;