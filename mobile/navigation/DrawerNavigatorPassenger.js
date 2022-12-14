import { React } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreenPassenger from '../screens/HomeScreenPassenger';
import CustomDrawer from '../components/CustomDrawer';
import FavoriteDestinationsScreen from '../screens/FavoriteDestinationsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerStackPassenger = () => {

        return(
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props}/>} 
            screenOptions={{
                headerShown:false,
                drawerActiveBackgroundColor:'#6200ed',
                drawerActiveTintColor:'#fff',  
                drawerLabelStyle: {marginLeft:-25}
            }}
            initialRouteName="Home"
            >
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
            <Drawer.Screen component={EditProfileScreen} name="Settings" options={{
            drawerIcon: ({color}) => (
                <Ionicons name="settings-outline" size={22} color={color}/>
                )
            }}/>
            
            </Drawer.Navigator>
        )
}

export default DrawerStackPassenger;