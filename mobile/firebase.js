import { initializeApp } from 'firebase/app';
import {
  // GoogleAuthProvider,
  getAuth,
  // signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  // sendPasswordResetEmail,
  signOut,

} from 'firebase/auth';
import {
  getFirestore,
  // query,
  // getDocs,
  // where,
} from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyCo1TynEo7rDo3J0vlU6OlksN-TBuiVGhA",
  authDomain: "fiuber-grupo10.firebaseapp.com",
  projectId: "fiuber-grupo10",
  storageBucket: "fiuber-grupo10.appspot.com",
  messagingSenderId: "387389293972",
  appId: "1:387389293972:web:592d75bc6feff46965fb81",
  measurementId: "G-4VRCNS3V2J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async(navigation)=>{
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     navigation.navigate('App')
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
    
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const sendPasswordReset = async (email) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const logout = () => {
  signOut(auth);
};

const profileInfo = () => {
  return auth.currentUser.email
  
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// const registerDriverWithEmailAndPassword = async (name, email, password, licensePlate, carModel, role) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       roles: [role],
//       licensePlate,
//       carModel,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

// const registerPassengerWithEmailAndPassword = async (name, email, password, address, role) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       name,
//       roles: [role],
//       address,
//       authProvider: "local",
//       email,
//     });

//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const registerUserWithEmailAndPassword = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert("error1",err.message);
  }
};


export  {profileInfo, auth, app, db, logout, logInWithEmailAndPassword, registerUserWithEmailAndPassword};