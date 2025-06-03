// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../services/api";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userInfoFromStorage || null,
  userData: null,
  loading: false,
  error: null,
};

const token = localStorage.getItem("userToken");

// REGISTER
// REGISTER
export const register = createAsyncThunk(
    "auth/register",
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/auth/register`,
          { firstName, lastName, email, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
  
       
        if (data.user && data.token) {
          localStorage.setItem("userInfo", JSON.stringify(data.user));
          localStorage.setItem("userToken", data.token);
          return data; // Will go to `fulfilled`
        } else {
          return rejectWithValue(data.message || "Registration failed");
        }
      } catch (error) {
        return rejectWithValue(
          error.response?.data?.message || "Registration failed"
        );
      }
    }
  );
  

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async ({email,password}, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/auth/login`,
        {email,password},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      if (data.success) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        localStorage.setItem("userToken", data.token);
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// LOGOUT
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");

      return true;
    } catch (error) {
      console.error("Logout error:", error);

      return rejectWithValue("Logout failed");
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
      state.successMessage = null;
    },
    resetUserData: (state) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearAuthState, resetUserData } = authSlice.actions;
export default authSlice.reducer;
