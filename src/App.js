import React from "react";
import Header from "./frame/Header"
import Footer from "./frame/Footer";
import {Route, BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./firebase/Auth";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./Home";
import SignIn from "./auth/SignIn";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  return (
    <div className="main">
      <div className="container-fluid px-0">
        {/*app goes in here*/}

        <AuthProvider>
          <BrowserRouter>
            <Header/>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/register" component={Register}/>
          </BrowserRouter>
        </AuthProvider>

        {/*app goes in here*/}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
