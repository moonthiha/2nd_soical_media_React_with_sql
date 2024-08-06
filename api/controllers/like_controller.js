import db from "../connection.js";

const getLike = async (req,res) => {
    const q = "SELECT userId from likes WHERE postId = ? ";
    db.query(q,[req.query.postId], (error,data) => {
        if(error) return res.status(409).json(error);
        res.status(200).json(data.map(like=>like.userId));
    })
}



const createLike = async (req,res) => {
    const q = "INSERT INTO likes (`userId`,`postId`) VALUE (?) ";
    const values = [
        req.body.userId,
        req.body.postId
    ]
    db.query(q, [values] ,(error,data) => {
        if(error) return res.status(409).json(error);
        res.status(200).json(data);
    })
}

const dropLike = async (req,res) => {
    const q = "DELETE FROM likes WHERE `userId`=? AND `postId`=? ";
    
    db.query(q,[req.currentUserId, req.query.postId],(error,data) => {
        if(error) return res.status(409).json(error);
        res.status(200).json("post has be dislike");
    })
}

export default {
    getLike,
    createLike,
    dropLike
}