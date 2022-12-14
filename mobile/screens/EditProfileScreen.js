/* eslint-disable no-unused-vars */
import { StyleSheet, TextInput, Text, View, Platform, Dimensions, Alert} from 'react-native'
import React, {useContext, useState,  useCallback,useRef, useEffect} from 'react'
import { FiuberContext } from '../context/FiuberContext'
import TopBar from '../components/TopBar'
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-paper';
import { updateUserInfo, getUser, updateDriverInfo } from '../services/users';
import { Feather } from '@expo/vector-icons';
import { v4 as uuid } from 'uuid';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { getSuggestions } from '../services/cars';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EditProfileScreen = ({navigation}) => {

    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([
        {label: 'Passenger', value: 'passenger'},
        {label: 'Driver', value: 'driver'}
    ]);
    const [editable,setEditable] = useState(false);
    const {user, setUser, role, setRole} = useContext(FiuberContext);
    const [nameEdit, setNameEdit] = React.useState(user.name);
    const [roleEdit, setRoleEdit] = React.useState(role);
    const [modelEdit, setModelEdit] = React.useState(user.car_model);
    const [patentEdit, setPatentEdit] = React.useState(user.car_patent);
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [selectedModel, setSelectedModel] = useState(null)

    const searchRef = useRef(null)
    const dropdownController = useRef(null)
    const onOpenSuggestionsList = useCallback(isOpened => {}, [])
    const onClearPress = useCallback(() => {setSuggestionsList(null) }, [])

    const handleCancel = () => {
        setNameEdit(user.name)
        setRoleEdit(role)

        setModelEdit(user.car_model)
        setPatentEdit(user.car_patent)
        setEditable(false)
    }

    const handleBack = () => {
        navigation.navigate('Profile')
    }

    async function getSuggestionsList(q){
      console.log("entro aca")
      console.log('getSuggestions', q)
      const response = await getSuggestions(q.toLowerCase())
      
      console.log("items ", response)
      
      const suggestions = response.map(r => ({
          id: uuid(), 
          title: `${r.make} ${r.model} ${r.year}`
      }))
    
      setSuggestionsList(suggestions)
      console.log("suggestions ", [...new Set(suggestions)])
      console.log("la list", suggestionsList)
    }

    useEffect((q)=>{
      if (role == 'driver') {
        getSuggestionsList(q)
      }
  },[])

    const handleSave = async () => {
            console.log("model ", modelEdit)
            try{
              if(roleEdit == 'passenger') {
                if(!nameEdit || !roleEdit ){
                  Alert.alert("Missing fields!")
                  return
                } 
                await updateUserInfo(user.uid, user.jwt, nameEdit,  roleEdit)
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
                setUser(updateUser)
    
              }else{
                
               
                if(!nameEdit || !roleEdit || !selectedModel || !patentEdit){
                  Alert.alert("Missing fields!")
                  return
                } 
                setModelEdit(selectedModel.title)
                await updateDriverInfo(user.uid, user.jwt, nameEdit,  roleEdit, modelEdit, patentEdit)
                const user_response = await getUser(user.uid, user.jwt);
                console.log("User  DRIVER response GET", user_response)
                const updateUser = {
                  uid: user_response.uid,
                  name: user_response.name,
                  email: user_response.email,
                  wallet: user_response.wallet,
                  password: user.password,
                  jwt: user.jwt,
                  car_model: user_response.car_description,
                  car_patent: user_response.plate
                }
                setUser(updateUser)
              }
      
              setRole(roleEdit)
             

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
                
                <DropDownPicker
                    style={styles.dropdownStyle}
                    open={open}
                    value={roleEdit}
                    items={roles}
                    setOpen={setOpen}
                    setValue={setRoleEdit}
                    setItems={setRoles}
                    />
                {roleEdit == 'driver' ? 
                    <View>
           
                         <AutocompleteDropdown
                                    ref={searchRef}
                                    controller={controller => {
                                        dropdownController.current = controller
                                      }}
                                    direction={Platform.select({ ios: 'down' })}
                                    onClear={onClearPress}
                                    // initialValue={'1'}
                                    
                                    dataSet={suggestionsList}
                                    onChangeText={getSuggestionsList}
                                    onSelectItem={item => {
                                        item && setSelectedModel(item)
                                      }}
                                    debounce={600}
                                    suggestionsListMaxHeight={Dimensions.get('window').height * 0.4}
                                    onOpenSuggestionsList={onOpenSuggestionsList}
                                    //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                                    textInputProps={
                                        {placeholder: 'Type 3+ letters car model'}
                                        
                                       
                                    }
                            />
                        <TextInput
                        placeholder='patente'
                        value={patentEdit}
                        style={styles.inputStyle}
                        onChangeText={patent => setPatentEdit(patent)}
                        />
                    </View>
                    :
                    <></>
                }
            </View>
            :
            <View>
                <View  style={styles.passwordStyle}>
                 <Feather name="user" size={24} color="grey" />
                  <Text style={{color: 'grey', marginLeft: 5}}>{user.name}</Text>
                </View>
                <Text style={styles.textStyle}>{role}</Text>
                {(role == 'driver') ? 
                    <View>
                      <View  style={styles.passwordStyle}>
                        <Ionicons name="car-outline" color="grey" size={20}/>
                        <Text style={{color: 'grey', marginLeft: 5}}>{user.car_model}</Text>
                      </View>
                      <View  style={styles.passwordStyle}>
                        <MaterialCommunityIcons name="smart-card" size={20} color="grey" />
                        <Text style={{color: 'grey', marginLeft: 5}}>{user.car_patent}</Text>
                      </View>
                    </View>
                :
                <></>
                }
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