import './App.css'
import './styles/fonts.css'
import Login from './pages/Login'
import theme from './styles/theme'
import Register from './pages/Register'
import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import SellingProducts from './pages/SellingProducts'
import firebase from './services/firebase'
import { ThemeProvider } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import NavbarProfile from './components/NavbarProfile'
import { useSelector, useDispatch } from 'react-redux'
import { authenticateUser } from './features/auth/authSlice'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct'

const GlobalStyle = createGlobalStyle`
    * {
  box-sizing: border-box;
  padding: 0;
  margin:0
}
`

const App = () => {
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
              <Route path={'/register'} component={Register} />
              <Route path={'/login'} component={Login} />
              {/* {isAuthenticated ? <NavbarProfile /> : <Navbar />} */}
              <Route path={'/profile/overview'} component={Profile} />
              <Route path={'/addproduct'} component={AddProduct} />
              <Route path={'/'} component={SellingProducts} />
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

export default App
