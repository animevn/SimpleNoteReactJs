import React from "react";
import {withRouter, useHistory} from "react-router-dom";
import UserIcon from "./UserIcon";

function Footer() {
  const history = useHistory();
  const onTitleClick = (event)=>{
    event.preventDefault();
    history.push("/");
  };

  return (
    <div className="container-fluid bg-success shadow">
      <div className="row container mx-auto py-4">
        <button className="heading-title btn text-white" onClick={onTitleClick}>
          Simple Notes
        </button>
        <UserIcon/>
      </div>
    </div>
  );
}

export default withRouter(Footer);
