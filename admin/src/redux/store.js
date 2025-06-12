import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'
import userReducer from './slices/userSlice'


const store = configureStore({
    reducer: {
       auth: authReducer,
       order: orderReducer,
       user: userReducer,
    }
})

export default store