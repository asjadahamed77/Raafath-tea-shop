// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

const initialState = {
  admin: null,
  cakes: [],
  cards: [],
  boxes: [],
  loading: false,
  error: null,
};

const admintoken = localStorage.getItem("adminToken");

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/admin/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        localStorage.setItem("adminToken", data.admintoken);
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const addCakes = createAsyncThunk(
  "auth/addCakes",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/admin/add-cake`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admintoken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add cakes"
      );
    }
  }
);

export const allCakes = createAsyncThunk(
  "auth/allCakes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/admin/cakes`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admintoken}`,
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

export const deleteCake = createAsyncThunk(
  "auth/deleteCake",
  async (cakeId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/auth/admin/delete-cake/${cakeId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admintoken}`,
          },
        }
      );
      if (data.success) {
        return { id: cakeId };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete cake"
      );
    }
  }
);
export const addCard = createAsyncThunk(
  "auth/addCard",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/admin/add-card`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admintoken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add card"
      );
    }
  }
);
export const allCards = createAsyncThunk(
  "auth/allCards",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/admin/cards`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admintoken}`,
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
export const deleteCard = createAsyncThunk(
  "auth/deleteCard",
  async (cakeId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/auth/admin/delete-card/${cakeId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admintoken}`,
          },
        }
      );
      if (data.success) {
        return { id: cakeId };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete card"
      );
    }
  }
);

export const addBox = createAsyncThunk(
  "auth/addBox",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/admin/add-box`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admintoken}`,
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add box"
      );
    }
  }
);
export const allBoxes = createAsyncThunk(
  "auth/allBoxes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${backendUrl}/auth/admin/boxes`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${admintoken}`,
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
export const deleteBox = createAsyncThunk(
  "auth/deleteBox",
  async (boxId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/auth/admin/delete-box/${boxId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admintoken}`,
          },
        }
      );
      if (data.success) {
        return { id: boxId };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete box"
      );
    }
  }
);

// SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.admin = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("adminToken");
    },
  },
  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Cakes
      .addCase(addCakes.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addCakes.fulfilled, (state, action) => {
        state.loading = false;
        state.cakes.push(action.payload.cake);
      })
      .addCase(addCakes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      .addCase(deleteCake.pending, (state)=>{
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCake.fulfilled, (state,action)=>{
        state.loading = false;
        state.cakes = state.cakes.filter(
          (cake) => cake._id !== action.payload.id
        )
      })
      .addCase(deleteCake.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })

       // Add Cards
       .addCase(addCard.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cards.push(action.payload.card);
      })
      .addCase(addCard.rejected, (state, action) => {
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
      .addCase(deleteCard.pending, (state)=>{
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCard.fulfilled, (state,action)=>{
        state.loading = false;
        state.cards = state.cards.filter(
          (card) => card._id !== action.payload.id
        )
      })
      .addCase(deleteCard.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addBox.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addBox.fulfilled, (state, action) => {
        state.loading = false;
        state.boxes.push(action.payload.box);
      })
      .addCase(addBox.rejected, (state, action) => {
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
      .addCase(deleteBox.pending, (state)=>{
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteBox.fulfilled, (state,action)=>{
        state.loading = false;
        state.boxes = state.boxes.filter(
          (box) => box._id !== action.payload.id
        )
      })
      .addCase(deleteBox.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { clearAuthState, logout } = authSlice.actions;

export default authSlice.reducer;
