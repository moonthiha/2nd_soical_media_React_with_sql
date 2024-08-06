import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./comment.scss";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthUser } from "../../contexts/AuthContext";
import moment from "moment";

export default function Comment({postId}) {

    
    const {currentUser} = useContext(AuthUser);
    const [desc,setDesc] = useState();
    const queryClient = useQueryClient();

    const {isLoading,error,data} = useQuery({
        queryKey : ['comments'],
        queryFn : async () => await axios.get(`/comment?postId=`+postId).then(result =>{
            return result.data;
        })
    });

   console.log(data);

    const mutation = useMutation({
        mutationFn : (newComment) => axios.post(`/comment?postId=${postId}`, newComment).then(result => {
            
        }),

        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ['comments']})
        }
    });

    const submitComment = async (e) => {
        e.preventDefault();
        mutation.mutate({desc});
        setDesc("");
    }


  return (
    <div className="comments">
           {error ? "something wrong" : (isLoading ? "iLoading" : data.map((comment) => (
                <div key={comment.id} className="comment">
                <img src={comment.profilePic ? `../upload/${comment.profilePic}` : "http://localhost:5173/images/default.jpg"} alt="" />

                <div className="info">
                    <span className="username"> {comment.name} </span>
                    <p className="desc"> {comment.desc} </p>
                </div>

                <span className="time"> {moment(comment.createdAt).fromNow()} </span>
                </div>
            )))}

        <div className="write">
            <img src={currentUser.profilePic ? `../upload/${currentUser.profilePic}` : "http://localhost:5173/images/default.jpg"} alt="" />
            <div className="input">
                <input value={desc} type="text" placeholder="write comment" onChange={e => setDesc(e.target.value)} />
                <button onClick={submitComment}>Send</button>
            </div>
        </div>
    </div>
  )
}
