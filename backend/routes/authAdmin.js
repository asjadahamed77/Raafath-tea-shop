import express from 'express'
import { adminLogin } from '../controllers/adminAuthController.js'
import authAdmin from '../middlewares/adminAuth.js'
import upload from '../middlewares/multer.js'
import { addCake, deleteCake, getAllCakes } from '../controllers/adminCakeController.js'
import { addCard, deleteCard, getAllCards } from '../controllers/adminCardModel.js'
import { addBox, deleteBox, getAllBoxes } from '../controllers/adminBoxController.js'

const adminAuthRouter = express.Router()

adminAuthRouter.post('/login',adminLogin)
adminAuthRouter.post('/add-cake', authAdmin,upload.single('cakeImage'), addCake )
adminAuthRouter.get('/cakes', authAdmin, getAllCakes)
adminAuthRouter.delete('/delete-cake/:id', authAdmin, deleteCake)

adminAuthRouter.post('/add-card', authAdmin,upload.single('cardImage'), addCard )
adminAuthRouter.get('/cards', authAdmin, getAllCards)
adminAuthRouter.delete('/delete-card/:id', authAdmin, deleteCard)

adminAuthRouter.post('/add-box', authAdmin,upload.single('boxImage'), addBox )
adminAuthRouter.get('/boxes', authAdmin, getAllBoxes)
adminAuthRouter.delete('/delete-box/:id', authAdmin, deleteBox)

export default adminAuthRouter