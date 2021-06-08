import firebase from 'firebase'
import { useState } from 'react'
import { db } from 'services/firebase'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIfRegistered, addUser,authUser } from 'features/auth/authSlice'

const useSignin = () => {
  const [toggleForgotCredentials, setToggleForgotCredentials] = useState(false)
  const [toggleSignInMethod, setToggleSignInMethod] = useState(false)

  const errorMessage = useSelector((state) => state.auth.errorMessage)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSignInMethod = () => {
    setToggleSignInMethod(!toggleSignInMethod)
  }

  const registerAccount = async (provider) => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    const facebookProvider = new firebase.auth.FacebookAuthProvider()

    let authProvider

    switch (provider) {
      case 'google':
        authProvider = googleProvider
        break
      case 'facebook':
        authProvider = facebookProvider
        break
      default:
    }

    try {
      let response = await firebase.auth().signInWithPopup(authProvider)
      dispatch(authUser())
      const {
        additionalUserInfo,
        user: { uid },
        additionalUserInfo: { profile },
      } = response
      const { providerId, isNewUser } = additionalUserInfo

      if (!isNewUser) {
        dispatch(authUser())
 
        dispatch(checkIfRegistered({ status: false, message: null }))
        history.push('/')
      } else {
        let profileData = {
          name: null,
          firstName: null,
          lastName: null,
          email: null,
          photoUrl: null,
          alias: null
        }

       
        switch (providerId) {
          case 'google.com':
            profileData.firstName = profile.given_name
            profileData.lastName = profile.family_name
            profileData.email = profile.email
            profileData.photoUrl = profile.picture.replace('s96-c', 's768-c')
            profileData.alias = `${profile.given_name} ${profile.family_name}` 
            break
          case 'facebook.com':
            profileData.name = profile.name
            profileData.firstName = profile.first_name
            profileData.lastName = profile.last_name
            profileData.email = profile.email
            profileData.photoUrl = profile.picture.data.url
            profileData.alias = `${profile.first_name} ${profile.last_name}` 
            break
          default:
        }

        await db.collection('users').doc(uid).set(profileData)
        dispatch(addUser(profileData))
        dispatch(checkIfRegistered({ status: false, message: null }))
        history.push('/')
      }
    } catch ({ code, message }) {
      if (code === 'auth/account-exists-with-different-credential') {
        await dispatch(checkIfRegistered({ status: true, message: message }))
        history.push('/login')
      } 
    }
  }

  return {
    registerAccount,
    setToggleSignInMethod,
    toggleSignInMethod,
    handleSignInMethod,
    history,
    errorMessage,
    toggleForgotCredentials,
    setToggleForgotCredentials,
  }
}

export default useSignin
