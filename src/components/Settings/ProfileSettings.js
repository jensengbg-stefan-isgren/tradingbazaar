import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { usersCollection } from "services/firebase";
import firebase, { auth } from "services/firebase";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
`;

const PersonalInfo = styled.div`
  border: 1px solid grey;
  min-height: fit-content;
  width: 100%;
  padding: 1em;

  .active-providers-container,
  .inactive-providers-container {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    div {
      display: flex;
      flex-direction: row;
    }

    .user-creds-container {
      display: flex;
      flex-direction: column;
    }
  }

  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .form-container {
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    &.not-edit {
      border: none;
      outline: none;
    }
  }

  .button-container {
    display: flex;
    margin-top: 1em;
    gap: 0.5em;
  }
`;

const SettingsContainer = styled.div`
  margin-top: 4em;
  width: 60vw;
  text-align: center;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(1, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(5vh, 1fr);
  }
`;

const ProfileSettings = () => {
  const [ui, setUi] = useState();
  const { user, providerData, uid } = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState(false);
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

console.log(verifyPassword)

  const [message, setMessage] = useState(null);
  const [toggleCredentials, setToggleCredentials] = useState(false);
  const [facebook, setFacebook] = useState(false);
  const [google, setGoogle] = useState(false);



  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if(providerData === undefined) {
      return
    } else {
      if (providerData !== null ) {
        if (providerData.includes("google.com")) {
          setGoogle(true);
        }
        if (providerData.includes("facebook.com")) {
          setFacebook(true);
        }
        if (providerData.includes("password")) {
          setPassword(true);
        }
      }
    }



    if (user !== null || uid !== null) {
      setValue(user);
      setUi(uid);
    }
    return () => {

    };
  }, [user, uid,providerData]);

  const updateUserData = async () => {
    try {
      await usersCollection.doc(ui).update(value);
      setMessage("Successfully updated profile information");
      setTimeout(() => {
        setMessage(null);
      }, 1000);

      setEdit(false);
    } catch (error) {
      setMessage(error);
    }
  };

  const handleFirstName = (e) => {
    setValue({ ...value, firstName: e.target.value });
  };

  const handleLastName = (e) => {
    setValue({ ...value, lastName: e.target.value });
  };

  const handleEmail = (e) => {
    setValue({ ...value, email: e.target.value });
  };

  const connectFacebook = async () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    await auth.currentUser.linkWithPopup(facebookProvider);
    setFacebook(true);
  };

  const connectGoogle = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await auth.currentUser.linkWithPopup(googleProvider);
    setGoogle(true);
  };

  const connectEmailAndPassword = async () => {
    console.log("koppla ihop");
    setToggleCredentials(!toggleCredentials);

    let credential = await firebase.auth.EmailAuthProvider.credential(
      userEmail,
      userPassword
    );

    let user = firebase.auth().currentUser

    
    await user.reauthenticateWithPopup(new firebase.auth.GoogleAuthProvider())

    await auth.currentUser.linkWithCredential(credential);
    setPassword(true)
  };

  const removeGoogle = async () => {
    await auth.currentUser.unlink("google.com");
    setGoogle(false);
  };

  const removeFacebook = async() => {
    await auth.currentUser.unlink("facebook.com");
    setFacebook(false);
  };

  const removeEmail = async() => {
    auth.currentUser.unlink('password')
    setPassword(false)
  };

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleUserVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
  };

  return (
    <React.Fragment>
      <Wrapper>
        <SettingsContainer>
          {providerData ? (
            <PersonalInfo>
              <div className="header-container">
                <h4>Account information</h4>
              </div>
              <div className="active-providers-container">
                <p>Active providers</p>
                {google ? (
                  <div>
                    <p>Google</p>
                    <button onClick={removeGoogle}>
                      Remove Google as signin method
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {facebook ? (
                  <div>
                    <p>Facebook</p>
                    <button onClick={removeFacebook}>
                      Remove Facebook as signin method
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {password ? (
                  <div>
                    <p>Password</p>
                    <button onClick={removeEmail}>
                      Remove Password as signin method
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="inactive-providers-container">
                <p>Inactive providers</p>
                {!google ? <button onClick={connectGoogle}>Google</button> : ""}
                {!facebook ? (
                  <button onClick={connectFacebook}>Facebook</button>
                ) : (
                  ""
                )}
                {!password ? (
                  <div>
                    <button
                      onClick={() => setToggleCredentials(!toggleCredentials)}
                    >
                      Password
                    </button>
                  </div>
                ) : (
                  ""
                )}
                {toggleCredentials ? (
                  <div className="user-creds-container">
                    <p>Enter your your email create a password1</p>
                    <input
                      onChange={handleUserEmail}
                      type="text"
                      name="email"
                      placeholder="Email"
                    />
                    <input
                      onChange={handleUserPassword}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                    <input
                      onChange={handleUserVerifyPassword}
                      type="password"
                      name="verifypassword"
                      id="verifypassword"
                      placeholder="Verify password"
                    />
                    <button onClick={connectEmailAndPassword}>Save</button>
                  </div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
            </PersonalInfo>
          ) : (
            ""
          )}
          {value ? (
            <PersonalInfo>
              <div className="header-container">
                <h4>Personal information</h4>
                {!edit ? <button onClick={handleEdit}>Edit</button> : ""}
              </div>
              <div className="form-container">
                <div>
                  <label htmlFor="first-name">Firstname</label>
                  <input
                    onChange={handleFirstName}
                    className={edit ? `edit` : `not-edit`}
                    readOnly={!edit}
                    type="text"
                    value={value.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="last-name">Lastname</label>
                  <input
                    onChange={handleLastName}
                    className={edit ? `edit` : `not-edit`}
                    readOnly={!edit}
                    type="text"
                    value={value.lastName}
                  />
                </div>
                <div>
                  <label htmlFor="last-name">Email</label>
                  <input
                    onChange={handleEmail}
                    className={edit ? `edit` : `not-edit`}
                    readOnly={!edit}
                    type="text"
                    value={value.email}
                  />
                </div>
              </div>

              {edit ? (
                <div className="button-container">
                  <button onClick={updateUserData}>Save</button>
                  <button onClick={() => setEdit(false)}>Cancel</button>
                </div>
              ) : (
                ""
              )}
              <div className="message-container">
                <p>{message}</p>
              </div>
            </PersonalInfo>
          ) : (
            ""
          )}
        </SettingsContainer>
      </Wrapper>
    </React.Fragment>
  );
};

export default ProfileSettings;
