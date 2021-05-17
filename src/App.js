import './App.css'
import './styles/fonts.css'
import Login from './pages/Login'
import theme from './styles/theme'
import Profile from './pages/Profile'
import Register from './pages/Register'
import SellingProducts from './pages/SellingProducts'
import Navbar from './components/Navbar'
import firebase from './services/firebase'
import NavbarMobile from 'components/NavbarMobile'
import { useMediaQuery } from 'functions/UseMediaQuery'
import { ThemeProvider } from 'styled-components'
import React, { useEffect, useContext } from 'react'
import { createGlobalStyle } from 'styled-components'
import NavbarProfile from './components/NavbarProfile'
import { useSelector, useDispatch } from 'react-redux'
import ResetCredentials from 'components/ResetCredentials'
import { authenticateUser } from './features/auth/authSlice'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddAd from './pages/AddAd'

const GlobalStyle = createGlobalStyle`
    * {
  box-sizing: border-box;
  padding: 0;
  margin:0
}
`

const App = () => {
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
    <React.Fragment>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className="App">
            <Switch>
              <Route path={'/resetcredentials'} component={ResetCredentials} />
              <Route path={'/register'} component={Register} />
              <Route path={'/login'} component={Login} />
              <Route path={'/addad'} component={AddAd} />
              <Route path={'/'} component={SellingProducts} />
              {showMobileNav && <NavbarMobile />}
              {isAuthenticated ? <NavbarProfile /> : <Navbar />}
              <Route path={'/profile/overview'} component={Profile} />
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

export default App
