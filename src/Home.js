import React, {useContext} from "react";
import {AuthContext} from "./firebase/Auth";
import {Redirect} from "react-router-dom";
import {FirestoreProvider} from "./firebase/Firestore";
import {ShareNoteProvider} from "./utils/ShareNote";
import Input from "./Input";

const Home = ()=>{
  const {currentUser} = useContext(AuthContext);

  if (!currentUser){
    return <Redirect to="/login"/>;
  }

  return (
    <div className="container">
      <FirestoreProvider>
        <ShareNoteProvider>
          <Input/>
        </ShareNoteProvider>
      </FirestoreProvider>
    </div>
  );
};

export default Home;