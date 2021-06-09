import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import userLight from 'assets/icons/user-light.svg'
import userDark from 'assets/icons/user-dark.svg'
import menuDark from 'assets/icons/menu-dark.svg'
import menuLight from 'assets/icons/menu-light.svg'
import { useSelector } from 'react-redux'
import ProfileMenu from 'components/ProfileMenu'
import CategoryMenu from 'components/CategoryMenu'
// import useSearch from 'hooks/useSearch'
import searchLight from 'assets/icons/search-light.svg'
import searchDark from 'assets/icons/search-dark.svg'
import SearchContainer from './SearchContainer'

const fadeIn = keyframes`
  from {
    opacity: .4;
  }

  to {
    opacity:1;
  }
`

const fadeOut = keyframes`
  from {
    background-color: white;
  }

  to {
    background-color: none;
  }
`

// const StyledInput = styled.input`
//   min-width: 20em;
//   border: 1px solid ${({ theme }) => theme.select.borderColor};
//   outline: none;
//   height: 3em;
//   padding-left: 0.5em;

//   ::placeholder {
//   }

//   @media (max-width: 700px) {
//     width: 100%;
//     padding: 0 1em;
//   }

//   @media (max-width: 500px) {
//     border: 1px solid ${({ theme }) => theme.select.borderColor};
//   }
// `

const Nav = styled.nav`
  display: grid;
  align-items: center;
  grid-template-areas: 'logo search nav';
  height: 64px;
  padding: 0 1em;

  .logo {
    display: flex;
    align-items: center;
    img {
      height: 20px;
      margin-right: 1em;
    }
  }

  h1 {
    cursor: pointer;
  }

  .menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
    grid-area: nav;

    img {
      height: 30px;
    }
  }

  @media (max-width: 700px) {
    height: 64px;
    background-color: '';
    padding: 1em;

    grid-template-areas:
      'logo logo nav'
      'search search search';

    .search-container {
      width: 100%;
      display: grid;
      padding: 0.5em 1em;

      select {
        width: auto;
        border: none;
        margin-bottom: 0.5em;
      }
    }
  }
`

const Wrapper = styled.div`
  .container {
    .hide {
      display: none;
    }

    .search-container {
    }
  }

  .search-container {
    width: 100%;
    display: grid;
    gap: 0.5em;
    grid-area: search;
    padding-top: 0;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 1em;

    select {
      padding: 0 1em;
      border: 1px solid ${({ theme }) => theme.select.borderColor};
      height: 3em;
      /* width: 100%; */
    }

    input {
      min-width: 20em;
      border: 1px solid ${({ theme }) => theme.select.borderColor};
      outline: none;
      height: 3em;
      padding-left: 0.5em;

      ::placeholder {
      }

      @media (max-width: 700px) {
        width: 100%;
        padding: 0 1em;
      }

      @media (max-width: 500px) {
        border: 1px solid ${({ theme }) => theme.select.borderColor};
      }
    }

    .logo {
      grid-area: logo;
    }
  }

  .no-nav {
    /* animation: ${fadeOut} 300ms; */
    transition: all 0.5s ease;

    background-color: none;
  }

  .show-nav {
    /* animation: ${fadeIn} 300ms; */
    transition: all 0.5s ease;

    background-color: ${({ theme }) => theme.background};
  }

  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;

  @media (max-width: 700px) {
    .container {
      .hide {
        display: none;
      }

      .search-container {
      }
    }
  }
`

const NavbarMobileProfile = () => {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname.includes('/item')) {
      setToggleSearchBar(true)
    }
    return () => {}
  }, [location.pathname])

  // const { searchResults, category, setCategory } = useSearch()
  const catMenu = useRef()
  const accountMenu = useRef()
  const [toggleCatMenu, setToggleCatMenu] = useState(false)
  // const showMobileNav = useMediaQuery("(max-width:1000px)");
  const [toggleMenu, setToggleMenu] = useState(false)
  // const { categories } = useSelector((state) => state.categories)
  const isVisible = useSelector((state) => state.nav.isVisible)
  const { themeMode } = useSelector((state) => state.theme)
  const history = useHistory()

  const [toggleSearchBar, setToggleSearchBar] = useState(false)

  const handleSearchBar = () => {
    setToggleSearchBar(!toggleSearchBar)
  }

  return (
    <Wrapper>
      <div className={`container ${!isVisible ? 'show-nav' : 'no-nav'}`}>
        <Nav>
          <div className="logo">
            {themeMode === 'light' ? (
              <img ref={catMenu} src={menuDark} alt="" />
            ) : (
              <img ref={catMenu} src={menuLight} alt="" />
            )}
            <h3 className="logo-title" onClick={() => history.push('/')}>
              TradingBazaar
            </h3>
          </div>

          <div className="menu">
            {!isVisible ? (
              <img
                onClick={handleSearchBar}
                src={themeMode === 'light' ? searchDark : searchLight}
                alt=""
              />
            ) : (
              ''
            )}
            {themeMode === 'light' ? (
              <img ref={accountMenu} className="nav" src={userDark} alt="" />
            ) : (
              <img ref={accountMenu} className="nav" src={userLight} alt="" />
            )}
          </div>
        </Nav>
        {!isVisible ? (
          <div
            className={`search-container ${
              toggleCatMenu || toggleMenu || toggleSearchBar ? 'hide' : ''
            }`}
          >
            <SearchContainer />

            {/* <select name="category" id="category">
              <option onChange={(e) => setCategory(e.target.value)} value={0}>
                All Categories
              </option>
              {categories.map((category) => {
                return (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                )
              })}
            </select>
            <StyledInput
              onChange={(e) => searchResults(e.target.value, category)}
              placeholder="What are you looking for today?"
            /> */}
          </div>
        ) : (
          ''
        )}
      </div>
      <ProfileMenu
        setToggleMenu={setToggleMenu}
        toggleMenu={toggleMenu}
        accountMenu={accountMenu}
      />
      <CategoryMenu
        setToggleCatMenu={setToggleCatMenu}
        toggleCatMenu={toggleCatMenu}
        catMenu={catMenu}
      />
    </Wrapper>
  )
}

export default React.memo(NavbarMobileProfile)
