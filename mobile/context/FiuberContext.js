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
        car_model: '',
        car_patent: ''
    }

    const address_state = {
        description:'',
        longitude:0,
        latitude:0,
        latitude_delta: 0,
        longitude_delta: 0
    
    }

    const driver_state = {
        id: '',
        car_model: '',
        car_plate: '',
        name: '',
    }

    const trip_state = {
        id: '',
        destination: false,
        status: 0, // CHECK STATUS
        fee: 0,
        driver: false,
        passenger: false
    }

    const [gotDriver, setGotDriver] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [showDirections, setShowDirections] = React.useState(false);
    const [loadingFee, setLoadingFee] = React.useState(false);
    const [fee, setFee] = React.useState(0);
    const [role, setRole] = React.useState('');
    const [user, setUser] = React.useState(user_state);
    const [favoriteDestinations, setFavoriteDestinations] = React.useState([]);
    const [trip, setTrip] = React.useState(trip_state);
    const [status, setStatus] = React.useState(0);
    const [destination, setDestination] = React.useState(address_state);
    const [currentLocation, setCurrentLocation] = React.useState(address_state);
    const [driver, setDriver] = React.useState(driver_state);
    const [driverLocation, setDriverLocation] = React.useState(false);
    const [onGoing, setOnGoing] = React.useState(false);
    const [focusLocation, setFocusLocation] = React.useState()
    const [hasDriver, setHasDriver] = React.useState(false);
    const [hasPassenger, setHasPassenger] = React.useState(false);
    const [userReviewed, setUserReviewed] = React.useState(false);
   

    // STATUS

    // 0: WHERE TO?
    // 1: SEARCHING DRIVER
    // 2: AWAITING DRIVER
    // 3: ON GOING TRIP
    // 4: FINISHED TRIP
    // 5: INFO TRIP
    // 6: CREATING TRIP

    
    // const [tripInfo, setTripInfo] = React.useState(false);
    // const [tripStatus, setTripStatus] = React.useState('')
    // const [tripId, setTripId] = React.useState(null);
    // const [estimatedFee, setEstimatedFee] = React.useState(null);
    // const [currentLocation, setCurrentLocation] = React.useState(address_state);
    // const [driverLocation, setDriverLocation] = React.useState(null);
    // const [destination, setDestination] = React.useState(address_state);
    // const [driver, setDriver] = React.useState(driver_state)
    

    return(
        <FiuberContext.Provider value={{
            role,setRole,
            loggedIn, setLoggedIn,
            user, setUser,
            favoriteDestinations, setFavoriteDestinations,
            loadingFee, setLoadingFee,
            trip, setTrip,
            showDirections, setShowDirections,
            currentLocation, setCurrentLocation,
            fee, setFee,
            destination, setDestination,
            status, setStatus,
            driver, setDriver,
            gotDriver, setGotDriver,
            driverLocation, setDriverLocation,
            focusLocation, setFocusLocation,
            onGoing, setOnGoing,
            hasDriver, setHasDriver,
            hasPassenger, setHasPassenger,
            userReviewed, setUserReviewed,
            
        }}>
            {children}
        </FiuberContext.Provider>
    )
}

export {FiuberContext,ContextProvider};