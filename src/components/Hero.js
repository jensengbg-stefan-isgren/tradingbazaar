import React,{useEffect,useCallback} from "react";
import styled from "styled-components";
import heroImg from "assets/images/hero-bg.png";
import {useDispatch,useSelector} from 'react-redux'
import {setIsVisible} from 'features/navSlice'

const Wrapper = styled.section`
  position: relative;
  height: 70vh;
  width: 100vw;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 70vh;
    width: 100%;
    background:rgba(226, 5, 225, 0.5);
background: -webkit-linear-gradient(bottom left, rgba(226, 5, 225, 0.5), rgba(206, 233, 2, 0.5));
background: -moz-linear-gradient(bottom left, rgba(226, 5, 225, 0.5), rgba(206, 233, 2, 0.5));
background: linear-gradient(to top right, rgba(226, 5, 225, 0.5), rgba(206, 233, 2, 0.5)),url(${heroImg});
    opacity: 0.9;
    background-size: cover;
    background-position: fixed;

  }`;


const SearchContainer = styled.div`


select,input {
  min-height:3.5em;
  padding:.5em;
  border:none;
  outline:none;
}

input {
  min-width:25em;
  padding-left:1em;
}

select {
  color:black;
  background-color:#f7f7f2
}

option {
  background-color:#f7f7f2;
}

`


const Container = styled.div`
  height: 70vh;
  position: relative;
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

  h1 {
    transform:translateY(-1em);
    color: #f7f7f2;
    font-size: 3.5vw;
  }
`;

const Hero = () => {

  const {categories } = useSelector((state) => state.categories)
  const dispatch = useDispatch();

  const handleScroll = useCallback(
    async() => {
      const element = document.getElementById('search')

      if(!element) {
        return
      } else {
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top >= -50 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        dispatch((setIsVisible(isInViewport)))
      }



    },
    [dispatch],
  )

useEffect(() => {
  dispatch((setIsVisible(true)))
  window.addEventListener('scroll', handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
}, [dispatch,handleScroll])


  return (
    <Wrapper>
      <Container>
        <h1>We make trading products easy for everyone</h1>
        <SearchContainer id="search">
        {categories ?   <select defaultValue={{label:"All Categories", value:0}} name="categories" id="categories">
          <option>All Categories</option>
            {categories.map((category) => {
              return <option key={category.name} value={category.name}>{category.name}</option>
            })}
          </select> : ""}
          <input placeholder="What are you looking for today?" type="text" />
        </SearchContainer>
      </Container>
    </Wrapper>
  );
};

export default Hero;
