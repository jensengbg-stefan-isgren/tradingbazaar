import styled from "styled-components";
import React from "react";
import { useHistory, Link } from "react-router-dom";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";
import { authUser } from "features/auth/authSlice";
import userIcon from "assets/icons/user.svg";
import { useMediaQuery } from "functions/UseMediaQuery";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${(props) => props.theme.font.body};
  color: ${(props) => props.theme.color.main};
  font-size: 1em;
  padding: 1em;
  width: 100%;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: lightpink;
  }
  
`;

const Menu = styled.div`

ul {
  width:100%;
}

.alias {
  font-family: ${(props) => props.theme.font.body};
  color: ${(props) => props.theme.color.main};
  font-size: 1.5em;
}

padding-top:1em;


  .image-container {
    padding: 1em 0;
    width: 100%;
    display: flex;
    justify-content: center;

    img {
      border-radius: 50%;
    }


  }

  .link {
    text-decoration: none;
    font-family: ${(props) => props.theme.font.body};
    color: ${(props) => props.theme.color.main};
    font-size: 1em;
    padding: 1em;
    width: 100%;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: lightpink;
    }
  }

  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 64px;
  left:100%;
  width: 15em;
  background-color: #f7f7f2;
  position: absolute;
  z-index: 999;
  transition: transform 0.2s ease-in-out;


  &.show {
    transform: translateX(-100%);
  }


`;

const ProfileMenu = ({ toggleMenu }) => {

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
    <Menu className={toggleMenu ? `show` : ""}>
      <p className="alias">{user.alias}</p>
      <div className="image-container">
        {user.photoUrl ? (
          <img src={user.photoUrl} alt="profile-pic" />
        ) : (
          <img alt="user-icon" src={userIcon}></img>
        )}
      </div>
      {showMobileNav ? <ul>
        <StyledLink to="/profile/overview">Buy</StyledLink>
        <StyledLink to="/profile/overview">Sell</StyledLink>
        <StyledLink to="/profile/overview">Wishlist</StyledLink>
      </ul> : ""}
      <StyledLink to="/profile/overview">Overview</StyledLink>
      <StyledLink to="/profile/settings">Settings</StyledLink>
      <li className="link" onClick={logOut}>
        Log out
      </li>
    </Menu>
  );
};

export default ProfileMenu;
