import { createSlice } from '@reduxjs/toolkit'

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    // isVisible: JSON.parse(window.localStorage.getItem('navVis')),
    isVisible: true,
  },

  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload
      // window.localStorage.setItem('navVis', JSON.stringify(action.payload))
    },
  },
})

export const { setIsVisible } = navSlice.actions
export default navSlice.reducer
