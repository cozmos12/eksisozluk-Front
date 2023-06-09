import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import UserActivity from "../userActivity/UserActivit";

function User(){
const {userId}=useParams();
return(

    <div>
        <Avatar/>
        <UserActivity/>

    


            <UserActivity userId={userId} />



    </div>
)
}

export default User;