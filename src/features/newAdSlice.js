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
    checkImages: (state) => {
      console.log('check images', state)
      let ready = true
      let swap = false
      let i = 1
      do {
        const currentField = `imgLink${i}`
        const nextField = `imgLink${i + 1}`
        console.log([i, state[currentField], state[nextField]])
        if (!state[currentField] && state[nextField]) {
          ;[state[currentField], state[nextField]] = [
            state[nextField],
            state[currentField],
          ]
          swap = true
        }
        if (i < 4) i++
        else {
          if (!swap) ready = false
          else {
            i = 1
            swap = false
          }
        }
      } while (ready)
      console.log('dispatch state', state)
    },
  },
})

export const { adInputEdit, checkImages } = adSlice.actions
export default adSlice.reducer
