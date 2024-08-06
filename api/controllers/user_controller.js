import db from "../connection.js";


const getUser = async (req,res) => {
    const userId = req.params.userId;
    

    const q = "SELECT * FROM users WHERE id = ?";
    db.query(q,[userId], (error,data) => {
        if(error) return res.status(409).json(error);
        const {password,...userInfo} = data[0];
        return res.status(200).json(userInfo);
    })
}

const updateUser = async (req,res) => {

    const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `coverPic`=? , `profilePic`=? WHERE id=? ";

    db.query(q,[
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        req.currentUserId 
    ], (error,data) => {
        if(error) return res.status(409).json(error);
        if(data.affectedRows > 0) return res.status(200).json("updated");
        return res.status(403).json("You can update only your post");
    })
}


export default {
    getUser,
    updateUser
}