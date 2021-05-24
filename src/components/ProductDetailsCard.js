import React,{useEffect} from 'react'
import styled from 'styled-components'
import {useParams} from 'react-router-dom'
import {getProduct} from 'services/collections'

const Wrapper = styled.div`
  height:100vh;
  width:100%;
  background-color:pink;

`




const ProductDetailsCard = () => {

  const {id} = useParams()
  getProduct(id)
  useEffect(() => {
    return () => {
    
    }
  }, [])
  
  



  return (
    <Wrapper>
      <h1>NOJJAN</h1>
    </Wrapper>
  )
}

export default ProductDetailsCard
