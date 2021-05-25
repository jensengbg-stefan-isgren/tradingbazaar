import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { db } from 'services/firebase'
import firebase from 'services/firebase'

export const authUser = createAsyncThunk('auth/authUserStatus  ', async () => {
  return await new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const snapShot = await db.collection('users').doc(user.uid).get()

        const doc = snapShot.data()

        let favorites = []
        await snapShot.ref
          .collection('favorites')
          .get()
          .then((favorite) =>
            favorite.forEach(
              (el) => (favorites = [...favorites, el.data().productId])
            )
          )

        const providers = []
        await user.providerData.forEach((profile) => {
          providers.push(profile.providerId)
        })

        const response = {
          user: doc,
          favorites,
          auth: { status: true, uid: user.uid, providerData: providers },
        }

        resolve(response)
      } else {
        const response = {
          user: {},
          favorites: [],
          auth: { status: false, uid: null, providerData: null },
        }
        resolve(response)
      }
    })
  })
})

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
      state.user = action.payload
    },
    addFavoritesToUser: (state, action) => {
      state.favorites = [...action.payload]
    },
  },
  extraReducers: {
    [authUser.fulfilled]: (state, action) => {
      const { status, uid, providerData } = action.payload.auth
      state.isAuthenticated = status
      state.uid = uid
      state.providerData = providerData

      state.user = action.payload.user

      state.favorites = [...action.payload.favorites]
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
