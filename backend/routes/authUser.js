import express from 'express'
import { isAuthenticated, registerUser, userLogin, userLogout } from '../controllers/userAuthController.js'

const authRouter = express.Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',userLogin)
authRouter.post('/logout',userLogout)
authRouter.post('/:id',isAuthenticated)


export default authRouter