import express from 'express'
import { isAuthenticated, registerUser, userLogin, userLogout } from '../controllers/userAuthController.js'
import { getAllCards } from '../controllers/adminCardModel.js'
import { getAllCakes } from '../controllers/adminCakeController.js'
import { getAllBoxes } from '../controllers/adminBoxController.js'


const authRouter = express.Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',userLogin)
authRouter.post('/logout',userLogout)
authRouter.post('/:id',isAuthenticated)

authRouter.get('/cards',getAllCards)
authRouter.get('/cakes',getAllCakes)
authRouter.get('/boxes',getAllBoxes)


export default authRouter