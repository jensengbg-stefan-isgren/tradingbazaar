import { createAsyncThunk } from '@reduxjs/toolkit'
import firebase, { db } from 'services/firebase'

export default createAsyncThunk(
  'auth/authToggleFavoriteStatus',
  async (productId, { getState }) => {
    if (!productId)
      return alert('Fatal Error Toggling favorite. Missing productId')

    const { uid, user } = getState().auth

    const favoriteRef = db.collection('users').doc(uid)

    let favorites = user.favorites || []

    if (favorites.includes(productId)) {
      try {
        await favoriteRef.update({
          favorites: firebase.firestore.FieldValue.arrayRemove(productId),
        })

        favorites = favorites.filter((el) => el !== productId)
      } catch (err) {
        console.error('Error removing productId from  Favorites')
      }
    } else {
      try {
        await favoriteRef.update({
          favorites: firebase.firestore.FieldValue.arrayUnion(productId),
        })

        favorites = [...favorites, productId]
      } catch (err) {
        console.error('Error adding productId to Favorites')
      }
    }

    return favorites
  }
)
