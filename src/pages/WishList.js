import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import firebase, { db } from 'services/firebase'
import styled from 'styled-components'
import CardContainer from 'components/CardContainer'

const WishList = () => {
  const wishedProdArr = useSelector((state) => state.auth.user?.favorites)
  const [ads, setAds] = useState([])

  useEffect(() => {
    if (wishedProdArr != null) {
      async function getFavoriteProds() {
        let locWishArr = [...wishedProdArr]
        let favProdArr = []

        do {
          const loopWishArr = locWishArr.slice(0, 10)
          locWishArr = locWishArr.slice(10)

          await db
            .collection('sellingProducts')
            .where(firebase.firestore.FieldPath.documentId(), 'in', loopWishArr)
            .get()
            .then((snapshot) =>
              snapshot.forEach((doc) => {
                favProdArr = [...favProdArr, { ...doc.data(), id: doc.id }]
              })
            )
        } while (locWishArr.length > 0)
        setAds([...favProdArr])
      }
      getFavoriteProds()
    }
  }, [wishedProdArr])

  return (
    <Wrapper>
      <div className="title-container">
        <h3>Wishlist</h3>
      </div>
      {/* <Container>
        {ads.map((ad, key) => (
          <div key={key}>{ad.title}</div>
        ))}
      </Container> */}
      <CardContainer ads={ads} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 2em;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Container = styled.div`
  margin-top: 4em;
  min-height: 60vh;
  width: 60vw;
  place-content: center;
  text-align: center;
  border: 1px solid lightgrey;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(5vh, 1fr);
  }
`
export default WishList
