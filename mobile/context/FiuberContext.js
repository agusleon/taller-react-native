/* eslint-disable no-unused-vars */
import React from 'react';

const FiuberContext = React.createContext();

const ContextProvider = ({children}) => {

    const user_state = {
        name:'',
        uid:'',
        email:'',
        password:'',
        wallet:'',
        jwt:'',
    }

    

    const address_state = {
        description:'',
        longitude:0,
        latitude:0,
        latitudeDelta: 0,
        longitudeDelta: 0
    
    }

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [tripInfo, setTripInfo] = React.useState(false);
    const [onTrip, setOnTrip] = React.useState(false);
    const [tripStatus, setTripStatus] = React.useState('')
    const [loadingFee, setLoadingFee] = React.useState(false);
    const [trip, setTrip] = React.useState(null);
    const [role, setRole] = React.useState('');
    const [user, setUser] = React.useState(user_state);
    const [currentLocation, setCurrentLocation] = React.useState(address_state);
    const [driverLocation, setDriverLocation] = React.useState(null) 
    const [destination, setDestination] = React.useState(address_state);
    const [driver, setDriver] = React.useState(null)
    const [favoriteDestinations, setFavoriteDestinations] = React.useState([]);

    return(
        <FiuberContext.Provider value={{
            role,setRole,
            loggedIn, setLoggedIn,
            user, setUser,
            currentLocation, setCurrentLocation,
            destination, setDestination,
            favoriteDestinations, setFavoriteDestinations,
            trip, setTrip,
            tripInfo, setTripInfo,
            onTrip, setOnTrip,
            tripStatus, setTripStatus,
            loadingFee, setLoadingFee,
            driver, setDriver,
            driverLocation, setDriverLocation
        }}>
            {children}
        </FiuberContext.Provider>
    )
}

export {FiuberContext,ContextProvider};