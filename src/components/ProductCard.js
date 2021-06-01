import styled from 'styled-components'
import { Link } from 'react-router-dom'
import image from 'assets/images/img-placeholder.svg'
import FavoriteFill from 'assets/icons/favorite_fill.svg'
import FavoriteOutline from 'assets/icons/favorite_outline.svg'
import { useSelector, useDispatch } from 'react-redux'
import { authToggleFavorite } from 'features/auth/authSlice'
import TimeLeftFunc from 'functions/timeLeft'
import TimeLeftParagraph from 'components/TimeLeftParagraph'
import { toast } from 'react-toastify'

import React from 'react'

const ProductCard = ({ ad }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  async function toggleFavorite(event) {
    // if (!isAuthenticated) return alert('Please Login to select your Favorites')
    if (!isAuthenticated)
      return toast.warn('Please Login to save your favorite items')

    dispatch(authToggleFavorite(ad.id))
  }

  return (
    <StyledProduct>
      <div className="wrapper">
        <Link to={`/item/${ad.id}`}>
          <div className="img-cont">
            <img src={ad.imgLink1 || image} alt="product" />
          </div>
          <div className="title-cont">
            <p>{ad.title}</p>
          </div>
        </Link>

        <div className="bottom-cont">
          <p>{ad.startPrice} Kr</p>
          <p>{!ad.bids ? 0 : ad.bids} Bids</p>
          <BtnFavorite
            onClick={toggleFavorite}
            // disabled={!isAuthenticated}
            bck={
              user?.favorites?.includes(ad.id) ? FavoriteFill : FavoriteOutline
            }
          ></BtnFavorite>

          <TimeLeftParagraph
            timeLeft={TimeLeftFunc(ad.adEndDate)}
            detailed={true}
            ad={ad}
          />
        </div>
      </div>
    </StyledProduct>
  )
}

// https://cdn.pixabay.com/photo/2020/08/23/08/54/slippers-5510231_960_720.jpg
// https://images.unsplash.com/photo-1599947820870-247640d0bfeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80

const StyledProduct = styled.div`
  background-color: white;
  padding: 0.6em;
  /* storleken på Bilden och width här nedan styr storleken på hela kortet */
  /* ändra även  */
  width: 19.2em;
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > div:not(:first-child) {
      margin-top: 0.6em;
    }
  }

  .img-cont {
    width: 18em;
    height: 18em;
    background-color: ${(props) => props.theme.color.main};
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      background-color: white;
      max-width: 100%;
      max-height: 100%;
      transform: scale(1.4);
      transition: transform 0.3s ease;
    }
    &:hover img {
      transform: scale(1.2);
    }
  }

  .title-cont {
    background-color: ${(props) => props.theme.button.bckDark};
    width: 100%;
    p {
      padding: 0.3em;
      text-align: center;
      color: ${(props) => props.theme.button.color};
    }
  }
  .bottom-cont {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const BtnFavorite = styled.button(
  ({ bck = '' }) => `
  
  width: 1.8em;
  height: 1.7em;
  color: none;
  background-image: url(${bck});
  background-repeat: no-repeat;
  background-size: contain;
  background-color: transparent;
  border: none;
  cursor: pointer;

`
)

export default ProductCard
