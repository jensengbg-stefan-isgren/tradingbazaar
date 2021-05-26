import { createSlice } from '@reduxjs/toolkit'

import addBidThunk from './prodAddBidThunk'

export const bid = addBidThunk

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    detailedProduct: null,
    productId: null,
  },

  reducers: {
    addDetailedProduct: (state, action) => {
      state.detailedProduct = action.payload.productDetail
      state.productId = action.payload.productId
    },
    clearProduct: (state, action) => {
      state.detailedProduct = action.payload
    },
  },
  extraReducers: {
    [bid.fulfilled]: (state, action) => {
      productSlice.caseReducers.addDetailedProduct(state, action)
    },
  },
})

export const { addDetailedProduct, clearProduct } = productSlice.actions
export default productSlice.reducer
