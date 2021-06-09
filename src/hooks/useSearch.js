import { db } from 'services/firebase'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fillAdList } from 'features/adsSlice'
import { trigram } from 'n-gram'

const useSearch = () => {
  const [category, setCategory] = useState(0)

  const dispatch = useDispatch()
  const searchResults = useCallback(
    async (searchValue, category) => {
      // if (!searchValue) return
      if (searchValue.length === 0) {
        console.log('useSearch empty')

        const snapshot = await db.collection('sellingProducts').get()
        let adList = []
        snapshot.forEach((snap) => {
          adList = [...adList, { ...snap.data(), id: snap.id }]
        })

        dispatch(fillAdList({ adList }))
      } else {
        console.log('useSearch', searchValue)

        if (category === 0) {
          let adList = []
          let querySnapshot = await db
            .collection('sellingProducts')
            .where('title', '==', `${searchValue}`)
            .get()

          if (querySnapshot.docs.length === 0) {
            return
          } else {
            querySnapshot.forEach((doc) => {
              adList = [...adList, { ...doc.data(), id: doc.id }]
            })
            dispatch(fillAdList({ adList }))
            let element = document.getElementById('products')
            element.scrollIntoView({ behavior: 'smooth' })
          }
        } else {
          const triString = trigram(searchValue.toLowerCase())
          console.log('searchValue', searchValue, triString)
          let adList = []
          let query = db.collection('sellingProducts')
          if (category) query = query.where('category', '==', `${category}`)
          triString.forEach(
            (tri) => (query = query.where(`trigram.${tri}`, '==', true))
          )
          const querySnapshot = await query.get()
          if (querySnapshot.docs.length === 0) {
            adList = []
            return
          } else {
            querySnapshot.forEach((doc) => {
              adList = [...adList, { ...doc.data(), id: doc.id }]
            })
            dispatch(fillAdList({ adList }))
            let element = document.getElementById('products')
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    },
    [dispatch]
  )

  return {
    searchResults,
    category,
    setCategory,
  }
}

export default useSearch
