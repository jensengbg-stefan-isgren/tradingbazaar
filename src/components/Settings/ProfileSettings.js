import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { usersCollection } from 'services/firebase'
import firebase, { auth } from 'services/firebase'
import { addUser } from 'features/auth/authSlice'

const Wrapper = styled.div`
  margin-top: 5em;
  width: 100vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
`

const PersonalInfo = styled.div`
  border: 1px solid grey;
  min-height: fit-content;
  width: 100%;
  padding: 1em;

  button {
    border: none;
    outline: none;
    margin: 0.3em 0;
    padding: 0.5em;

    &.active {
      background-color: #20bf55;
    }

    &.not-active {
      background-color: #e52724;
    }
  }

  label {
    margin-right: 1em;
  }

  p:first-child {
    margin: 0.5em 0;
  }

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
      gap: 0.5em;
    }
  }

  .header-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .form-container {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    div {
      margin-bottom: 0.5em;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      place-content: center;
      justify-items: flex-start;
    }
  }

  input {
    font-size: 0.8em;
    border: 1px solid ${({ theme }) => theme.input.borderColor};
    padding: 0.5em;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.font.color.main};
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
`

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
`

const ProfileSettings = () => {
  const dispatch = useDispatch()
  const [ui, setUi] = useState()
  const { user, providerData, uid } = useSelector((state) => state.auth)
  const [edit, setEdit] = useState(false)
  const [password, setPassword] = useState(false)
  const [value, setValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    alias: '',
  })

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [toggleCredentials, setToggleCredentials] = useState(false)
  const [facebook, setFacebook] = useState(false)
  const [google, setGoogle] = useState(false)

  const handleEdit = () => {
    setEdit(!edit)
  }

  useEffect(() => {
    if (providerData === undefined) {
      return
    } else {
      if (providerData !== null) {
        if (providerData.includes('google.com')) {
          setGoogle(true)
        }
        if (providerData.includes('facebook.com')) {
          setFacebook(true)
        }
        if (providerData.includes('password')) {
          setPassword(true)
        }
      }
    }

    if (user !== null || uid !== null) {
      setValue(user)
      setUi(uid)
    }
    return () => {}
  }, [user, uid, providerData])

  const updateUserData = async () => {
    try {
      await usersCollection.doc(ui).update(value)
      dispatch(addUser(value))
      setMessage('Successfully updated profile information')
      setTimeout(() => {
        setMessage(null)
      }, 1000)

      setEdit(false)
    } catch (error) {
      setMessage(error)
    }
  }

  const handleFirstName = (e) => {
    setValue({ ...value, firstName: e.target.value })
  }

  const handleLastName = (e) => {
    setValue({ ...value, lastName: e.target.value })
  }

  const handleEmail = (e) => {
    setValue({ ...value, email: e.target.value })
  }

  const handleAlias = (e) => {
    setValue({ ...value, alias: e.target.value })
  }

  const connectFacebook = async () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider()
    await auth.currentUser.linkWithPopup(facebookProvider)
    setFacebook(true)
  }

  const connectGoogle = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    await auth.currentUser.linkWithPopup(googleProvider)
    setGoogle(true)
  }

  const connectEmailAndPassword = async () => {
    setToggleCredentials(!toggleCredentials)

    let credential = await firebase.auth.EmailAuthProvider.credential(
      userEmail,
      userPassword
    )

    let user = firebase.auth().currentUser

    let provider

    if (providerData.includes('google.com')) {
      provider = new firebase.auth.GoogleAuthProvider()
      await user.reauthenticateWithPopup(provider)
    } else {
      provider = new firebase.auth.FacebookAuthProvider()
      await user.reauthenticateWithPopup(provider)
    }
    await auth.currentUser.linkWithCredential(credential)
    setPassword(true)
  }

  const removeGoogle = async () => {
    await auth.currentUser.unlink('google.com')
    setGoogle(false)
  }

  const removeFacebook = async () => {
    await auth.currentUser.unlink('facebook.com')
    setFacebook(false)
  }

  const removeEmail = async () => {
    auth.currentUser.unlink('password')
    setPassword(false)
  }

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value)
  }

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value)
  }

  const handleUserVerifyPassword = (e) => {
    setVerifyPassword(e.target.value)
  }

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
                    <button
                      className={google ? 'active' : 'not-active'}
                      onClick={removeGoogle}
                    >
                      Remove Google
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {facebook ? (
                  <div>
                    <button
                      className={facebook ? 'active' : 'not-active'}
                      onClick={removeFacebook}
                    >
                      Remove Facebook
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {password ? (
                  <div>
                    <button
                      className={password ? 'active' : 'not-active'}
                      onClick={removeEmail}
                    >
                      Remove Password
                    </button>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="inactive-providers-container">
                <p>Inactive providers</p>
                {!google ? (
                  <button
                    className={!google ? 'not-active' : ''}
                    onClick={connectGoogle}
                  >
                    Add Google
                  </button>
                ) : (
                  ''
                )}
                {!facebook ? (
                  <button
                    className={!facebook ? 'not-active' : ''}
                    onClick={connectFacebook}
                  >
                    Add Facebook
                  </button>
                ) : (
                  ''
                )}
                {!password ? (
                  <div>
                    <button
                      className={!password ? 'not-active' : ''}
                      onClick={() => setToggleCredentials(!toggleCredentials)}
                    >
                      Add email and password
                    </button>
                  </div>
                ) : (
                  ''
                )}
                {toggleCredentials ? (
                  <div className="user-creds-container">
                    <p>Enter your your email create a password</p>
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
                    <button
                      disabled={verifyPassword !== userPassword}
                      onClick={connectEmailAndPassword}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <React.Fragment></React.Fragment>
                )}
              </div>
            </PersonalInfo>
          ) : (
            ''
          )}
          {value ? (
            <PersonalInfo>
              <div className="header-container">
                <h4>Personal information</h4>
                {!edit ? <button onClick={handleEdit}>Edit</button> : ''}
              </div>
              <div className="form-container">
                <div>
                  <label htmlFor="alias">Alias</label>
                  <input
                    onChange={handleAlias}
                    className={edit ? `edit` : `not-edit`}
                    readOnly={!edit}
                    type="text"
                    value={value.alias}
                  />
                </div>
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
                ''
              )}
              <div className="message-container">
                <p>{message}</p>
              </div>
            </PersonalInfo>
          ) : (
            ''
          )}
        </SettingsContainer>
      </Wrapper>
    </React.Fragment>
  )
}

export default ProfileSettings
