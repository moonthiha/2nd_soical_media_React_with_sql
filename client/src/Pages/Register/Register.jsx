import { useState } from "react";
import "./register.scss";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
export default function Register() {

    const [username,setUsername] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [name,setName] = useState();

    const [error,setError] = useState();
    const navigate = useNavigate();

    const registerSubmit = async (e) => {
        e.preventDefault();
        try{

            const res = await axios.post("/auth/register", {username,email,password,name});
            navigate("/login");

        }catch(error){
            setError(error.response.data.message);
        }
    }

  return (
    <div className="register">
        <div className="card">
            <div className="left">
                <h1>Register</h1>
                <form action="">
                    <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" name="username"/>
                    <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" name="email"/>
                    <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" name="password"/>
                    <input type="text" onChange={e => setName(e.target.value)} placeholder="Name" name="name"/>
                    <button onClick={registerSubmit}>Register</button>
                </form>
                {error && <span style={{color:"red"}}> {error} </span> }
            </div>
            <div className="right">
                <h1>Mutineer Soical</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto voluptatem modi exercitationem quo natus molestiae voluptatum saepe nulla. Ipsa quo ut ab enim commodi iure, nobis odio voluptate adipisci itaque.</p>
                <span>Do you have an account?</span>
                <Link to={"/login"}>
                    <button>Login</button>
                </Link>


            </div>
          
        </div>
    </div>
  )
}
