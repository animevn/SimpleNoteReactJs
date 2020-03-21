import * as firebase from "firebase/app";
import firebaseKey from "./firebaseKey";
import "firebase/auth";

firebase.initializeApp(firebaseKey.firebaseConfig);
export default firebase;