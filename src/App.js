import './App.css'
import './styles/fonts.css'
import React, { useEffect, useCallback } from 'react'
import { routes } from './router/routes'
import { useDispatch,useSelector } from 'react-redux'
import GlobalStyle from 'styles/globalStyles'
import { ThemeProvider } from 'styled-components'
import { authUser } from 'features/auth/authSlice'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { db } from 'services/firebase'
import { addCategories } from 'features/categoriesSlice'
import {lightTheme, darkTheme} from 'styles/theme'
import { toggleTheme } from 'features/themeSlice'


const App = () => {
  const dispatch = useDispatch()

  const getCategories = useCallback(async () => {
    let snapshot = await db.collection('categories').get()
    snapshot.forEach((doc) => {
      const data = doc.data()
      dispatch(addCategories(data))
    })
  }, [dispatch])

const {themeMode} = useSelector(state => state.theme)

  useEffect(() => {

    const localTheme = window.localStorage.getItem('theme')
   if(localTheme === 'dark') {
     dispatch(toggleTheme('light'))
   } else {
     dispatch(toggleTheme('dark'))
   }
    


    getCategories()
    dispatch(authUser())
  }, [dispatch, getCategories])

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
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
                      <route.navbar /> <route.main /> <route.footer/>
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
