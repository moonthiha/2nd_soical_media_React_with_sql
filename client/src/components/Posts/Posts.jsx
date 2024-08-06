
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Post from "../../Pages/Post/Post";
import { useContext } from "react";
import { AuthUser } from "../../contexts/AuthContext";
export default function Posts({userId}) {

    const {currentUser} = useContext(AuthUser);



    const {isLoading, error,data} = useQuery({
    queryKey : ['posts'],
    queryFn : () => {
        if(userId!==undefined) return axios.get(`/post/get?userId=${userId}` ).then(result => {
                return result.data;
        });
        return axios.get("/post/get").then(result => {
            return result.data;
        })
    }
   });

   console.log(data);
   
  return (
   <div className="posts">
        {error ? "something wrong" : (isLoading ? "Loading" : data.map((post) => 
            <Post post={post} key={post.id}/>
        ))}
   </div> 
  )
}


 
