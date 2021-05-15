import styled from "styled-components";
import exclamationIcon from "../assets/icons/exclamation.svg";
import { auth } from "../services/firebase";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

const SignUpContainer = styled.div`
  display: grid;
  padding-top: 15%;
  height: 100vh;
  justify-content: end;
  align-items: flex-start;
  position: relative;
  grid-template-columns: minmax(15em, 25em);
  padding-right: 10%;
  padding-left: 10%;
  padding-bottom: 10em;

  p {
    color: ${(props) => props.theme.color.main};
    font-family: ${(props) => props.theme.font.body};
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

  button {
    outline: none;
    border: none;
    border-radius: 5px;
    height: 2.5em;
    width: 100%;
    display: block;
    margin: 0.5em 0em 0.5em auto;
    cursor: pointer;
    font-family: ${(props) => props.theme.font.title};
    color: ${(props) => props.theme.color.main};
    font-size: 1em;
  }

  p:nth-child(2) {
    text-align: center;
  }


  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 600px) {
    padding-top: 5em;
    align-items: flex-start;
  }
`;
const InputField = styled.input`
  font-family: ${(props) => props.theme.font.body};
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
  ::placeholder {
    opacity: 0.8;
    color: ${(props) => props.theme.color.main};
    font-family: ${(props) => props.theme.font.body};
  }

  p,
  img {
    justify-self: center;
    font-family: "Open Sans", sans-serif;
    font-size: 1.2em;
    color: #424242;
  }

  :focus {
      border: 2px solid rgba(0,0,0,.4)
    }

`;

const SignUpEmail = ({ setToggleSignInMethod }) => {
  
  const emailInput = useRef();
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState("");

  useEffect(() => {
    if (!isFocused) {
      emailInput.current.focus();
      setIsFocused(true);
    }
    if (
      !email ||
      password !== verifyPassword ||
      password.length <= 0 ||
      verifyPassword.length <= 0
    ) {
      setValid(false);
    } else {
      setValid(true);
    }

    return () => {};
  }, [email, password, verifyPassword]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
  };

  const registerEmail = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push("/profile/overview");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const history = useHistory();

  return (
    <SignUpContainer>
      <div>
        <h4>Sign Up</h4>
        <p>
          Register with Google or Facebook, Click
          <span onClick={() => setToggleSignInMethod(false)}> here</span>
          <InputField
            ref={emailInput}
            value={email}
            onChange={handleEmail}
            type="text"
            placeholder="Email"
          />
          <InputField
            value={password}
            onChange={handlePassword}
            type="password"
            placeholder="Enter password"
          />
          <InputField
            value={verifyPassword}
            onChange={handleVerifyPassword}
            type="password"
            placeholder="Confirm password"
          />
          <button disabled={!valid} onClick={registerEmail}>
            Create account
          </button>
        </p>
        <p>
          Already have an account, Sign in{" "}
          <span onClick={() => history.push("/login")}> here</span>
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
    </SignUpContainer>
  );
};

export default SignUpEmail;
