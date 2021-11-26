import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      Cookies.remove("A_JWT");
      state.user = null;
    },
  },
});

export const { loadUser, logout } = userSlice.actions;

export default userSlice.reducer;
