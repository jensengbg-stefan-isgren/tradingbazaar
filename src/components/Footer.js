import React from 'react'
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  min-height:10em;
  background-color:darkgrey;
  margin-top:4em;

  
`;

const Footer = () => {
  return (
<FooterWrapper>
  <div>
    <p>Footer</p>
  </div>
</FooterWrapper>
  )
}

export default Footer