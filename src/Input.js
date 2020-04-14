import React, {useContext, useRef, useEffect} from "react";
import firebase from "./firebase/Firebase";
import {ShareNoteContext} from "./utils/ShareNote";
import {AuthContext} from "./firebase/Auth";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const width = {xs:11, sm:8, md:6, lg:5, xl:5};

function Input() {
  const boxRef = useRef();
  const {currentUser} = useContext(AuthContext);
  const ref = firebase.firestore().collection("notes").doc(currentUser.uid).collection("note");
  const initialNote = {title:"", content:"", id:"", isOpen:false};
  const {note, setNote} = useContext(ShareNoteContext);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = event => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setNote(old=>{
        return {...old, isOpen:false}
      });
    }
  };

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

  function closeInput() {
    const content = document.getElementById("content");
    const isFocused = (document.activeElement === content);
    if (!isFocused) setNote({...note, isOpen:false});
  }

  function closeContent() {
    const title = document.getElementById("title");
    const isFocused = (document.activeElement === title);
    if (!isFocused) setNote({...note, isOpen:false});
  }

  return (
    <Grid item {...width}>

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
           my={2} p={1} bgcolor="red" borderRadius={2} ref={boxRef}>
        <Box component="input" id="title" placeholder="Title" name="title" width={1}
             onChange={handleInput} value={note.title}
             type={note.isOpen ? "text" : "hidden"}/>

        <Box component="textarea" id="content" name="content" placeholder="Content" width={1}
             onClick={onTextAreaClick} value={note.content} rows={note.isOpen ? 3 : 1}
             onChange={handleInput}  mt={note.isOpen ? 2 : 0}/>

      </Box>

      <Box display="flex" flexDirection="row" justifyContent="flex-end" mt={-4} pr={2}>
        <Fab color="primary" aria-label="add" onClick={handleClick} size="small">
          <AddIcon color="secondary"/>
        </Fab>
      </Box>

    </Grid>
  );
}

export default Input;
