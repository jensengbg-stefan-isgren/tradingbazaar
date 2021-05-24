import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top:2em;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

`;

const Container = styled.div`
  margin-top: 4em;
  min-height: 60vh;
  width: 60vw;
  place-content:center;
  text-align: center;
  border:1px solid lightgrey;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(5vh, 1fr);
  }
`;





const ActiveItems = () => {
  return (
    <Wrapper>
      <div className="title-container">
        <h3>Active Orders</h3>
      </div>
      <Container>
        
      </Container>
    </Wrapper>
  )
}

export default ActiveItems