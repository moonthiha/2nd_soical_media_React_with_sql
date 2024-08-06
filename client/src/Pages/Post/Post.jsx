import "./post.scss";
import Comment from "../../components/Comments/Comment";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import moment from 'moment';
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthUser } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function Post({post}) {
    
    const [openComment , setOpenComment] = useState(false);

    const {currentUser} = useContext(AuthUser);

    const queryClient = useQueryClient();

    const [deleteBtn,setDeleteBtn] = useState(false);
    

    const {isLoading,error,data} = useQuery({
        queryKey : ['likes', post.id],
        queryFn : () => axios.get(`/like?postId=${post.id}`).then(result => {
            return result.data;
        })
    });

   
    

    const mutation = useMutation({
        mutationFn : (like) => {
            if(like) return axios.delete(`/like?postId=${post.id}`);
            return axios.post(`/like`, {postId : post.id, userId : currentUser.id} )
        },

        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["likes"]});
        }
    });

    const likeSubmit = async (e) => {
        e.preventDefault();
        mutation.mutate(data.includes(currentUser.id));
    };



    const deleteMutation = useMutation({
        mutationFn : (postId) => {
            return axios.delete(`/post/delete/${postId}`)
        },

        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['posts']});
        }
        
    });

    const deleteSubmit = async (e) => {
        e.preventDefault();
        deleteMutation.mutate(post.id);
        // await axios.get("/post/get");
    }



  return (
    <div className="post">
             <div key={post.id} className="container">
             <div className="user">
                <Link to={`/profile/${post.userId}`}>
                <div className="userInfo" style={{cursor:"pointer"}}>
                     <img src={post.profilePic ? `../upload/${post.profilePic}` : "http://localhost:5173/images/default.jpg"} alt="" />
                     <div className="detail">
                         <span> {post.name} </span>
                         <span className="date"> {moment(post.createAt).fromNow()} </span>
                     </div>
                  </div>
                </Link>
                 
                 <div className="menu_group">
                 <MoreHorizOutlinedIcon className="menu" onClick={()=>setDeleteBtn(!deleteBtn)} style={{cursor:"pointer"}} />
                 {deleteBtn && <DeleteForeverIcon onClick={deleteSubmit}  className="delete" /> }
                 </div>
                 
                 

             </div>

             <div className="content">
                 <p> {post.desc} </p>
                 <img src={`../upload/${post.image}`} onClick={()=>setDeleteBtn(false)}  alt="" />
             </div>
 
             <div className="info">
             
                 <div className="text">
                    {error ? "something wrong" : (isLoading ? "Loading" : data.includes(currentUser.id) ? <FavoriteIcon  style={{color:"red"}} onClick={likeSubmit} /> : <FavoriteBorderOutlinedIcon onClick={likeSubmit} />)}
                    <span> {error ? "error" : (isLoading ? "Loading" : data.length )} Likes </span>
                 </div>
 
                 <div className="message">
                     <TextsmsOutlinedIcon onClick={()=>setOpenComment(!openComment)} />
                     <span>comments</span>
                 </div>
                 
                 <div className="share">
                     <ShareOutlinedIcon />
                     <span>Share</span>
                 </div>
             </div>
             {openComment && <Comment  postId={post.id} /> }
         </div>

    </div>
  )
}
