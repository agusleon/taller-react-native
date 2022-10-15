/* eslint-disable no-unused-vars */
import React from 'react';

const FiuberContext = React.createContext();

const ContextProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = React.useState(false);
    const [role, setRole] = React.useState('');

    return(
        <FiuberContext.Provider value={{
            role,setRole,
            loggedIn, setLoggedIn
        }}>
            {children}
        </FiuberContext.Provider>
    )
}

export {FiuberContext,ContextProvider};