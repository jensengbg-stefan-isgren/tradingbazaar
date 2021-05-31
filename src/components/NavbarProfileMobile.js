import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import styled, {keyframes} from "styled-components";
import menuIcon from "assets/icons/menu.svg";
import { useSelector } from "react-redux";
import ProfileMenu from 'components/ProfileMenu'
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


  @media (max-width: 500px) {
    border:none;
  }
    
`;

const Nav = styled.nav`
  display: grid;
  align-items: center;
  grid-template-areas: "logo search nav";
  height: 64px;
  padding: 0 1em;

  h1 {
    cursor: pointer;
  }

  .search-container {
    width: 100%;
    grid-area: search;

    select {
      height: 3em;
      width: 9em;
    }

    .logo {
      grid-area: logo;
    }
  }

  .menu {
    justify-self: flex-end;
    grid-area: nav;

    img {
      height: 20px;
    }
  }

  @media (max-width: 700px) {

    height:auto;
    background-color:"";
    padding:1em;

    grid-template-areas:
      "logo logo nav"
      "search search search";

    .search-container {
      width: 100%;
      display: grid;
      padding:.5em 0;

      select {
        width: auto;
        padding-left: .5em;
        border:none;
        margin-bottom:.5em;
      }
    }
  }


`;

const Wrapper = styled.div`

.no-nav {
    animation: ${fadeOut} 300ms;
    background-color: none;
  }


  .show-nav {
    animation: ${fadeIn} 300ms ;
    background-color:#F7F7F2;
  }

  height: 64px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
`;

const NavbarMobileProfile = () => {
  // const showMobileNav = useMediaQuery("(max-width:1000px)");
  const [toggleMenu, setToggleMenu] = useState();
  const { categories } = useSelector((state) => state.categories);
  const isVisible = useSelector((state) => state.nav.isVisible);
  console.log(isVisible)
  const history = useHistory();

  // const signOut = () => {
  //   auth.signOut();
  //   history.push("/");
  // };

  const handleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <Wrapper>
      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`} >
      <Nav >
        <div className="logo">
          <h1 onClick={() => history.push('/')}>TradingBazaar</h1>
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
        <div className="menu">
          <img onClick={handleMenu} className="nav" src={menuIcon} alt="" />
        </div>
      </Nav>
      </div>
     <ProfileMenu toggleMenu={toggleMenu}/>
    </Wrapper>
  );
};

export default NavbarMobileProfile;
