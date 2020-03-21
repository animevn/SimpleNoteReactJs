import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import {AuthContext} from "../firebase/Auth";

//only render this route when user login, else redirect to home
const PrivateRoute = ({component:RouteComponent, ...rest})=>{
  const currentUser = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={
        routeProps=>!!currentUser ? (<RouteComponent {...routeProps}/>) : (<Redirect to={"/"}/>)
      }
    />
  );
};

export default PrivateRoute;