import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import newAdReducer from 'features/newAdSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    newAd: newAdReducer,
  },
})
