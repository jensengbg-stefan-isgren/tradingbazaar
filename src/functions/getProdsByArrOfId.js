import firebase, { db } from 'services/firebase'

export default async function getFavoriteProds(prodArray) {
  let locProdArr = [...prodArray]
  let resultArray = []

  while (locProdArr.length > 0) {
    let innerLoopArray = []
    const queryArray = locProdArr.slice(0, 10)
    locProdArr = locProdArr.slice(10)

    await db
      .collection('sellingProducts')
      .where(firebase.firestore.FieldPath.documentId(), 'in', queryArray)
      .get()
      .then((snapshot) =>
        snapshot.forEach((doc) => {
          innerLoopArray = [...innerLoopArray, { ...doc.data(), id: doc.id }]
        })
      )
    resultArray = [...resultArray, ...innerLoopArray]
  }

  return resultArray
}
