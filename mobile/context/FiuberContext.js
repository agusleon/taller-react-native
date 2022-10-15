/* eslint-disable no-unused-vars */
import React from 'react';

const FiuberContext = React.createContext();

const ContextProvider = ({children}) => {

    const userAuth = {
        name:'',
        email:'',
        password:'',
        jwt:'',
        address: {
            name:'',
            description:'',
            latitude:0,
            longitude:0,
        }
    }

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [registrationCompleted, setRegistrationCompleted] = React.useState(false);
    const [role, setRole] = React.useState('');
    const [user, setUser] = React.useState(userAuth);

    return(
        <FiuberContext.Provider value={{
            role,setRole,
            loggedIn, setLoggedIn,
            registrationCompleted, setRegistrationCompleted,
            user, setUser
        }}>
            {children}
        </FiuberContext.Provider>
    )
}

export {FiuberContext,ContextProvider};