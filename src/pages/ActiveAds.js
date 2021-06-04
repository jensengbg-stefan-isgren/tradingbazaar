import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CardContainer from 'components/CardContainer'
import { useSelector } from 'react-redux'
import getUserAds from 'functions/getUserAds'
import { useHistory } from 'react-router'

const ActiveItems = () => {
  const uid = useSelector((state) => state.auth.uid)
  const [ads, setAds] = useState([])
  const history = useHistory()

  useEffect(() => {
    if (uid)
      getUserAds(uid).then((data) => {
        setAds({ ...data })
      })
  }, [uid])

  return (
    <Wrapper>
      <div className="title-container">
        <h3>Your Ads</h3>
      </div>
      <button onClick={() => history.push('/addad')}>Add a new AD</button>
      <div>
        <h2>Open Auctions</h2>
        {ads.selling ? (
          <CardContainer ads={ads.selling} />
        ) : (
          <div>
            <h3>No open auctions at the moment</h3>
          </div>
        )}
      </div>
      <div>
        <h2>Expired Auctions</h2>
        {ads.expired ? (
          <CardContainer ads={ads.expired} />
        ) : (
          <div>
            <h3>No expired auctions</h3>
          </div>
        )}
      </div>
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

  h2,
  h3 {
    padding: 1em;
    text-align: center;
  }
`

export default ActiveItems
