import { React, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreenPassenger from '../screens/HomeScreenPassenger';
import CustomDrawer from '../components/CustomDrawer';
import { FiuberContext } from '../context/FiuberContext';
import FavoriteDestinationsScreen from '../screens/FavoriteDestinationsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreenDriver from '../screens/HomeScreenDriver';
import TripsAvailableScreen from '../screens/TripsAvailable';

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
            <Drawer.Screen component={HomeScreenPassenger} name="Home" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home-outline" size={22} color={color}/>
                    )
                }}/>
            <Drawer.Screen component={FavoriteDestinationsScreen} name="My Destinations" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="heart-outline" size={22} color={color}/>
                    )
                }}/>
            <Drawer.Screen component={ProfileScreen} name="Profile" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={22} color={color}/>
                    )
                }}/>

            <Drawer.Screen component={EditProfileScreen} name="Edit profile" options={{
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
                <Drawer.Screen component={HomeScreenDriver} name="Home" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="home-outline" size={22} color={color}/>
                        )
                    }}/>
                <Drawer.Screen component={TripsAvailableScreen} name="Trips Available" options={{
                    drawerIcon: ({color}) => (
                        <AntDesign name="notification" size={22} color={color} />
                        )
                    }}/>            
                <Drawer.Screen component={ProfileScreen} name="Profile" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="person-outline" size={22} color={color}/>
                        )
                    }}/>
                <Drawer.Screen component={EditProfileScreen} name="Edit profile" options={{
                    drawerIcon: ({color}) => (
                        <Ionicons name="settings-outline" size={22} color={color}/>
                        )
                    }}/>
                </Drawer.Navigator>
                
            )
    }
}

export default AppStack;