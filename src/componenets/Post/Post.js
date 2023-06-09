import React, { useEffect, useState, useRef, useCallback } from "react";
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import { Container, setRef } from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "C:\\Users\\meki3\\OneDrive\\Belgeler\\javaspringbootprojeleri\\proje1\\quest-app\\src\\componenets\\Comment\\CommentForm.js";



const linkStyle = {
  textDecoration: "none",
  color: "white"
};

const useStyles = styled((theme) => ({
  root: {
    width: 2000,
    textAlign : "left",
    margin : 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  },
  link: {
      textDecoration : "none",
      boxShadow : "none",
      color : "white"
  }
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(90deg)',
  marginLeft: 'auto',
 
}));

function Post(props) {
  const [expanded, setExpanded] = useState(false);
  const { title, text, userName, userId, postId,Like } = props;
  const [commentList, setCommentList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const isInitialMount = useRef(true);
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [postList, setPostList] = useState([]);
  let dissable=localStorage.getItem("currentUser")==null ? true:false;

  const handleExpandClick = () => {
    setExpanded(!expanded);
    refreshComment();
    console.log(commentList);
  };

  const handleLike = () => {

    setLiked(!liked);
    console.log(Like)
    
  };

  const refreshComment = useCallback(() => {
    fetch("/comment/findAll?postId=" + postId)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommentList(result);
        },
        (error) => {
          setIsLoaded(true);
          console.log(error);
          setError(error)
        }
      );

      setRef(false)
  }, [postId, setIsLoaded, setCommentList, setError]);

  
  


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      refreshComment();
    }
  }, [commentList, refreshComment]);

  return (

   
    <div className="postContainer"style={{background:"transparent",borderRadius:10}} >
      {title}
      {text}
      {userName}

      <Card sx={{ borderRadius:4,background:"transparent", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.9)", // Gölgelendirme efekti
 width: 800, textAlign: "left"  ,  backdropFilter: "blur(10px)", // Blurred background effect
 backgroundColor: "rgba(255, 255, 255, 0.5)" // Transparent background with opacity

 }}>
        <CardHeader
          avatar={
            <Link to={{ pathname: '/user/' + userId }} style={linkStyle}>
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {userName}
              </Avatar>
            </Link>
          }
          title={title}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            onClick={handleLike}
            aria-label="add to favorites"
          >
            <FavoriteIcon style={liked ? { color: "red" } : null} />

            
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Container  fixed className={classes.container} >
            {error ? "error" :
              isLoaded ? commentList.map(comment => (
                <Comment userId={localStorage.getItem("currentUser")} userName={"Meki"} text={comment.text}></Comment>
              )) : "Loading"}
              {localStorage.getItem("currentUser")==null ?"": <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId}>

               </CommentForm>}

             
          </Container>
        </Collapse>
      </Card>
    </div>
  );
}

export default function RecipeReviewCard(props) {
  const { title, text, userName, userId,postId,Like } = props;

  return (
    <Post Like={Like} postId={postId} userId={userId} userName={userName.charAt(0).toUpperCase()} title={title} text={text} />
  );
}
