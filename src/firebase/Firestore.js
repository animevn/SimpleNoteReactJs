import React, {createContext, useEffect, useState} from "react";
import firebase from "./Firebase";

export const FirestoreContext = createContext(null);

export const FirestoreProvider = ({children}) =>{
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      const db = firebase.firestore().collection("notes").doc(user.uid).collection("note");
      db.onSnapshot(snapshot => {
        setNotes([]);
        snapshot.forEach(doc=> setNotes(old=>[{...doc.data(), id: doc.id}, ...old]));
      });
    });
  }, []);

  return (
    <FirestoreContext.Provider value={{notes}}>
      {children}
    </FirestoreContext.Provider>
  );
};