import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { addCakesToCart, getCartCakes } from "../controllers/adminCakeController.js";
import { addBoxToCart, getCartBoxes } from "../controllers/adminBoxController.js";

const cartRouter = express.Router();

cartRouter.post("/add-cake", userAuth, addCakesToCart);
cartRouter.get("/get-cart-cakes", userAuth, getCartCakes)


cartRouter.post("/add-box", userAuth, addBoxToCart);
cartRouter.get("/get-cart-boxes", userAuth, getCartBoxes)

export default cartRouter;
