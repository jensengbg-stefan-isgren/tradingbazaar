import './App.css'
import './styles/fonts.css'
import theme from './styles/theme'
import React, { useEffect, useCallback, useState } from 'react'
import { routes } from './router/routes'
import { useDispatch, useSelector } from 'react-redux'
import GlobalStyle from 'styles/globalStyles'
import { ThemeProvider } from 'styled-components'
import { authUser } from 'features/auth/authSlice'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import firebase, { db } from 'services/firebase'
import { addCategories } from 'features/categoriesSlice'
import { toast } from 'react-toastify'

const App = () => {
  const dispatch = useDispatch()

  const getCategories = useCallback(async () => {
    let snapshot = await db.collection('categories').get()
    snapshot.forEach((doc) => {
      const data = doc.data()
      dispatch(addCategories(data))
    })
  }, [dispatch])

  useEffect(() => {
    getCategories()
    dispatch(authUser())
  }, [dispatch, getCategories])

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className="App">
            <Switch>
              {routes.map((route, index) => {
                if (route.auth)
                  return (
                    <ProtectedRoute
                      path={route.path}
                      exact={route.exact}
                      redirectto="/"
                      key={index}
                      children={() => (
                        <>
                          <route.navbar /> <route.main />
                        </>
                      )}
                    />
                  )
                else
                  return (
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
                  )
              })}
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  )
}

const checkAuth = () =>
  new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? resolve(true) : resolve(false)
    })
  })

const ProtectedRoute = ({ children: Comp, path, redirectto, ...rest }) => {
  const [state, setState] = useState('loading')

  useEffect(() => {
    ;(async function () {
      try {
        const isUserLogged = await checkAuth()
        setState(isUserLogged ? 'loggedin' : 'redirect')
        if (!isUserLogged) toast('Please Login to access the Page')
      } catch (error) {
        setState('redirect')
      }
    })()
  }, [])

  if (state === 'loading') {
    return <div>Loading..</div>
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        state === 'loggedin' ? (
          <div>
            <Comp {...props} />
          </div>
        ) : (
          <Redirect to={redirectto} />
        )
      }
    />
  )
}

export default App
