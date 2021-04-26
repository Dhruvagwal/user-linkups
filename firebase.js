import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth"
import "firebase/database";
import "firebase/firestore";
// import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXvJ2mGXnmtQTQMuFU7ExCdoBsNspN2og",
  authDomain: "mainlinkupsadmin.firebaseapp.com",
  projectId: "mainlinkupsadmin",
  storageBucket: "mainlinkupsadmin.appspot.com",
  messagingSenderId: "502431858436",
  appId: "1:502431858436:web:aa29df6c4af40ac20a1a51",
  measurementId: "G-LYKN4YRPRQ"
};

firebase.initializeApp(firebaseConfig);


export default firebase