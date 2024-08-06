import db from "../connection.js";

const getRelationship = async (req,res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?"
    db.query(q,[req.query.followedUserId], (error,data) => {
        if(error) return res.status(409).json(error);
        res.status(200).json(data.map(relationship => relationship.followerUserId));
    })
}

const addRelationship = async (req,res) => {
    const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUE (?) ";
    const values = [
        req.body.followerUserId,
        req.body.followedUserId,
    ]
    db.query(q,[values], (error,data) => {
        if(error) return res.status(409).json(error);
        res.status(200).json(data);
    })
}

const dropRelationship = async (req,res) => {
    const q= "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ? ";

    db.query(q,[req.currentUserId, req.query.followedUserId], (error,data) =>{
        if(error) return res.status(409).json(error);
        res.status(200).json(data);
    })
}

export default {
    getRelationship,
    addRelationship,
    dropRelationship
}