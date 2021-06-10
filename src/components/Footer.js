import React from 'react'
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  height: 10em;
  margin-top:4em;
  padding: 1em 1em;
  display:flex;
  align-items: center;
  justify-content:center;

  .title {
    display:flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    gap:.5em;
  }

`;

const Footer = () => {
  return (
<FooterWrapper>
  <div className="title">
    <h3>We are TradingBazaar, your platform for smooth shopping</h3>
    <p>Any questions drop us an email at hello@tradingbazaar.info </p>
  </div>
</FooterWrapper>
  )
}

export default Footer