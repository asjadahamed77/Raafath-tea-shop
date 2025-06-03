import express from 'express'
import { adminLogin } from '../controllers/adminAuthController.js'

const adminAuthRouter = express.Router()

adminAuthRouter.post('/login',adminLogin)

export default adminAuthRouter