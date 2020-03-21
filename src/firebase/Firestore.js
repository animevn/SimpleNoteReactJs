import React, {createContext, useEffect, useState} from "react";
import firebase from "./Firebase";

export const FirestoreContext = createContext(null);

export const FirestoreProvider = ({children}) =>{
  const [notes, setNotes] = useState([]);
  const db = firebase.firestore().collection("notes").orderBy("edited", "asc");

  useEffect(()=>{
    db.onSnapshot(snapshot => {
      setNotes([]);
      snapshot.forEach(doc=> setNotes(old=>[{...doc.data(), id: doc.id}, ...old]));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <FirestoreContext.Provider value={{notes}}>{children}</FirestoreContext.Provider>
  );
};