import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyBsRRsuD1CZY44Tiup_iuSpcVtRq8SC-iE",
    authDomain: "ecommerce-app-afa90.firebaseapp.com",
    databaseURL: "https://ecommerce-app-afa90.firebaseio.com",
    projectId: "ecommerce-app-afa90",
    storageBucket: "ecommerce-app-afa90.appspot.com",
    messagingSenderId: "516162988800",
    appId: "1:516162988800:web:1c2acd4cf75c493f66e1e5",
    measurementId: "G-G5XTW6ZWH5"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;