import styled from "styled-components";
import React, { useState } from "react";
import SignInEmail from "./SignInEmail";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import firebase from "../services/firebase";
import { useHistory } from "react-router-dom";
import signin from "../assets/images/signin.jpg";
import googleIcon from "../assets/icons/google-icon.svg";
import facebookIcon from "../assets/icons/facebook-icon.svg";
import exclamationIcon from "../assets/icons/exclamation.svg";
import { checkIfRegistered } from "../features/auth/authSlice";

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
    opacity: 0.9;
    background-size: cover;
    background-position: center bottom 0%;
  }
`;

const SignInContainer = styled.div`
  padding-top: 15%;
  display: grid;
  height: 100vh;
  justify-content: end;
  align-items: flex-start;
  position: relative;
  grid-template-columns: minmax(15rem, 25em);
  padding-right: 10%;
  padding-left: 10%;
  padding-bottom: 10em;

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
    margin-left: auto;
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
  background-color: ${(props) => props.theme.button.color};
  border-radius: 5px;
  cursor: pointer;

  p,
  img {
    justify-self: center;
    font-family: ${(props) => props.theme.font.body};
    font-size: 1.2em;
    color: ${(props) => props.theme.color.main};
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const SignIn = () => {
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.auth.errorMessage);

  const [toggleSignInMethod, setToggleSignInMethod] = useState(false);

  const handleSignInMethod = () => {
    setToggleSignInMethod(!toggleSignInMethod);
  };

  const history = useHistory();

  const registerAccount = async (provider) => {
    let authProvider;

    switch (provider) {
      case "google":
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case "facebook":
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
        default:
    }

    try {
      await firebase.auth().signInWithPopup(authProvider);

      history.push("/profile/overview");
      dispatch(checkIfRegistered({ status: null, message: null }));
    } catch ({ code, message }) {
      if (code === "auth/account-exists-with-different-credential") {
        await dispatch(checkIfRegistered({ status: true, message: message }));
        history.push("/login");
      }
    }
  };

  return (
    <Wrapper>
      {toggleSignInMethod ? (
        <SignInEmail setToggleSignInMethod={setToggleSignInMethod} />
      ) : (
        <SignInContainer>
          <div>
            <h4>Sign In</h4>
            <p>
              Sign in with email and password, click{" "}
              <span onClick={handleSignInMethod}>here</span>
            </p>
            <SignInButton onClick={() => registerAccount("google")}>
              <img src={googleIcon} alt="" />
              <p>Sign in with Google account</p>
            </SignInButton>
            <SignInButton
              onClick={() => registerAccount("facebook")}
              disabled={errorMessage}
            >
              <img src={facebookIcon} alt="" />
              <p>Sign in with Facebook account</p>
            </SignInButton>
            <p>
              Dont have an account, Click{" "}
              <span onClick={() => history.push("/register")}>here</span>
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
    </Wrapper>
  );
};

export default SignIn;
