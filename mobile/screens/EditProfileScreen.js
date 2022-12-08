import { StyleSheet, TextInput, Text, View } from 'react-native'
import React, {useContext, useState} from 'react'
import { FiuberContext } from '../context/FiuberContext'
import TopBar from '../components/TopBar'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';
import { updateUserInfo, getUser } from '../services/users';
import { Feather } from '@expo/vector-icons';


const EditProfileScreen = ({navigation}) => {

    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([
        {label: 'Passenger', value: 'passenger'},
        {label: 'Driver', value: 'driver'}
    ]);
    const [editable,setEditable] = useState(false);
    const {user, setUser, role, setRole, car, setCar} = useContext(FiuberContext);
    const [nameEdit, setNameEdit] = React.useState(user.name);
    const [emailEdit, setEmailEdit] = React.useState(user.email);
    const [roleEdit, setRoleEdit] = React.useState(role);
    const [passwordEdit, setPasswordEdit] = React.useState(user.password);
    const [modelEdit, setModelEdit] = React.useState(car.model);
    const [patentEdit, setPatentEdit] = React.useState(car.patent);

    const handleCancel = () => {
        setNameEdit(user.name)
        setRoleEdit(role)
        setEmailEdit(user.email)
        setPasswordEdit(user.password)
        setModelEdit(car.model)
        setPatentEdit(car.patent)
        setEditable(false)
    }

    const handleBack = () => {
        navigation.navigate('Profile')
    }

    const handleSave = async () => {
            
            try{
              
              await updateUserInfo(user.uid, user.jwt, nameEdit, user.wallet, roleEdit)
              const user_response = await getUser(user.uid, user.jwt);
              console.log("User response GET", user_response)

              const updateUser = {
                uid: user_response.uid,
                name: user_response.name,
                email: user_response.email,
                wallet: user_response.wallet,
                password: user.password,
                jwt: user.jwt,
              }

              const updateCar = {
                model: modelEdit,
                patent: patentEdit
              }
    
              setUser(updateUser)
              setRole(roleEdit)
              setCar(updateCar)

              setEditable(false)
    
            }catch (err) {
              console.log("Error buscando el usuario");
              alert(err.message);
            }
    }
    

    return (
        <View style={styles.container}>
            <TopBar {...navigation}/>
            <Text style={styles.formLabel}>Edit profile</Text>
            {editable ? 
            <View style={{flexDirection:'column', justifyContent:'center', alignContent:'center'}}>
                <TextInput value={nameEdit} onChangeText={name => setNameEdit(name)} style={styles.inputStyle} />
                <TextInput value={emailEdit} onChangeText={email => setEmailEdit(email)} style={styles.inputStyle} />
                <TextInput
                secureTextEntry
                value={passwordEdit}
                style={styles.inputStyle}
                onChangeText={password => setPasswordEdit(password)}
                />
                <DropDownPicker
                    style={styles.dropdownStyle}
                    open={open}
                    value={roleEdit}
                    items={roles}
                    setOpen={setOpen}
                    setValue={setRoleEdit}
                    setItems={setRoles}
                    />
                {role == 'driver' ? 
                    <View>
                        <TextInput
                        value={modelEdit}
                        style={styles.inputStyle}
                        onChangeText={model => setModelEdit(model)}
                        />
                        <TextInput
                        value={patentEdit}
                        style={styles.inputStyle}
                        onChangeText={patent => setPatentEdit(patent)}
                        />
                    </View>
                    :
                    <></>
                }
            </View>:
            <View>
                <Text style={styles.textStyle}>{user.name}</Text>
                <Text style={styles.textStyle}>{user.email}</Text>
                <View  style={styles.passwordStyle}>
                    <Feather name="lock" size={24} color="grey" />
                    <Text style={{color: 'grey', marginLeft: 5}}>password</Text>
                </View>
                <Text style={styles.textStyle}>{role}</Text>
            </View>
            }
            {editable ? 
            <View style={{flexDirection:'row', width:'80%', justifyContent:'space-evenly'}}>
                <Button mode='contained' onPress={handleCancel}>CANCEL</Button>
                <Button mode='outlined' onPress={handleSave}>SAVE</Button>
            </View>:
            <View style={{flexDirection:'row', width:'80%', justifyContent:'space-evenly'}}>
            <Button mode='contained' onPress={handleBack}>GO BACK</Button>
            <Button mode='outlined' onPress={()=>{setEditable(true)}}>EDIT</Button>
        </View>
            
            }    
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
      },
      formLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: 'white'
      },
      inputStyle: {
        margin: 10,
        marginBottom: 10,
        width: 300,
        height: 60,
        padding: 15,
        borderRadius: 12,
        borderWidth:0.5,
        borderColor:'grey',
        backgroundColor: '#fff',
        alignContent:'center',
      },
      textStyle: {
        margin: 10,
        width: 300,
        height: 60,
        padding: 15,
        borderRadius: 12,
        borderWidth:0.5,
        borderColor:'grey',
        backgroundColor: '#fff',
        alignContent:'center',
        color:'grey'
      },
      passwordStyle: {
        margin: 10,
        width: 300,
        height: 60,
        padding: 15,
        flexDirection:'row',
        borderRadius: 12,
        borderWidth:0.5,
        borderColor:'grey',
        backgroundColor: '#fff',
        alignContent:'center',
      },
      dropdownStyle: {
        margin: 10,
        marginBottom: 10,
        width: 300,
        height: 60,
        paddingHorizontal: 10,
        borderColor:'grey',
        backgroundColor: '#fff',
      },
      formText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 20,
      },
      text: {
        color: '#fff',
        fontSize: 20,
      },
})