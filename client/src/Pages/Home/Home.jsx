import Posts from "../../components/Posts/Posts";
import Share from "../../components/share/Share";
import Stories from "../../components/Stories/Stories";
import Profile from "../Profile/Profile";
import "./home.scss";

export default function Home() {
  return (
   <div className="home">
      <Stories />
      <Share />
      <Posts />
   </div>
  )
}
