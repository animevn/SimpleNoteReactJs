import React, {useContext} from "react";
import {ShareNoteContext} from "../utils/ShareNote";
import {AuthContext} from "../firebase/Auth";
import firebase from "../firebase/Firebase";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
const cardWidth = {xs:6, sm:6, md:4, lg:3, xl:2};

function Card(props) {
  const {title, content, id} = props;
  const {setNote, setEdit} = useContext(ShareNoteContext);
  const {currentUser} = useContext(AuthContext);

  function editNote() {
    setEdit(true);
    setNote({title:title, content:content, id:id, isOpen:true});
  }

  function deleteNote() {
    firebase.firestore().collection("notes")
    .doc(currentUser.uid).collection("note").doc(id).delete();
  }

  return (
    <Grid item {...cardWidth}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
           borderRadius={5} m={2} overflow="hidden" boxShadow={2}>

        <Box bgcolor="lightgray" width={1} p={1}
             display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography component="div" variant="h6">
            <Box p={0}>
              {title}
            </Box>
          </Typography>

          <IconButton size="small" onClick={deleteNote}>
            <ClearIcon />
          </IconButton>

        </Box>

        <Box width={1} p={1}>
          <Typography component="div" variant="h6">
            <Box p={0}>
              {content}
            </Box>
          </Typography>
        </Box>

        <Box width={1}>
          <Divider/>
        </Box>

        <Box my={1}>
          <Button variant="outlined" color="secondary" onClick={editNote}>
            Edit
          </Button>
        </Box>

      </Box>
    </Grid>
  );
}

export default Card;
