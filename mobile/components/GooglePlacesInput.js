import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({placeholder, onPlaceSelected}) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      fetchDetails={true}
      styles={{
        listView: {position:'absolute',zIndex: 100, elevation: 3, top: 30, paddingHorizontal: 15, height:100},
        textInputContainer: {
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          zIndex: 100,
          paddingHorizontal: 15,     
        }
      }}
      onPress={(data,details) => {
        onPlaceSelected(details);
      }}
      query={{
        key: 'AIzaSyCkRY5LLU7MR3J1XGHzJG9CXrvEypQpdJM',
        language: 'en',
      }}
      />
  );
};


export default GooglePlacesInput;