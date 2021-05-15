import React, { useState } from "react";
import { auth } from "../services/firebase";
import styled from "styled-components";

const SignUpContainer = styled.div`
  display: grid;
  padding-top: 15%;
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
    margin: 0.5em 0em 0.5em auto;
    cursor: pointer;
    font-family: ${(props) => props.theme.font.title};
    color: ${(props) => props.theme.color.main};
    font-size: 1em;
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

const ForgotCredentials = ({ setToggleForgotCredentials }) => {
  const [email, setEmail] = useState("");

  const sendResetLink = async () => {
    let response = await auth.sendPasswordResetEmail(email);
    console.log(response);
  };

  return (
    <SignUpContainer>
      <div>
        <h4>Send me a reset link</h4>

        <InputField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
        />

        <button disabled={!email} onClick={sendResetLink}>Send me the link please</button>

        <p>
          Go back to login page{" "}
          <span onClick={() => setToggleForgotCredentials(false)}>here</span>
        </p>
      </div>
    </SignUpContainer>
  );
};

export default ForgotCredentials;
