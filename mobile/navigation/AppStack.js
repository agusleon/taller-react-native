import { React } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';

import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
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
        </Drawer.Navigator>
    )
}

export default AppStack;