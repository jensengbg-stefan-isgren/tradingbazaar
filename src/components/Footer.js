import React from 'react'
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  min-height:400px;
  background-color:darkgrey;
  margin-top:4em;
`;

const Footer = () => {
  return (
<FooterWrapper>
  <h1>FOOTER</h1>
</FooterWrapper>
  )
}

export default Footer