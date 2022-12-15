import React, {useContext, useRef} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { FiuberContext } from '../context/FiuberContext';
import MapViewDirections from 'react-native-maps-directions';
import { AWAITING_DRIVER, ON_GOING } from '../utils/vars';

const Map = () => {
    const GOOGLE_API_KEY = 'AIzaSyCkRY5LLU7MR3J1XGHzJG9CXrvEypQpdJM'

    const {destination, showDirections, passenger, focusLocation, user, status} = useContext(FiuberContext);

    const mapRef = useRef(MapView);

    return (
        <MapView 
            region={focusLocation}
            zoomEnabled={true}
            zoomTapEnabled={true}
            scrollDuringRotateOrZoomEnabled={true}
            ref={mapRef}
            style={styles.map}
        >
            {showDirections && 
            <Marker 
                coordinate={{latitude: destination.latitude, longitude: destination.longitude}}
            />

            }

            <Marker 
                coordinate={{latitude: focusLocation.latitude, longitude: focusLocation.longitude}}
                icon={{uri:'https://avatars.dicebear.com/api/big-smile/'+user.uid+'.png?size=100'}}
                
                style={{width: 2, height: 2}}
                anchor={{x:0.5, y:0.5}}       
            >
            </Marker>


            {(showDirections && status == AWAITING_DRIVER) && 
                <Marker 
                    coordinate={{latitude: passenger.source_latitude, longitude: passenger.source_longitude}}
                    icon={{uri:'https://avatars.dicebear.com/api/big-smile/'+passenger.id+'.png?size=100'}}   
                    style={{width: 2, height: 2}}
                    anchor={{x:0.5, y:0.5}}       
                />
                
            }



            {(showDirections && status == AWAITING_DRIVER) &&
                <MapViewDirections
                    origin={focusLocation}
                    destination={{latitude: passenger.source_latitude, longitude: passenger.source_longitude}}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor="blue"
                />
            }

            {(showDirections && status == AWAITING_DRIVER) &&
                <MapViewDirections
                    origin={{latitude: passenger.source_latitude, longitude: passenger.source_longitude}}
                    destination={destination}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor="blue"
                />
            }

            {(showDirections && status == ON_GOING) &&
                <MapViewDirections
                    origin={focusLocation}
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