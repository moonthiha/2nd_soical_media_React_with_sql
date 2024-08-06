import "./share.scss";
import { useContext, useState } from "react";
import {AuthUser} from "../../contexts/AuthContext";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
export default function Share() {
    const {currentUser} =useContext(AuthUser);
    const [file,setFile] = useState();
    const [desc,SetDesc] = useState();

    const queryClinet = useQueryClient();

    const upload = async () => {
        try{

            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;

        }catch(error){
            console.log(error);
        }
    }
   
    const {data} = useQuery({
        queryKey : ['posts'], 
        queryFn : () => axios.get("/post/get").then(result => {
            return result.data;
        })
    });


    const mutation = useMutation({
        mutationFn: (newPost) => axios.post("/post/add", newPost).then(result => {
            
        }),
        onSuccess: () => {
          // Invalidate and refetch
          queryClinet.invalidateQueries({ queryKey: ['posts'] })
        },
      })
    

    const ShareSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = "";
        if(file) imageUrl = await upload();
        mutation.mutate({desc , image : imageUrl});
        setFile(null);
        SetDesc("");
    }

  return (
    <div className="share">
        <div className="card">
            <div className="userInfo">
                <img src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : "http://localhost:5173/images/default.jpg"} alt="" />
                <input type="text" value={desc} placeholder={`what's on your mind ${currentUser.name} ?`} onChange={e => SetDesc(e.target.value)}/>
            </div>

            <hr />

            {file && (
            <div className="shareImageContainer">
                <img className="shareImg" src={URL.createObjectURL(file)}  alt=""  />
                <CancelIcon className="shareCancleImg" onClick={()=>setFile(null)} /> 
            </div>
            )}
            
            <div className="option">
                <div className="addItem">
                    <label htmlFor="image">
                        <img src="./logo/8.png" alt=""  />
                        <span> Add image </span>
                    </label>
                    <input type="file" id="image"style={{display:"none"}} onChange={e => setFile(e.target.files[0])}/>
                </div>

                <div className="addItem">
                    <label htmlFor="place">
                        <img src="./logo/map.png" alt=""  />
                        <span> Add place </span>
                    </label>
                </div>

                <div className="addItem">
                    <label htmlFor="friend">
                        <img src="./logo/1.png" alt=""  />
                        <span>Tag Friends</span>
                    </label> 
                </div>

               <div className="btn">
                <button onClick={ShareSubmit} className="share">share</button>
               </div>
            </div>
        </div>
    </div>
  )
}
