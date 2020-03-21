import React from "react";
import Header from "./frame/Header"
import Footer from "./frame/Footer";
import {Route, BrowserRouter} from "react-router-dom";
import Home from "./auth/Home";
import {AuthProvider} from "./firebase/Auth";
import PrivateRoute from "./route/PrivateRoute";
import Profile from "./auth/Profile";
import SignIn from "./auth/SignIn";
import Register from "./auth/Register";

function App() {
  return (
    <div className="main">
      <div className="container-fluid px-0">
        <Header/>
        {/*app goes in here*/}

        <AuthProvider>
          <BrowserRouter>
            <Route exact path="/" component={Home}/>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/profile" component={Profile} />
          </BrowserRouter>
        </AuthProvider>

        {/*app goes in here*/}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
