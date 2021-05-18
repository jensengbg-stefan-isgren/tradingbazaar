import React, { useEffect } from 'react'
import { Route } from 'react-router'
import NavbarProfile from 'components/NavbarProfile'
import NavbarMobile from 'components/NavbarMobile'
import Navbar from 'components/Navbar'
import { useMediaQuery } from 'functions/UseMediaQuery'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from 'features/auth/authSlice'
import firebase from 'services/firebase'

function MainNav({ exact, path, component: Component }) {
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

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <>
          {showMobileNav && <NavbarMobile />}
          {isAuthenticated ? <NavbarProfile /> : <Navbar />}
          <Component {...props} />
        </>
      )}
    />
  )
}

export default MainNav
