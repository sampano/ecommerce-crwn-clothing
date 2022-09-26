import { initializeApp } from "firebase/app"; // initializeApp creates an app instances base of a config object that allows to attach the firebase app instace that we have online
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // components for authenticaton

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; //components for firestore DB
//doc components allows us to retrieve from db
//access data getdoc set data setdoc

const firebaseConfig = {
  apiKey: "AIzaSyA6-rULfu-Wf0i7RcMWPncSa_NLO3irfok",
  authDomain: "crwn-clothing-db-818f9.firebaseapp.com",
  projectId: "crwn-clothing-db-818f9",
  storageBucket: "crwn-clothing-db-818f9.appspot.com",
  messagingSenderId: "355837926581",
  appId: "1:355837926581:web:ed122825556d3d282db2fc",
}; // this is config tells that this is the specific crwn-clothing db instance

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//initialize provider in order to use the google authentication
const googleProvider = new GoogleAuthProvider();
// GoggleAuthProvider declared with new keyword because its a class that we get from firebase authentication

//everytime somebody interact with our provider we want to force them to select an account
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//this function will get the date from authentication and will store the data to firestore db
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //checking if there's an existing document reference
  const userDocRef = doc(db, "user", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef); // it will get data from userDocRef to prepare to set it on the DB

  //checking if user does exist in db
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth; //destructure from userAuth parameter
    const createdAt = new Date(); //time and date when the user has been checked

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user");
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return; // if there is no email and password dont run

  return await createUserWithEmailAndPassword(auth, email, password);
};
