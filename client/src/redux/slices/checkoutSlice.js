import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

// Async thunk for creating checkout
export const createCheckout = createAsyncThunk(
  "checkout/create",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/checkout`, {
        withCredentials: true,
      });
      return response.data.checkout;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  checkout: null,
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clearCheckout: (state) => {
      state.checkout = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create checkout";
      });
  },
});

export const { clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer; 