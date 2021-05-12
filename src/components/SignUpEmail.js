import React from "react";
import {useHistory} from 'react-router-dom'
import styled from "styled-components";

const SignUpEmail = ({ setToggleSignInMethod }) => {

  const history = useHistory();

  const SignUpContainer = styled.div`
    display: grid;
    padding-top:15%;
    height: 100vh;
    justify-content: end;
    align-items: flex-start;
    position: relative;
    grid-template-columns: minmax(15rem, 25em);
    padding-right: 10%;
    padding-left: 10%;
    padding-bottom: 10em;

    p {
      color: #424242;
      font-family: "Open Sans", sans-serif;
      font-size: 1em;
    }

    span {
      font-weight: bold;
      cursor: pointer;
    }

    h4 {
      font-family: "Passion One", cursive;
      font-size: 2em;
      color: #424242;
    }

      button {
      height:3em;
      width:50%;
      display:block;
      margin: .5em 0em .5em auto;
    }

    p:nth-child(2) {
      text-align:center;
    }

    p:nth-child(3) {
      margin-left: auto;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `;
  const InputField = styled.input`
    padding-left: 1em;
    cursor: pointer;
    width: 100%;
    align-items: center;
    height: 55px;
    outline: none;
    border: none;
    margin: 0.5em 0;
    background-color: white;
    border-radius: 5px;

    p,
    img {
      justify-self: center;
      font-family: "Open Sans", sans-serif;
      font-size: 1.2em;
      color: #424242;
    }
  `;

  return (
    <SignUpContainer>
      <div>
        <h4>Sign Up</h4>
        <p>
          Register with Google or Facebook, Click
          <span onClick={() => setToggleSignInMethod(false)}> here</span>
          <InputField type="text" placeholder="Email" />
          <InputField type="password" placeholder="Ange lösenord" />
          <InputField type="password" placeholder="Bekräfta lösenord" />
          <button>Logga in</button>
        </p>
        <p>
          Already have an account, Sign in <span onClick={()=> history.push('/login')}> here</span>
        </p>
      </div>
    </SignUpContainer>
  );
};

export default SignUpEmail;
