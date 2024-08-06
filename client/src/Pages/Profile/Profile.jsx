import { useQuery } from "@tanstack/react-query";
import ProfilePost from "../../components/ProfilePost/ProfilePost";
import "./profile.scss";
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function Profile() {

  const userId = useLocation().pathname.split("/")[2];
  
  const {isLoading,error,data} = useQuery({
    queryKey : ['users'],
    queryFn : () => axios.get(`/user/find/${userId}`).then(result => {
      return result.data;
    })
  });

  console.log(data);

  return (
    <div className="profile">
      {error ? "something wrong" : (isLoading ? "Loading" : <ProfilePost user={data} key={data.id}/>)}
    </div>
  )
}
