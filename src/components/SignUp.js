import styled from "styled-components";
import SignUpEmail from "./SignUpEmail";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import signup from "../assets/images/signup.jpg";
import firebase from "../services/firebase";
import googleIcon from "../assets/icons/google-icon.svg";
import facebookIcon from "../assets/icons/facebook-icon.svg";
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
    background-image: url(${signup});
    opacity: 0.8;
    background-size: cover;
    background-position: center center;
  }
`;

const SignUpContainer = styled.div`
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
  const dispatch = useDispatch();

  const history = useHistory();

  const [toggleSignInMethod, setToggleSignInMethod] = useState(false);

  const handleSignInMethod = () => {
    setToggleSignInMethod(!toggleSignInMethod);
  };

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

      //Skapa profil under users i databasen!

      history.push("/profile/overview");
    } catch ({ code,message }) {
      if (code === "auth/account-exists-with-different-credential") {
        await dispatch(checkIfRegistered({status:true,message:message}));
        history.push("/login");
      }
    }
  };



  return (
    <Wrapper>
      {toggleSignInMethod ? (
        <SignUpEmail setToggleSignInMethod={setToggleSignInMethod} />
      ) : (
        <SignUpContainer>
          <div>
            <h4>Sign Up</h4>
            <p>
              Register with email and password, Click
              <span onClick={handleSignInMethod}> here</span>
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
              Already have an account, Sign in
              <span onClick={() => history.push("/login")}> here</span>
            </p>
          </div>
        </SignUpContainer>
      )}
    </Wrapper>
  );
};

export default SignUp;
