import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

const initialState = {
  cartCakes: [],
  cartBoxes: [],
  cartCards: [],
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
export const getCartCakes = createAsyncThunk(
    "cart/getCartCakes", 
    async (userId, { rejectWithValue }) => { // Remove the destructuring here
      try {
        const { data } = await axios.get(
          `${backendUrl}/cart/get-cart-cakes`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: { userId } // Pass userId as a query parameter
          }
        );
        return data.cart;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch cart"
        );
      }
    }
  );

  // Async thunk to add cakes to cart
export const addBoxToCart = createAsyncThunk(
    "cart/addBoxToCart",
    async ({ boxId, price, quantity }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/cart/add-box`,
          { boxId, price, quantity },
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
          return rejectWithValue("Failed to add box to cart");
        }
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to add box"
        );
      }
    }
  );
  export const getCartBoxes = createAsyncThunk(
      "cart/getCartBoxes", 
      async (userId, { rejectWithValue }) => { // Remove the destructuring here
        try {
          const { data } = await axios.get(
            `${backendUrl}/cart/get-cart-boxes`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              params: { userId } // Pass userId as a query parameter
            }
          );
          return data.cart;
        } catch (error) {
          return rejectWithValue(
            error.response?.data?.message || "Failed to fetch cart"
          );
        }
      }
    );

      // Async thunk to add cakes to cart
export const addCardToCart = createAsyncThunk(
  "cart/addCardToCart",
  async ({ cardId, price, quantity, to, from, message }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/cart/add-card`,
        { cardId, price, quantity, to, from, message},
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
        return rejectWithValue("Failed to add card to cart");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add card"
      );
    }
  }
);
export const getCartCards = createAsyncThunk(
    "cart/getCartCards", 
    async (userId, { rejectWithValue }) => { // Remove the destructuring here
      try {
        const { data } = await axios.get(
          `${backendUrl}/cart/get-cart-cards`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            params: { userId } // Pass userId as a query parameter
          }
        );
        return data.cart;
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch cart"
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
      })
      .addCase(getCartCakes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartCakes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartCakes = action.payload.cakes || [];
      })
      .addCase(getCartCakes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBoxToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBoxToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartBoxes = action.payload.boxes; 
      })
      .addCase(addBoxToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartBoxes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartBoxes.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartBoxes = action.payload.boxes || [];
      })
      .addCase(getCartBoxes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCardToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCardToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartCards = action.payload.cards; 
      })
      .addCase(addCardToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartCards.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartCards = action.payload.cards || [];
      })
      .addCase(getCartCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default cartSlice.reducer;
