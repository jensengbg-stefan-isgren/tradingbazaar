import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import menuIcon from 'assets/icons/menu.svg'
import CategoryMenu from 'components/CategoryMenu'
import {useState,useRef} from 'react'
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
  const {searchResults,category,setCategory} = useSearch()
  const catMenu = useRef()
  const history = useHistory();
  const [toggleCatMenu, setToggleCatMenu] = useState(false)
  const { categories } = useSelector((state) => state.categories);
  const isVisible = useSelector((state) => state.nav.isVisible);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);



  // const handleCatMenu = () => {
  //   setToggleCatMenu(!toggleCatMenu)
  // }

  
  const handleClick = e => {
    // console.log(e.target)
    // console.log(accountMenu.current)
    // if(accountMenu.current == e.target) {
    //   setToggleUserMenu((toggleUserMenu) => 
    //     !toggleUserMenu
    //   )
    // }
    // else if (accountMenu.current.contains(e.target)) {
    //   console.log("UTANFÖR!!!")
    //   // inside click
    //   return;
    // } else  {
    //   setToggleUserMenu(false)
    // }
  };

  

  return (
    <Navigation>
      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`}>
        <div className="logo">
          <img ref={catMenu} src={menuIcon} alt="" />
          <p onClick={() => history.push("/")}>TradingBazaar</p>
        </div>
        {!isVisible ? (
          <div className="search-container">
            <select onChange={(e) => setCategory(e.target.value)} name="category" id="category">
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
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </div>
      </div>
      <CategoryMenu toggleCatMenu={toggleCatMenu} setToggleCatMenu={setToggleCatMenu} catMenu={catMenu} />
    </Navigation>
  );
};

export default Navbar;
