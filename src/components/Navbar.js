import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import menuIcon from 'assets/icons/menu.svg'
import CategoryMenu from 'components/CategoryMenu'
import {useState} from 'react'

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
    background-color: transparent;
  }
`;

const Navigation = styled.nav`
position: fixed;
z-index:1000;
width:100%;
top:0;
left:0;


  .no-nav {
    animation: ${fadeOut} 300ms;
  }


  .show-nav {
    animation: ${fadeIn} 300ms ;
    background-color:#F7F7F2;
  }

  .container {

    

    height: 64px;
    display: flex;
    padding: 0 1em;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index:1000;
    top:0;
    width:100%;
    font-size: 16px;
    background-color: "";

    .logo {
      display: flex;
      align-items:center;


      img {
        margin-right:1em;
        height:20px;
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
      cursor: pointer;
    }
 

  }



  }

  a {
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    place-content: flex-end;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.color.main};
  font-size: 1.4em;
  padding: 0.5em;

  :nth-child(2) {
    margin-left: 1em;
  }

  &:hover {
    border-radius: 4px;
    background: #f7f7f2;
  }
`;

const StyledInput = styled.input`
  border: 3px solid ${(props) => props.theme.color.main};
  height: 40px;
  width: 20em;
  outline: none;
  padding-left: 0.5em;
  font-family: ${(props) => props.theme.font.body};
  color: ${(props) => props.theme.color.body};

  ::placeholder {
    font-family: ${(props) => props.theme.font.body};
    color: ${(props) => props.theme.color.body};
  }
`;

const Navbar = () => {
  const history = useHistory();
  const [toggleCatMenu, setToggleCatMenu] = useState(false)
  const { categories } = useSelector((state) => state.categories);
  const isVisible = useSelector((state) => state.nav.isVisible);

  useEffect(() => {
    return () => {};
  }, []);


  const handleCatMenu = () => {
    setToggleCatMenu(!toggleCatMenu)
  }
  

  return (
    <Navigation>
      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`}>
        <div className="logo">
          <img onClick={handleCatMenu} src={menuIcon} alt="" />
          <p onClick={() => history.push("/")}>TradingBazaar</p>
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
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </div>
      </div>
      <CategoryMenu className={toggleCatMenu ? `sliding` : ""} toggleCatMenu={toggleCatMenu}/>
    </Navigation>
  );
};

export default Navbar;
