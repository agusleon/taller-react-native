import { React } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreenDriver from '../screens/HomeScreenDriver';
import CustomDrawer from '../components/CustomDrawer';
import TripsAvailableScreen from '../screens/TripsAvailable';
import EditProfileScreen from '../screens/EditProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerStackDriver = () => {

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
                <Drawer.Screen component={EditProfileScreen} name="Settings" options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="settings-outline" size={22} color={color}/>
                    )
                }}/>
            
            </Drawer.Navigator>
        )
}

export default DrawerStackDriver;