import styled from "styled-components";
import { auth } from "services/firebase";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import exclamationIcon from "assets/icons/exclamation.svg";

const SignUpContainer = styled.div`
  display: grid;
  padding-top: 28vh;
  height: 100vh;
  justify-content: end;
  align-items: flex-start;
  position: relative;
  grid-template-columns: minmax(15rem, 18em);
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
    font-family: ${(props) => props.theme.font.title};
    font-size: 2em;
    color: ${(props) => props.theme.color.main};
  }

  button {
    outline: none;
    border: none;
    border-radius: 5px;
    height: 2.5em;
    width: 100%;
    display: block;
    cursor: pointer;
    font-family: ${(props) => props.theme.font.title};
    color: ${(props) => props.theme.color.main};
    font-size: 1em;
    margin: 0.5em 0em 0.5em;
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

  p:nth-child(2) {
    text-align: center;
  }

  p:nth-child(4, 3) {
    margin-left: auto;
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

  :focus {
    border: 2px solid rgba(0, 0, 0, 0.4);
  }

  p,
  img {
    justify-self: center;
    font-family: ${(props) => props.theme.font.body};
    font-size: 1.2em;
    color: ${(props) => props.theme.color.main};
  }
`;

const SignInEmail = ({ setToggleSignInMethod, setToggleForgotCredentials }) => {
  const emailInput = useRef();
  const history = useHistory();
  const [values,setValues] = useState({email:"", password:""})
  const [valid, setValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    
    if (!isFocused) {
      emailInput.current.focus();
      setIsFocused(true);
    }

    if (!values.email && values.password.length <= 0) {
      setValid(false);
    } else {
      setValid(true);
    }

    return () => {};
  }, [values.email, values.password, isFocused]);



  const handleInput = (e) => {
    const {name,value} = e.target
    setValues({...values, [name]:value})
  }

  const login = async () => {
    const {email,password} = values
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/profile/overview");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <SignUpContainer>
      <div>
        <h4>Sign In</h4>
        <p>
          With Google of Facebook, Click
          <span onClick={() => setToggleSignInMethod(false)}> here</span>
          <InputField
            ref={emailInput}
            value={values.email}
            onChange={handleInput}
            type="text"
            placeholder="Email"
            name="email"
          />
          <InputField
            value={values.password}
            onChange={handleInput}
            type="password"
            placeholder="Enter password"
            name="password"
          />
          <div>
            <button disabled={!valid} onClick={login}>
              Login
            </button>
          </div>
        </p>
        <p>
          Already have an account, Sign in{" "}
          <span onClick={() => history.push("/register")}> here</span>
        </p>
        <p>
          Forgot password, Click{" "}
          <span onClick={() => setToggleForgotCredentials(true)}>here</span>
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

export default SignInEmail;
