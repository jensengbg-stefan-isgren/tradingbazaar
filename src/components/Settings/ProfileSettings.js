import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {usersCollection} from 'services/firebase'


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
  const { user, providerData, uid } = useSelector((state) => state.auth);

  const [edit, setEdit] = useState(false);

  const [value, setValue] = useState({firstName:"",lastName:"",email:""});
  const [ui,setUi] = useState()
  const [message,setMessage] = useState(null)

  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (user !== null || uid !== null) {
      setValue(user);
      setUi(uid)
    }
    return () => {};
  }, [user,uid]);

  const updateUserData = async() => {
  
    try {
      await usersCollection.doc(ui).update(value)
      setMessage('Successfully updated profile information')
      setTimeout(() => {
        setMessage(null)
      },1000);


      setEdit(false)
    } catch (error) {
      setMessage(error)
    }

    

  };

  const handleFirstName = (e) => {
    setValue({...value, firstName:e.target.value})
  };

  const handleLastName = (e) => {
    setValue({...value, lastName:e.target.value})
  };

  const handleEmail = (e) => {
    setValue({...value, email:e.target.value})
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
              {providerData.map((provider) => {
                return <li key={provider.providerId}>{provider.providerId}</li>;
              })}
            </PersonalInfo>
          ) : (
            ""
          )}
          {user ? (
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
