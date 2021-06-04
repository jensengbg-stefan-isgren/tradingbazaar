import React, { useEffect, useState, useCallback, useRef } from 'react'
import ChangeHighlight from 'react-change-highlight'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDetailedProduct, clearProduct } from 'features/productSlice'
import { db } from 'services/firebase'
import { bid } from 'features/productSlice'
import timeLeftFunc from 'functions/timeLeftInterval'
import TimeLeftParagraph from './TimeLeftParagraph'
import { toast } from 'react-toastify'

const ProductDetailsCard = () => {
  const { id } = useParams()

  const detailedProduct = useSelector((state) => state.product.detailedProduct)
  const { uid, isAuthenticated } = useSelector((state) => state.auth)
  const favorites = useSelector((state) => state.auth.user.favorites)

  // const state = useSelector((state) => ({
  //   uid: state.auth.uid,
  //   isAuthenticated: state.auth.isAuthenticated,
  //   favorites: state.auth.user.favorites,
  // }))

  const [mainImage, setMainImage] = useState(null)
  const [seller, setSeller] = useState()
  const [adStatus, setAdStatus] = useState(0)
  // adStatus
  // = 0 -> bid open
  // = 1 -> sold
  // = 2 -> sold directly
  // = 3 -> expired
  const [myBid, setMyBid] = useState('')
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const highestBidRef = useRef(null)
  const bidsRef = useRef(null)
  const leadingBidderRef = useRef(null)

  const [endDate, setEndDate] = useState({ date: '', time: '' })
  console.log(
    'now',
    // user?.favorites.includes(id),
    detailedProduct,
    isAuthenticated,
    seller?.id
  )
  const [isFavorite, setIsFavorite] = useState(
    favorites ? favorites.includes(id) : false
  )

  const [highlighted, setHighlighted] = useState({
    highestBid: 0,
    bids: 0,
    leadingBidder: 0,
  })

  const dispatch = useDispatch()

  const timerCallback = (timeObj) => {
    setTimeLeft({ ...timeObj })
  }

  const bidderText = () => {
    switch (adStatus) {
      case 0: {
        if (highlighted.bids) return 'Last bid by - '
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

  const addBid = () => {
    if (!isAuthenticated) return toast.warn('Please Login to make your bid')
    setMyBid(Number(myBid))
    const value = Number(myBid)
    if (!value || value <= 0)
      return toast.warn('Please write your bid in the field')
    dispatch(bid(value))
    setMyBid('')
  }

  const getProduct = useCallback(
    (callback) => {
      // const snapshot = await db.collection('sellingProducts').doc(id).get()
      // const data = await snapshot.data()
      let stopInterval = 0

      const unSubscribe = db
        .collection('sellingProducts')
        .doc(id)
        .onSnapshot((doc) => {
          dispatch(
            addDetailedProduct({ productDetail: doc.data(), productId: id })
          )
          let { highestBid, bids, leadingBidder } = doc.data()
          highestBid = highestBid ? highestBid : doc.data().startPrice
          bids = bids ? bids : 0
          // leadingBidder = leadingBidder ? leadingBidder : 'Anonymous'

          setHighlighted({ highestBid, bids, leadingBidder })
          const date = new Date(doc.data().adEndDate || '')
          const now = new Date()

          if (date.getFullYear() === 1900) setAdStatus(2)
          else if (now > date) {
            if (doc.data().highestBid > 0) setAdStatus(1)
            else setAdStatus(3)
          }

          setEndDate({
            date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            time: `${date.getHours()}:${('0' + String(date.getMinutes())).slice(
              -2
            )}`,
          })
          // console.log(user?.favorites.includes(id))
          if (favorites && favorites.includes(id)) setIsFavorite(true)
          else setIsFavorite(false)

          db.collection('users')
            .doc(doc.uid)
            .get()
            .then((data) => setSeller(data))

          const timerDate = doc.data().adEndDate || 0
          stopInterval = timeLeftFunc(timerDate || 0, timerCallback)

          callback(stopInterval, unSubscribe)
        })

      // vi får kolla upp om en annan användare kan läsa från user ifall man sätter regler.
      // const snapshott = await db.collection('users').doc(data.uid).get()
      // const data2 = await snapshott.data()
      // setSeller(data2)
      // dispatch(addDetailedProduct({ productDetail: data, productId: id }))
    },
    [dispatch, id, favorites]
  )

  useEffect(() => {
    console.log('effect1')
    let stopInterval = 0
    let unSubscribe = null
    // const date = new Date(new Date().getTime() + 1 * 6000)
    // const date = detailedProduct?.adEndDate || 0

    // if (stopInterval) clearInterval(stopInterval)
    // stopInterval = timeLeftFunc(date || 0, timerCallback)

    // if (isAuthenticated || favorites) {

    function callback(interval, unSubscr) {
      stopInterval = interval
      unSubscribe = unSubscr
    }

    // const { unSubscribe, stopInterval } = getProduct(callback)
    getProduct(callback)
    return () => {
      console.log('returning')
      dispatch(clearProduct(null))
      unSubscribe()
      clearInterval(stopInterval)
    }
    // }
  }, [getProduct, dispatch])

  // const [stopIntervall, setStopInterval] = useState(0)
  // useEffect(() => {
  //   console.log('effect2')

  //   let stopInterval = 0
  //   // const date = new Date(new Date().getTime() + 1 * 6000)
  //   const date = detailedProduct?.adEndDate || 0

  //   if (stopInterval) clearInterval(stopInterval)
  //   stopInterval = timeLeftFunc(date || 0, timerCallback)
  //   return () => clearInterval(stopInterval)
  // }, [detailedProduct])

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
                  <p ref={highestBidRef}>{highlighted.highestBid}kr</p>
                </ChangeHighlight>
                {/* <>
                    <p>{detailedProduct.startPrice}kr</p>
                  </> */}
              </div>
              <div className="time-container">
                <p>End date</p>
                <p
                  style={{ textAlign: 'right' }}
                >{`${endDate.date}-${endDate.time}`}</p>
              </div>

              <div className="time-container">
                <p>Time left</p>
                <TimeLeftParagraph timeLeft={timeLeft} />
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
                    {!highlighted.bids ? 0 : highlighted.bids}st
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
                    {highlighted.leadingBidder}
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
                  <input
                    className="input"
                    type="number"
                    placeholder="Enter your price"
                    value={myBid}
                    onChange={(e) => setMyBid(e.target.value)}
                  />
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
                  >
                    Save {isFavorite ? 'true' : 'false'}
                  </button>
                </div>
              ) : null
            ) : (
              <div className="seller-section">
                <button className="button remove">Remove Product</button>
              </div>
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

const Wrapper = styled.div`
  height: auto;
  width: auto;
  display: grid;
  justify-content: center;
`

const Container = styled.div`
  margin-top: 1em;
  height: auto;
  width: auto;
  background-color: white;
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
      color: ${(props) => props.theme.color.input};

      background-color: ${(props) => props.theme.button.outline};
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