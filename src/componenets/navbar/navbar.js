import React from "react";
import { Link, useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LockOpen from '@mui/icons-material/LockOpen';
const linkStyle = {
  textDecoration: "none",
  color: "white"
};

function Navbar() {
  let history=useNavigate()
  const onClick=()=>{
    localStorage.removeItem("tokeKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")


    history(0)

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{backdropFilter: "blur(10px)", // Blurred background effect
            backgroundColor: "rgba(255, 255, 255, 0.1)" ,borderRadius:4,boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="classes.link" to="/" style={linkStyle}>Home</Link>
          </Typography>
          
          <Button color="inherit">{localStorage.getItem("currentUser")==null ?
          <Link to={{ pathname: '/auth' }} style={linkStyle}>login/register</Link>:
          <div>
            <IconButton >
            <LockOpen onClick={onClick}>
 
            </LockOpen>
          </IconButton>
          <Link to={{ pathname: '/user/' + localStorage.getItem("currentUser") }} style={linkStyle}>profile</Link> 
          </div>}
        
          </Button>

          

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;