import {db} from 'services/firebase'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {fillAdList} from 'features/adsSlice'

const useSearch = () => {


  const [category,setCategory] = useState(0)

  const dispatch = useDispatch()
const searchResults = async(searchValue,category) => {

  
  if(searchValue.length === 0) {
  
    const snapshot = await db.collection('sellingProducts').get()
    let adList = []
    snapshot.forEach((snap) => {
      adList = [...adList, { ...snap.data(), id: snap.id }]
    })

    dispatch(fillAdList({ adList }))

  } else {
    if(category === 0) {
      let adList = []
      let querySnapshot = await db.collection('sellingProducts')
      .where('title', '==', `${searchValue}`).get()
      if(querySnapshot.docs.length == 0) {
        return
      } else {
        querySnapshot.forEach(doc => {
          adList = [...adList,{ ...doc.data(), id: doc.id }]
        });
        dispatch(fillAdList({adList}))
      }
    } else {
      let adList = []
      let querySnapshot = await db.collection('sellingProducts')
      .where('category','==', `${category}`)
      .where('title', '==', `${searchValue}`).get()
      if(querySnapshot.docs.length == 0) {
        return
      } else {
        querySnapshot.forEach(doc => {
          adList = [...adList,{ ...doc.data(), id: doc.id }]
          
        });
        dispatch(fillAdList({adList}))
      }
    }
  
  }








}



return {
  searchResults,
  category,
  setCategory
}


}

export default useSearch
