import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
  name: 'nav',
  initialState:{
    isVisible: false
  },

  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload
    },
  },
})

export const { setIsVisible } = navSlice.actions
export default navSlice.reducer
