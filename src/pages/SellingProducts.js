import styled from 'styled-components'
// import ProductCard from 'components/ProductCard'
import CardContainer from 'components/CardContainer'
import { useSelector } from 'react-redux'
import UseGetAds from 'services/useGetAds'
import React from 'react'
import Hero from 'components/Hero'

const ProductSection = () => {
  const ads = useSelector((state) => state.ads)
  UseGetAds()

  return (
    <StyledProductWrapper>
      <Hero />
      <h2>Products</h2>
      {/* <section className="card-cont">
        {Array.isArray(ads)
          ? ads.map((ad) => <ProductCard key={ad.id} ad={ad} />)
          : null}
      </section> */}

      <CardContainer ads={ads} />
    </StyledProductWrapper>
  )
}

// {
//   /* <ProductCard imgLink="https://cdn.pixabay.com/photo/2020/08/23/08/54/slippers-5510231_960_720.jpg" /> */
// }

const StyledProductWrapper = styled.main`
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
    /* grid-template-columns: repeat(auto-fit, minmax(19.2em, 1fr)); */
    grid-template-columns: repeat(auto-fit, 19.2em);

    row-gap: 0.8em;
    column-gap: 0.8em;
    justify-items: center;
    justify-content: center;
    /* gap: 0.5em; */
  }
`

export default React.memo(ProductSection)
