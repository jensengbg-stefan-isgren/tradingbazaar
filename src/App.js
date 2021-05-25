import './App.css'
import './styles/fonts.css'
import theme from './styles/theme'
import React, { useEffect } from 'react'
import { routes } from './router/routes'
import { useDispatch } from 'react-redux'
import GlobalStyle from 'styles/globalStyles'
import { ThemeProvider } from 'styled-components'
import { authUser } from 'features/auth/authSlice'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className="App">
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={
                    <>
                      <route.navbar /> <route.main />
                    </>
                  }
                />
              ))}
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

export default App
