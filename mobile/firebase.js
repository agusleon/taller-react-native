import * as app from 'firebase';
import {REACT_APP_FIREBASE_API_KEY} from '@env';
//import {initializeApp} from 'firebase/app'
// import {auth} from 'firebase/app'
//import firebase from 'firebase'

 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =  {
  apiKey: {REACT_APP_FIREBASE_API_KEY}.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fiuber-login.firebaseapp.com",
  projectId:"fiuber-login",
  storageBucket: "fiuber-login.appspot.com",
  messagingSenderId:"678449995672",
  appId:"1:678449995672:web:d553512c7f6347f4f095ed"

};
//const Firebase = firebase.initializeApp(firebaseConfig)

//export default Firebase
//const app = app.initializeApp(firebaseConfig);
app.initializeApp(firebaseConfig);
export default app;