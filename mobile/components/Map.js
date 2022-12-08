import React, {useContext, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { FiuberContext } from '../context/FiuberContext';
import MapViewDirections from 'react-native-maps-directions';

const Map = () => {
    const GOOGLE_API_KEY = 'AIzaSyCkRY5LLU7MR3J1XGHzJG9CXrvEypQpdJM'

    const {currentLocation, destination, onTrip} = useContext(FiuberContext);

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
        >
            {onTrip && <Marker coordinate={{latitude: destination.latitude, longitude: destination.longitude}} />}
            {/* onTrip y status AWAITING_DRIVER muestro el marker con un autito */}
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