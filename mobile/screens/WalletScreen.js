import { StyleSheet, View } from 'react-native'
import {Text, Button, TouchableRipple, TextInput,
    } from 'react-native-paper'
import React, { useContext,useState } from 'react'
import { FiuberContext } from '../context/FiuberContext'
import { auth } from '../firebase';
import { updateUserInfo, getUser } from '../services/users';
import Ionicons from '@expo/vector-icons/Ionicons';
const WalletScreen = ({navigation}) => {
   
    const {user,role, setUser} = useContext(FiuberContext);
    const [wallet, setWallet] = React.useState(user.wallet);
    const [editable,setEditable] = useState(false);
    const [edit, setEdit] = useState('Edit');

    const EDIT = 'Edit';
    const SAVE = 'Save';

    const onSetting = async () => {
    
      
        if(edit == EDIT){
          
          setEdit(SAVE)
          setEditable(true);
          
          
        }
        if(edit == SAVE){
          
          const user_uid = auth.currentUser.uid;
          const idTokenResult = await auth.currentUser.getIdTokenResult();
        
          try{
            await updateUserInfo(user_uid, idTokenResult.token, user.name, wallet, role)
            const user_response = await getUser(user_uid, idTokenResult.token);
            setWallet(user_response.wallet)
            const updateUser = {
              uid: user_response.uid,
              name: user_response.name,
              email: user_response.email,
              wallet: user_response.wallet,
              password: user.password,
              jwt: idTokenResult.token,
            }
            setUser(updateUser)
          }catch (err) {
            console.log("Error buscando el usuario");
            alert(err.message);
          }
          setEditable(false)
          setEdit(EDIT)
        }
      }

    return (
        <View >
            <Text style={styles.title}>Your wallet</Text>
            <TextInput placeholder={user.wallet} editable={editable} onChangeText={setWallet} value={wallet} ></TextInput> 
            <Button onPress={onSetting} style={styles.menuItemText}>{edit}</Button>
            
        {/*     <TouchableRipple onPress={() => {onSetting}}>
            <View style={styles.menuItem}>
              <Ionicons name="settings-outline" color="#FF6347" size={25}/>
              <Button onPress={onSetting} style={styles.menuItemText}>{setting}</Button>
            </View>
          </TouchableRipple> */}
            <Button style={styles.trip_button} mode="contained" onPress={() => {navigation.navigate('Profile')}}>
                Go to Profile
            </Button>
            
        </View>
    )
}

export default WalletScreen

const styles = StyleSheet.create({
    container: {
        width:'50%',
        height:'50%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#20315f'
    },
    trip_button: {
        width:'90%',
        shadowColor:'black',
        shadowOffset:{width:2,height:2},
        shadowOpacity: 0.5,
        elevation:4,
        padding:8,
        borderRadius:8,
    },
})