import { Button, FormControl, Input, InputLabel, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

import backgroundImage from "C:\\Users\\meki3\\OneDrive\\Belgeler\\javaspringbootprojeleri\\proje1\\quest-app\\src\\assets\\background-gfdc48b656_1280.jpg"








function Auth() {
  const[userName,setuserName]=useState("");
const[password,setpassword]=useState("");
let Navigate=useNavigate()

const handleUserName=(value)=>{
  setuserName(value);
}
const handlepassword=(value)=>{
  setpassword(value);
}

const handleRegister=()=>{
  sendRequest("register")
  setuserName("")
  setpassword("")
  console.log(localStorage.getItem("tokenKey"))
  console.log(userName)
  Navigate("/")
}


const handleLogin=()=>{
  console.log("Login")
  sendRequest("login")
  setuserName("")
  setpassword("")
  console.log(localStorage.getItem("tokenKey"))
  console.log(localStorage.getItem("currentUser"))

  Navigate("/")

}

const sendRequest = (path) => {
  fetch("/auth/"+path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({
      userName: userName,
      password: password,
    
    }),
  })
    .then((res) => res.json())
    .then((result)=>{localStorage.setItem("tokenKey",result.message);
                   localStorage.setItem("currentUser",result.id);
                   localStorage.setItem("userName",userName)})
    
    .catch((err) => console.log("error"));
};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <FormControl style={{ backgroundColor: "transparent", padding: "20px", width: "300px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", position: "relative", top: "-50px" }}>
        <InputLabel style={{ top: 25, left: 10 }}>Username</InputLabel>
        <Input onChange={(i)=> handleUserName(i.target.value)}/>
        <InputLabel style={{ top: 75, left: 10 }}>Password</InputLabel>
        <Input  onChange={(i)=> handlepassword(i.target.value)}/>
       
        <Button
          variant="contained"
          style={{ marginTop: "20px", background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <FormHelperText style={{ marginTop: "20px" }}>Are you already registered?</FormHelperText>
        <Button
          variant="contained"
          style={{ marginTop: "10px", background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}
          onClick={handleLogin}

        >
          Login
        </Button>
      </FormControl>
    </div>
  );
}

export default Auth;
