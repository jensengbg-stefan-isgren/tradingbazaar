import styled, { keyframes } from 'styled-components'
import { auth } from 'services/firebase'
import menuDark from 'assets/icons/menu-dark.svg'
import menuLight from 'assets/icons/menu-light.svg'
import userLight from 'assets/icons/user-light.svg'
import userDark from 'assets/icons/user-dark.svg'
import googleIcon from 'assets/icons/google-icon.svg'
import facebookIcon from 'assets/icons/facebook-icon.svg'
import exclamationIcon from 'assets/icons/exclamation.svg'
import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import CategoryMenu from 'components/CategoryMenu'
import searchDark from 'assets/icons/search-dark.svg'
import searchLight from 'assets/icons/search-light.svg'
import ToggleSwitch from 'components/ToggleSwitch'
import useSignin from 'hooks/useSignin'
import SearchContainer from './SearchContainer'

const SignInButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em 1em;
  outline: none;
  border: 1px solid lightgrey;
  background-color: white;
  font-family: ${(props) => props.theme.font.body} p {
    margin-left: 1em;
  }

  img {
    height: 30px;
  }
`

const UsrMenu = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 64px;
  padding: 2em 1em;
  right: 0;
  width: 70%;
  max-width: 20em;
  min-width: 18em;
  min-height: calc(100vh - 64px);
  background-color: ${({ theme }) => theme.background};
  position: fixed;
  transition: transform 0.2s ease-in-out;
  transform: translateX(100%);
  z-index: 999;

  &.sliding {
    transform: translateX(0%);
  }

  .greeting {
    margin-bottom: 1.5em;
  }

  .error-container {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .provider-container {
    width: 100%;
    margin: 2em 0;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .email-container,
  .member-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5em;
    width: 100%;
    margin: 1em 0;

    button {
      outline: none;
      border: none;
      height: 3em;
      width: 100%;
      display: block;
    }

    input {
      outline: none;
      border: 1px solid lightgrey;
      padding: 1em;
      width: 100%;
      height: 3em;
    }
    :focus {
      border: 1px solid darkgray;
    }
  }
`

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
width:100%;
  align-items: center;
  grid-template-areas: 'logo . nav'
                        'search search search';
  height: 64px;

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

  width: 100%;
      display: grid;
      padding: 0.5em 1em;

  .menu {
    height:64px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
    grid-area: nav;

    img {
      height: 30px;
    }
  }

  width: 100%;
    display: grid;
    gap: 0.5em;
    grid-area: search;
    padding-top: 0;
    padding-left: 1em;
    padding-right: 1em;
    padding-bottom: 1em;
    background-color: ${(theme) => theme.background};

    select {
      padding: 0 1em;
      border: 1px solid ${({ theme }) => theme.select.borderColor};
      height: 3em;
      width: 30%;

      @media (max-width:700px) {
        width:100%;
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
      background-color: ${({theme}) => theme.background};

      select {
        width: auto;
        border: none;
        margin-bottom: 0.5em;
      }
    }
  }
    }
`

const Wrapper = styled.div`
 
`

const NavWrapper = styled.div`
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
      width: 30%;

      @media (max-width:700px) {
        width:100%;
      }
    }

    input {
      width:70%;
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


const NavbarMobile = () => {
  const { registerAccount, history } = useSignin()

  const [toggleSearchBar, setToggleSearchBar] = useState(false)
  const menu = useRef()
  const accountMenu = useRef()
  const catMenu = useRef()
  // const { categories } = useSelector((state) => state.categories)
  const isVisible = useSelector((state) => state.nav.isVisible)
  const [valid, setValid] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [toggleVisibleSearch, setToggleVisibleSearch] = useState(false)
  const [toggleUserMenu, setToggleUserMenu] = useState(false)
  const [toggleCatMenu, setToggleCatMenu] = useState(false)
  const { themeMode } = useSelector((state) => state.theme)

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    if (!email || password.length <= 0) {
      setValid(false)
    } else {
      setValid(true)
    }
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [email, password])

  const toggleAccountMenu = () => {
    if (toggleVisibleSearch) {
      setToggleVisibleSearch(!toggleVisibleSearch)
    }

    // setToggleUserMenu(!toggleUserMenu);
  }

  const handleClick = (e) => {
    if (accountMenu.current === e.target) {
      setToggleUserMenu((toggleUserMenu) => !toggleUserMenu)
    } else if (menu.current.contains(e.target)) {
      // inside click
      return
    } else {
      setToggleUserMenu(false)
    }
  }

  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      history.push('/')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleSearchBar = () => {
    setToggleSearchBar(!toggleSearchBar)
  }

  return (
    <Wrapper>
      <UsrMenu ref={menu} className={toggleUserMenu ? `sliding` : ''}>
        <p className="greeting">Welcome</p>
        <ToggleSwitch />
        <div className="provider-container">
          <SignInButton
            className="pulsing"
            onClick={() => registerAccount('google')}
          >
            <img src={googleIcon} alt="" />
            <p>Sign in with Google</p>
          </SignInButton>
          <SignInButton onClick={() => registerAccount('facebook')}>
            <img src={facebookIcon} alt="" />
            <p>Sign in with Facebook</p>
          </SignInButton>
        </div>
        <div className="email-container">
          <p>Sign in with email</p>
          <input onChange={handleEmail} type="email" placeholder="Email" />
          <input
            onChange={handlePassword}
            type="password"
            placeholder="Password"
          />

          <button disabled={!valid} onClick={login}>
            Sign in
          </button>
        </div>
        <div className="member-container">
          <p>Sign up</p>

          <button onClick={() => history.push('/register')}>Sign up</button>
        </div>
        {errorMessage ? (
          <div className="error-container">
            <img className="warning-icon" src={exclamationIcon} alt="" />
            <p>{errorMessage}</p>
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </UsrMenu>
      <NavWrapper>
      <div className={`container ${!isVisible ? 'show-nav' : 'no-nav'}`}>
        <Nav>
          <div className="logo">
            <img
              ref={catMenu}
              // onClick={handleCatMenu}
              className="menu-icon"
              src={themeMode === 'light' ? menuDark : menuLight}
              alt=""
            />
            <h3 className="logo-title" onClick={() => history.push('/')}>
              TradingBazaar
            </h3>
          </div>

          <div className="menu">
            {!isVisible ? (
              <img
                className="search-icon"
                onClick={handleSearchBar}
                src={themeMode === 'light' ? searchDark : searchLight}
                alt=""
              />
            ) : (
              ''
            )}
            <img
              ref={accountMenu}
              onClick={toggleAccountMenu}
              className="nav"
              src={themeMode === 'light' ? userDark : userLight}
              alt=""
            />
          </div>
        </Nav>
        {!isVisible ? (
            <div
              className={`search-container ${
                toggleCatMenu || toggleUserMenu || toggleSearchBar ? 'hide' : ''
              }`}
            >
              <SearchContainer />
            </div>
          ) : (
            ''
          )}
      </div>
      <CategoryMenu
        toggleCatMenu={toggleCatMenu}
        setToggleCatMenu={setToggleCatMenu}
        catMenu={catMenu}
      />
      </NavWrapper>
    </Wrapper>
  )
}

export default React.memo(NavbarMobile)
