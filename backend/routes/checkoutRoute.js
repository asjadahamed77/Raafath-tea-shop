import express from 'express';
import { getCheckout } from '../controllers/checkoutController.js';
import userAuth from '../middlewares/userAuth.js';

const checkoutRouter = express.Router();

checkoutRouter.get('/',userAuth, getCheckout)

export default checkoutRouter;