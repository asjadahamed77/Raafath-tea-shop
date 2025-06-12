import express from 'express';
import { getCheckout, confirmCheckout, cancelCheckout } from '../controllers/checkoutController.js';
import { getUserOrders } from '../controllers/userOrderController.js';
import userAuth from '../middlewares/userAuth.js';

const checkoutRouter = express.Router();

checkoutRouter.get('/', userAuth, getCheckout);
checkoutRouter.get('/user', userAuth, getUserOrders);
checkoutRouter.put('/:checkoutId/confirm', userAuth, confirmCheckout);
checkoutRouter.put('/:checkoutId/cancel', userAuth, cancelCheckout);

export default checkoutRouter;