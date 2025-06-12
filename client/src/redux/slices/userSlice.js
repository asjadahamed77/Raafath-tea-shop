import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

const initialState = {
    
  cakes: [],
  boxes: [],
  cards: [],
    loading: false,
    error: null,
  };
  


  export const allCakes = createAsyncThunk(
    "auth/allCakes",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${backendUrl}/auth/cakes`, {
          headers: {
            "Content-Type": "multipart/form-data",
      
          },
        });
        if (data.success) {
          return data;
        }
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch cakes"
        );
      }
    }
  );

  export const allCards = createAsyncThunk(
    "auth/allCards",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${backendUrl}/auth/cards`, {
          headers: {
            "Content-Type": "multipart/form-data",
           
          },
        });
        if (data.success) {
          return data;
        }
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch cards"
        );
      }
    }
  );

  export const allBoxes = createAsyncThunk(
    "auth/allBoxes",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${backendUrl}/auth/boxes`, {
          headers: {
            "Content-Type": "multipart/form-data",
         
          },
        });
        if (data.success) {
          return data;
        }
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch boxes"
        );
      }
    }
  );

  const userSlice = createSlice({
    name: "user",
    initialState,
    
    extraReducers: (builder) => {
      builder
  
       
  
      
        .addCase(allCakes.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(allCakes.fulfilled, (state, action) => {
          state.loading = false;
          state.cakes = action.payload.cakes;
        })
        .addCase(allCakes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
      
  
       
        .addCase(allCards.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(allCards.fulfilled, (state, action) => {
          state.loading = false;
          state.cards = action.payload.cards;
        })
        .addCase(allCards.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
       
      
  
  
        .addCase(allBoxes.pending, (state) => {
          state.loading = true;
          state.error = false;
        })
        .addCase(allBoxes.fulfilled, (state, action) => {
          state.loading = false;
          state.boxes = action.payload.boxes;
        })
        .addCase(allBoxes.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
       
    },
  });
  
  
  
  export default userSlice.reducer;