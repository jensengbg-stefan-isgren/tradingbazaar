import React from "react";
import styled from "styled-components";
import useSignin from "hooks/useSignin";
import SignInEmail from "./SignInEmail";
import signin from "assets/images/signin.jpg";
import googleIcon from "assets/icons/google-icon.svg";
import facebookIcon from "assets/icons/facebook-icon.svg";
import exclamationIcon from "assets/icons/exclamation.svg";
import ForgotCredentials from "components/ForgotCredentials";

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  width: 100vw;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-image: url(${signin});
    opacity: 0.9;
    background-size: cover;
    background-position: center bottom 0%;
  }

  @media only screen and (max-width: 600px) {
    ::before {
      min-height: 100vh;
      background-position: 40% bottom;
    }
  }
`;

const SignInContainer = styled.div`
  padding-top: 28vh;
  display: grid;
  height: 100vh;
  justify-content: end;
  align-items: flex-start;
  position: relative;
  grid-template-columns: minmax(15rem, 18em);
  padding-right: 10%;
  padding-left: 10%;
  padding-bottom: 10em;

  p {

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

  }

  div > p:nth-child(5) {
    text-align: center;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .error-container {
    justify-self: center;
    display: flex;
    flex-direction: column;
    margin-top: 1em;
  }

  .warning-icon {
    margin-bottom: 1em;
    height: 2em;
  }

  @media only screen and (max-width: 600px) {
    padding-top: 15em;
    align-items: flex-start;
  }
`;
const SignInButton = styled.button`
  padding-left: 1em;
  border-radius: 5px;
  width: 100%;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  height: 55px;
  outline: none;
  border: none;
  margin: 0.5em 0;

  border-radius: 5px;
  cursor: pointer;

  p,
  img {
    justify-self: center;

    font-size: 1.2em;

  }

  :disabled {
    cursor: not-allowed;
  }
`;

const SignIn = () => {

  const {
    registerAccount,
    setToggleSignInMethod,
    toggleSignInMethod,
    handleSignInMethod,
    history,
    toggleForgotCredentials,
    setToggleForgotCredentials,
    errorMessage,
  } = useSignin();

  const SigninMethod = () => {
    return (
      <React.Fragment>
        {toggleSignInMethod ? (
          <SignInEmail
            setToggleSignInMethod={setToggleSignInMethod}
            setToggleForgotCredentials={setToggleForgotCredentials}
          />
        ) : (
          <SignInContainer>
            <div>
              <h4>Sign In</h4>
              <p>
                With email and password, click
                <span onClick={handleSignInMethod}> here</span>
              </p>
              <SignInButton className="auth-button" onClick={() => registerAccount("google")}>
                <img src={googleIcon} alt="" />
                <p>Sign in with Google account</p>
              </SignInButton>
              <SignInButton className="auth-button"
                onClick={() => registerAccount("facebook")}
                disabled={errorMessage}
              >
                <img src={facebookIcon} alt="" />
                <p>Sign in with Facebook account</p>
              </SignInButton>
              <p>
                Dont have an account, Click
                <span onClick={() => history.push("/register")}> here</span>
              </p>
         
              {errorMessage ? (
                <div className="error-container">
                  <img className="warning-icon" src={exclamationIcon} alt="" />
                  <p>{errorMessage}</p>
                </div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </div>
          </SignInContainer>
        )}
      </React.Fragment>
    );
  };

  return (
    <Wrapper>
      {toggleForgotCredentials ? (
        <ForgotCredentials
          toggleForgotCredentials={toggleForgotCredentials}
          setToggleForgotCredentials={setToggleForgotCredentials}
        />
      ) : (
        <SigninMethod />
      )}
    </Wrapper>
  );
};

export default SignIn;
