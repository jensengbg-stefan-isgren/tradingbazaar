import { createSlice } from '@reduxjs/toolkit'

export const adSlice = createSlice({
  name: 'newAd',
  initialState: {
    title: '',
    description: '',
    category: '',
    startPrice: 0,
    acceptedPrice: 0,
    productConditions: '',
    adEndDate: 0,
    imgLink1: '',
    imgLink2: '',
    imgLink3: '',
    imgLink4: '',
    imgLink5: '',
  },

  reducers: {
    adInputEdit: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    },
  },
})

export const { adInputEdit } = adSlice.actions
export default adSlice.reducer
