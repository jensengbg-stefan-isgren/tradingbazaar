import { db } from '../services/firebase'
import store from 'store/store'
// import data from 'data/categories'
export const addProduct = async () => {
  const state = store.getState()



  const newProduct = {
    category: state.newAd.category,
    uid: state.auth.uid,
    title: state.newAd.title,
    description: state.newAd.description,
    startPrice: state.newAd.startPrice,
    acceptedPrice: state.newAd.acceptedPrice,
    productConditions: state.newAd.productConditions,
    adEndDate: state.newAd.adEndDate,
    imgLink1: state.newAd.imgLink1,
  }
  for (let i = 2; i < 6; i++) {
    const field = `imgLink${i}`
    // console.log('Has own property', props.hasOwnProperty(`imgLink${i}`))
    if (
      state.newAd.hasOwnProperty(field) &&
      state.newAd[field] != null &&
      state.newAd[field]
    )
      newProduct[field] = state.newAd[field]
  }

  try {
    console.log('Try submitting: ', newProduct)

    const docRef = await db.collection('sellingProducts').add(newProduct)
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}



export const getProduct = async(id) => {
  let snapshot = await db.collection('sellingProducts').doc(id).get()
  let data = await snapshot.data()
  return data
}




// export const addCategories = async() => {
// data.forEach(async(item) => {
//   await db.collection("categories").add({name: item.toLowerCase()})
// })

// }

// addCategories()