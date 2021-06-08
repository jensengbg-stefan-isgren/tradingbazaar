import styled from "styled-components";
import React,{useEffect,useRef,useCallback} from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "features/auth/authSlice";
import userIcon from "assets/icons/user.svg";
import { useMediaQuery } from "functions/UseMediaQuery";
import ToggleSwitch from 'components/ToggleSwitch'

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({theme}) => theme.profileMenu.textColor};
  font-size: 1em;
  padding: 1em;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: ${({theme}) => theme.font.body};
  
  &:hover {
   
    background-color: ${({theme}) => theme.profileMenu.hover};
      color: ${({theme}) => theme.profileMenu.hoverColor};
  }
  
`;

const Menu = styled.div`

.list {
  width:100%;
}

.toggle-container {
  width:100%;
  margin-bottom:.7em;

  a {
    width:100%;
  }
}

min-height: calc(100vh - 64px);
 background-color: ${({theme}) => theme.menu.background};
ul {
  width:100%;
}

li {
  color: ${({theme}) => theme.profileMenu.textColor};
  font-size: 1em;
}

.alias {

  font-size: 1.3em;
}

padding-top:1em;


  .image-container {
    padding: 1em 1em;
    width: 100%;
    height:15em;
    display: flex;
    justify-content: center;

    img {
      border-radius:4px;
      object-fit: cover;
      width:100%;
      height:100%;
    }


  }

  .link {
    font-family: ${({theme}) => theme.font.body};
    text-decoration: none;
    color: ${({theme}) => theme.profileMenu.textColor};
    font-size: 1em;
    padding: 1em;
    width: 100%;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: ${({theme}) => theme.profileMenu.hover};
      color: ${({theme}) => theme.profileMenu.hoverColor};
      
    }
  }

  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 64px;
  left:100%;
  width: 15em;
 
  position: absolute;
  z-index: 999;
  transition: transform 0.2s ease-in-out;


  &.show {
    transform: translateX(-100%);
  }


`;

const ProfileMenu = ({ toggleMenu,setToggleMenu,accountMenu }) => {

  const handleClick = useCallback(
    (e) => {
      if(accountMenu.current === e.target) {
        setToggleMenu((toggleMenu) => 
          !toggleMenu
        )
      }
      else if (menu.current.contains(e.target)) {
        // inside click
        return;
      } else  {
        setToggleMenu(false)
      }
    },
    [accountMenu,setToggleMenu],
  )




  const menu = useRef()

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  }, [handleClick])

  const showMobileNav = useMediaQuery("(max-width:1000px)");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const logOut = async () => {
    await firebase.auth().signOut();
    dispatch(authUser());
    history.push("/");
  };



  return (
    <Menu ref={menu} className={toggleMenu ? `show` : ""}>
      <h3 className="alias">{user.alias}</h3>
      <div className="image-container">
        {user.photoUrl ? (
          <img src={user.photoUrl} alt="profile-pic" />
        ) : (
          <img alt="user-icon" src={userIcon}></img>
        )}
      </div>
      {showMobileNav ? 
      <div className="list" >
       <div className="toggle-container">
       <ToggleSwitch/>
       </div>
          <ul>
        <StyledLink to="/profile/overview">Buy</StyledLink>
        <StyledLink to="/profile/overview">Sell</StyledLink>
        <StyledLink to="/profile/overview">Wishlist</StyledLink>
      </ul>
      </div>
     : ""}
      <StyledLink to="/profile/overview">Overview</StyledLink>
      <StyledLink to="/profile/settings">Settings</StyledLink>
      <StyledLink to="" >Messages</StyledLink>
      <StyledLink to="" >My reviews</StyledLink>
      <StyledLink to="" >Give us feedback</StyledLink>
      <StyledLink to="" >Contact us</StyledLink>
      <li className="link" onClick={logOut}>
        Log out
      </li>
    </Menu>
  );
};

export default ProfileMenu;
