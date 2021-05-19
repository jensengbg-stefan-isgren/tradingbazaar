import React from "react";
import styled from "styled-components";
import {useHistory} from 'react-router-dom'
import firebase,{auth} from 'services/firebase'


const Navigation = styled.nav`
    .container {
      height: 4em;
      padding: 0 2em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

     

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

const history = useHistory();

const linkFacebookAccount = async() => {
  await auth.currentUser.linkWithPopup(new firebase.auth.FacebookAuthProvider())
}

const logOut =  async () => {
  await firebase.auth().signOut()
  history.push('/')
}



  return (
    <Navigation>
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
          <button>nojjan</button>
          <button onClick={linkFacebookAccount}>Link your facebook account</button>
          <button>Link your google1 account</button>
          <button onClick={logOut}>Log out</button>
        </div>
      </div>
    </Navigation>
  );
};

export default NavbarProfile;
