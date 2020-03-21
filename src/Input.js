import React, {useContext} from "react";
import firebase from "./firebase/Firebase";
import {ShareNoteContext} from "./utils/ShareNote";
import {AuthContext} from "./firebase/Auth";

function Input() {
  const {currentUser} = useContext(AuthContext);
  const ref = firebase.firestore().collection("notes").doc(currentUser.uid).collection("note");
  const initialNote = {title:"", content:"", id:"", isOpen:false};
  const {note, setNote} = useContext(ShareNoteContext);

  function handleInput(event) {
    let {name, value} = event.target;
    if (name === "title") {
      setNote({...note, title: value});
    }
    if (name === "content") {
      setNote({...note, content: value});
    }
  }

  function addNote() {
    const currentNote = {title:note.title, content:note.content};
    let time = firebase.firestore.FieldValue.serverTimestamp();

    //this part is CREATE
    if (note.id === ""){
      ref.add({...currentNote, created:time, edited:time}).then();
    }

    //this part is UPDATE
    else {
      ref.doc(note.id).update({...currentNote, edited:time}).then();
    }
    setNote(initialNote);
  }

  async function handleClick() {
    if (note.title || note.content){
      addNote();
    }
  }

  function onTextAreaClick() {
    setNote({...note, isOpen:true});
  }

  return (
    <div className="container col-xl-5 col-lg-6 col-md-8 col-sm-10 col-11 mx-auto pt-1">
      <div className="form-group bg-success p-2 rounded-lg shadow mb-0">
        <input  className="form-control mb-2" id="title" placeholder="Title" name="title"
                // this one will autofocus on when input form is called
                // ref={input => input && input.focus()}
                onChange={handleInput} value={note.title}
                type={note.isOpen ? "text" : "hidden"}/>
        <textarea className="form-control" id="content" rows={note.isOpen ? 3 : 1}
                  placeholder="Content" onClick={onTextAreaClick}
                  onChange={handleInput} name="content" value={note.content}>
        </textarea>
      </div>

      <div className="container text-right">
        <button className="btn button-add btn-success rounded-circle d-inline shadow"
                type="button" onClick={handleClick}>
          +
        </button>
      </div>

    </div>
  );
}

export default Input;
