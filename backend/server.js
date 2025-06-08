import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authUser.js'
import adminAuthRouter from './routes/authAdmin.js'
import cartRouter from './routes/cartRoutes.js'






//App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()




const allowedOrigins = ['http://localhost:5173','http://localhost:5174','https://raafest.vercel.app','https://admin-raafestt.vercel.app']


app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))



// API ENDPOINTS
app.use('/api/auth', authRouter)
app.use('/api/auth/admin', adminAuthRouter)
app.use('/api/cart', cartRouter)



app.get('/',(req,res)=>{
    res.send("API WORKING...")
})

app.listen(port,()=> console.log("Server Started on Port",port))

export default app