import React, { useState } from "react";
import {Link} from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { EditNote } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';

import { Button } from "@mui/material";




const useStyles = makeStyles((theme) => ({
    comment : {
    display: "flex",
    flexWrap: "wrap",
        justifyContent : "flex-start",
        alignItems : "center",
  },
  small: {
   
  },
  link: {
          textDecoration : "none",
          boxShadow : "none",
          color : "white"
      }
}));

function CommentForm(props) {
    const {postId, userId, userName} = props;
  const classes = useStyles();
  const [text,setText]=useState("");

  const saveComment= ()=>{

    fetch("comment/save",{
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("tokenKey"),
        },
        body: JSON.stringify({
            postId:postId,
            userId: userId,
            text: text,
          
          }),

        })
        .then((res) => res.json())
        .catch((err) => console.log("error"));
    
  }


  const handleSubmit=()=>{
           saveComment();
           console.log(text)
           console.log(postId)
           console.log(userId)
           setText("");
  }
  const handleChange=(value)=>{
    setText(value)
  }

    return(
        <CardContent className = {classes.comment}>

      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps = {{maxLength : 25}}
        fullWidth
        onChange={(i)=>handleChange(i.target.value)}
        startAdornment = {
          <InputAdornment position="start">
                <Link  className={classes.link} to={{pathname : '/users/' + userId}}>
              <Avatar aria-label="recipe" className={classes.small}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          </InputAdornment>
        }

        endAdornment={
            <InputAdornment position="end">
                    <Button
                      variant="contained"
                      style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}
                      endIcon={<SendIcon />}
                      onClick={handleSubmit}
                    >
                      Send
                    </Button>
            </InputAdornment>
        }
        value={text}
        style = {{ color : "black",backgroundColor: 'white'}}
      ></OutlinedInput>
    </CardContent>

    )
}


export default CommentForm;