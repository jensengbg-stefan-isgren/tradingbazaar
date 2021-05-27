import { createAsyncThunk } from '@reduxjs/toolkit'
import firebase, { db } from 'services/firebase'

export default createAsyncThunk(
  'product/testStatus',
  async (myBid, { getState }) => {
    const { productId } = getState().product
    const { uid, user } = getState().auth

    const product = await (
      await db.collection('sellingProducts').doc(productId).get()
    ).data()

    const highestBid = product.highestBid || product.startPrice
    const bids = product.bids || 0

    if (myBid < highestBid + 10) {
      console.log(
        `Your bid is too low. Lowest bid you can do is ${highestBid + 10} Kr`
      )
      return {
        product,
        message: `Your bid is too low. Lowest bid you can do is ${
          highestBid + 10
        } Kr`,
      }
    }

    const batch = db.batch()

    const dbBid = db
      .collection('sellingProducts')
      .doc(productId)
      .collection('bids')
      .doc()

    batch.set(dbBid, {
      uid: uid,
      sum: myBid,
      datetime: firebase.firestore.FieldValue.serverTimestamp(),
    })

    const dbHighest = db.collection('sellingProducts').doc(productId)

    batch.update(dbHighest, {
      highestBid: myBid,
      bids: bids + 1,
      leadingBidder: user.alias || user.firstName,
    })

    const userBidRef = db.collection('users').doc(uid)
    batch.update(userBidRef, {
      userBids: firebase.firestore.FieldValue.arrayUnion(productId),
    })

    await batch.commit()

    product.highestBid = myBid
    product.bids = bids + 1
    const newUser = { ...user }

    if (newUser.userBids === undefined) newUser.userBids = [productId]
    else if (!newUser.userBids.includes(productId)) {
      newUser.userBids.push(productId)
    }
    console.log('thunk data ok', productId)

    // Add user bid to Response??
    return { productDetail: product, productId, user: newUser }
  }
)
