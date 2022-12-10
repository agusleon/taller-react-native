import { React, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';
import { FiuberContext } from '../context/FiuberContext';
import WalletScreen from '../screens/WalletScreen';
import FavoriteDestinationsScreen from '../screens/FavoriteDestinationsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import DriverInfoScreen from '../screens/DriverInfoScreen';
import RateUserScreen from '../screens/RateUserScreen';
import PassengerInfoScreen from '../screens/PassengerInfoScreen';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    const {role} = useContext(FiuberContext);

    if (role=='passenger'){
        return(
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>} 
            screenOptions={{
                headerShown:false,
                drawerActiveBackgroundColor:'#6200ed',
                drawerActiveTintColor:'#fff',  
                drawerLabelStyle: {marginLeft:-25}
            }}>
            <Drawer.Screen component={HomeScreen} name="Home" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home-outline" size={22} color={color}/>
                    )
                }}/>
            <Drawer.Screen component={ProfileScreen} name="Profile" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={22} color={color}/>
                    )
                }}/>
            <Drawer.Screen component={FavoriteDestinationsScreen} name="My Destinations" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="heart-outline" size={22} color={color}/>
                    )
                }}/>
            <Drawer.Screen component={WalletScreen} name="Wallet" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="logo-bitcoin" size={22} color={color}/>
                    )
                }}/>
            <Drawer.Screen component={EditProfileScreen} name="Edit profile" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="settings-outline" size={22} color={color}/>
                    )
                }}/>
            <Drawer.Screen component={DriverInfoScreen} name="Driver Info" options={{
            drawerIcon: ({color}) => (
                <Ionicons name="settings-outline" size={22} color={color}/>
                )
            }}/>
    
            <Drawer.Screen component={RateUserScreen} name="Review Driver" options={{
            drawerIcon: ({color}) => (
                <Ionicons name="settings-outline" size={22} color={color}/>
                )
            }}/>
            
            </Drawer.Navigator>
        )
    } else {
        return(
            <Drawer.Navigator 
                drawerContent={props => <CustomDrawer {...props}/>} 
                screenOptions={{
                    headerShown:false,
                    drawerActiveBackgroundColor:'#6200ed',
                    drawerActiveTintColor:'#fff',  
                    drawerLabelStyle: {marginLeft:-25}
                }}>
                <Drawer.Screen component={ProfileScreen} name="Profile" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="person-outline" size={22} color={color}/>
                        )
                    }}/>
                <Drawer.Screen component={WalletScreen} name="Wallet" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="logo-bitcoin" size={22} color={color}/>
                        )
                    }}/>
                <Drawer.Screen component={EditProfileScreen} name="Edit profile" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="settings-outline" size={22} color={color}/>
                        )
                    }}/>

           
                     <Drawer.Screen component={PassengerInfoScreen} name="Passenger Info" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="settings-outline" size={22} color={color}/>
                        )
                    }}/>
                    
                    <Drawer.Screen component={RateUserScreen} name="Review Passenger" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="settings-outline" size={22} color={color}/>
                        )
                    }}/>
            
                </Drawer.Navigator>


                
            )
    }
}

export default AppStack;