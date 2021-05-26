import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addDetailedProduct, clearProduct } from 'features/productSlice'
import { db } from 'services/firebase'
import { bid } from 'features/productSlice'

const ProductDetailsCard = () => {
  const [mainImage, setMainImage] = useState(null)
  const [seller, setSeller] = useState()
  const [myBid, setMyBid] = useState('')
  const { detailedProduct } = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const { id } = useParams()

  const addBid = () => {
    setMyBid(Number(myBid))
    const value = Number(myBid)
    if (!value || value <= 0) return alert('Please write your bid in the field')
    dispatch(bid(value))
    setMyBid('')
  }

  const getProduct = useCallback(async () => {
    const snapshot = await db.collection('sellingProducts').doc(id).get()
    const data = await snapshot.data()
    // vi får kolla upp vad om en annan användare man kan läsa ifall man sätter regler.
    const snapshott = await db.collection('users').doc(data.uid).get()
    const data2 = await snapshott.data()
    setSeller(data2)
    dispatch(addDetailedProduct({ productDetail: data, productId: id }))
  }, [dispatch, id])

  useEffect(() => {
    getProduct()

    return () => {
      dispatch(clearProduct(null))
    }
  }, [getProduct, dispatch])

  const handleImage = (e) => {
    setMainImage(e.target.src)
  }

  return (
    <Wrapper>
      {detailedProduct ? (
        <Container>
          <div className="title-container">
            <h4>{detailedProduct.title}</h4>
          </div>
          <div className="image-container">
            {mainImage ? (
              <img src={mainImage} alt="" />
            ) : (
              <img src={detailedProduct.imgLink1} alt="" />
            )}
          </div>
          <div className="thumbnail-container">
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
          </div>
          <div className="condition-container">
            <h4>Condition</h4>
            <p>{detailedProduct.productConditions}</p>
          </div>
          <div className="description-container">
            <h4>Description</h4>
            <p>{detailedProduct.description}</p>
          </div>
          <div className="price-box">
            <div className="price-section">
              <div className="price-container">
                {detailedProduct.highestBid ? (
                  <>
                    <p>Highest bid</p>
                    <p>{detailedProduct.highestBid}kr</p>
                  </>
                ) : (
                  <>
                    <p>Utropspris</p>
                    <p>{detailedProduct.startPrice}kr</p>
                  </>
                )}
              </div>
              <div className="time-container">
                <p>Slutar den 123</p>
                <p>{detailedProduct.adEndDate}</p>
              </div>
              <div className="bid-container">
                <p>Bids</p>
                <p>{!detailedProduct.bids ? 0 : detailedProduct.bids}st</p>
              </div>
            </div>
            <input
              className="input"
              type="number"
              placeholder="Enter your price"
              value={myBid}
              onChange={(e) => setMyBid(e.target.value)}
            />
            <button onClick={addBid} className="button bid">
              Add bid
            </button>
            <button className="button buy-now">
              Buy now {detailedProduct.acceptedPrice} kr
            </button>
            <button className="button save">Save</button>
            {seller ? (
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
          </div>
        </Container>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

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

  grid-template-areas:
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
    'seller seller';

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
    margin-bottom: 1em;
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

  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 100%);
    grid-template-areas:
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
      'seller';

    .price-box {
      padding-left: 0;
    }
  }
`

export default ProductDetailsCard
