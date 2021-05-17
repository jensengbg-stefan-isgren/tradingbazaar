import { db } from '../services/firebase'

export const addProduct = async (props) => {
  console.log('props', props)
  const newProduct = {
    user: "It's me",
    title: props.title,
    description: props.description,
    startPrice: props.startPrice,
    acceptedPrice: props.acceptedPrice,
    productConditions: props.productConditions,
    adEndDate: props.adEndDate,
    imgLink1: props.imgLink1,
  }
  for (let i = 2; i < 6; i++) {
    const field = `imgLink${i}`
    console.log('Has own property', props.hasOwnProperty(`imgLink${i}`))
    if (props.hasOwnProperty(field) && props[field] != null && props[field])
      newProduct[field] = props[field]
  }

  try {
    console.log('Try submitting: ', newProduct)

    const docRef = await db.collection('sellingProducts').add(newProduct)
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}
