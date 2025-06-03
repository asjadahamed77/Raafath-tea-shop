import express from 'express'
import { registerUser, userLogin } from '../controllers/userAuthController.js'

const authRouter = express.Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',userLogin)

export default authRouter