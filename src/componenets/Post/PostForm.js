import React, { useState } from "react";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';


import { Link } from "react-router-dom";
import { Alert, InputAdornment, OutlinedInput } from "@mui/material";


const linkStyle = {
  textDecoration: "none",
  color: "white"
};

function PostForm(props) {
  const { userName, userId, refreshPost } = props;
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const[isSend,setIsSent]=useState(false);
  const[is]=useState(false);

  const savePost = () => {
    console.log(userId);
    fetch("/post/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("tokenKey"),
      },
      body: JSON.stringify({
        title: title,
        userId: userId,
        text: text,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error"));
  };

  const handleTitle = (value) => {
    setTitle(value);
    setIsSent(false);

  };

  const handleText = (value) => {
    setText(value);
    setIsSent(false);
  };

  const handleSubmit = () => {
    console.log(localStorage.getItem("tokenKey"))
    console.log(localStorage.getItem("currentUser"))
    savePost();
    setIsSent(true);
    setTitle("");
    setText("");
    refreshPost();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSent(false);
  };

  return (
    <div className="postContainer">
      <div>
      {title}
      {text}
      {userName}
      <Snackbar open={isSend} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success post!
        </Alert>
      </Snackbar>

      <Card sx={{ width: 800, textAlign: "left",    backdropFilter: "blur(10px)", // Blurred background effect
            backgroundColor: "rgba(255, 255, 255, 0.2)" ,borderRadius:4,boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)" }}>
        <CardHeader
          avatar={
            <Link to={{ pathname: '/user/' + userId }} style={linkStyle}>
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName} 
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="Outlined-adornment-amount" 
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            />
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <OutlinedInput
              id="Outlined-adornment-amount"
              multiline
              placeholder="Text"
              inputProps={{ maxLength: 250 }}
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      style={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}
                      endIcon={<SendIcon />}
                      onClick={handleSubmit}
                    >
                      Send
                    </Button>
                  </Stack>
                </InputAdornment>
              }
            />
          </Typography>
        </CardContent>
      </Card>
    </div>
      </div>
    
  );
}

export default function RecipeReviewCard(props) {
  const { title, text, userName, userId,refreshPost } = props;

  return (
    <PostForm userId={userId} userName={userName.charAt(0).toUpperCase()}  title={title} text={text} refreshPost={refreshPost} />
  );
}
