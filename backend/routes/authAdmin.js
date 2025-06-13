import express from 'express'
import { adminLogin } from '../controllers/adminAuthController.js'
import authAdmin from '../middlewares/adminAuth.js'
import upload from '../middlewares/multer.js'
import { addCake, deleteCake, getAllCakes } from '../controllers/adminCakeController.js'
import { addCard, deleteCard, getAllCards } from '../controllers/adminCardModel.js'
import { addBox, deleteBox, getAllBoxes } from '../controllers/adminBoxController.js'
import { getAllOrders, updateOrderStatus, getOrderStats } from '../controllers/adminOrderController.js'
import { getAllUsers } from '../controllers/adminUserController.js'

const adminAuthRouter = express.Router()

adminAuthRouter.post('/login', adminLogin)

// Cake routes
adminAuthRouter.get('/cakes', authAdmin, getAllCakes)
adminAuthRouter.post('/add-cake', authAdmin, upload.single('image'), addCake)
adminAuthRouter.delete('/cakes/:id', authAdmin, deleteCake)

// Box routes
adminAuthRouter.get('/boxes', authAdmin, getAllBoxes)
adminAuthRouter.post('/add-box', authAdmin, upload.single('image'), addBox)
adminAuthRouter.delete('/boxes/:id', authAdmin, deleteBox)

// Card routes
adminAuthRouter.get('/cards', authAdmin, getAllCards)
adminAuthRouter.post('/add-card', authAdmin, upload.single('image'), addCard)
adminAuthRouter.delete('/cards/:id', authAdmin, deleteCard)

// Order routes
adminAuthRouter.get('/orders', authAdmin, getAllOrders)
adminAuthRouter.put('/orders/:orderId', authAdmin, updateOrderStatus)
adminAuthRouter.get('/orders/stats', authAdmin, getOrderStats)

// User routes
adminAuthRouter.get('/users', authAdmin, getAllUsers)

export default adminAuthRouter