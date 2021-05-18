import './App.css'
import './styles/fonts.css'
import AddAd from './pages/AddAd'
import Login from './pages/Login'
import theme from './styles/theme'
import Profile from './pages/Profile'
import Register from './pages/Register'
import React from 'react'
import GlobalStyle from 'styles/globalStyles'
import { ThemeProvider } from 'styled-components'
import SellingProducts from './pages/SellingProducts'
import ResetCredentials from 'components/ResetCredentials'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainNav from 'pages/MainNav'

const App = () => {
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
              <MainNav exact path={'/'} component={SellingProducts} />
              <MainNav path={'/addad'} component={AddAd} />
              <MainNav path={'/profile/overview'} component={Profile} />
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

export default App
