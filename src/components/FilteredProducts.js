import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import CardContainer from 'components/CardContainer'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredProducts } from 'features/productSlice'

const StyledProductWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5em;
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
  const dispatch = useDispatch()
  const { category } = useParams()
  const filteredProducts = useSelector(
    (state) => state.product.filteredProducts
  )

  useEffect(() => {
    dispatch(fetchFilteredProducts(category))
  }, [dispatch, category])

  return (
    <StyledProductWrapper>
      <div className="title-container">
        <h2>{category}</h2>
      </div>
      <CardContainer ads={filteredProducts} />
    </StyledProductWrapper>
  )
}

export default FilteredProducts
