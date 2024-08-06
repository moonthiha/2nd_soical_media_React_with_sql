import { useContext } from "react";
import "./leftbar.scss";
import { AuthUser } from "../../contexts/AuthContext";
import {Link} from "react-router-dom";
export default function LeftBar() {

  const {currentUser} = useContext(AuthUser);

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">

          <Link to={`profile/${currentUser.id}`}>
            <div className="user">
              <img  src={currentUser.profilePic ? `../upload/${currentUser.profilePic}` : "http://localhost:5173/images/default.jpg"} alt="" />
              <span> {currentUser.name} </span>
            </div>
          </Link> 
          

          <div className="item">
            <img src="../logo/1.png" alt="" />
            <span>Friends</span>
          </div>

          <div className="item">
            <img src="../logo/2.png" alt="" />
            <span>Groups</span>
          </div>

          <div className="item">
            <img src="../logo/3.png" alt="" />
            <span>MarketPlace</span>
          </div>

          <div className="item">
            <img src="../logo/4.png" alt="" />
            <span>Watch</span>
          </div>

          <div className="item">
            <img src="../logo/5.png" alt="" />
            <span>Members</span>
          </div>

        </div>
      </div>

      <hr />

      <div className="container">
        <p>Your Shortcuts</p>
        <div className="menu">
        <div className="item">
            <img src="../logo/6.png" alt="" />
            <span>Events</span>
          </div>

          <div className="item">
            <img src="../logo/7.png" alt="" />
            <span>Gaming</span>
          </div>

          <div className="item">
            <img src="../logo/8.png" alt="" />
            <span>Gallery</span>
          </div>

          <div className="item">
            <img src="../logo/9.png" alt="" />
            <span>Videos</span>
          </div>

          <div className="item">
            <img src="../logo/10.png" alt="" />
            <span>Messages</span>
          </div>

        </div>
      </div>

      <hr />

      <div className="container">
         <p>Others</p>
        <div className="menu">

          <div className="item">
            <img src="../logo/11.png" alt="" />
            <span>Fundraiser</span>
          </div>

          <div className="item">
            <img src="../logo/12.png" alt="" />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src="../logo/13.png" alt="" />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  )
}
