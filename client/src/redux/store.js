import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'
import checkoutReducer from './slices/checkoutSlice'
import orderReducer from './slices/orderSlice'


const store = configureStore({
    reducer: {
       auth: authReducer,
       user: userReducer,
       cart: cartReducer,
       checkout: checkoutReducer,
       order: orderReducer,
    }
})

export default store