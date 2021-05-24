import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    uid: null,
    isAuthenticated: null,
    isRegistered: null,
    errorMessage: null,
    user: null,
    providerData: null,
  },

  reducers: {
    authenticateUser: (state, action) => {
      const { status, uid, providerData } = action.payload;
      state.isAuthenticated = status;
      state.uid = uid;
      state.providerData = providerData;
    },
    checkIfRegistered: (state, action) => {
      const { status, message } = action.payload;
      state.isRegistered = status;
      state.errorMessage = message;
    },
    addUser: (state, action) => {
      state.user = action.payload;
    },
    addFavoritesToUser: (state, action) => {
      state.favorites = [...action.payload]
    },
  },
});

export const {addFavoritesToUser, addUser, authenticateUser, checkIfRegistered } =
  authSlice.actions;
export default authSlice.reducer;
