// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore'; // Include Firestore module

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASJvnkHpf8FEV8k_MeIr9hM2ZbHVxCeAg",
  authDomain: "multi-game-mobile.firebaseapp.com",
  projectId: "multi-game-mobile",
  storageBucket: "multi-game-mobile.appspot.com",
  messagingSenderId: "615468934709",
  appId: "1:615468934709:web:9b3c3dc50d51621867737c"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) { 
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const firestore = firebase.firestore(); // Make sure to include this line


export { auth,firestore };