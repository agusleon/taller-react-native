import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Login from '../screens/Login.js'
import Signup from '../screens/Signup.js'
import Profile from '../screens/Profile.js'

const SwitchNavigator = createSwitchNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        Profile: {
            screen: Profile
        }
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)