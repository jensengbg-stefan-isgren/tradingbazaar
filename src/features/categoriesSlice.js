import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState:{
    categories: []
  },

  reducers: {
    addCategories: (state, action) => {
      state.categories = [...state.categories, action.payload]
    },
  },
})

export const { addCategories } = categoriesSlice.actions
export default categoriesSlice.reducer
