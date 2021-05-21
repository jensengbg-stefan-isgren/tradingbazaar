import { useEffect } from 'react'
import { db } from '../services/firebase'
import { useDispatch } from 'react-redux'
import { fillAdList } from 'features/adsSlice'

const useGetAds = () => {
  // let ads = []
  //   const [ads, setAds] = useState([])
  const dispatch = useDispatch()
  //   const ads = useSelector((state) => state.ads)

  useEffect(() => {
    const getAds = async () => {
      const snapshot = await db.collection('sellingProducts').get()
      console.log('useEffect')
      let adList = []
      snapshot.forEach((snap) => {
        // console.log(snap)
        adList = [...adList, { ...snap.data(), id: snap.id }]
      })
      dispatch(fillAdList({ adList }))
    }
    getAds()
  }, [dispatch])
}

export default useGetAds
