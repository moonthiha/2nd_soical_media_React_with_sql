import { useContext, useState } from "react";
import "./login.scss";
import {Link, useNavigate} from'react-router-dom';
import axios from 'axios';
import { AuthUser } from "../../contexts/AuthContext";
export default function Login() {
    const {updateUser} = useContext(AuthUser);
    const [username,setUsername] = useState();
    const [password,setPassword] = useState();
    const [error,setError] = useState();
    const navigate = useNavigate();
    const loginSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/auth/login", {username,password});
            updateUser(res.data.result);
            navigate("/");
        }catch(error){
            setError(error.response.data.message);
        }
    }
  return (
    <div className="login">
        <div className="card">
            <div className="left">
                <h1>Welcome APP</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, labore harum in corrupti modi hic reprehenderit nihil laudantium voluptatem non reiciendis molestias architecto. Natus, non? Doloribus, ipsa. Maxime, velit qui!</p>
                <span>Don't you have ab account?</span>
                <Link to={"/register"}>
                    <button>Register</button>
                </Link>
                
            </div>
            <div className="right">
                <h1>Login</h1>
                {error && <span style={{color:"red"}}> {error} </span> }
                <form action="">
                    <input type="text" name="username" placeholder="username" onChange={e => setUsername(e.target.value)}/>
                    <input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                    <button onClick={loginSubmit}>Login</button>

                    <div className="loginButton google">
                        <img src="./logo/google.png" alt="" className="icon"/>
                        Google
                     </div>

                    <div className="loginButton facebook">
                        <img src="./logo/facebook.png"  alt="" className="icon"/>
                        facebook
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
