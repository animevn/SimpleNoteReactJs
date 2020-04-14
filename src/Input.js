import React, {useContext} from "react";
import firebase from "./firebase/Firebase";
import {ShareNoteContext} from "./utils/ShareNote";
import {AuthContext} from "./firebase/Auth";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const width = {xs:11, sm:8, md:6, lg:5, xl:5};

function Input() {
  const {currentUser} = useContext(AuthContext);
  const ref = firebase.firestore().collection("notes").doc(currentUser.uid).collection("note");
  const initialNote = {title:"", content:"", id:"", isOpen:false};
  const {note, setNote, edit, setEdit} = useContext(ShareNoteContext);

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

  function handleClickAway(){
    if (!edit){
      setNote(old=>{
        return {...old, isOpen:false}
      });
    }else {
      setEdit(false);
    }
  }

  return (
    <Grid item {...width}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
               my={2} p={1} bgcolor="primary.main" borderRadius={3} boxShadow={3}>

            <Box component="input" id="title" placeholder="Title" name="title" width={1}
                 onChange={handleInput} value={note.title} fontSize={16} p={0.5}
                 type={note.isOpen ? "text" : "hidden"} borderRadius={2} borderColor="transparent"
            />

            <Box component="textarea" id="content" name="content" placeholder="Content" width={1}
                 onClick={onTextAreaClick} value={note.content} rows={note.isOpen ? 3 : 1}
                 onChange={handleInput}  mt={note.isOpen ? 2 : 0} fontSize={16} p={0.5}
                 borderRadius={2} borderColor="transparent"/>

          </Box>

          <Box display="flex" flexDirection="row" justifyContent="flex-end" mt={-4} pr={2}>
            <Fab color="primary" aria-label="add" onClick={handleClick} size="small">
              <AddIcon color="secondary"/>
            </Fab>
          </Box>
        </Box>
      </ClickAwayListener>
    </Grid>
  );
}

export default Input;
