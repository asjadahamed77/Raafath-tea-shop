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

// Async thunk for confirming checkout
export const confirmCheckout = createAsyncThunk(
  "checkout/confirm",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backendUrl}/checkout/${checkoutId}/confirm`,
        {},
        { withCredentials: true }
      );
      return response.data.checkout;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for cancelling checkout
export const cancelCheckout = createAsyncThunk(
  "checkout/cancel",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backendUrl}/checkout/${checkoutId}/cancel`,
        {},
        { withCredentials: true }
      );
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
      })
      .addCase(confirmCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(confirmCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to confirm checkout";
      })
      .addCase(cancelCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(cancelCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to cancel checkout";
      });
  },
});

export const { clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer; 