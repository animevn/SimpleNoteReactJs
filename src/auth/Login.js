import React, {useContext} from "react";
import {withRouter, Redirect, useHistory} from "react-router-dom";
import firebase from "../firebase/Firebase";
import {AuthContext} from "../firebase/Auth";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockIcon from '@material-ui/icons/Lock';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const width = {xs:"90%", sm:"550px", md:"550px", lg:"550px", xl:"550px"};

const Login = ()=>{
  const {currentUser} = useContext(AuthContext);
  const history = useHistory();
  if (currentUser) return <Redirect to="/"/>;

  function onGoogleClick() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    firebase.auth().signInWithPopup(provider);
  }

  function onSignInClick() {
    history.push("/signin");
  }

  function onRegisterClick() {
    history.push("/register");
  }

  return (
    <Grid container direction="row" justify="center">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center"
           width={width}>

        <Box mt={10} fontSize={100}
             display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <LockIcon color="primary" fontSize="inherit"/>
        </Box>

        <Box mt={5} >
          <Typography component="div" variant="h3">
            <Box color="green" fontWeight="fontWeightBold">
              Enter Secret
            </Box>
          </Typography>
        </Box>

        <Box display="flex" flexDirection="row" justifyContent="space-between" mt={5} width={0.5}>
          <Box width={.45}>
            <Button fullWidth variant="outlined" color="secondary" size="large"
                    onClick={onRegisterClick}>
              Resgister
            </Button>
          </Box>

          <Box width={.45}>
            <Button fullWidth variant="outlined" color="secondary" size="large"
                    onClick={onSignInClick}>
              Sign In
            </Button>
          </Box>

        </Box>

        <Box width={0.5} mt={3}>
          <Button fullWidth variant="outlined" color="secondary" size="large"
                  onClick={onGoogleClick}>
            Google Login
          </Button>
        </Box>

      </Box>



    </Grid>
  );
};

export default withRouter(Login);