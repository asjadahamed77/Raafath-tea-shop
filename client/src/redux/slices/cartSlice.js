import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

const initialState = {
    
    items: [],
      loading: false,
      error: null,
    };

    const token = localStorage.getItem("userToken");

    export const addCakesToCart = createAsyncThunk(
        "cart/addCakesToCart",
        async ({ userId, itemId,  }, { rejectWithValue }) => {
            try {
                const { data } = await axios.post(`${backendUrl}/cart/add-cake`, { userId, itemId }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (data.success) {
                    return data.cart;
                }
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to add cakes to cart"
                );
            }
        }
    )

    export const addBoxToCart = createAsyncThunk(
        "cart/addBoxToCart",
        async ({ userId, itemId }, { rejectWithValue }) => {
            try {
                const { data } = await axios.post(`${backendUrl}/cart/add-box`, { userId, itemId }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (data.success) {
                    return data.cart;
                }
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to add box to cart"
                );
            }
        }
    );

    export const addCardToCart = createAsyncThunk(
        "cart/addCardToCart",
        async ({ userId, itemId,  }, { rejectWithValue }) => {
            try {
                const { data } = await axios.post(`${backendUrl}/cart/add-card`, { userId, itemId }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (data.success) {
                    return data.cart;
                }
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to add card to cart"
                );
            }
        }
    );

    export const getCart = createAsyncThunk(
        "cart/getCart",
        async (userId, { rejectWithValue }) => {
            try {
                const { data } = await axios.get(`${backendUrl}/cart/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (data.success) {
                    return data.cart;
                }
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || "Failed to fetch cart"
                );
            }
        }
    );

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
            state.items = action.payload.cart;
        })
        .addCase(addCakesToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addBoxToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addBoxToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.cart;
        })
        .addCase(addBoxToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addCardToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addCardToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.cart;
        })
        .addCase(addCardToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload.cart || [];
        })
        .addCase(getCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
})
     