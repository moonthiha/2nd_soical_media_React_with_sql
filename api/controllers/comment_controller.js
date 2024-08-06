import db from "../connection.js";
import moment from "moment";

const getComment = async (req,res) => {
    
    const q = `SELECT c.*, u.id AS userId , username , profilePic FROM comments AS c JOIN users AS u ON (u.id=c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC `;
    db.query(q,[req.query.postId], (error,data) => {
        if(error) return res.status(409).json(error);
        res.status(200).json(data);
    })
}


const createComment = async (req,res) => {
    const q = "INSERT INTO comments (`desc`, `userId`, `postId`, `createdAt`) VALUE (?)";
    const values = [
        req.body.desc, 
        req.currentUserId, 
        req.query.postId,
        moment(Date.now()).format("YY-MM-DD HH-mm-ss"),
    ];

    db.query(q,[values], (error,data) => {
        if(error) return res.status(409).json(error);
        res.status(200).json(data);
    })


}

export default {
    getComment,
    createComment,
}