import styled from "styled-components";
import React from "react";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import { useSelector } from "react-redux";

const Menu = styled.div`
box-shadow: 1px 1px 1px 1px grey;
height:calc(100vh - 64px);
background-color:white;
position:absolute;
top:64px;
right:-200px;
width:200px;
transition: .5s ease-in-out;

&.sliding {
  transform:translateX(-100%);
}

li {
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
      {user ? <h1>{user.name}</h1> : ""}
      <li>Overview</li>
      <li>My Profile</li>
      <li>Settings</li>
      <li onClick={logOut}>Log out</li>
    </Menu>
  );
};

export default ProfileMenu;
