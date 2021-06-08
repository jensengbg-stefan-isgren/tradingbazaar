import firebase from "firebase";
import styled, { keyframes } from "styled-components";
import { auth } from "services/firebase";
import menuDark from "assets/icons/menu-dark.svg";
import menuLight from "assets/icons/menu-light.svg";
import userLight from "assets/icons/user-light.svg";
import userDark from "assets/icons/user-dark.svg";
import { useHistory } from "react-router-dom";
import googleIcon from "assets/icons/google-icon.svg";
import facebookIcon from "assets/icons/facebook-icon.svg";
import exclamationIcon from "assets/icons/exclamation.svg";
import React, { useState, useEffect,useRef } from "react";
import { checkIfRegistered } from "features/auth/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CategoryMenu from "components/CategoryMenu";
import searchDark from 'assets/icons/search-dark.svg'
import searchLight from 'assets/icons/search-light.svg'
import ToggleSwitch from 'components/ToggleSwitch'

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
`;

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
  background-color: white;
  position: absolute;
  transition: transform 0.2s ease-in-out;
  transform: translateX(100%);
  z-index: 999;

  &.sliding {
    transform: translateX(0%);
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
      font-family: ${(props) => props.theme.font.body};
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
      font-family: ${(props) => props.theme.font.body};
    }
    :focus {
      border: 1px solid darkgray;
    }
  }
`;

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

const StyledInput = styled.input`
 
  min-width: 20em;
  outline: none;
  height: 3em;
  padding-left: 0.5em;


  ::placeholder {

  }

  @media (max-width: 500px) {
    border: none;
  }
`;

const Wrapper = styled.div`
  .no-nav {
    animation: ${fadeOut} 300ms;
    background-color: none;
  }

  .show-nav {
    animation: ${fadeIn} 300ms;
    background-color: ${({theme}) => theme.background};
  }

  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const Nav = styled.nav`
  display: grid;
  align-items: center;
  grid-template-areas: "logo search nav";
  height: 64px;
  padding: 0 1em;

  .menu-icon {
    margin-right: 1em;
    height: 20px;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  h1 {
    cursor: pointer;
  }

  .search-container {
    width: 100%;
    grid-area: search;

    select {
      height: 3em;
      width: 9em;
    }

    .logo {
      grid-area: logo;
    }
  }

  .menu {
    display:flex;
    justify-content:flex-end;
    align-items: center;
    gap:1em;
    grid-area: nav;

    img {
      height: 30px;
    }
  }

  @media (max-width: 700px) {
    height: auto;
    background-color: "";
    padding: .91em;


    grid-template-areas:
      "logo logo nav"
      "search search search";

    .search-container {
      width: 100%;
      display: grid;
      padding: 0.5em 0;

      select {
        width: auto;
        padding-left: 0.5em;
        border: none;
        margin-bottom: 0.5em;
      }
    }

    .hide {
      display:none;
    }
  }
`;

const NavbarMobile = () => {
  const [toggleSearchBar,setToggleSearchBar] = useState(false)
  const menu = useRef()
  const accountMenu = useRef()
  const catMenu = useRef()
  const { categories } = useSelector((state) => state.categories);
  const isVisible = useSelector((state) => state.nav.isVisible);
  const dispatch = useDispatch();
  const history = useHistory();
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleVisibleSearch, setToggleVisibleSearch] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const [toggleCatMenu, setToggleCatMenu] = useState(false);
  const {themeMode} = useSelector(state => state.theme)

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    if (!email || password.length <= 0) {
      setValid(false);
    } else {
      setValid(true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [email, password]);

  const toggleAccountMenu = () => {
    if (toggleVisibleSearch) {
      setToggleVisibleSearch(!toggleVisibleSearch);
    }

    // setToggleUserMenu(!toggleUserMenu);
  };


  const handleClick = e => {
    console.log(e.target)
    console.log(accountMenu.current)
    if(accountMenu.current === e.target) {
      setToggleUserMenu((toggleUserMenu) => 
        !toggleUserMenu
      )
    }
    else if (menu.current.contains(e.target)) {
      console.log("UTANFÖR!!!")
      // inside click
      return;
    } else  {
      setToggleUserMenu(false)
    }
  };


  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/profile/overview");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const registerAccount = async (provider) => {
    let authProvider;

    switch (provider) {
      case "google":
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case "facebook":
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      default:
    }

    try {
      await firebase.auth().signInWithPopup(authProvider);

      history.push("/profile/overview");
      dispatch(checkIfRegistered({ status: null, message: null }));
    } catch ({ code, message }) {
      if (code === "auth/account-exists-with-different-credential") {
        await dispatch(checkIfRegistered({ status: true, message: message }));
        history.push("/login");
      }
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSearchBar = () => {
    setToggleSearchBar(!toggleSearchBar)
    console.log(toggleSearchBar)
  }
  



  return (
    <Wrapper>
      <UsrMenu ref={menu} className={toggleUserMenu ? `sliding` : ""}>
        <p>Welcome</p>
        <ToggleSwitch/>
        <div className="provider-container">
          <SignInButton
            className="pulsing"
            onClick={() => registerAccount("google")}
          >
            <img src={googleIcon} alt="" />
            <p>Sign in with Google</p>
          </SignInButton>
          <SignInButton onClick={() => registerAccount("facebook")}>
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

          <button onClick={() => history.push("/register")}>Sign up</button>
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

      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`}>
        <Nav>
          <div className="logo">
            <img
            ref={catMenu}
              // onClick={handleCatMenu}
              className="menu-icon"
              src={themeMode === 'light' ? menuDark : menuLight}
              alt=""
            />
            <h3 className="logo-title" onClick={() => history.push("/")}>TradingBazaar</h3>
          </div>
          {!isVisible ? (
            <div className={`search-container ${toggleCatMenu || toggleUserMenu || toggleSearchBar ? "hide" : ""}`}>
              <select name="category" id="category">
                <option>All Categories</option>
                {categories.map((category) => {
                  return (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <StyledInput placeholder="What are you looking for today?" />
            </div>
          ) : (
            ""
          )}
          <div className="menu">
           {!isVisible ?  <img onClick={handleSearchBar} src={themeMode === 'light' ? searchDark : searchLight} alt="" /> : ""}
            <img
            ref={accountMenu}
              onClick={(toggleAccountMenu)}
              className="nav"
              src={themeMode === 'light' ? userDark : userLight}
              alt=""
            />
          </div>
        </Nav>
      </div>
      <CategoryMenu toggleCatMenu={toggleCatMenu} setToggleCatMenu={setToggleCatMenu} catMenu={catMenu} />
    </Wrapper>
  );
};

export default NavbarMobile;
