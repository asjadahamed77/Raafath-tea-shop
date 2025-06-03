import express from 'express'
import { registerUser } from '../controllers/userAuthController.js'

const authRouter = express.Router()

authRouter.post('/register',registerUser)

export default authRouter