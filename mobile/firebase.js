//import * as app from 'firebase';
import {REACT_APP_FIREBASE_API_KEY} from '@env';
//import 'firebase/firestore'
import {initializeApp} from 'firebase/app'
//import {auth} from 'firebase/app'
//import firebase from 'firebase'

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,

} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =  {
  
  apiKey: 'AIzaSyBXvRqXFtFeWx79SK1HCmwLtZY20qMAtCg',
  //{REACT_APP_FIREBASE_API_KEY}.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fiuber-login.firebaseapp.com",
  projectId:"fiuber-login",
  storageBucket: "fiuber-login.appspot.com",
  messagingSenderId:"678449995672",
  appId:"1:678449995672:web:d553512c7f6347f4f095ed"

};


//const Firebase = firebase.initializeApp(firebaseConfig)

//export default Firebase
//const app = app.initializeApp(firebaseConfig);
//app.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async(navigation)=>{
  try {
    const res = await signInWithPopup(auth, googleProvider);
    navigation.navigate('App')
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
const profileInfo = () => {
  auth.currentUser.email;
  
};

const logInWithEmailAndPassword = async (email, password,navigation) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Signed In!')
    console.log(email, password)
    navigation.navigate('App') 
  } catch (err) {
    console.error(err);
    alert(err.message);
   
  }
};
const registerWithEmailAndPassword = async (name, email, password,navigation) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    navigation.navigate('App')
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    console.log('Account created')
    console.log(email, password)
    //
  } catch (err) {
    console.error(err);
    alert(err.message);
    
  }
};
export  {profileInfo,auth,signInWithGoogle,sendPasswordReset, logout,logInWithEmailAndPassword,registerWithEmailAndPassword};

