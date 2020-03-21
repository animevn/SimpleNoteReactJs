import React, {useContext} from "react";
import firebase from "../firebase/Firebase";
import {AuthContext} from "../firebase/Auth";

function UserIcon() {

  const {currentUser} = useContext(AuthContext);

  function onLogoutClick() {
    if (currentUser){
      firebase.auth().signOut().catch(err=>alert(err));
    }
  }

  function onDeleteUser() {
    if (currentUser){
      firebase.auth().currentUser.delete().catch(err=>alert(err));
    }
  }

  if (currentUser){
    return (
      <div className="dropdown ml-auto text-white">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="navbar-brand brand-image dropdown-toggle" id="dropdownMenuLink"
           data-toggle="dropdown">
          <img className="dropdown-toggle profile-image"
               src="/images/user-circle.svg" alt="user-login" />
        </a>
        <div className="dropdown-menu dropdown-menu-right bg-success">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="dropdown-item text-white">{currentUser.email}</a>
          <button className="dropdown-item text-white"
                  onClick={onDeleteUser}>
            Delete Account
          </button>
          <div className="dropdown-divider"></div>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="dropdown-item text-white" href="#">Profile</a>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="dropdown-item text-white" href="#">Your posts</a>

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="dropdown-item text-white" href="#">Recycle Bin</a>
          <div className="dropdown-divider"></div>

          <button className="dropdown-item text-white" onClick={onLogoutClick}>Logout</button>
        </div>
      </div>
    )
  }else {
    return <div></div>;
  }
}

export default UserIcon;