import { createSlice } from '@reduxjs/toolkit'

export const ads = createSlice({
  name: 'ads',
  initialState: [],

  reducers: {
    fillAdList: (state, action) => {
      const { adList } = action.payload
      state = [...adList]
      return state
    },
  },
})

export const { fillAdList } = ads.actions
export default ads.reducer
