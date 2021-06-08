import styled from 'styled-components'
import CardContainer from 'components/CardContainer'
import { useSelector } from 'react-redux'
// import UseGetAds from 'services/useGetAds';
import React from 'react'
import Hero from 'components/Hero'
import HeroDark from 'components/HeroDark'
import UpArrowDark from 'assets/icons/uparrow-dark.svg'
import UpArrowLight from 'assets/icons/uparrow-light.svg'

const ProductSection = () => {
  document.title = 'Trading Bazaar'

  const { isVisible } = useSelector((state) => state.nav)

  const { themeMode } = useSelector((state) => state.theme)

  const scrollToTop = () => {
    let element = document.getElementById('root')
    element.scrollIntoView({ behavior: 'smooth' })
  }

  const ads = useSelector((state) => state.ads)
  // UseGetAds();
  console.log('rendering')
  return (
    <StyledProductWrapper>
      <div className="container">
        {themeMode === 'light' ? <Hero /> : <HeroDark />}
        <div id="products">
          <h2>Open Auctions</h2>
          {ads.selling ? (
            <CardContainer ads={ads.selling} />
          ) : (
            <div className="empty-section">
              <h3>No open auctions at the moment</h3>
            </div>
          )}
        </div>
        <div>
          <h2>Expired Auctions</h2>
          {ads.expired.length ? (
            <CardContainer ads={ads.expired} />
          ) : (
            <StyledEmptySection>
              <h3>No expired auctions</h3>
            </StyledEmptySection>
          )}
        </div>
        <div className="image-container">
          {!isVisible ? (
            <img
              onClick={scrollToTop}
              className="arrow-icon"
              src={themeMode === 'light' ? UpArrowDark : UpArrowLight}
              alt=""
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </StyledProductWrapper>
  )
}

// {
//   /* <ProductCard imgLink="https://cdn.pixabay.com/photo/2020/08/23/08/54/slippers-5510231_960_720.jpg" /> */
// }

const StyledEmptySection = styled.div`
  min-height: 20em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
`

const StyledProductWrapper = styled.main`
  .container {
    position: relative;

    .image-container {
      height: 2em;
      position: sticky;
      bottom: 1em;
      width: 100%;
      padding-right: 0.5em;
      display: flex;
      justify-content: flex-end;

      img {
        height: 2em;
      }
    }
  }

  h2,
  h3 {
    padding: 1em;
    text-align: center;
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
