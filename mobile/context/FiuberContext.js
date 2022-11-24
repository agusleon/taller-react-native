/* eslint-disable no-unused-vars */
import React from 'react';

const FiuberContext = React.createContext();

const ContextProvider = ({children}) => {

    const userAuth = {
        name:'',
        uid:'',
        email:'',
        wallet:'',
        jwt:'',
    }

    const [favoriteDestinations, setFavoriteDestinations] = React.useState([
        {
          address:'',
          custom_name:'',
          latitude: 0,
          longitude: 0
      
        }
      ]);

    const address = {
        description:'',
        longitude:0,
        latitude:0,
        latitudeDelta: 0,
        longitudDelta: 0
    
    }

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [onTrip, setOnTrip] = React.useState(false);
    const [role, setRole] = React.useState('');
    const [user, setUser] = React.useState(userAuth);
    const [currentLocation, setCurrentLocation] = React.useState(address);
    const [destination, setDestination] = React.useState(address);

    return(
        <FiuberContext.Provider value={{
            role,setRole,
            loggedIn, setLoggedIn,
            user, setUser,
            currentLocation, setCurrentLocation,
            destination, setDestination,
            favoriteDestinations, setFavoriteDestinations,
            onTrip, setOnTrip
        }}>
            {children}
        </FiuberContext.Provider>
    )
}

export {FiuberContext,ContextProvider};