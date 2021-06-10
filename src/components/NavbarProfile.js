import React, { useState, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import ProfileMenu from 'components/ProfileMenu'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import menuLight from 'assets/icons/menu-light.svg'
import menuDark from 'assets/icons/menu-dark.svg'
import CategoryMenu from 'components/CategoryMenu'
// import useSearch from 'hooks/useSearch'
import ToggleSwitch from 'components/ToggleSwitch'

import { useLocation } from 'react-router-dom'
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

const StyledLink = styled(Link)`
  text-decoration: none;

  font-size: 1.4em;
  padding: 0.5em;
`

const Navigation = styled.nav`

  position: fixed;
  z-index:1000;
  width:100%;
  top:0;
  left:0;


  .logo {
    grid-area: logo;
    display: flex;
    align-items: center;

    img {
      padding-left: 1em;
      margin-right:1em;
      height:20px;
    }

    p {
      cursor: pointer;
    }
  }


  li {
    padding: 0.5em;
    text-decoration: none;
    font-size: 1.4em;
  }

  p:first-child {
    cursor: pointer;
  }

  .no-nav {
    /* animation: ${fadeOut} 300ms; */
    transition: all 0.5s ease;

      background-color: none;
    }


    .show-nav {
      /* animation: ${fadeIn} 300ms ; */
      transition: all 0.5s ease;
      background-color:${({ theme }) => theme.background};
    }


    /* background-color: ""; */

      .container {
      height: 4em;
      display: grid;
      grid-template-areas: 'logo search nav';
      position: relative;
      z-index:1000;
      top:0;
      width:100%;
      font-size: 16px;

      @media screen and (max-width: 1244px) {
        height:64px;
          grid-template-areas: 'logo nav'
          'search search';
      }
      

      .search-container {
      width:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      place-content:center;
      grid-area: search;
      background-color: ${({ theme }) => theme.background};
      select {
        background-color: ${({ theme }) => theme.input.background};
        border: 1px solid ${({ theme }) => theme.input.borderColor};
        height: 3em;
        border-right:none;

        color: ${({ theme }) => theme.select.textColor};
        outline: none;
        width:30%;

        font-weight: 600;
        font-size: 0.8em;
        padding-left: .5em;
      }

      input {
        font-size: 0.8em;

         background-color: ${({ theme }) => theme.input.background};
          height: 3em;
          width: 70%;
          padding-left: 0.5em;
          border: 1px solid ${({ theme }) => theme.input.borderColor};
          color: ${({ theme }) => theme.input.textColor};

          ::placeholder {
              color: ${({ theme }) => theme.input.textColor};
          }
      }

      @media (max-width:1180px) {
        padding:0 .5em 1em .5em;
      }
    }

      .nav-links {
        height:64px;
        grid-area: nav;
        display:flex;
        gap:2em;
        cursor: pointer;
        align-items: center;
        justify-content: flex-end;


          .active {
            background-color: white;
          }

          .menu-container {
            display:flex;
            justify-content: center;
            align-items:center;
            position: relative;

            img {
              height:1em;
            }
          }
        }       
      

    /* select {
      background-color: ${({ theme }) => theme.input.background};
      border: 1px solid ${({ theme }) => theme.input.borderColor};
      height: 40px;
      border-right:none;

      color: ${({ theme }) => theme.select.textColor};
      outline: none;
      width:30%;

      font-weight: 600;
      font-size: 0.8em;
      padding-left: .5em;
    } */

    p {

      font-size: 2em;
    }
    a {
      margin: 0 0em;
      text-decoration: none;
    }
  }`

// const StyledInput = styled.input`
//   background-color: ${({ theme }) => theme.input.background};
//   height: 40px;
//   width: 70%;
//   padding-left: 0.5em;
//   border: 1px solid ${({ theme }) => theme.input.borderColor};
//   color: ${({ theme }) => theme.input.textColor};

//   ::placeholder {
//     color: ${({ theme }) => theme.input.textColor};
//   }
// `

const NavbarProfile = () => {
  const location = useLocation()

  // const { searchResults, category, setCategory } = useSearch()

  const catMenu = useRef()
  const accountMenu = useRef()
  const history = useHistory()
  // const { categories } = useSelector((state) => state.categories)

  const [toggleCatMenu, setToggleCatMenu] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)

  const isVisible = useSelector((state) => state.nav.isVisible)
  const { themeMode } = useSelector((state) => state.theme)

  return (
    <Navigation>
      <div className={`container ${!isVisible ? 'show-nav' : 'no-nav'}`}>
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
        {!isVisible || location.pathname !== '/' ? (
          <div className="search-container">
            <SearchContainer />
          </div>
        ) : (
          ''
        )}
        <div className="nav-links">
          <ToggleSwitch />
          <StyledLink to="/profile/wish-list">Wishlist</StyledLink>
          <StyledLink to="/profile/active-items">Buy</StyledLink>
          <StyledLink to="/profile/active">Sell</StyledLink>
          <div className="menu-container">
            <li ref={accountMenu}>Menu</li>
          </div>
        </div>
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
    </Navigation>
  )
}

export default React.memo(NavbarProfile)

// <div className="search-container">
//             <select
//               onChange={(e) => setCategory(e.target.value)}
//               name="category"
//               id="category"
//             >
//               <option value={0}>All Categories</option>
//               {categories.map((category) => {
//                 return (
//                   <option key={category.name} value={category.name}>
//                     {category.name}
//                   </option>
//                 )
//               })}
//             </select>
//             <StyledInput
//               onChange={(e) => searchResults(e.target.value, category)}
//               placeholder="What are you looking for today?"
//             />
//           </div>
