import React, { useState,useRef } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import menuIcon from "assets/icons/menu.svg";
import { useSelector } from "react-redux";
import ProfileMenu from "components/ProfileMenu";
import userIcon from "assets/icons/user.svg";
import CategoryMenu from "components/CategoryMenu";
import useSearch from 'hooks/useSearch'
// import { useMediaQuery } from "functions/UseMediaQuery";

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
  border: 3px solid ${(props) => props.theme.color.main};
  min-width: 20em;
  outline: none;
  height: 3em;
  padding-left: 0.5em;
  font-family: ${(props) => props.theme.font.body};
  color: ${(props) => props.theme.color.body};

  ::placeholder {
    font-family: ${(props) => props.theme.font.body};
    color: ${(props) => props.theme.color.body};
  }

  @media (max-width: 700px) {
    width: 100%;
    padding: 0 1em;
  }

  @media (max-width: 500px) {
    border: none;
  }
`;

const Nav = styled.nav`
  display: grid;
  align-items: center;
  grid-template-areas: "logo search nav";
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
    justify-self: flex-end;
    grid-area: nav;

    img {
      height: 30px;
    }
  }

  @media (max-width: 700px) {
    height: 64px;
    background-color: "";
    padding: 1em;

    grid-template-areas:
      "logo logo nav"
      "search search search";

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
`;

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
      border: none;
      height: 3em;
      width: 100%;
    }

    .logo {
      grid-area: logo;
    }
  }

  .no-nav {
    animation: ${fadeOut} 300ms;
    background-color: none;
  }

  .show-nav {
    animation: ${fadeIn} 300ms;
    background-color: #f7f7f2;
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
`;

const NavbarMobileProfile = () => {
  const {searchResults,category,setCategory} = useSearch()
  const catMenu = useRef()
  const accountMenu = useRef()
  const [toggleCatMenu, setToggleCatMenu] = useState(false);
  // const showMobileNav = useMediaQuery("(max-width:1000px)");
  const [toggleMenu, setToggleMenu] = useState();
  const { categories } = useSelector((state) => state.categories);
  const isVisible = useSelector((state) => state.nav.isVisible);
  const history = useHistory();

  // const signOut = () => {
  //   auth.signOut();
  //   history.push("/");
  // };


  return (
    <Wrapper>
      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`}>
        <Nav>
          <div className="logo">
            <img ref={catMenu} src={menuIcon} alt="" />
            <h1 onClick={() => history.push("/")}>TradingBazaar</h1>
          </div>

          <div className="menu">
            <img ref={accountMenu} className="nav" src={userIcon} alt="" />
          </div>
        </Nav>
        {!isVisible ? (
          <div
            className={`search-container ${
              toggleCatMenu || toggleMenu ? "hide" : ""
            }`}
          >
            <select name="category" id="category">
              <option onChange={(e) => setCategory(e.target.value)} value={0}>All Categories</option>
              {categories.map((category) => {
                return (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <StyledInput onChange={(e) => searchResults(e.target.value,category)} placeholder="What are you looking for today?" />
          </div>
        ) : (
          ""
        )}
      </div>
      <ProfileMenu setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} accountMenu={accountMenu} />
      <CategoryMenu setToggleCatMenu={setToggleCatMenu} toggleCatMenu={toggleCatMenu} catMenu={catMenu} />
    </Wrapper>
  );
};

export default NavbarMobileProfile;
