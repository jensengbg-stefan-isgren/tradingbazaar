import './App.css'
import './styles/fonts.css'
import theme from './styles/theme'
import React, { useEffect, useCallback } from 'react'
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
import { db } from 'services/firebase'
import { addCategories } from 'features/categoriesSlice'
import { toast } from 'react-toastify'

const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

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
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  // component={() => GetRoute(route, isAuthenticated)}
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

// if (!isAuthenticated) {

//   console.log(
//     'firebase current user',
//     firebase.auth().currentUser
//   )
//   return <GetRoute route={route} authenticated={true} />
// }

// return await new Promise((resolve) => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       resolve(
//         <GetRoute route={route} authenticated={true} />
//       )
//     } else {
//       resolve(
//         <GetRoute route={route} authenticated={false} />
//       )
//     }
//   })
// })
//   else
//     return (
//       <GetRoute
//         route={route}
//         authenticated={isAuthenticated}
//       />
//     )
// }}

const GetRoute = (route, authenticated) => {
  // console.log('get Route', firebase.auth().currentUser)
  if ((route.auth && authenticated) || !route.auth) {
    return (
      <>
        <route.navbar /> <route.main />
      </>
    )
  } else {
    toast('Please Login to have access to the page')
    return <Redirect to="/" />
  }
}

export default App
