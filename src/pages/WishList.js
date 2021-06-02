import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import firebase, { db } from 'services/firebase'
import styled from 'styled-components'
import CardContainer from 'components/CardContainer'
import getProdsByArrOfId from 'functions/getProdsByArrOfId'

const WishList = () => {
  const wishedProdArr = useSelector((state) => state.auth.user?.favorites)
  const [ads, setAds] = useState([])

  useEffect(() => {
    if (wishedProdArr != null) {
      getProdsByArrOfId(wishedProdArr).then((data) => {
        setAds([...data])
      })
    }
  }, [wishedProdArr])

  return (
    <Wrapper>
      <div className="title-container">
        <h3>Wishlist</h3>
      </div>

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

export default WishList
