import React from "react";
import {withRouter, useHistory} from "react-router-dom";
import UserIcon from "./UserIcon";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Header() {
  const history = useHistory();
  const onTitleClick = (event)=>{
    event.preventDefault();
    history.push("/");
  };

  const padding = {xs:0, sm:1, md:1, lg:1, xl:1};
  const margin = {xs:3, sm:5, md:10, lg:15, xl:20};
  // const fontSize = {xs:"1.5rem", sm:"2rem", md:"2.5rem", lg:"3rem", xl:"3rem"};

  return (
    <Box bgcolor="primary.main" py={{...padding}} boxShadow={3}>
      <Box fontWeight="fontWeightBold" mx={{...margin}}
           display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Button onClick={onTitleClick}>
          <Typography component="div" variant="h3">
            <Box fontWeight={500}>Note Keeper</Box>
          </Typography>
        </Button>
        <UserIcon/>
      </Box>

    </Box>

  );
}

export default withRouter(Header);
