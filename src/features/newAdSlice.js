import { createSlice } from '@reduxjs/toolkit';
import { prodAmend } from './productSlice';

const initialState = {
  id: '',
  title: '',
  description: '',
  category: '',
  startPrice: 0,
  acceptedPrice: 0,
  productConditions: '',
  adEndDate: '',
  imgLink1: '',
  imgLink2: '',
  imgLink3: '',
  imgLink4: '',
  imgLink5: '',
  removed: false,
};

export const adSlice = createSlice({
  name: 'newAd',
  initialState,
  reducers: {
    adInputEdit: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    clearAd: (state) => {
      Object.assign(state, initialState);
    },
    checkImages: (state) => {
      // console.log('check images', state);
      let ready = true;
      let swap = false;
      let i = 1;
      do {
        const currentField = `imgLink${i}`;
        const nextField = `imgLink${i + 1}`;
        // console.log([i, state[currentField], state[nextField]]);
        if (!state[currentField] && state[nextField]) {
          [state[currentField], state[nextField]] = [
            state[nextField],
            state[currentField],
          ];
          swap = true;
        }
        if (i < 4) i++;
        else {
          if (!swap) ready = false;
          else {
            i = 1;
            swap = false;
          }
        }
      } while (ready);
      // console.log('dispatch state', state);
    },
  },
  extraReducers: {
    [prodAmend.fulfilled]: (state, action) => {
      console.log('newAds resell', action.payload);
      adSlice.caseReducers.clearAd(state, action);
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.category = action.payload.category;
      state.startPrice = action.payload.startPrice;
      state.acceptedPrice = action.payload.acceptedPrice;
      state.productConditions = action.payload.productConditions;
      state.imgLink1 = action.payload.imgLink1;
      state.imgLink2 = action.payload.imgLink2 ? action.payload.imgLink2 : '';
      state.imgLink3 = action.payload.imgLink3 ? action.payload.imgLink3 : '';
      state.imgLink4 = action.payload.imgLink4 ? action.payload.imgLink4 : '';
      state.imgLink5 = action.payload.imgLink5 ? action.payload.imgLink5 : '';
    },
  },
});

export const { adInputEdit, checkImages, clearAd } = adSlice.actions;
export default adSlice.reducer;
