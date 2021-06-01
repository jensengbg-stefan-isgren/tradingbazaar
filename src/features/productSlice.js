import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {db} from 'services/firebase'
import addBidThunk from './prodAddBidThunk'

export const bid = addBidThunk


export const fetchFilteredProducts = createAsyncThunk(
  'product/fetchFilteredProducts', 
  async(category) => {
    let data = []
    const snapShot = await db.collection('sellingProducts').where('category',"==", category).get()
    snapShot.forEach((doc) => {
      let docId = doc.id
      data = [...data, {...doc.data(),id:docId}]
    });
    return data;
  }
)


export const productSlice = createSlice({
  name: 'product',
  initialState: {
    detailedProduct: null,
    productId: null,
    filteredProducts: null
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
    [fetchFilteredProducts.fulfilled] : (state,action) => {
      console.log(action.payload)
      state.filteredProducts = action.payload
    }
  },
})

export const {addDetailedProduct, clearProduct } = productSlice.actions
export default productSlice.reducer
