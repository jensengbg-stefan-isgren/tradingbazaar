import styled from 'styled-components'

const ProductSection = () => {
  return (
    <StyledProductWrapper>
      <h2>Products</h2>
    </StyledProductWrapper>
  )
}

const StyledProductWrapper = styled.main`
  display: flex;
  justify-content: center;

  h2 {
    padding: 1em;
  }
`

export default ProductSection
