import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null,
    isAuthenticated: null,
    isRegistered: null,
    errorMessage: null,
    user: null,
    favorites: [],
    providerData: null,
  },

  reducers: {
    authenticateUser: (state, action, providerData) => {
      const { status, uid } = action.payload
      state.isAuthenticated = status
      state.uid = uid
      state.providerData = providerData
    },
    checkIfRegistered: (state, action) => {
      const { status, message } = action.payload
      state.isRegistered = status
      state.errorMessage = message
    },
    addUser: (state, action) => {
      state.user = action.payload
    },
    addFavoritesToUser: (state, action) => {
      state.favorites = [...action.payload]
    },
  },
})

export const {
  addUser,
  authenticateUser,
  checkIfRegistered,
  addFavoritesToUser,
} = authSlice.actions
export default authSlice.reducer
