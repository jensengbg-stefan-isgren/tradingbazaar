import { db } from 'services/firebase'

export default async function getUserAds(userId) {
  // let userAds = []
  let selling = []
  let expired = []
  const now = new Date().getTime()

  await db
    .collection('sellingProducts')
    .where('uid', '==', userId)
    .get()
    .then((snapshot) =>
      snapshot.forEach((doc) => {
        // userAds = [...userAds, { ...doc.data(), id: doc.id }]
        const ad = doc.data()
        const adEndDate = new Date(ad.adEndDate).getTime()
        ad.endTimeStamp = adEndDate
        ad.id = doc.id
        if (adEndDate > now) selling = [...selling, ad]
        else expired = [...expired, ad]
      })
    )

  return { expired, selling }
}
