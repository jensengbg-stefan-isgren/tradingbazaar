import "./App.css";
import "./styles/fonts.css";
import theme from "./styles/theme";
import { db } from "services/firebase";
import React, { useEffect } from "react";
import { routes } from "./router/routes";
import firebase from "services/firebase";
import { useDispatch } from "react-redux";
import GlobalStyle from "styles/globalStyles";
import { ThemeProvider } from "styled-components";
import {
  authenticateUser,
  addUser,
  addFavoritesToUser,
} from "features/auth/authSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const providers = [];
        await user.providerData.forEach((profile) => {
          providers.push(profile.providerId);
        });
        dispatch(
          authenticateUser({
            status: true,
            uid: user.uid,
            providerData: providers,
          })
        );

        let favorites = [];
        await db
          .collection("favorites")
          .get()
          .then((favorite) =>
            favorite.forEach(
              (el) => (favorites = [...favorites, el.data().productId])
            )
          );
        console.log("dispatching favorites");
        dispatch(addFavoritesToUser(favorites));
      } else {
        dispatch(
          authenticateUser({ status: false, uid: null, providerData: null })
        );
        dispatch(addUser({}));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [addFavoritesToUser, authenticateUser]);

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
