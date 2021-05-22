import React from "react";
import styled from "styled-components";
import SignUpEmail from "./SignUpEmail";
import useSignin from "hooks/useSignin";
import signup from "assets/images/signup.jpg";
import googleIcon from "assets/icons/google-icon.svg";
import facebookIcon from "assets/icons/facebook-icon.svg";

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
    background-image: url(${signup});
    opacity: 0.8;
    background-size: cover;
    background-position: center center;
  }

  @media only screen and (max-width: 600px) {
    ::before {
      /* opacity: 0.4; */
      background-position-x: 30%;
    }
  }
`;

const SignUpContainer = styled.div`
  padding-top: 28vh;
  display: grid;
  height: auto;
  justify-content: end;
  align-items: flex-start;
  position: relative;
  grid-template-columns: minmax(15rem, 18em);
  padding-right: 10%;
  padding-left: 10%;

  p {
    color: ${(props) => props.theme.color.main};
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
    color: ${(props) => props.theme.color.main};
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
  @media only screen and (max-width: 600px) {
    padding-top: 15em;
    align-items: flex-start;
  }
`;
const RegisterButton = styled.button`
  padding-left: 1em;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  display: grid;
  grid-template-columns: 10% 90%;
  align-items: center;
  height: 55px;
  outline: none;
  border: none;
  margin: 0.5em 0;
  background-color: ${(props) => props.theme.button.color};
  border-radius: 5px;

  p,
  img {
    justify-self: center;
    font-family: "Open Sans", sans-serif;
    font-size: 1.2em;
    color: ${(props) => props.theme.color.main};
  }
`;

const SignUp = () => {
  const {
    registerAccount,
    setToggleSignInMethod,
    toggleSignInMethod,
    handleSignInMethod,
    history,
  } = useSignin();

  return (
    <Wrapper>
      {toggleSignInMethod ? (
        <SignUpEmail setToggleSignInMethod={setToggleSignInMethod} />
      ) : (
        <SignUpContainer>
          <div>
            <h4>Sign Up</h4>
            <p>
              With email and password, Click
              <span onClick={() => handleSignInMethod()}> here</span>
            </p>
            <RegisterButton onClick={() => registerAccount("google")}>
              <img src={googleIcon} alt="google icon" />
              <p>Register with Google account</p>
            </RegisterButton>
            <RegisterButton onClick={() => registerAccount("facebook")}>
              <img src={facebookIcon} alt="facebook icon" />
              <p>Register with Facebook account</p>
            </RegisterButton>
            <p>
              Have an account, Sign in
              <span onClick={() => history.push("/login")}> here</span>
            </p>
          </div>
        </SignUpContainer>
      )}
    </Wrapper>
  );
};

export default SignUp;
