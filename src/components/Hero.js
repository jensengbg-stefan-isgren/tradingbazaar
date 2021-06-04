import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import heroImg from 'assets/images/hero-bg.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { setIsVisible } from 'features/navSlice'
import useSearch from 'hooks/useSearch'


const Wrapper = styled.section`
  position: relative;
  height: 70vh;
  width: 100vw;

  ::before {
    content: '';
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
`

const SearchContainer = styled.div`
  width:100%;
  padding:0 1em;
  display:flex;
  justify-content: center;
  flex-direction: row;

  select,
  input {
    min-height: 3.5em;
    padding: 0.5em;
    border: none;
    outline: none;
  }

  input {
    min-width: 25em;
    padding-left: 1em;
  }

  select {
    color: black;
    background-color: #f7f7f2;
  }

  option {
    background-color: #f7f7f2;
  }

  @media (max-width: 768px) {
  flex-direction: column;

  input {
    min-width:auto;
  }
}
`

const Container = styled.div`
  height: 70vh;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 1em;
    color: #f7f7f2;
    font-size: clamp(40px, 5vw, 70px);


  }

  .title-container {
    padding:0em 1em;
  }



`

const Hero = () => {


  const {searchResults,category,setCategory} = useSearch()

  // const [searchValue, setSearchValue] = useState('')
  const { categories } = useSelector((state) => state.categories)
  const dispatch = useDispatch()
  const handleScroll = useCallback(async () => {
    const element = document.getElementById('search')
    if (!element) {
      return
    } else {
      const rect = element.getBoundingClientRect()
      const isInViewport = rect.top >= 0
      dispatch(setIsVisible(isInViewport))
    }
  }, [dispatch])


  useEffect(() => {
    dispatch(setIsVisible(true))
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, handleScroll])



  return (
    <Wrapper>
      <Container>
        <div className="title-container">
        <h1>We make trading products easy for everyone</h1>
        </div>
        <SearchContainer id="search">
          {categories ? (
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="categories"
              id="categories"
            >
              <option value={0}>All Categories</option>
              {categories.map((category) => {
                return (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          ) : (
            ''
          )}
          <input
            onChange={(e) => searchResults(e.target.value,category)}
            placeholder="What are you looking for today?"
            type="text"
          />
        </SearchContainer>
      </Container>
    </Wrapper>
  )
}

export default Hero
