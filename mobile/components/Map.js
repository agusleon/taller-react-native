import React, {useContext, useEffect, useRef} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FiuberContext } from '../context/FiuberContext';

// const {width, height} = Dimensions.get("window");

// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.02;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {

    const {currentDestination,defaultDestination} = useContext(FiuberContext);
    const mapRef = useRef(MapView);

    const moveTo = async (currentDestination) => {
        const camera = await mapRef.current?.getCamera();
        if (camera) {
            console.log("Moving to ", camera.center);
            camera.center = {
                latitude: currentDestination.latitude,
                longitude: currentDestination.longitude
            }
            mapRef.current?.animateCamera(camera, {duration: 1000});
        }
        return;
    }

    useEffect(() => {
        moveTo(currentDestination);
        
    });

    return (
        <MapView 
            ref={mapRef}
            style={styles.map}
            showsUserLocation={true}
        >
            {defaultDestination ?
                <Marker coordinate={{latitude: defaultDestination.latitude, longitude: defaultDestination.longitude}} />
                :
                <Marker coordinate={{latitude: currentDestination.latitude, longitude: currentDestination.longitude}} />
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