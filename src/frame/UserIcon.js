import React, {useContext} from "react";
import firebase from "../firebase/Firebase";
import {AuthContext} from "../firebase/Auth";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from "@material-ui/core/Divider";
const iconSize = {xs:45, sm:55, md:55, lg:60, xl:60};

function UserIcon() {

  const {currentUser} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onLogoutClick() {
    setAnchorEl(null);
    if (currentUser){
      firebase.auth().signOut().catch(err=>alert(err));
    }
  }

  function onDeleteUser() {
    setAnchorEl(null);
    if (currentUser){
      firebase.auth().currentUser.delete().catch(err=>alert(err));
    }
  }

  if (currentUser){
    return (
      <Box display="flex" flexDirection="row" justifyContent="center">

        <Box >
          <IconButton color="secondary" onClick={handleClick}>
            <Box fontSize={iconSize} display="flex" flexDirection="row" justifyContent="center">
              <AccountCircleIcon color="secondary" fontSize="inherit"/>
            </Box>
          </IconButton>
        </Box>

        <Box>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>{currentUser.email}</MenuItem>
            <Divider/>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={onDeleteUser}>Delete my account</MenuItem>
            <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    )
  }else {
    return <div></div>;
  }
}

export default UserIcon;