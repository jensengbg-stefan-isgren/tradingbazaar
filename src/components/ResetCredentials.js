import React, { useEffect, useState } from "react";
import styled from "styled-components";
import signin from "assets/images/signin.jpg";
import firebase from "firebase";

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
    // blir konstigt i mobilvy behöver kolla på detta!
    background-position: center bottom 0%;
  }

  @media only screen and (max-width: 600px) {
    ::before {
      /* opacity: 0.4; */
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
  grid-template-columns: minmax(15rem, 25em);
  padding-right: 10%;
  padding-left: 10%;
  padding-bottom: 10em;

  p {
    color: ${(props) => props.theme.color.main};
    font-family: "Open Sans", sans-serif;
    font-size: 1em;
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
// const SignInButton = styled.button`
//   padding-left: 1em;
//   border-radius: 5px;
//   width: 100%;
//   display: grid;
//   grid-template-columns: 10% 90%;
//   align-items: center;
//   height: 55px;
//   outline: none;
//   border: none;
//   margin: 0.5em 0;
//   background-color: ${(props) => props.theme.button.color};
//   border-radius: 5px;
//   cursor: pointer;

//   p,
//   img {
//     justify-self: center;
//     font-family: ${(props) => props.theme.font.body};
//     font-size: 1.2em;
//     color: ${(props) => props.theme.color.main};
//   }

//   :disabled {
//     cursor: not-allowed;
//   }
// `;



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

const ResetCredentials = () => {
  const [code, setCode] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [btnText,setBtnText] = useState('Save password')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // id=123
    const code = params.get("oobCode");
    setCode(code);
    console.log(code);

    return () => {};
  }, []);

  const setNewPassword = async () => {
    await firebase.auth().verifyPasswordResetCode(code);
   

    try {
      await firebase.auth().confirmPasswordReset(code, password);
      setBtnText('Success, new password is set')
      setPassword('')
      setVerifyPassword('')
    } catch (error) {
      console.log(error)
    }

    
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
  };

  return (
    <Wrapper>
      <SignInContainer>
        <div>
          <h4>Reset your password</h4>
          <InputField
            onChange={handlePassword}
            value={password}
            type="password"
            placeholder="Password"
          />
          <InputField
            onChange={handleVerifyPassword}
            value={verifyPassword}
            type="password"
            placeholder="Confirm password"
          />
          <button disabled={(password !== verifyPassword) || password.length <= 0 || verifyPassword.length <= 0 } onClick={setNewPassword}>{btnText}</button>
        </div>
      </SignInContainer>
    </Wrapper>
  );
};

export default ResetCredentials;
