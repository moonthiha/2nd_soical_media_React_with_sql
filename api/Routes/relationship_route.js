import express from "express";
import relationship_controller from "../controllers/relationship_controller.js";
import AuthUser from "../middleware/Auth_User.js";

const RelationshipRouter = express.Router();

RelationshipRouter.get("/", relationship_controller.getRelationship);
RelationshipRouter.post("/",AuthUser, relationship_controller.addRelationship);
RelationshipRouter.delete("/",AuthUser, relationship_controller.dropRelationship);



export default RelationshipRouter;