import React, {useContext, useRef, useEffect, useState}from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { FiuberContext } from '../context/FiuberContext';

const GooglePlacesInput = ({placeholder, onPlaceSelected}) => {

  const {favoriteDestinations} = useContext(FiuberContext);
  const [predefinedPlacesArray, setPredefinedPlacesArray] = useState([]);

  useEffect(() => {
    async function fetchaData() {
        if(favoriteDestinations.length > 0){

          const data = favoriteDestinations.map(place => {
            return {
              description: place.custom_name,
              geometry:{location: {lat: place.latitude, lng: place.longitude}}
            }})
          setPredefinedPlacesArray(data)
        }
        setPredefinedPlacesArray([])
    }
    fetchaData()
    
  }, [favoriteDestinations]);

  const placesRef = useRef();
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      fetchDetails={true}
      autoFocus={true}
      
      styles={{
        listView: {flex:1,zIndex: 100, elevation: 3, paddingHorizontal: 15},
        textInputContainer: {
          width: '100%',
          justifyContent: 'center',
          zIndex: 100,
          paddingHorizontal: 15,
        },
        textInput: {
          borderWidth:0.5,
          borderColor:'grey',
          borderRadius:8,
          padding:8,
          height:60
        }
      }}
      onPress={(data,details = null) => {
        onPlaceSelected(details);
      }}
      ref={placesRef}
      query={{
        key: 'AIzaSyCkRY5LLU7MR3J1XGHzJG9CXrvEypQpdJM',
        language: 'en',
      }}
      predefinedPlaces={predefinedPlacesArray}
      />
  );
};


export default GooglePlacesInput;