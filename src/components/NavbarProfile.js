import React, { useState,useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import ProfileMenu from "components/ProfileMenu";
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom';
import menuIcon from 'assets/icons/menu.svg'
import CategoryMenu from 'components/CategoryMenu'
import useSearch from 'hooks/useSearch'

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

position: fixed;
z-index:1000;
width:100%;
top:0;
left:0;


.logo {
  display: flex;
  align-items: center;

  img {
    margin-right:1em;
    height:20px;
  }

  p {
    cursor: pointer;
  }
}


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
    position: relative;
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
        width:10em;
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
      margin: 0 0em;
      text-decoration: none;
    }
  `;

const StyledInput = styled.input`
  border: 3px solid ${(props) => props.theme.color.main};
  height: 40px;
  width: 18em;
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

  const {searchResults,category,setCategory} = useSearch()

  const catMenu = useRef()
  const accountMenu = useRef()
  const history = useHistory();
  const { categories } = useSelector((state) => state.categories);

  const [toggleCatMenu,setToggleCatMenu] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false);

  const isVisible = useSelector((state) => state.nav.isVisible);



  return (
    <Navigation>
      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`}>
        <div className="logo">
          <img ref={catMenu} src={menuIcon} alt="" />
          <p onClick={() => history.push('/')}>TradingBazaar</p>
        </div>
        {!isVisible ? (
          <div className="search-container">
            <select onChange={(e)=> setCategory(e.target.value)} name="category" id="category">
              <option value={0}>All Categories</option>
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
        <div className="nav-links">
          <StyledLink to="/profile/wish-list">Wishlist</StyledLink>
          <StyledLink to="/profile/active-items">Buy</StyledLink>
          <StyledLink to="/profile/active">Sell</StyledLink>
          <div className="menu-container">
          <li ref={accountMenu}>Menu</li>
          </div>
          <ProfileMenu setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} accountMenu={accountMenu} />
        </div>
      </div>
      <CategoryMenu setToggleCatMenu={setToggleCatMenu} toggleCatMenu={toggleCatMenu} catMenu={catMenu}/>
    </Navigation>
  );
};

export default NavbarProfile;
