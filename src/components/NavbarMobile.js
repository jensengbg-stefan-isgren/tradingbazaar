import firebase from "firebase";
import styled from "styled-components";
import { auth } from "services/firebase";
import { useDispatch } from "react-redux";
import menuIcon from "assets/icons/menu.svg";
import userIcon from "assets/icons/user.svg";
import { useHistory } from "react-router-dom";
import searchIcon from "assets/icons/search.svg";
import googleIcon from "assets/icons/google-icon.svg";
import facebookIcon from "assets/icons/facebook-icon.svg";
import exclamationIcon from "assets/icons/exclamation.svg";
import React, { useState, useRef, useEffect } from "react";
import { checkIfRegistered } from "features/auth/authSlice";

const SignInButton = styled.button`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5em 1em;
  outline: none;
  border: 1px solid lightgrey;
  background-color:white;
  font-family: ${(props) => props.theme.font.body}
  p {
    margin-left: 1em;
  }

  img {
    height: 30px;
  }
`;

const MainMenu = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 64px;
  padding: 2em 1em;
  left: 0;
  width: 70%;
  min-height: calc(100vh - 64px);
  background-color: white;
  position: absolute;
  transition: transform 0.2s ease-in-out;
  transform: translateX(-100%);

  .input-container {
      display:flex;
      justify-content:center;
      align-items:center;

      input {
      outline: none;
      border:1px solid lightgrey;
      padding: 1em;
      width: 100%;
      height: 3em;
      font-family: ${(props) => props.theme.font.body}

    }
      :focus {
        
        border:1px solid darkgray;
      }

    }

  .menu-search-container {
    display:flex;
    flex-direction: column;
    align-items:center;

    p {
      margin-bottom:.5em;
    }
  }


  &.sliding-left {
    transform: translateX(0%);




  }
`;

const UsrMenu = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 64px;
  padding: 2em 1em;
  right: 0;
  width: 70%;
  min-height: calc(100vh - 64px);
  background-color: white;
  position: absolute;
  transition: transform 0.2s ease-in-out;
  transform: translateX(100%);
  
  &.sliding {
    transform: translateX(0%);

  }

  .error-container {
    margin-top:1em;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
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
      border:1px solid lightgrey;
      padding: 1em;
      width: 100%;
      height: 3em;
      font-family: ${(props) => props.theme.font.body}

    }
      :focus {
        
        border:1px solid darkgray;
      }
    }
`;

const Wrapper = styled.div`
  padding: 0 1em;

  p {
    font-family:  ${(props) => props.theme.font.body}
  }
`;

const Navigation = styled.nav`
  height: 4em;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2, 1fr);
  position: relative;

  .logo {
    display: flex;
    gap: 1em;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 20px;
    }

    p {
      font-family: ${(props) => props.theme.font.title};
      color: ${(props) => props.theme.color.main};
      font-size: 2em;
    }
  }

  img {
    height: 30px;
  }

  select {
    height: 40px;
    background-color: ${(props) => props.theme.color.main};
    color: white;
    outline: none;
    border: none;
    font-family: ${(props) => props.theme.font.body};
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.5em;
  }

  .search-container {
    width: 100%;
    display: flex;
    padding: 0 1em;
  }

  select {
    height: 40px;
    background-color: ${(props) => props.theme.color.main};
    color: white;
    outline: none;
    border: none;
    font-family: ${(props) => props.theme.font.body};
    font-weight: 600;
    font-size: 0.8em;
    padding-left: 0.5em;
  }

  a {
    text-decoration: none;
  }
  .user-container {
    display: flex;
    gap: 1em;
    place-content: flex-end;
  }
`;

const StyledInput = styled.input`
  border: 3px solid ${(props) => props.theme.color.main};
  height: 40px;
  width: 100%;
  outline: none;
  padding-left: 0.5em;
  font-family: ${(props) => props.theme.font.body};
  color: ${(props) => props.theme.color.body};

  ::placeholder {
    font-family: ${(props) => props.theme.font.body};
    color: ${(props) => props.theme.color.body};
  }
`;

const NavbarMobile = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleVisibleSearch, setToggleVisibleSearch] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (!email || password.length <= 0) {
      setValid(false);
    } else {
      setValid(true);
    }
    return () => {};
  }, [email, password]);

  const toggleSearchInput = () => {
    if (toggleUserMenu) {
      setToggleUserMenu(!toggleUserMenu);
    }
    setToggleVisibleSearch(!toggleVisibleSearch);
  };

  const usr = useRef();

  const toggleAccountMenu = () => {
    if (toggleVisibleSearch) {
      setToggleVisibleSearch(!toggleVisibleSearch);
    }

    setToggleUserMenu(!toggleUserMenu);
  };

  const toggleMainMenu = () => {
    setToggleMenu(!toggleMenu);
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

  return (
    <Wrapper>
      <MainMenu className={toggleMenu ? `sliding-left` : ""}>
        <div className="menu-search-container">
          <p>All Categories</p>
          <div className="input-container">
          <input type="text" placeholder="Search all categories" />
          </div>
        </div>
  
      </MainMenu>
      <UsrMenu className={toggleUserMenu ? `sliding` : ""}>
        <p>Welcome</p>
        <div className="provider-container">
          <SignInButton className="pulsing" onClick={() => registerAccount("google")}>
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

      <Navigation>
        <div className="logo">
          <img onClick={toggleMainMenu} src={menuIcon} alt="" />
          <p>TradingBazaar</p>
        </div>
        <div className="user-container">
          <img onClick={toggleSearchInput} src={searchIcon} alt="" />
          <img ref={usr} onClick={toggleAccountMenu} src={userIcon} alt="" />
        </div>
      </Navigation>
      {toggleVisibleSearch && (
        <div className="search-container">
          <StyledInput placeholder="What are you looking for today?" />
        </div>
      )}
    </Wrapper>
  );
};

export default NavbarMobile;
