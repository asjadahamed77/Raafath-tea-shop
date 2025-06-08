import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { addCakesToCart } from "../controllers/adminCakeController.js";

const cartRouter = express.Router();

cartRouter.post("/add-cake", userAuth, addCakesToCart);

export default cartRouter;
