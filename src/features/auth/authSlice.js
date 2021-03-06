import { createSlice } from '@reduxjs/toolkit'
import authUserThunk from './authUserThunk'
import authToggleFavoriteThunk from './authToggleFavoriteThunk'
// import test from '../prodAddBidThunk'
import { bid } from '../productSlice'

export const authUser = authUserThunk
export const authToggleFavorite = authToggleFavoriteThunk

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    uid: null,
    isAuthenticated: null,
    isRegistered: null,
    errorMessage: null,
    user: { favorites: [] },
    providerData: null,
    test2: '',
  },

  reducers: {
    authenticateUser: (state, action) => {
      const { status, uid, providerData } = action.payload
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
      // console.log('addUser', action.payload)
      state.user = action.payload
      if (!state.user.favorites) state.user.favorites = []
    },
    // addFavoritesToUser: (state, action) => {
    //   state.favorites = [...action.payload]
    // },
  },
  extraReducers: {
    [authUser.fulfilled]: (state, action) => {
      const { status, uid, providerData } = action.payload.auth
      state.isAuthenticated = status
      state.uid = uid
      state.providerData = providerData

      state.user = action.payload.user

      // state.favorites = [...action.payload.favorites]
    },
    [authToggleFavorite.fulfilled]: (state, action) => {
      state.user.favorites = [...action.payload]
    },
    [authToggleFavorite.rejected]: (state, action) => {
      console.log('rejected', action)
    },
    [bid.fulfilled]: (state, action) => {
      const payload = {}
      payload.payload = action.payload.user
      // console.log('to be finished', payload.payload)
      authSlice.caseReducers.addUser(state, payload)
      // Add update to user bids
      // state.test2 = action.payload
    },
  },
})

export const {
  addFavoritesToUser,
  addUser,
  authenticateUser,
  checkIfRegistered,
} = authSlice.actions
export default authSlice.reducer
