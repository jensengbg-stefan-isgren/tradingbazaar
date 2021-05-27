import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import ProfileMenu from "components/ProfileMenu";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';

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
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.color.main};
  font-size: 1.4em;
  padding: 0.5em;
`;

const Navigation = styled.nav`

li {
  padding: 0.5em;
  margin: 0 .5em;
  text-decoration: none;
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.color.main};
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
    background-color:#F7F7F2;
  }


  background-color: "";

    .container {
    height: 4em;
    display: flex;
    padding: 0 1em;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index:1000;
    top:0;
    width:100%;
    font-size: 16px;

     .nav-links {
       display:flex;
       gap:2em;
       cursor: pointer;


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
        height: 40px;
        background-color: ${(props) => props.theme.color.main};
        color: white;
        outline: none;
        border: none;
        font-family: ${(props) => props.theme.font.body};
        font-weight: 600;
        font-size: 0.8em;
        padding-left: .5em;
      }

      p {
        font-family: ${(props) => props.theme.font.title};
        color: ${(props) => props.theme.color.main};
        font-size: 2em;
      }
    }

    a {
      margin: 0 .5em;
      text-decoration: none;
    }
  `;

const StyledInput = styled.input`
  border: 3px solid ${(props) => props.theme.color.main};
  height: 40px;
  width: 400px;
  outline: none;
  padding-left: 0.5em;
  font-family: ${(props) => props.theme.font.body};
  color: ${(props) => props.theme.color.body};

  ::placeholder {
    font-family: ${(props) => props.theme.font.body};
    color: ${(props) => props.theme.color.body};
  }
`;

const NavbarProfile = () => {
  const history = useHistory();
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  const isVisible = useSelector((state) => state.nav.isVisible);
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <Navigation>
      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`}>
        <div className="logo">
          <p onClick={() => history.push('/')}>TradingBazaar</p>
        </div>
        {!isVisible ? (
          <div className="search-container">
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
        <div className="nav-links">
          <StyledLink to="/profile/wish-list">Wishlist</StyledLink>
          <StyledLink to="/profile/active-items">Buy</StyledLink>
          <StyledLink to="/profile/active">Sell</StyledLink>
          <div className="menu-container">
          <li className={toggleMenu ? 'active' : ""} onClick={handleMenu}>Menu</li>
          </div>
          <ProfileMenu toggleMenu={toggleMenu} />
        </div>
      </div>
    </Navigation>
  );
};

export default NavbarProfile;
