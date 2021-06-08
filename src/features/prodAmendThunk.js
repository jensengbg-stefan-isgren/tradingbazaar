import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'services/firebase';
import { toast } from 'react-toastify';

export default createAsyncThunk(
  'product/amendProduct',
  async ({ id, amend }, { thunkAPI }) => {
    let product = {};
    try {
      product = (await db.collection('sellingProducts').doc(id).get()).data();
    } catch (error) {
      toast.error('Product not found');
      return thunkAPI.rejectWithValue();
    }
    console.log('reopen', id, product);
    let secondCheck = amend;
    if (!secondCheck) {
      const adEndDate = new Date(product.adEndDate).getTime();
      const now = new Date().getTime();
      secondCheck = now > adEndDate;
    }

    if (secondCheck && !product.highestBid) {
      product.id = id;
      console.log('reopening now>adEndDate', product);
      return { ...product };
    } else {
      toast.error('Not able to repoen auction for this item.');
      return thunkAPI.rejectWithValue();
    }
  }
);
