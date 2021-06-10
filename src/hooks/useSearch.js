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
      if (searchValue.length === 0) {
        const snapshot = await db.collection('sellingProducts').get()
        let adList = []
        snapshot.forEach((snap) => {
          adList = [...adList, { ...snap.data(), id: snap.id }]
        })

        dispatch(fillAdList({ adList }))
      } else {
        const triString = trigram(searchValue.toLowerCase())

        let adList = []
        let query = db.collection('sellingProducts')
        if (category && category !== '0')
          query = query.where('category', '==', `${category}`)
        triString.forEach(
          (tri) => (query = query.where(`trigram.${tri}`, '==', true))
        )
        const querySnapshot = await query.get()

        if (querySnapshot.docs.length === 0) {
          adList = []
        } else {
          querySnapshot.forEach((doc) => {
            adList = [...adList, { ...doc.data(), id: doc.id }]
          })
        }
        dispatch(fillAdList({ adList }))
        let element = document.getElementById('products')
        element.scrollIntoView({ behavior: 'smooth' })
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
