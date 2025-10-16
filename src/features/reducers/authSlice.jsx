import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    isError: null,
    token:null
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isError = null;
      state.token=action.payload;
    },

    removeUser: (state, action) => {
      (state.user = action.payload),
        (state.isLoggedIn = false),
        (state.isError = null);
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
  },
});

export const { addUser, removeUser, setError } = authSlice.actions;
export default authSlice.reducer;
