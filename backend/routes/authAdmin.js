import express from 'express'
import { adminLogin } from '../controllers/adminAuthController.js'
import authAdmin from '../middlewares/adminAuth.js'
import upload from '../middlewares/multer.js'
import { addCake, deleteCake, getAllCakes } from '../controllers/adminCakeController.js'

const adminAuthRouter = express.Router()

adminAuthRouter.post('/login',adminLogin)
adminAuthRouter.post('/add-cake', authAdmin,upload.single('cakeImage'), addCake )
adminAuthRouter.get('/cakes', authAdmin, getAllCakes)
adminAuthRouter.delete('/delete-cake/:id', authAdmin, deleteCake)

export default adminAuthRouter