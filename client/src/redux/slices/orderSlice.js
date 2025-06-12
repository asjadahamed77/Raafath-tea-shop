import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../services/api';

// Fetch user orders
export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/checkout/user`, {
        withCredentials: true,
      });
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Refresh orders after checkout
export const refreshOrders = createAsyncThunk(
  'order/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/checkout/user`, {
        withCredentials: true,
      });
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch orders';
      })
      .addCase(refreshOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(refreshOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to refresh orders';
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer; 