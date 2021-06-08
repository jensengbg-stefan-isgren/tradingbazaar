import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import menuLight from 'assets/icons/menu-light.svg'
import menuDark from 'assets/icons/menu-dark.svg'
import CategoryMenu from 'components/CategoryMenu'
import { useState, useRef } from 'react'
import useSearch from 'hooks/useSearch'
import ToggleSwitch from 'components/ToggleSwitch'
import InputSearch from './InputSearch'

const fadeIn = keyframes`
  from {
    opacity: .4;
  }

  to {
    opacity:1;
  }
`;

const fadeOut = keyframes`
  from {
    background-color: white;
  }

  to {
    background-color: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  font-size: 1.4em;
  padding: 0.5em;
`;

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
    animation: ${fadeOut} 300ms;
    background-color: none;
  }


  .show-nav {
    animation: ${fadeIn} 300ms ;
    background-color:${({theme}) => theme.background};
  }


  background-color: "";

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
          align-items: center;
          place-content:center;
          grid-area: search;
          background-color: ${({theme}) => theme.background};


          @media (max-width:1244px) {
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
     }

      select {
        background-color: ${({theme}) => theme.input.background};
        border: 1px solid ${({theme}) => theme.input.borderColor};
        height: 40px;
        border-right:none;

        color: ${({theme}) => theme.select.textColor};
        outline: none;
        width:30%;

        font-weight: 600;
        font-size: 0.8em;
        padding-left: .5em;
      }

      p {

        font-size: 2em;
      }
    }

    a {
      margin: 0 0em;
      text-decoration: none;
    }
  `;

// const StyledInput = styled.input`
//   background-color: ${({theme}) => theme.input.background};
//   height: 40px;
//   width: 70%;
//   padding-left: 0.5em;
//   border: 1px solid ${({theme}) => theme.input.borderColor};
//   color: ${({theme}) => theme.input.textColor};
  

//   ::placeholder {
//     color: ${({theme}) => theme.input.textColor};
    
//   }
// `;

const Navbar = () => {
  // const { searchResults, category, setCategory } = useSearch()
  const { setCategory } = useSearch()
  const catMenu = useRef()
  const history = useHistory()
  const [toggleCatMenu, setToggleCatMenu] = useState(false)
  const { categories } = useSelector((state) => state.categories)
  const isVisible = useSelector((state) => state.nav.isVisible)
  const { themeMode } = useSelector((state) => state.theme)

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  // const handleCatMenu = () => {
  //   setToggleCatMenu(!toggleCatMenu)
  // }

  const handleClick = (e) => {
    // console.log(e.target)
    // console.log(accountMenu.current)
    // if(accountMenu.current == e.target) {
    //   setToggleUserMenu((toggleUserMenu) =>
    //     !toggleUserMenu
    //   )
    // }
    // else if (accountMenu.current.contains(e.target)) {
    //   console.log("UTANFÖR!!!")
    //   // inside click
    //   return;
    // } else  {
    //   setToggleUserMenu(false)
    // }
  }

  return (
    <Navigation>
      <div className={`container ${!isVisible ? 'show-nav' : 'no-nav'}`}>
        <div className="logo">
          <img
            ref={catMenu}
            src={themeMode === 'light' ? menuDark : menuLight}
            alt=""
          />
          <h3 className="logo-title" onClick={() => history.push('/')}>
            TradingBazaar
          </h3>
        </div>
        {!isVisible ? (
          <div className="search-container">
            <select
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
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
            {/* <StyledInput
              onChange={(e) => searchResults(e.target.value, category)}
              placeholder="What are you looking for today?"
            /> */}
            <InputSearch />
          </div>
        ) : (
          ''
        )}
        <div className="nav-links">
          <ToggleSwitch />
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </div>
      </div>
      <CategoryMenu
        toggleCatMenu={toggleCatMenu}
        setToggleCatMenu={setToggleCatMenu}
        catMenu={catMenu}
      />
    </Navigation>
  )
}

export default Navbar
