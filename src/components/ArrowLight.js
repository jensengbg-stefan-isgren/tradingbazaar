import React from 'react'
import styled from 'styled-components'
import downArrow from 'assets/icons/arrow-light.svg'

const Wrapper = styled.div`

.downArrow{
  cursor: pointer;
	position: absolute;
	bottom:10%;
	left: 50%;

  img {
    width:50px;
    height:auto;
    fill:red;
  }
}
.bounce {
	-moz-animation: bounce 3s infinite;
	-webkit-animation: bounce 3s infinite;
	animation: bounce 3s infinite;
}
@-moz-keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -moz-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -moz-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  60% {
    -moz-transform: translateY(-15px);
    transform: translateY(-15px);
  }
}
@-webkit-keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  60% {
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
  }
}
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  40% {
    -moz-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    -webkit-transform: translateY(-30px);
    transform: translateY(-30px);
  }
  60% {
    -moz-transform: translateY(-15px);
    -ms-transform: translateY(-15px);
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
  }
}



`

const Arrow = () => {

  const scroll = () => {
    let element = document.getElementById('products')
    element.scrollIntoView({behavior: "smooth"});
  }
  

  return (
    <Wrapper>
          <div className="downArrow bounce">
    <img onClick={scroll}  src={downArrow} alt="" />
  </div>
    </Wrapper>

  )
}

export default Arrow
