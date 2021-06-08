import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from 'services/firebase';

export default createAsyncThunk(
  'product/getProduct',
  async ({ id, ad }, { getState }) => {
    // const favorites = getState().auth.user.favorites
    let productObj = {};

    productObj.productId = id;
    productObj.productDetail = ad;

    const date = new Date(productObj.productDetail.adEndDate || '');
    function getAdStatus() {
      // adStatus
      // = 0 -> bid open
      // = 1 -> sold
      // = 2 -> sold directly
      // = 3 -> expired
      const now = new Date();
      if (date.getFullYear() === 1900) return 2;
      else if (now > date) {
        if (productObj.productDetail.highestBid > 0) return 1;
        else return 3;
      } else return 0;
    }
    productObj.status = getAdStatus();

    productObj.endDate = {
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      time: `${date.getHours()}:${('0' + String(date.getMinutes())).slice(-2)}`,
    };
    // console.log(user?.favorites.includes(id))
    // if (favorites && favorites.includes(id)) productObj.isFavorite = true
    // else productObj.isFavorite = false

    db.collection('users')
      .doc(productObj.productDetail.uid)
      .get()
      .then((data) => {
        productObj.seller = data.data();
      });

    return productObj;
  }
);
