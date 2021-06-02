import React from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import CardContainer from 'components/CardContainer'
import {useSelector} from 'react-redux'

const StyledProductWrapper = styled.main`
padding-top: 10em;
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


const FilteredProducts = () => {

  const {category} = useParams()
const {filteredProducts} = useSelector(state => state.product)

  return (
    <StyledProductWrapper>
      <h3>{category}</h3>
      <CardContainer ads={filteredProducts} />
    </StyledProductWrapper>
  )
}

export default FilteredProducts
