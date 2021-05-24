import styled from 'styled-components'
import image from 'assets/images/img-placeholder.svg'
import FavoriteFill from 'assets/icons/favorite_fill.svg'
import FavoriteOutline from 'assets/icons/favorite_outline.svg'
import { useSelector } from 'react-redux'
import { db } from 'services/firebase'
import { useState } from 'react'

const ProductCard = ({ ad }) => {
  const { uid, isAuthenticated, favorites } = useSelector((state) => state.auth)
  //   console.log(ad)

  const [isFavorite, setIsFavorite] = useState(false)

  //   if (favorites.includes(ad.id)) setIsFavorite(true)
  console.log(ad.id, favorites.includes(ad.id), favorites)

  async function toggleFavorite() {
    if (!uid) return alert('Please Login to select your Favorites')

    const favoriteRef = await db
      .collection('users')
      .doc(uid)
      .collection('favorites')
      .add({ productId: ad.id })
    console.log('result fav', favoriteRef)

    console.log(await db.collection('users').doc(uid).get())

    // console.log('favorite key', favoriteRef.key())
    // favoriteRef
    //   .set({ productId: ad.id })
    //   .then((el) => console.log('result', el))
  }

  return (
    <StyledProduct>
      <div className="wrapper">
        <div className="img-cont">
          <img src={ad.imgLink1 || image} alt="product" />
        </div>
        <div className="title-cont">
          <p>{ad.title}</p>
        </div>
        <div className="bottom-cont">
          <p>{ad.startPrice} Kr</p>
          <p>0 Bids</p>
          <button onClick={toggleFavorite} disabled={!isAuthenticated}>
            <img
              src={isFavorite ? FavoriteFill : FavoriteOutline}
              alt="favorite"
            ></img>
          </button>

          <p>Time Left</p>
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
      padding: 0.2em;
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

export default ProductCard
