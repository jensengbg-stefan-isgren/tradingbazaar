import { createAsyncThunk } from '@reduxjs/toolkit'
import { db } from 'services/firebase'
import firebase from 'services/firebase'

export default createAsyncThunk('auth/authUserStatus  ', async () => {
  return await new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const snapShot = await db.collection('users').doc(user.uid).get()

        const doc = snapShot.data()

        // let favorites = []
        // await snapShot.ref
        //   .collection('favorites')
        //   .get()
        //   .then((favorite) =>
        //     favorite.forEach(
        //       (el) => (favorites = [...favorites, el.data().productId])
        //     )
        //   )

        const providers = []
        user.providerData.forEach((profile) => {
          providers.push(profile.providerId)
        })

        const response = {
          user: doc,
          auth: { status: true, uid: user.uid, providerData: providers },
        }

        resolve(response)
      } else {
        const response = {
          user: {},
          auth: { status: false, uid: null, providerData: null },
        }
        resolve(response)
      }
    })
  })
})
