import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import signin from "../assets/images/signin.jpg";
import googleIcon from "../assets/icons/google-icon.svg";
import facebookIcon from "../assets/icons/facebook-icon.svg";

const SignIn = () => {
  const history = useHistory();

  const Wrapper = styled.section`
    position: relative;
    height: 100vh;
    width: 100%;

    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      background-image: url(${signin});
      opacity: 0.7;
      background-size: cover;
      background-position: center bottom 30%;
    }
  `;

  const SignInContainer = styled.div`
    display: grid;
    height: 100vh;
    justify-content: end;
    align-items: center;
    position: relative;
    grid-template-columns: minmax(15rem, 25em);
    padding-right: 10%;
    padding-left: 10%;
    padding-bottom: 10em;

    h1 {
      -webkit-text-stroke: 3px #424242;
      -webkit-text-fill-color: transparent;
      font-family: "Passion One", cursive;
      font-size: 4em;
      font-weight: 700;
    }

    p,span {
      color: ${props => props.theme.color.main};
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
      color: ${props => props.theme.color.main}
    }

    div > p:nth-child(5) {
      margin-left: auto;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `;
  const SignInButton = styled.button`
    padding-left: 1em;
    width: 100%;
    display: grid;
    grid-template-columns: 10% 90%;
    align-items: center;
    height: 55px;
    outline: none;
    border: none;
    margin: 0.5em 0;
    background-color: ${props => props.theme.button.color};
    border-radius: 5px;
    cursor: pointer;

    p,
    img {
      justify-self: center;
      font-family: "Open Sans", sans-serif;
      font-size: 1.2em;
      color: ${props => props.theme.color.main}
    }
  `;

  return (
    <Wrapper>
      <SignInContainer>
        <div>
          <h4>Sign In</h4>
          <p>
            Sign in with email and password, click <span>here</span>
          </p>
          <SignInButton>
            <img src={googleIcon} alt="" />
            <p>Sign in with Google account</p>
          </SignInButton>
          <SignInButton>
            <img src={facebookIcon} alt="" />
            <p>Sign in with Facebook account</p>
          </SignInButton>
          <p>
            Don have an account, Click <span onClick={() => history.push('/register')}>here</span>
          </p>
        </div>
      </SignInContainer>
    </Wrapper>
  );
};

export default SignIn;
