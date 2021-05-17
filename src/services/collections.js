import { db } from '../services/firebase'

export const addProduct = async (props) => {
  const newProduct = {
    user: "It's me",
    title: props.title,
    description: props.description,
    price: props.price,
  }
  try {
    console.log('Try submitting: ', newProduct)

    const docRef = await db.collection('sellingProducts').add(newProduct)
    console.log('Document written with ID: ', docRef.id)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
}
