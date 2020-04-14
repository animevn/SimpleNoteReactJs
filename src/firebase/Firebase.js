import firebase from "firebase/app";
import firebaseKey from "./firebaseKey";
import "firebase/auth";
import "firebase/firestore";
firebase.initializeApp(firebaseKey.firebaseConfig);

export default firebase;