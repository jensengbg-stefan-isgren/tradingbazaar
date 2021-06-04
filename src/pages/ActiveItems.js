import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CardContainer from 'components/CardContainer'
import { useSelector } from 'react-redux'
import getProdsByArrOfId from 'functions/getProdsByArrOfId'

const ActiveItems = () => {
  document.title = 'Trading Bazaar | My Bids'

  const activeProdArr = useSelector((state) => state.auth.user?.userBids)
  const [ads, setAds] = useState([])

  useEffect(() => {
    if (activeProdArr != null) {
      getProdsByArrOfId(activeProdArr).then((data) => {
        setAds([...data])
      })
    }
  }, [activeProdArr])

  return (
    <Wrapper>
      <div className="title-container">
        <h3>Active Orders</h3>
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

// const Container = styled.div`
//   margin-top: 4em;
//   min-height: 60vh;
//   width: 60vw;
//   place-content:center;
//   text-align: center;
//   border:1px solid lightgrey;

//   @media (max-width: 768px) {
//     grid-template-columns: repeat(1, 1fr);
//     grid-auto-rows: minmax(5vh, 1fr);
//   }
// `;

export default ActiveItems
