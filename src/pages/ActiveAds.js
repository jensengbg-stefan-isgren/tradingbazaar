import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CardContainer from 'components/CardContainer'
import { useSelector } from 'react-redux'
import getUserAds from 'functions/getUserAds'
import { useHistory } from 'react-router'

const ActiveItems = () => {
  document.title = 'Trading Bazaar | My Ads'

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
      <button className="add-btn" onClick={() => history.push('/addad')}>
        Add a new AD
      </button>
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
  margin-top: 5em;
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  h2,
  h3 {
    padding: 1em;
    text-align: center;
  }

  button {
    border: none;
    outline: none;
  }

  .add-btn {
    margin: 0.3em 0;
    padding: 1em;
    background-color: ${({ theme }) => theme.addBtn.backgroundColor};
    color: ${({ theme }) => theme.addBtn.textColor};
  }
`

export default ActiveItems
