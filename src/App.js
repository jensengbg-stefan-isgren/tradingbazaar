import "./App.css";
import "./styles/fonts.css";
import theme from "./styles/theme";
import { routes } from "./router/routes";
import GlobalStyle from "styles/globalStyles";
import { ThemeProvider } from "styled-components";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "services/firebase";
import { authenticateUser,addUser } from "features/auth/authSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { db } from "services/firebase";
const App = () => {
  const dispatch = useDispatch();

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user)
        const snapshot = await db.collection("users").doc(user.uid).get();
        const data = snapshot.data();
        dispatch(authenticateUser({ status: true, uid: user.uid, providerData: user.providerData }));
        dispatch(addUser(data))
      } else {
        dispatch(authenticateUser({ status: false, uid: null }));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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
  );
};

export default App;
