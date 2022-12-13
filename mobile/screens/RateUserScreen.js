import StarRating from 'react-native-star-rating-widget';
import React, {useState, useContext} from 'react'
import {View, StyleSheet,Button, Alert} from 'react-native';
import { Caption,
  Title,
  TextInput,
} from 'react-native-paper';
import {rateDriver, ratePassenger} from '../services/events';
import { FiuberContext } from '../context/FiuberContext';
import { auth } from '../firebase';

const RateUserScreen = ({navigation}) => {
  const {driver, user, role, setUserReviewed, userReviewed} = useContext(FiuberContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  

  console.log("El rating ", rating)

  const sendReview = async () => {  
       if(comment == ''){
        Alert.alert("Comment is empty, complete the message box!")
        return
       }
       if(role == 'passenger'){
             //llamo a la api para mandarle el rating 
             const idTokenResult = await auth.currentUser.getIdTokenResult();
             console.log("idtoken ",driver.id)
             try {
              //cambiar a driver.id
               await rateDriver(user.uid, idTokenResult.token, rating, comment);
               setUserReviewed(true);
               Alert.alert("successfully submitted!")
               navigation.navigate('Driver Info')
             } catch (err) {console.log("Error en review al driver", err)}     
       }else{
            //llamo a la api para mandarle el rating 
            const idTokenResult = await auth.currentUser.getIdTokenResult();
            try {
              await ratePassenger(user.uid, idTokenResult.token, rating, comment);
              setUserReviewed(true);
              Alert.alert("successfully submitted!")
              navigation.navigate('Passenger Info')
            } catch (err) {console.log("Error en review al passenger", err)}     
       }
   
   
  }
  const handleConfirm = async () =>{
    Alert.alert(
      "Confirm Review",
      "Are you sure you want to submitt this review?",
      [
        {
          text: "Cancel",
          onPress: () => {return},
          style: "cancel"
        },
        { text: "OK", onPress: () => {sendReview()} }
      ]
    );
  }
  return (
    
      (!userReviewed) ? 
      <View style={styles.container}>
          <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>How was your experience?
              </Title>
      <Caption style={styles.label}>Rating</Caption>
      <StarRating
        rating={rating}
        onChange={setRating}
        maxStars={5}
      />
      <View>
      <Caption style={styles.label}>Comment</Caption>
      <TextInput value={comment} onChangeText={comment => setComment(comment)} style={styles.inputStyle} />
      </View>
      
        <View style={styles.containerButton}>
          <Button
                  
                    title="Submit"
                    onPress={handleConfirm}
                    color="#BF0AFF"
                    accessibilityLabel="Learn more about this purple button"
          />
          {(role == 'passenger') ?
          <Button
                    
          title="Back"
          onPress={() => navigation.navigate('Driver Info')}
          color="#BF0AFF"
          accessibilityLabel="Learn more about this purple button"
          />:
          <Button
                    
          title="Back"
          onPress={() => navigation.navigate('Passenger Info')}
          color="#BF0AFF"
          accessibilityLabel="Learn more about this purple button"
          />}
         
        </View>
      </View> 
      : 
      <View style={styles.container}>
          <Title style={[styles.title, {
                  marginTop:15,
                  marginBottom: 5,
                }]}>You've already reviewed</Title>

        {(role == 'passenger') ?
                  <Button
                            
                  title="Back"
                  onPress={() => navigation.navigate('Driver Info')}
                  color="#BF0AFF"
                  accessibilityLabel="Learn more about this purple button"
                  />:
                  <Button
                            
                  title="Back"
                  onPress={() => navigation.navigate('Passenger Info')}
                  color="#BF0AFF"
                  accessibilityLabel="Learn more about this purple button"
        />}
      
    </View>                
      
  );
            

};

  
export default RateUserScreen;

const styles = StyleSheet.create({
  container: {
      
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  },
  containerButton: {
      
 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    
   
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginTop: 50
  },
  label: {
    fontSize: 8,
    fontWeight: 'bold',
    backgroundColor: 'white',
    marginTop: 50,
    marginLeft: 0,
    display: 'flex',
    alignItems: 'flex-start',
    textTransform: 'uppercase'
   
  },
  inputStyle: {
    
    marginBottom: 10,
    width: 300,
    height: 40,
    padding: 15,
    borderRadius: 12,
    borderWidth:0.5,
    borderColor:'grey',
    backgroundColor: '#fff',
    alignContent:'center',
  },
});