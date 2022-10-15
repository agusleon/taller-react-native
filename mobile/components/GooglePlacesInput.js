import React from 'react';
import { View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Ionicons from '@expo/vector-icons/Ionicons';

const GooglePlacesInput = ({placeholder, onPlaceSelected, style}) => {
  return (
    <View style={style}>
        <Ionicons name="location" size={30}/>
        <GooglePlacesAutocomplete
          placeholder={placeholder}
          fetchDetails={true}
          // styles={}
          onPress={(data,details) => {
            onPlaceSelected(details);
          }}
          query={{
            key: 'AIzaSyCkRY5LLU7MR3J1XGHzJG9CXrvEypQpdJM',
            language: 'en',
          }}
          />
    </View>
  );
};


export default GooglePlacesInput;