import React, {useContext} from "react";
import {withRouter, Redirect, useHistory} from "react-router-dom";
import firebase from "../firebase/Firebase";
import {AuthContext} from "../firebase/Auth";

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
    <div className="container">
      <img className="secret_image" src="images/key.svg" alt="key"/>
      <h1 className="text-center mb-5 text-success">Enter Secret</h1>
      <div className="row">
        <div className="btn-group group-button mx-auto col-xl-5 col-lg-6 col-md-8 col-sm-10 col-10">
          <button className="btn login-button btn-outline-success btn-lg" onClick={onRegisterClick}>
            Resgister
          </button>
          <button className="btn login-button btn-outline-success btn-lg" onClick={onSignInClick}>
            Sign In
          </button>
        </div>
      </div>
      <div className="row">
        <div className="mx-auto mt-3 col-xl-5 col-lg-6 col-md-8 col-sm-10 col-10">

          <button className="btn btn-outline-success btn-lg btn-block" onClick={onGoogleClick}>
            Google Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);