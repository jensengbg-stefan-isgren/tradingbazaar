import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import newAdReducer from 'features/newAdSlice'
import adsSlice from 'features/adsSlice'
import productReducer from 'features/productSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    newAd: newAdReducer,
    ads: adsSlice,
    product: productReducer
  },
})
