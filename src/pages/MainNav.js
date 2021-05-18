import React, { useEffect } from 'react'
import NavbarProfile from 'components/NavbarProfile'
import NavbarMobile from 'components/NavbarMobile'
import Navbar from 'components/Navbar'
import { useMediaQuery } from 'functions/UseMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from 'features/auth/authSlice'
import firebase from 'services/firebase'

function MainNav() {
  const showMobileNav = useMediaQuery('(max-width:768px)')

  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        dispatch(authenticateUser(true))
      } else {
        dispatch(authenticateUser(false))
      }
    })
    return () => {
      unsubscribe()
    }
  }, [dispatch])


  const showNavigation = () => {
    
    if(isAuthenticated) {
      if(showMobileNav) {
        return <div></div>
      } else {
        return <NavbarProfile/>
      }
    } else {
      if(showMobileNav) {
        return <NavbarMobile/>
      } else {
        return <Navbar/>
      }
    }
  }

  return (
        <>
        {showNavigation()}
         
        </>
  )}

export default MainNav
