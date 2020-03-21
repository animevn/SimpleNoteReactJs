import React, {useContext} from "react";
import Card from "./frame/Card";
import {FirestoreContext} from "./firebase/Firestore";

function Note() {
  const {notes, loading} = useContext(FirestoreContext);
  if (notes.length === 0){
    if (loading === null){
      return (
        <div className="container d-flex justify-content-center">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }else {
      return (
        <div></div>
      );
    }
  }else {
    return (
      <div className="row mx-auto">
        {notes.map((note, index)=>{
          return <Card key={index} id={note.id} title={note.title} content={note.content} />
        })}
      </div>
    )
  }
}

export default Note;
