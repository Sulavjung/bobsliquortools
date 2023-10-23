/* // Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDQikb6TMjkbB7emDAAGdcv95Z1bAh44yQ",

  authDomain: "bobsliquor-53da1.firebaseapp.com",

  projectId: "bobsliquor-53da1",

  storageBucket: "bobsliquor-53da1.appspot.com",

  messagingSenderId: "695366232191",

  appId: "1:695366232191:web:9777703692a699d0bdf74a",

  measurementId: "G-BZ0GDE70C5"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});
export const googleProvider = new GoogleAuthProvider();

export const firestore = getFirestore();

const analytics = getAnalytics(app); */