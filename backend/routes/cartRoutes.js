import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { addCakesToCart, getCartCakes } from "../controllers/adminCakeController.js";
import { addBoxToCart, getCartBoxes } from "../controllers/adminBoxController.js";
import { addCardToCart, getCartCards } from "../controllers/adminCardModel.js";

const cartRouter = express.Router();

cartRouter.post("/add-cake", userAuth, addCakesToCart);
cartRouter.get("/get-cart-cakes", userAuth, getCartCakes)


cartRouter.post("/add-box", userAuth, addBoxToCart);
cartRouter.get("/get-cart-boxes", userAuth, getCartBoxes)

cartRouter.post("/add-card", userAuth, addCardToCart);
cartRouter.get("/get-cart-cards", userAuth, getCartCards)

export default cartRouter;
