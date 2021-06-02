import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import heroImg from "assets/images/hero-bg.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsVisible } from "features/navSlice";
// import {db} from 'services/firebase'

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
    background: rgba(226, 5, 225, 0.5);
    background: -webkit-linear-gradient(
      bottom left,
      rgba(226, 5, 225, 0.5),
      rgba(206, 233, 2, 0.5)
    );
    background: -moz-linear-gradient(
      bottom left,
      rgba(226, 5, 225, 0.5),
      rgba(206, 233, 2, 0.5)
    );
    background: linear-gradient(
        to top right,
        rgba(226, 5, 225, 0.5),
        rgba(206, 233, 2, 0.5)
      ),
      url(${heroImg});
    opacity: 0.9;
    background-size: cover;
    background-position: fixed;
  }
`;

const SearchContainer = styled.div`
  select,
  input {
    min-height: 3.5em;
    padding: 0.5em;
    border: none;
    outline: none;
  }

  input {
    width: 25em;
    padding-left: 1em;
  }

  select {
    color: black;
    background-color: #f7f7f2;
  }

  option {
    background-color: #f7f7f2;
  }

  @media (max-width: 700px) {
    display:flex;
    width:80%;
    flex-direction: column;
    justify-content: center;

    input {
      width:100%;
    }
  }
`;

const Container = styled.div`
  height: 70vh;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    transform: translateY(-1em);
    color: #f7f7f2;
    font-size: 3.5vw;
  }
`;

const Hero = () => {
  const [category, setCategory] = useState("All Categories");

  const [searchValue, setSearchValue] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const handleScroll = useCallback(async () => {
    const element = document.getElementById("search");
    if (!element) {
      return;
    } else {
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top >= 0;
      dispatch(setIsVisible(isInViewport));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setIsVisible(true));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, handleScroll]);

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };



  return (
    <Wrapper>
      <Container>
        <h1>We make trading products easy for everyone</h1>
        <SearchContainer id="search">
          {categories ? (
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="categories"
              id="categories"
            >
              <option>All Categories</option>
              {categories.map((category) => {
                return (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          ) : (
            ""
          )}
          <input
            onChange={handleInput}
            placeholder="What are you looking for today?"
            type="text"
          />
        </SearchContainer>
      </Container>
    </Wrapper>
  );
};

export default Hero;
