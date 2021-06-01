import { createSlice } from '@reduxjs/toolkit'

export const ads = createSlice({
  name: 'ads',
  initialState: { selling: [], expired: [] },

  reducers: {
    fillAdList: (state, action) => {
      const { adList } = action.payload
      let selling = []
      let expired = []
      const now = new Date().getTime()
      adList.forEach((ad) => {
        const adEndDate = new Date(ad.adEndDate).getTime()
        ad.endTimeStamp = adEndDate
        if (adEndDate > now) selling = [...selling, ad]
        else expired = [...expired, ad]
      })

      selling = selling.sort((a, b) => {
        return a.endTimeStamp - b.endTimeStamp
      })
      state = { selling: [...selling], expired: [...expired] }
      return state
    },
  },
})

export const { fillAdList } = ads.actions
export default ads.reducer
