import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import checkoutReducer from './slices/checkoutSlice'


const store = configureStore({
    reducer: {
       auth: authReducer,
       user: userReducer,
       cart: cartReducer,
       checkout: checkoutReducer,
    }
})

export default store