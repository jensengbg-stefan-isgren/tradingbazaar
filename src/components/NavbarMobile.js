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

const SignInButton = styled.button``;

const UsrMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  top: 64px;
  padding: 1em;
  right: 0;
  width: 70%;
  height: calc(100vh - 64px);
  background-color: lightgrey;
  position: absolute;
  transition: transform 0.5s ease-in-out;
  transform: translateX(100%);
  &.sliding {
    transform: translateX(0%);
  }
`;

const Wrapper = styled.div`
  padding: 0 1em;
`;

const MainMenu = styled.div`
  height: calc(100vh - 64px);
  width: 250px;
  background-color: pink;
  position: absolute;
  top: 64px;
  left: -250px;

  h3 {
    font-family: ${(props) => props.theme.font.title};
    font-weight: normal;
  }

  .email-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      width: 100%;
      display: block;
    }
  }

  .member-container {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      width: 100%;
      display: block;
    }
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
      <UsrMenu className={toggleUserMenu ? `sliding` : ""}>
        <h3>Sign in</h3>
        <div className="provider-container">
          <SignInButton onClick={() => registerAccount("google")}>
            <img src={googleIcon} alt="" />
            <p>Google</p>
          </SignInButton>
          <SignInButton onClick={() => registerAccount("facebook")}>
            <img src={facebookIcon} alt="" />
            <p>Facebook</p>
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
          <h3>Sign up</h3>
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
      <MainMenu></MainMenu>
      {toggleVisibleSearch && (
        <div className="search-container">
          <StyledInput placeholder="What are you looking for today?" />
        </div>
      )}
    </Wrapper>
  );
};

export default NavbarMobile;
