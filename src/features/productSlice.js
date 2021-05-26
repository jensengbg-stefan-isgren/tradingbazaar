import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
   detailedProduct: null
  },

  reducers: {
    addDetailedProduct: (state, action) => {
      state.detailedProduct = action.payload
    },
    clearProduct: (state,action) => {
      state.detailedProduct = action.payload
    }
  },
 
});

export const {addDetailedProduct,clearProduct} =
  productSlice.actions;
export default productSlice.reducer;
