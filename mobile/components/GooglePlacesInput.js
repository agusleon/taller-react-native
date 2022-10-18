import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({placeholder, onPlaceSelected}) => {

  // const [destinations, setDestinations] = useState([
  //   {
  //     description:'',
  //     geometry: {
  //       location: {
  //         lat: 0,
  //         lng: 0
  //       }
  //     }
  //   }
  // ]);
  // const {user} = useContext(FiuberContext);

  // useEffect(() => {
  //   async function fetchDestination(){
  //     const fetched_destinations = await getFavoriteDestinations(user.jwt);
  //     if (!fetched_destinations.detail){
  //       console.log("Destinations customs:",fetched_destinations);
  //       setDestinations(fetched_destinations);
  //       return;
  //     }
  //   }
    
  //   fetchDestination();
  // })


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
      // predefinedPlaces={destinations}
      />
  );
};


export default GooglePlacesInput;