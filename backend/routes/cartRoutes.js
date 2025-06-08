import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { addCakesToCart, getCartCakes } from "../controllers/adminCakeController.js";

const cartRouter = express.Router();

cartRouter.post("/add-cake", userAuth, addCakesToCart);
cartRouter.get("/get-cart-cakes", userAuth, getCartCakes)

export default cartRouter;
