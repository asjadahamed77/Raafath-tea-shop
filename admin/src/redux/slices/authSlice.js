// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

const initialState = {
  admin: null,
  cakes: [],
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
  },
});

export const { clearAuthState, logout } = authSlice.actions;

export default authSlice.reducer;
