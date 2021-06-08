import React, { useEffect, useState, useRef } from 'react'
import ChangeHighlight from 'react-change-highlight'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { bid, setNewBid, removeProduct, prodAmend } from 'features/productSlice'
import timeLeftFunc from 'functions/timeLeftInterval'
import TimeLeftParagraph from './TimeLeftParagraph'
import { authToggleFavorite } from 'features/auth/authSlice'

import UseGetAd from 'services/useGetAd'

const ProductDetailsCard = () => {
  const { id } = useParams()
  const history = useHistory()
  // const {
  //   detailedProduct,
  //   seller,
  //   adStatus,
  //   isFavorite,
  //   endDate,
  // } = useSelector((state) => state.product)

  const detailedProduct = useSelector((state) => state.product.detailedProduct)
  const seller = useSelector((state) => state.product.seller)
  const adStatus = useSelector((state) => state.product.adStatus)
  const endDate = useSelector((state) => state.product.endDate)

  const { uid, isAuthenticated } = useSelector((state) => state.auth)
  const favorites = useSelector((state) => state.auth.user.favorites)

  const dispatch = useDispatch()

  const [mainImage, setMainImage] = useState(null)

  const highestBidRef = useRef(null)
  const bidsRef = useRef(null)
  const leadingBidderRef = useRef(null)

  const bidderText = () => {
    switch (adStatus) {
      case 0: {
        if (detailedProduct.bids) return 'Last bid by - '
        else return 'No bids yet'
      }
      case 1:
        return 'Auction won by - '
      case 2:
        return 'Bought directly by - '
      case 3:
        return 'No bids - Time expired'
      default:
    }
  }

  const resell = async () => {
    const res = await dispatch(prodAmend({ id, amend: false }))
    if (!res.error) history.push('/addad')
  }

  const amend = async () => {
    const res = await dispatch(prodAmend({ id, amend: true }))
    if (!res.error) history.push('/addad')
  }

  const addBid = () => {
    dispatch(bid())
  }

  UseGetAd(id)

  const handleImage = (e) => {
    setMainImage(e.target.src)
  }

  return (
    <Wrapper>
      {detailedProduct ? (
        <Container>
          <GridElement className="title-container">
            <h4>{detailedProduct.title}</h4>
          </GridElement>
          <GridElement className="image-container">
            {mainImage ? (
              <img src={mainImage} alt="" />
            ) : (
              <img src={detailedProduct.imgLink1} alt="" />
            )}
          </GridElement>
          <GridElement className="thumbnail-container">
            <img onClick={handleImage} src={detailedProduct.imgLink1} alt="" />
            {detailedProduct.imgLink2 ? (
              <img
                onClick={handleImage}
                src={detailedProduct.imgLink2}
                alt=""
              />
            ) : (
              ''
            )}
            {detailedProduct.imgLink3 ? (
              <img
                onClick={handleImage}
                src={detailedProduct.imgLink3}
                alt=""
              />
            ) : (
              ''
            )}
            {detailedProduct.imgLink4 ? (
              <img
                onClick={handleImage}
                src={detailedProduct.imgLink4}
                alt=""
              />
            ) : (
              ''
            )}
            {detailedProduct.imgLink5 ? (
              <img
                onClick={handleImage}
                src={detailedProduct.imgLink5}
                alt=""
              />
            ) : (
              ''
            )}
          </GridElement>
          <GridElement className="condition-container">
            <h4>Condition</h4>
            <p>{detailedProduct.productConditions}</p>
          </GridElement>
          <GridElement className="description-container">
            <h4>Description</h4>
            <p>{detailedProduct.description}</p>
          </GridElement>
          <GridElement className="price-box">
            <div className="price-section">
              <div className="price-container">
                {detailedProduct.highestBid ? (
                  <p>Highest bid</p>
                ) : (
                  <p>Utropspris</p>
                )}

                <ChangeHighlight
                  containerClassName="highlightCont"
                  highlightClassName="highlightClass"
                  hideAfter="800"
                >
                  <p ref={highestBidRef}>
                    {detailedProduct.shownPrice}
                    kr
                  </p>
                </ChangeHighlight>
              </div>
              <div className="time-container">
                <p>End date</p>
                <p
                  style={{ textAlign: 'right' }}
                >{`${endDate.date}-${endDate.time}`}</p>
              </div>

              <div className="time-container">
                <p>Time left</p>
                <TimerComponent />
                {/* {renderTimeLeft()} */}
              </div>
              <div className="bid-container">
                <p>Bids</p>
                <ChangeHighlight
                  containerClassName="highlightCont"
                  highlightClassName="highlightClass"
                  hideAfter="800"
                >
                  <p ref={bidsRef}>
                    {!detailedProduct.bids ? 0 : detailedProduct.bids}st
                  </p>
                </ChangeHighlight>
              </div>
            </div>

            <div className="bidder-container">
              <ChangeHighlight
                containerClassName="highlightCont"
                highlightClassName="highlightClass"
                hideAfter="800"
              >
                <p style={{ textAlign: 'center' }}>
                  {bidderText()}
                  {/* adStatus === 0 ?  highlighted.leadingBidder ? `Last bid by - ` : `No bids yet`  */}
                  <strong ref={leadingBidderRef}>
                    {detailedProduct.leadingBidder}
                  </strong>
                </p>
              </ChangeHighlight>
            </div>
            {/* {highlighted.bids ? ( */}
            {/* ) : null} */}

            {/* <p></p> */}
            {uid !== detailedProduct.uid || !isAuthenticated ? (
              !adStatus ? (
                <div className="buyer-section">
                  <BidInput />
                  {/* <input
                    className="input"
                    type="number"
                    placeholder="Enter your price"
                    value={newBid}
                    onChange={(e) => dispatch(setNewBid(e.target.value))}
                  /> */}
                  <button
                    onClick={addBid}
                    // disabled={uid === detailedProduct.uid}
                    className="button bid"
                  >
                    Add bid
                  </button>
                  <button
                    className="button buy-now"
                    disabled={
                      detailedProduct.acceptedPrice <=
                      detailedProduct.highestBid
                    }
                  >
                    Buy now {detailedProduct.acceptedPrice} kr
                  </button>
                  <button
                    className="button save"
                    // disabled={uid === detailedProduct.uid}
                    onClick={() => dispatch(authToggleFavorite(id))}
                  >
                    {favorites.includes(id)
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'}
                  </button>
                </div>
              ) : null
            ) : (
              <>
                <div className="seller-section">
                  <button
                    onClick={() => dispatch(removeProduct(id))}
                    className="button remove"
                  >
                    {detailedProduct.removed ? 'Remove Auction' : 'Add Auction'}
                  </button>
                </div>
                <div className="seller-section">
                  <button onClick={amend} className="button">
                    Amend
                  </button>
                </div>
                <div className="seller-section">
                  <button onClick={resell} className="button">
                    New Auction
                  </button>
                </div>
              </>
            )}
            {seller && uid !== detailedProduct.uid ? (
              <div className="seller-title-container">
                <h4>About the seller</h4>
                <div className="seller-container">
                  <button>Contact the seller</button>
                  <button>See all products</button>
                </div>
              </div>
            ) : (
              ''
            )}
          </GridElement>
        </Container>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

const GridElement = React.memo(({ className, children }) => {
  return <div className={className}>{children}</div>
})

const BidInput = () => {
  const dispatch = useDispatch()
  const newBid = useSelector((state) => state.product.newBid)
  return (
    <>
      <input
        className="input"
        type="number"
        placeholder="Enter your price"
        value={newBid}
        onChange={(e) => dispatch(setNewBid(e.target.value))}
      />
    </>
  )
}

const TimerComponent = () => {
  const detailedProduct = useSelector((state) => state.product.detailedProduct)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const timerCallback = (timeObj) => {
    setTimeLeft({ ...timeObj })
  }
  useEffect(() => {
    let interval = timeLeftFunc(detailedProduct.adEndDate || 0, timerCallback)
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [detailedProduct])

  return (
    <>
      <TimeLeftParagraph timeLeft={timeLeft} />
    </>
  )
}

const Wrapper = styled.div`
  padding-top: 5em;
  height: auto;
  width: auto;
  display: grid;
  justify-content: center;
`

const Container = styled.div`
  margin-top: 1em;
  height: auto;
  width: auto;
  background-color: ${({theme}) => theme.productCard.background};
  display: grid;
  grid-template-columns: 30em 12em;
  padding: 1em;
  /* grid-template-areas:
    'title title'
    'image bid'
    'image bid'
    'thumbs thumbs'
    'con .'
    'desc .'
    '. input'
    '. bidbutton'
    '. savebtn'
    '. buynow'
    'seller seller'; */
  grid-template-areas:
    'title title'
    'image bid'
    'image bid'
    'thumbs thumbs'
    'con .'
    'desc .';

  .condition-container {
    grid-area: con;
  }

  .seller-title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .seller-container {
    width: 100%;
    padding: 2em;
    background-color: #f7f7f2;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1em;
    


    button {
      padding: 0.5em;
    }
  }

  input {
    width: 100%;
    height: 2.5em;

    ::placeholder {
      padding-left: 0.5em;
    }
  }

  .price-section {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    padding: 1em;
    background-color: #f7f7f2;
    /* margin-bottom: 1em; */
    
    p {
      color: ${({theme}) => theme.productCard.textColor};
    }
  }

  .thumbnail-container {
    grid-area: thumbs;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    margin-bottom: 1em;
    width: 100%;
    justify-content: flex-start;

    img {
      width: 80px;
    }
  }

  .description-container {
    grid-area: desc;
  }

  .title-container {
    margin-bottom: 1em;
    grid-area: title;
  }

  .image-container {
    margin-bottom: 1em;
    grid-area: image;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .price-box {
    grid-area: bid;
    padding-left: 1em;
    margin: 0em 0;
    font-size: 14px;
  }

  .bidder-container {
    padding: 0.8em 0;
  }

  .price-container,
  .time-container,
  .bid-container {
    display: flex;
    gap: 1em;
    justify-content: space-between;
  }

  .button {
    margin: 1em 0;
    width: 100%;
    padding: 0.5em;
    display: block;

    .bid {
      grid-area: bidbutton;
    }

    .save {
      grid-area: savebtn;
    }

    .buy.now {
      grid-area: buynow;
    }
  }

  .highlightCont {
    p,
    strong {
      transition: all 0.2s ease;
    }
    .highlightClass {
      font-weight: bold;
    }
  }

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 100%);
    /* grid-template-areas:
      'title'
      'image'
      'thumbs'
      'bid'
      'con'
      'desc'
      'input'
      'bidbutton'
      'savebtn'
      'buynow'
      'seller'; */
    grid-template-areas:
      'title'
      'image'
      'thumbs'
      'bid'
      'con'
      'desc';

    .price-box {
      padding-left: 0;
    }
  }
`

export default ProductDetailsCard
