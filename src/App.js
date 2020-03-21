import React from "react";
import Header from "./frame/Header"
import Footer from "./frame/Footer";
import {Route, BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./firebase/Auth";
import PrivateRoute from "./route/PrivateRoute";
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
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signin" component={SignIn}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/" component={Home} />
          </BrowserRouter>
        </AuthProvider>

        {/*app goes in here*/}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
