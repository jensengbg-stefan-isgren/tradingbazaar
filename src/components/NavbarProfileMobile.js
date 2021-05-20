import React,{useState} from 'react'
import {auth} from 'services/firebase'


const NavbarMobileProfile = () => {


const signOut = () => {
  auth.signOut()
}


  return (
    <React.Fragment>
      <h1>SIGNEDIN MOBILE USER</h1>
      <button onClick={signOut}>Sign Out</button>
    </React.Fragment>
  )
}

export default NavbarMobileProfile