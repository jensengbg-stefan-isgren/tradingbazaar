import { db } from '../services/firebase'
import { useDispatch } from 'react-redux'
import { fillAdList } from 'features/adsSlice'
import { useEffect } from 'react'

const UseGetAds = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const getAds = async () => {
      // const snapshot = await db.collection('sellingProducts').get()
      let query = db.collection('sellingProducts')
      // query = query.where('triagram.ny', '==', true)
      // query = query.where('triagram.as', '==', true)
      // query = query.where('triagram.ff', '==', true)
      // query = query.where('triagram.fg', '==', true)
      // query = query.where('triagram.gf', '==', true)
      // query = query.where('triagram.jj', '==', true)
      // query = query.where('triagram.qw', '==', true)
      // query = query.where('triagram.re', '==', true)
      // query = query.where('triagram.sd', '==', true)
      // query = query.where('triagram.ty', '==', true)
      // query = query.where('triagram.we', '==', true)
      // query = query.where('triagram.ing', '==', true)
      // ny
      // as
      // ff
      // fg
      // gf
      // jj
      // qw
      // re
      // sd
      // ty
      // we

      const snapshot = await query.get()

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
