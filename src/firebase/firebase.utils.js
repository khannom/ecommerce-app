import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "xxxxxxxxxxxxxxxxxx",
    authDomain: "ecommerce-app-afa90.firebaseapp.com",
    databaseURL: "https://ecommerce-app-afa90.firebaseio.com",
    projectId: "ecommerce-app-afa90",
    storageBucket: "ecommerce-app-afa90.appspot.com",
    messagingSenderId: "516162988800",
    appId: "1:516162988800:web:1c2acd4cf75c493f66e1e5",
    measurementId: "G-G5XTW6ZWH5"
};

//userAuth es el objeto que nos devuelve firebase cuando logeamos, deslogeamos..
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    
    const snapShot = userRef.get();
    //esto esta asi porque sino snapShot.exists devuelve undefined y siempre entra al if
    if(!(await snapShot).exists ){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error al crear usuario')
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
