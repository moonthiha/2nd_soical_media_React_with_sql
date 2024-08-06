import { useContext, useState } from "react";
import "./update.scss";
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUser } from "../../contexts/AuthContext";

export default function Update({setOpenUpdata , user}) {

    const {updateUser} = useContext(AuthUser);

    const [profile , setProfile] = useState();
    const [cover,setCover] = useState();
    const [name,setName] = useState(user.name);
    const [city,setCity] = useState(user.city);
    const [website,setWebsite] = useState(user.website);

    const upload = async (file) => {

        try{
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;

        }catch(error){
            console.log(error);
        }
    };

   

    const queryClinet = useQueryClient();

    const mutation = useMutation({
        mutationFn : (users) => axios.put("/user/updateUser", users).then(result => {

        }),

        onSuccess : () => {
            queryClinet.invalidateQueries({queryKey:["users"]})
        },
    });

    const updateSubmit = async (e) => {
        e.preventDefault();
        let profileUrl;
        let coverUrl;

        profileUrl = profile ? await upload(profile) : user.profilePic;
        coverUrl = cover ? await upload(cover) : user.coverPic;

        mutation.mutate({profilePic : profileUrl , coverPic : coverUrl, name,city, website});
        setOpenUpdata(false);
        updateUser({profilePic : profileUrl, name , city, website , id : user.id});
    }


  return (
    <div className="update">
        <CancelIcon className="closeUpdate"onClick={()=>setOpenUpdata(false)}/>

        <form action="" className="group" >
            <div className="input_container">

            <div className="profile">
                <label htmlFor="image">
                    <img src={ `../upload/${user.profilePic}` || "http://localhost:5173/images/default.jpg" && URL.createObjectURL(profilePic)}/>
                    <span>Add Profile</span> 
                </label>
                <input type="file" id="image"style={{display:"none"}} onChange={e => setProfile(e.target.files[0])}/>
            </div>

            <div className="cover">
                <label htmlFor="cover">
                    <img src={`../upload/${user.coverPic}` || "http://localhost:5173/profile/cover.jpg"}  alt=""  />
                    <span>Add Cover</span>
                </label>
                <input type="file" id="cover"style={{display:"none"}} onChange={e => setCover(e.target.files[0])}/>
            </div>

            <input type="text" value={name} onChange={e=>setName(e.target.value)} />
            <input type="text" value={city} onChange={e=>setCity(e.target.value)} />
            <input type="text" value={website} onChange={e=>setWebsite(e.target.value)} />

            <button onClick={updateSubmit}>Update</button>
            </div>
        </form>
    </div>
  )
}
