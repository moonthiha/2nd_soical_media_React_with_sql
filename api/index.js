import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import AuthRouter from "./Routes/auth_route.js";
import PostRoute from "./Routes/post_route.js";
import multer from "multer";
import CommentRouter from "./Routes/comment_route.js";
import LikeRouter from "./Routes/like_route.js";
import UserRouter from "./Routes/user_route.js";
import RelationshipRouter from "./Routes/relationship_route.js";


//config 
const app = express();
dotenv.config();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null , "../client/public/upload");
    },
    filename : function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({storage : storage});

app.post("/api/upload", upload.single("file"), (req,res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})


//routers
app.use("/api/auth", AuthRouter);
app.use("/api/post", PostRoute);
app.use("/api/comment", CommentRouter);
app.use("/api/like", LikeRouter);
app.use("/api/user", UserRouter);
app.use("/api/relationship", RelationshipRouter);


app.listen(process.env.PORT, console.log(`server is running at port ${process.env.PORT}`));