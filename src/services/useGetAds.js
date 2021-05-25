import { db } from '../services/firebase'
import { useDispatch } from 'react-redux'
import { fillAdList } from 'features/adsSlice'
import { useEffect } from 'react'

const UseGetAds = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getAds = async () => {
      const snapshot = await db.collection('sellingProducts').get()
      let adList = []
      snapshot.forEach((snap) => {
        adList = [...adList, { ...snap.data(), id: snap.id }]
      })

      dispatch(fillAdList({ adList }))
    }
    getAds()
  }, [dispatch])
}

export default UseGetAds
