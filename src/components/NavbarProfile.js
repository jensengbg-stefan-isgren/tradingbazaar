import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ProfileMenu from "components/ProfileMenu";

const Navigation = styled.nav`
    .container {
      height: 4em;
      padding: 0 2em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

     .nav-links {
       display:flex;
       gap:2em;
       cursor: pointer;


        li {
          padding:.7em;
        }

        li:hover {
          background-color:#dfdfdf;
        }

      }       
     }

      select {
        width: 100px;
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
      margin: 0 1em;
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
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <Navigation>
      <ProfileMenu toggleMenu={toggleMenu} />
      <div className="container">
        <div className="logo">
          <p>TradingBazaar</p>
        </div>
        <div className="search-container">
          <select name="category" id="category">
            <option value="">nojjan</option>
          </select>
          <StyledInput placeholder="What are you looking for today?" />
        </div>
        <div className="nav-links">
          <li>
            <Link to="/profile/wish-list">Wishlist</Link>
          </li>
          <li>
            <Link to="/profile/active-items">Buy</Link>
          </li>
          <li>
            <Link to="/profile/active">Sell</Link>
          </li>
          <li onClick={handleMenu}>Menu</li>
        </div>
      </div>
    </Navigation>
  );
};

export default NavbarProfile;
