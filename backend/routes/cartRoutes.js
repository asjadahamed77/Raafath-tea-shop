import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { addBoxToCart, addCakesToCart, addCardToCart } from '../controllers/cartController.js';


const cartRouter = express.Router();

cartRouter.post('/add-cake', userAuth, addCakesToCart )
cartRouter.post('/add-card', userAuth, addCardToCart )
cartRouter.post('/add-box', userAuth, addBoxToCart )


export default cartRouter;