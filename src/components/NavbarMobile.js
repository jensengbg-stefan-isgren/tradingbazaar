import React, { useState, useRef, useEffect } from "react";
import menuIcon from "assets/icons/menu.svg";
import styled from "styled-components";
import userIcon from "assets/icons/user.svg";
import searchIcon from "assets/icons/search.svg";

const SignInButton = styled.button`
  padding-left: 1em;
  border-radius: 5px;
  width: 50%;
  display: grid;
  grid-template-columns: 10% 90%;
  place-content:center;
  height: 40px;
  outline: none;
  border: none;
  margin: 0.5em 0;
  background-color: ${(props) => props.theme.button.color};
  border-radius: 5px;
  cursor: pointer;
`;


const User = styled.div`
  position: absolute;
  padding-top:2em;
  top: 64px;
  right: -200px;
  background-color: #525253;
  height: 100vh;
  width: 200px;
  transition: transform 0.5s ease-in-out;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
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
      transform: translateX(-200px);
    }

    .logo {
      display: flex;
      gap: 1em;
      justify-content: flex-start;
      align-items: center;

      img {
        height: 20px;
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

    p {
      font-family: ${(props) => props.theme.font.title};
      color: ${(props) => props.theme.color.main};
      font-size: 2em;
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
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    } else {
      setToggleUserMenu(false);
    }
  };

  const [toggleVisibleSearch, setToggleVisibleSearch] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);

  const toggleSearchInput = () => {
    if (toggleUserMenu) {
      setToggleUserMenu(!toggleUserMenu);
    }
    setToggleVisibleSearch(!toggleVisibleSearch);
  };

  const node = useRef();

  const toggleMenu = () => {
 setToggleUserMenu(!toggleUserMenu)
  };

  return (
    <Navigation>
      <div className="container">
        <User ref={node} className={toggleUserMenu ? `sliding` : ""}>
          <h3>LOGGA IN!</h3>

          <SignInButton>dsadas</SignInButton>
        </User>
        <div className="logo">
          <img src={menuIcon} alt="" />
          <p>TradingBazaar</p>
        </div>
        <div className="user-container">
          <img onClick={toggleSearchInput} src={searchIcon} alt="" />
          <img onClick={toggleMenu} src={userIcon} alt="" />
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
