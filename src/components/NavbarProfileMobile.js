import React from 'react'
import {useHistory} from 'react-router-dom'
import {auth} from 'services/firebase'


const NavbarMobileProfile = () => {
const history = useHistory()

const signOut = () => {
  auth.signOut()
  history.push('/')
}


  return (
    <React.Fragment>
      <h1>SIGNEDIN MOBILE USER</h1>
      <button onClick={signOut}>Sign Out</button>
    </React.Fragment>
  )
}

export default NavbarMobileProfile