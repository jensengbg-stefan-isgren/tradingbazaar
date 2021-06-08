import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'features/auth/authSlice'
import newAdReducer from 'features/newAdSlice'
import adsSlice from 'features/adsSlice'
import productReducer from 'features/productSlice'
import navReducer from 'features/navSlice'
import categoriesReducer from 'features/categoriesSlice'
import themeReducer from 'features/themeSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    newAd: newAdReducer,
    ads: adsSlice,
    product: productReducer,
    nav:navReducer,
    categories:categoriesReducer,
    theme:themeReducer
  },
})
