import { createSlice } from '@reduxjs/toolkit'

import addBidThunk from './prodAddBidThunk'
import prodGetThunk from './prodGetThunk'

export const bid = addBidThunk
export const getProduct = prodGetThunk

const initialState = {
  detailedProduct: {
    highestBid: 0,
    bids: 0,
    leadingBidder: '',
  },
  productId: null,
  seller: null,
  adStatus: 0,
  endDate: { date: '', time: '' },
  newBid: '',
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addDetailedProduct: (state, action) => {
      state.detailedProduct = action.payload.productDetail
      if (!action.payload.productDetail.bids) state.detailedProduct.bids = 0
      if (!action.payload.productDetail.highestBid)
        state.detailedProduct.highestBid = 0
      if (!action.payload.productDetail.leadingBidder)
        state.detailedProduct.leadingBidder = ''
      state.productId = action.payload.productId
    },
    clearProduct: (state) => {
      Object.assign(state, initialState)
    },
    setNewBid: (state, action) => {
      state.newBid = action.payload
    },
  },
  extraReducers: {
    [bid.fulfilled]: (state, action) => {
      productSlice.caseReducers.addDetailedProduct(state, action)
      state.newBid = 0
    },
    [bid.rejected]: (state, action) => {
      console.log('rejected')
    },
    [getProduct.fulfilled]: (state, action) => {
      productSlice.caseReducers.addDetailedProduct(state, action)
      state.seller = action.payload.seller
      state.isFavorite = action.payload.isFavorite
      state.adStatus = action.payload.status
      state.endDate = action.payload.endDate
    },
  },
})

export const {
  addDetailedProduct,
  clearProduct,
  setNewBid,
} = productSlice.actions
export default productSlice.reducer
