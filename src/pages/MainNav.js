import Navbar from 'components/Navbar'
import React, { useEffect } from 'react'
import firebase from 'services/firebase'
import NavbarMobile from 'components/NavbarMobile'
import NavbarProfile from 'components/NavbarProfile'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'functions/UseMediaQuery'
import { authenticateUser } from 'features/auth/authSlice'
import NavbarMobileProfile from 'components/NavbarProfileMobile'

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
        return <NavbarMobileProfile/>
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
