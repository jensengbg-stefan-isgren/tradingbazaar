import { createAsyncThunk } from '@reduxjs/toolkit'
import firebase, { db } from 'services/firebase'
import { toast } from 'react-toastify'

export default createAsyncThunk(
  'product/testStatus',
  async (_, { thunkAPI, getState }) => {
    const { productId, newBid } = getState().product
    const { uid, user } = getState().auth

    const locBid = Number(newBid)
    // setMyBid(Number(myBid))
    // const value = Number(myBid)
    if (!locBid || locBid <= 0) {
      toast.error('Please write a valid value in the field')
      return thunkAPI.rejectWithValue()
    }

    const product = await (
      await db.collection('sellingProducts').doc(productId).get()
    ).data()

    const highestBid = product.highestBid || product.startPrice
    const bids = product.bids || 0

    if (locBid < highestBid + 10) {
      toast.error(
        `Your bid is too low. Lowest bid you can do is ${highestBid + 10} Kr`
      )
      return thunkAPI.rejectWithValue()
    }

    const batch = db.batch()

    const dbBid = db
      .collection('sellingProducts')
      .doc(productId)
      .collection('bids')
      .doc()

    batch.set(dbBid, {
      uid: uid,
      sum: locBid,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    })

    const dbHighest = db.collection('sellingProducts').doc(productId)

    batch.update(dbHighest, {
      highestBid: locBid,
      bids: bids + 1,
      leadingBidder: user.alias || user.firstName,
    })

    const userBidRef = db.collection('users').doc(uid)
    batch.update(userBidRef, {
      userBids: firebase.firestore.FieldValue.arrayUnion(productId),
    })

    await batch.commit()

    product.highestBid = locBid
    product.bids = bids + 1
    const newUser = { ...user }

    if (newUser.userBids === undefined) newUser.userBids = [productId]
    else if (!newUser.userBids.includes(productId)) {
      newUser.userBids.push(productId)
    }
    toast.success(`Awesome! Your bid was added successfully`)

    // Add user bid to Response??
    return { productDetail: product, productId, user: newUser }
  }
)
