import "./navbar.scss";
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import ScreenSearchDesktopOutlinedIcon from '@mui/icons-material/ScreenSearchDesktopOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import EditNotificationsOutlinedIcon from '@mui/icons-material/EditNotificationsOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link } from "@mui/material";
import { useContext } from "react";
import { DarkContext } from "../../contexts/themeContext";
import { AuthUser } from "../../contexts/AuthContext";


export default function NavBar() {

  const {currentUser} = useContext(AuthUser);

  const {toogle,darkMode} = useContext(DarkContext);

  return (
    <div className="navbar">
      <div className="left">

        <Link style={{textDecoration:"none"}}>
          <span>MutineerSoical</span>
        </Link>

          <AddHomeOutlinedIcon />
         {darkMode ? <WbSunnyOutlinedIcon onClick={toogle} /> : <DarkModeOutlinedIcon  onClick={toogle} /> }
          <AppRegistrationOutlinedIcon />

        <div className="search">
          <ScreenSearchDesktopOutlinedIcon />
          <input type="text" placeholder="search...."/>
        </div>

      </div>

      <div className="right">

        <PersonOutlinedIcon />
        <MarkEmailUnreadOutlinedIcon />
        <EditNotificationsOutlinedIcon />

        <div className="user">
          <img src={currentUser.profilePic ? `../upload/${currentUser.profilePic}` : "http://localhost:5173/images/default.jpg"} alt="" />
          <p> {currentUser.username} </p>
        </div>
      </div>
    </div>
  )
}
