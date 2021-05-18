import firebase from "firebase";
import {auth} from "services/firebase"
import styled from "styled-components";
import { useDispatch } from "react-redux";
import menuIcon from "assets/icons/menu.svg";
import userIcon from "assets/icons/user.svg";
import { useHistory } from "react-router-dom";
import searchIcon from "assets/icons/search.svg";
import googleIcon from "assets/icons/google-icon.svg";
import facebookIcon from "assets/icons/facebook-icon.svg";
import React, { useState, useRef, useEffect } from "react";
import { checkIfRegistered } from "features/auth/authSlice";

const Menu = styled.div`
  position: absolute;
  padding-top: 2em;
  top: 64px;
  left: -250px;
  background-color: #525253;
  height: 100vh;
  width: 250px;
  transition: transform 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

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

const SignInButton = styled.button`
  padding-left: 1em;
  border-radius: 5px;
  width: 50%;
  display: grid;
  grid-template-columns: 10% 90%;
  place-content: center;
  height: 40px;
  outline: none;
  border: none;
  margin: 0.5em 0;
  background-color: ${(props) => props.theme.button.color};
  border-radius: 5px;
  cursor: pointer;

  p {
    font-family: ${(props) => props.theme.font.title};
    color: ${(props) => props.theme.color.main};
    font-size: 1em;
  }
`;

const User = styled.div`
  position: absolute;
  padding-top: 2em;
  top: 64px;
  right: -250px;
  background-color: #525253;
  height: 100vh;
  width: 250px;
  transition: transform 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

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
  height: 100vh;
  overflow: hidden;

  .container {
    height: 4em;
    display: grid;
    padding: 0 1em;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(2, 1fr);
    position: relative;

    .sliding {
      transform: translateX(-250px);
    }

    .sliding-left {
      transform: translateX(250px);
    }

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
    } else if (usr.current.contains(e.target)) {
    } else {
      setToggleUserMenu(false);
    }
  };

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [errorMessage,setErrorMessage] = useState('');
  const [toggleVisibleSearch, setToggleVisibleSearch] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleSearchInput = () => {
    if (toggleUserMenu) {
      setToggleUserMenu(!toggleUserMenu);
    }
    setToggleVisibleSearch(!toggleVisibleSearch);
  };

  const usr = useRef();
  const node = useRef();

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

  return (
    <Navigation>
      <div className="container">
        <Menu className={toggleMenu && `sliding-left`}>
          <ul className="info-container">
            <li>Sign up</li>
            <li>Create ad</li>
          </ul>

          <div className="categories-container">
            <h4>All categories</h4>
            <div className="search-input">
              <input type="text" />
            </div>
          </div>
        </Menu>
        <User ref={node} className={toggleUserMenu ? `sliding` : ""}>
          <h3>Sign in</h3>
          <SignInButton onClick={() => registerAccount("google")}>
            <img src={googleIcon} alt="" />
            <p>Google</p>
          </SignInButton>
          <SignInButton onClick={() => registerAccount("facebook")}>
            <img src={facebookIcon} alt="" />
            <p>Facebook</p>
          </SignInButton>
          <div className="email-container">
            <p>Sign in with email</p>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button onClick={login}>Sign in</button>
          </div>
          <div className="member-container">
            <h3>Sign up</h3>
            <button>Sign up</button>
          </div>
        </User>
        <div className="logo">
          <img onClick={toggleMainMenu} src={menuIcon} alt="" />
          <p>TradingBazaar</p>
        </div>
        <div className="user-container">
          <img onClick={toggleSearchInput} src={searchIcon} alt="" />
          <img ref={usr} onClick={toggleAccountMenu} src={userIcon} alt="" />
        </div>
      </div>
      {toggleVisibleSearch && (
        <div className="search-container">
          <StyledInput placeholder="What are you looking for today?" />
        </div>
      )}
    </Navigation>
  );
};

export default NavbarMobile;
