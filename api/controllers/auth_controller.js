import db from "../connection.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req,res) => {
    //check user exist from users 
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username], (error,data) => {
        if(error) return res.status(500).json({message : error});
        if(data.length) return res.status(404).json({message : "User is already exist"});

    //hashpassword;
    const salt = bcryptjs.genSaltSync(10);
    const hashpass = bcryptjs.hashSync(req.body.password,salt);
    

    const q = "INSERT INTO users ( `username`, `email`, `password`, `name` ) VALUE (?) "

    const values = [req.body.username, req.body.email, hashpass, req.body.name];

    db.query(q,[values], (error,data) => {
        if(error) return res.status(500).json(error);
        res.status(200).json({message:"Register_success"});
    });
       
    

    });

    
}


const login = async (req,res) => {
    //finduser
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username], (error,data) => {
        if(error) return res.status(500).json({message : error});
        if(data.length === 0) return res.status(404).json({message : "user not found"});


        const checkPass = bcryptjs.compareSync(req.body.password,data[0].password);
        if(!checkPass) return res.status(404).json({message : "wrong password"});

        const key = process.env.JWT_KEY;
        const age = 1000*60*60*24;
        const assesToken = jwt.sign({id: data[0].id},key,{expiresIn : age});
        const {password,...others} = data[0];
        res.cookie('loginToken', assesToken ,{httpOnly:true , maxAge : age});
        res.status(200).json({message : "login success", result : others});
    })
}

const logout = async (req,res) => {
    res.clearCookie('loginToken', {
        secure:true,
        sameSite : "none"
    }).status(200).json({message : "logout_success"});
}


export default {
    register,
    login,
    logout
}