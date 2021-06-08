import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'services/firebase';
import { toast } from 'react-toastify';

export default createAsyncThunk(
  'product/removeProduct',
  async (id, { thunkAPI, getState }) => {
    let product = {};
    try {
      product = (await db.collection('sellingProducts').doc(id).get()).data();
    } catch (error) {
      toast.error('Product not found');
      return thunkAPI.rejectWithValue();
    }
    console.log('removing', id, product);
    if (product.highestBid) {
      toast.error('This item could not be removed due to Auction in progress.');
      return thunkAPI.rejectWithValue();
    }

    try {
      await db
        .collection('sellingProducts')
        .doc(id)
        .update({ removed: !product.removed });
      toast.success(
        `Item successfully ${
          product.removed ? 'removed from ' : 'added to '
        } auction!`
      );
      return { removed: !product.removed };
    } catch (error) {
      toast.error('Oops! An error occoured updating the item.');
    }
  }
);
