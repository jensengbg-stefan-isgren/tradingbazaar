import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { db } from 'services/firebase'
import addBidThunk from './prodAddBidThunk'
import prodGetThunk from './prodGetThunk'
import prodRemoveThunk from './prodRemoveThunk'
import prodAmendThunk from './prodAmendThunk'

export const bid = addBidThunk
export const getProduct = prodGetThunk
export const removeProduct = prodRemoveThunk
export const prodAmend = prodAmendThunk

export const fetchFilteredProducts = createAsyncThunk(
  'product/fetchFilteredProducts',
  async (category) => {
    let data = []
    const snapShot = await db
      .collection('sellingProducts')
      .where('category', '==', category)
      .get()
    snapShot.forEach((doc) => {
      let docId = doc.id
      data = [...data, { ...doc.data(), id: docId }]
    })
    return data
  }
)

const initialState = {
  detailedProduct: {
    highestBid: 0,
    bids: 0,
    leadingBidder: '',
    shownPrice: 0,
  },
  filteredProducts: null,
  searchResults: null,
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
      if (!action.payload.productDetail.leadingBidder)
        state.detailedProduct.leadingBidder = ''
      state.productId = action.payload.productId
      if (!action.payload.productDetail.highestBid)
        state.detailedProduct.highestBid = 0
      if (state.detailedProduct.highestBid)
        state.detailedProduct.shownPrice = state.detailedProduct.highestBid
      else state.detailedProduct.shownPrice = state.detailedProduct.startPrice
    },
    clearProduct: (state) => {
      Object.assign(state, initialState)
    },
    setNewBid: (state, action) => {
      state.newBid = action.payload
    },
    searchProducts: (state, action) => {
      state.searchResults = action.payload
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
      state.adStatus = action.payload.status
      state.endDate = action.payload.endDate
    },
    [prodAmend.fulfilled]: (state, action) => {
      productSlice.caseReducers.clearProduct(state, action)
    },
    [prodAmend.rejected]: (state, action) => {
      console.log('rejected')

      // productSlice.caseReducers.clearProduct(state, action);
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.detailedProduct.removed = action.payload.removed
    },
    [fetchFilteredProducts.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.filteredProducts = action.payload
    },
  },
})

export const {
  addDetailedProduct,
  clearProduct,
  setNewBid,
} = productSlice.actions
export default productSlice.reducer
