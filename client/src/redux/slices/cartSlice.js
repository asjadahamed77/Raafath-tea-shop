import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

const initialState = {
  cartCakes: [],
  loading: false,
  error: null,
};

const token = localStorage.getItem("userToken");

// Async thunk to add cakes to cart
export const addCakesToCart = createAsyncThunk(
  "cart/addCakesToCart",
  async ({ cakeId, price, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/cart/add-cake`,
        { cakeId, price, quantity },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        return data.cart;
      } else {
        return rejectWithValue("Failed to add cake to cart");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add cake"
      );
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCakesToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCakesToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartCakes = action.payload.cakes; 
      })
      .addCase(addCakesToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
