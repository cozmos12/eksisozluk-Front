
import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Box, CssBaseline } from "@mui/material";
import PostUser from "../Post/PostUser";

import backgroundImage from "C:\\Users\\meki3\\OneDrive\\Belgeler\\javaspringbootprojeleri\\proje1\\quest-app\\src\\assets\\background-gfdc48b656_1280.jpg"

function UserActivity(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const {  userId } = props;

  const [postList, setPostList] = useState([]);

  const refreshUser = () => {
    fetch("/post/findAllToDto?userId=" + userId)
    .then(res => res.json())
    .then(
        (result) => {
            setIsLoaded(true);
            setPostList(result)
        },
        (error) => {
            console.log(error)
            setIsLoaded(true);
            setError(error);
        }
    )
}

useEffect(() => {
    refreshUser()
}, [postList])

  if (error) {
    return <div>Error!!!</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <CssBaseline />
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: 1100,
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.9)",
            borderRadius: 10,
            marginRight: 200,
            marginTop: 15,
            backdropFilter: "blur(10px)", // Blurred background effect
            backgroundColor: "rgba(255, 255, 255, 0.1)" ,padding: 10,
            overflow: "hidden", 
          }}
        >
          <Container
            sx={{
              width: "100%",
              maxWidth: 600,
              overflowY: "auto",
              maxHeight: "calc(100vh - 100px)",
            }}
          >

              {postList.map((postItem, index) => (
                <Box key={postItem.id} sx={{ width: "100%", mb: index !== postList.length - 1 ? 5 : 0 }}>
                  <PostUser Like={postItem.likeOfNumber} postId={postItem.id} userId={postItem.userId} userName={postItem.userName} title={postItem.title} text={postItem.text} sx={{ width: 100, borderRadius: 10 }} />
                </Box>
              ))}
           
          </Container>
          <Box
            sx={{
          
              borderRadius: 20,
              boxShadow: "0px 0px 20px 10px rgba(0, 0, 255, 0.5)",
              zIndex: -2,
              overflow: "hidden",
            }}
          />
        </Box>
  
      </React.Fragment>
    );
  }
}

export default UserActivity;
