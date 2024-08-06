import "./profilePost.scss";
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Post from "../../Pages/Post/Post";
import { useContext, useState } from "react";
import { AuthUser } from "../../contexts/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Posts from "../Posts/Posts";
import Update from "../Update/Update";
export default function ProfilePost({user}) {

  const [update , setUpdata] = useState(false);

  const {currentUser} = useContext(AuthUser);

  const queryClinet = useQueryClient();

  const {isLoading,error,data} = useQuery({
    queryKey :['relationships'],
    queryFn : () => axios.get(`/relationship?followedUserId=${user.id}`).then(result => {
      return result.data;
    })
  });

  console.log(data);

  const mutation = useMutation({
    mutationFn : (follow) => {
      if(follow) return axios.delete(`/relationship?followedUserId=${user.id}`);
      return axios.post(`/relationship`, {followerUserId : currentUser.id,followedUserId : user.id});
    },
    onSuccess : () => {
      queryClinet.invalidateQueries({queryKey : ['relationships']});
    }
  })

  const followSubmit = async () => {
    mutation.mutate(data.includes(currentUser.id));
  }

  return (
    <div className="profilePost">
        
        <div className="images">
          <img src={user.coverPic ? `../upload/${user.coverPic}` : "http://localhost:5173/profile/cover.jpg"} className="cover" alt=""  />
          <img src={user.profilePic ? `../upload/${user.profilePic}` : "http://localhost:5173/images/default.jpg"} className="profilePic" alt="" />
        </div>

      <div className="profileContainer">
        <div className="userInfo">
          <div className="left">
            
              <FacebookTwoToneIcon fontSize="medium" />
            
              <InstagramIcon fontSize="medium" />
            
            
              <TwitterIcon fontSize="medium" />
            
            
              <LinkedInIcon fontSize="medium" />
            
            
              <PinterestIcon fontSize="medium" />
          
          </div>

          <div className="center">
             <span className="profileName"> {user.name} </span>
             <div className="info">

                <div className="item">
                <PlaceIcon fontSize="sm" />
                <span> {user.city} </span>
                </div>

                <div className="item">
                <LanguageIcon fontSize="sm" />
                <span> {user.website} </span>
                </div>
             </div>
              {user.id === currentUser.id ?  <button onClick={()=>setUpdata(true)} style={{cursor:"pointer"}}>Update</button> :  
              <button onClick={followSubmit}> {error? "wrong" : (isLoading ? "Loading" : data.includes(currentUser.id)) ? "Following" : "Follow" } </button>}
          </div>
          <div className="right">
            <MailOutlineIcon fontSize="medium" />
            <MoreVertIcon fontSize="medium" />
          </div>
        </div>
      </div>
      <Posts userId={user.id}/>
      {update && <Update  setOpenUpdata={setUpdata} user={user}/>}
    </div>
  )
}
