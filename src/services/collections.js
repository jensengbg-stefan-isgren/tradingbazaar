import { db } from '../services/firebase'
import store from 'store/store'
import { toast } from 'react-toastify'
import { trigram } from 'n-gram'
// import data from 'data/categories'

export const addProduct = () => {
  return new Promise(async (resolve, reject) => {
    const state = store.getState()
    const productId = state.newAd.id

    const newProduct = {
      uid: state.auth.uid,
      title: state.newAd.title,
      description: state.newAd.description,
      searchDescr:
        state.newAd.title.toLowerCase() +
        ' ' +
        state.newAd.description.toLowerCase(),
      category: state.newAd.category,
      startPrice: state.newAd.startPrice,
      acceptedPrice: state.newAd.acceptedPrice,
      productConditions: state.newAd.productConditions,
      adEndDate: state.newAd.adEndDate,
      imgLink1: state.newAd.imgLink1,
      removed: state.newAd.removed,
    }
    for (let i = 2; i < 6; i++) {
      const field = `imgLink${i}`
      if (
        state.newAd.hasOwnProperty(field) &&
        state.newAd[field] != null &&
        state.newAd[field]
      )
        newProduct[field] = state.newAd[field]
    }

    // let triString = {}
    const triStringArray = trigram(
      newProduct.title.toLowerCase() +
        ' ' +
        newProduct.description.toLowerCase()
    )
    console.log(triStringArray)
    let triStringObj = {}
    triStringArray.forEach(
      (tri) => (triStringObj = { ...triStringObj, [tri]: true })
    )

    console.log('triobj', triStringObj)

    newProduct.trigram = triStringObj

    if (productId) {
      try {
        db.collection('sellingProducts')
          .doc(productId)
          .update(newProduct)
          .then(() => toast.success('Item successfully updated'))
      } catch {
        toast.error('Oops!! Something went wrong')
      }
    } else {
      db.collection('sellingProducts')
        .add(newProduct)
        .then((docRef) => {
          toast.success('Ad successfully added')
          resolve(docRef.id)
        })
        .catch((error) => {
          toast.error('Oops!! Something went wrong')
          console.error('Error adding document: ', error)
          reject()
        })
    }
  })
}

export const getProduct = async (id) => {
  let snapshot = await db.collection('sellingProducts').doc(id).get()
  let data = await snapshot.data()
  return data
}
