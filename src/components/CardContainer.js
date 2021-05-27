import styled from 'styled-components'
import ProductCard from 'components/ProductCard'

const CardContainer = ({ ads }) => {
  return (
    <StyledCardContainer>
      {Array.isArray(ads)
        ? ads.map((ad) => <ProductCard key={ad.id} ad={ad} />)
        : null}
    </StyledCardContainer>
  )
}

const StyledCardContainer = styled.section`
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
`

export default CardContainer
