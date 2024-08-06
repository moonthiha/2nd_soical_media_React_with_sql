import jwt from 'jsonwebtoken';


const AuthUser = async (req,res,next) => {

    const {loginToken} = req.cookies;
    if(!loginToken) return res.status(403).json({message : "Not Authorized User"});

    const key = process.env.JWT_KEY;
    jwt.verify(loginToken, key, async (error,userInfo) => {
        if(error) return res.status(403).json({message : "Token is invalid"});

        req.currentUserId = userInfo.id;
        next();
    });
}


export default AuthUser;