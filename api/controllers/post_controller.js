import db from "../connection.js";
import moment from "moment/moment.js";

const addPost = async (req,res) => {
    
    const q = "INSERT INTO posts (`desc`, `image`, `userId`, `createAt` ) VALUE (?) "

    const values = [
        req.body.desc, 
        req.body.image, 
        req.currentUserId,
        moment(Date.now()).format("YY-MM-DD HH:mm:ss"),
    ];

    db.query(q,[values], (error,data) => {
        if(error) return res.status(500).json(error);
        res.status(200).json(data[0]);
    })
}

const getPost = async (req,res) => {


    const userId = req.query.userId;

    
    const q = userId !== undefined  ? `SELECT p.*, u.id AS userId, username, profilePic, name FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userid = ? ORDER BY p.createAt DESC` 
                     :`SELECT p.*, u.id AS userId, username , profilePic,name FROM posts AS p JOIN users AS u ON (u.id = p.userId)
                       LEFT JOIN relationships AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createAt DESC`;
   
    const values = userId !== undefined  ? [userId] : [req.currentUserId,req.currentUserId];

    db.query(q, values ,(error,data) => {
        if(error) return res.status(500).json(error);
        res.status(200).json(data);
    })
}

const dropPost = async (req,res) => {
    const q = "DELETE FROM posts WHERE id=? AND userId=?";
    db.query(q,[req.params.id,req.currentUserId],(error,data) => {
        if(error) return res.status(500).json(error);
        return res.status(200).json("post have been deleted");
    })
}

export default {
    addPost,
    getPost,
    dropPost
}


