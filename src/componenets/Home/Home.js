import React, { useState, useEffect } from "react";
import Container from '@mui/material/Container';
import { Box, CssBaseline } from "@mui/material";
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";
import backgroundImage from "C:\\Users\\meki3\\OneDrive\\Belgeler\\javaspringbootprojeleri\\proje1\\quest-app\\src\\assets\\background-gfdc48b656_1280.jpg"

function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostList] = useState([]);

  const refreshPosts = () => {
    fetch("/post/findAllToDto")
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
    refreshPosts()
}, [])

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
            backgroundImage: `url(${backgroundImage})`, // Arka plan resmini ayarlayın
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
            <Box sx={{ mt: 5, mb: 20, marginLeft: 10 }}>
              {localStorage.getItem("currentUser")==null ?"":
              <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPost={refreshPosts} />
}

              {postList.map((postItem, index) => (
                <Box key={postItem.id} sx={{ width: "100%", mb: index !== postList.length - 1 ? 5 : 0 }}>
                  <Post Like={postItem.likeOfNumber} postId={postItem.id} userId={postItem.userId} userName={postItem.userName} title={postItem.title} text={postItem.text} sx={{ width: 100, borderRadius: 10 }} />
                </Box>
              ))}
            </Box>
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

export default Home;
