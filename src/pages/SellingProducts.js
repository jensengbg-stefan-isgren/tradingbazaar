import styled from 'styled-components'
import ProductCard from 'components/ProductCard'
import { useDispatch, useSelector } from 'react-redux'
// import {  } from 'features/adsSlice'
import userGetAds from 'services/useGetAds'



const ProductSection = () => {
  const ads = useSelector((state) => state.ads)
  // const ads = userGetAds()
  userGetAds()
  return (
    <StyledProductWrapper>
      <h2>Products</h2>
      <section className="card-cont">
        {Array.isArray(ads)
          ? ads.map((ad) => <ProductCard key={ad.id} ad={ad} />)
          : null}
      </section>
    </StyledProductWrapper>
  )
}

{
  /* <ProductCard imgLink="https://cdn.pixabay.com/photo/2020/08/23/08/54/slippers-5510231_960_720.jpg" /> */
}

const StyledProductWrapper = styled.main`
  background-color: lightgray;
  /* height: 200em; */
  /* margin: auto;
  max-width: 95vw; */
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; */

  h2 {
    padding: 1em;
  }

  .card-cont {
    max-width: 95vw;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(19.2em, 1fr));
    /* grid-template-columns: repeat(auto-fill, 1fr); */
    row-gap: 0.8em;
    column-gap: 0.3em;
    justify-items: center;
    justify-content: space-evenly;
    /* gap: 0.5em; */
  }
`

export default ProductSection
