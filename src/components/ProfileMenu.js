import styled from "styled-components";
import React from "react";
import { useHistory,Link } from "react-router-dom";
import firebase from "firebase";
import { useSelector } from "react-redux";

const Menu = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 84px;
  right: 0;
  width: 12em;
  min-height: calc(100vh - 64px);
  background-color: white;
  position: absolute;
  z-index:999;
  transition: transform 0.2s ease-in-out;
  transform: translateX(100%);
  
  &.sliding {
    transform: translateX(0%);

  }
li {
  width:100%;
  cursor: pointer;
  border-bottom:1px solid lightgrey;
  padding: 1em;
}

li:hover {
  background-color:lightgrey;
}

`;

const ProfileMenu = ({ toggleMenu }) => {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();

  const logOut = async () => {
    await firebase.auth().signOut();
    history.push("/");
  };

  return (
    <Menu className={toggleMenu ? `sliding` : ""}>
      {user ? <h3>{user.name}</h3> : ""}
      <li><Link to="/profile/overview">Overview</Link></li>
      <li><Link to="/profile/settings">Settings</Link></li>
      <li onClick={logOut}>Log out</li>
    </Menu>
  );
};

export default ProfileMenu;
