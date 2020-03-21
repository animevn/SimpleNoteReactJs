import React, {useContext} from "react";
import {AuthContext} from "./firebase/Auth";
import {Redirect} from "react-router-dom";

const Home = ()=>{
  const {currentUser} = useContext(AuthContext);

  if (!currentUser){
    return <Redirect to="/login"/>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-5 text-success">My Profile</h1>
      <h5 className="text-center mt-5 mb-5 text-success">
        {currentUser.uid}
      </h5>
    </div>
  );
};

export default Home;