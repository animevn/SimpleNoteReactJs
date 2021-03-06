import React, {useContext} from "react";
import Card from "./frame/Card";
import {FirestoreContext} from "./firebase/Firestore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

function Note() {
  const {notes, loading} = useContext(FirestoreContext);
  if (notes.length === 0){
    if (loading === null){
      return (
        <Grid container direction="row" justify="center" alignItems="center">
          <CircularProgress/>
          <CircularProgress color="secondary"/>
          <CircularProgress color="primary"/>
        </Grid>
      )
    }else {
      return (
        <div></div>
      );
    }
  }else {
    return (
      <Grid container direction="row" justify="center" alignContent="flex-start" >
        {notes.map((note, index)=>{
          return <Card key={index} id={note.id} title={note.title} content={note.content} />
        })}
      </Grid>
    )
  }
}

export default Note;
