import React, {useContext} from "react";
import Card from "./frame/Card";
import {FirestoreContext} from "./firebase/Firestore";

function Note() {
  const {notes} = useContext(FirestoreContext);

  return (
    <div className="row mx-auto">
      {notes.map((note, index)=>{
        return <Card key={index} id={note.id} title={note.title} content={note.content} />
      })}
    </div>
  )
}

export default Note;
