import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase, { db } from 'services/firebase';
import { toast } from 'react-toastify';

// 'auth/authToggleFavoriteStatus',
export default createAsyncThunk('auth/a', async (productId, { getState }) => {
  if (!productId)
    return toast.error('Error Toggling favorite. Missing productId');

  const { uid, user, isAuthenticated } = getState().auth;
  if (!isAuthenticated)
    return toast.warn('Please Login to save your favorite items');

  const favoriteRef = db.collection('users').doc(uid);

  let favorites = user.favorites || [];

  if (favorites.includes(productId)) {
    try {
      await favoriteRef.update({
        favorites: firebase.firestore.FieldValue.arrayRemove(productId),
      });

      favorites = favorites.filter((el) => el !== productId);
    } catch (err) {
      console.error('Error removing productId from  Favorites');
    }
  } else {
    try {
      await favoriteRef.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(productId),
      });

      favorites = [...favorites, productId];
    } catch (err) {
      console.error('Error adding productId to Favorites');
    }
  }

  return favorites;
});
