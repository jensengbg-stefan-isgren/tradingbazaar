import './App.css';
import './styles/fonts.css';
import theme from './styles/theme';
import React, { useEffect, useCallback, useState } from 'react';
import { routes } from './router/routes';
import { useDispatch } from 'react-redux';
import GlobalStyle from 'styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { authUser } from 'features/auth/authSlice';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import firebase, { db } from 'services/firebase';
import { addCategories } from 'features/categoriesSlice';
import { toast } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch();

  const getCategories = useCallback(async () => {
    let snapshot = await db.collection('categories').get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      dispatch(addCategories(data));
    });
  }, [dispatch]);

  useEffect(() => {
    getCategories();
    dispatch(authUser());
  }, [dispatch, getCategories]);

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <div className="App">
            <Switch>
              {routes.map((route, index) => {
                if (route.beforeRoute.length)
                  return (
                    <ProtectedRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      redirectto={route.redirect}
                      routeCheck={route.beforeRoute}
                      children={() => (
                        <>
                          <route.navbar /> <route.main />
                        </>
                      )}
                    />
                  );
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
                  );
              })}
            </Switch>
          </div>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
};

const checkAuth = () =>
  new Promise((resolve) => {
    firebase
      .auth()
      .onAuthStateChanged((user) => (user ? resolve(true) : resolve(false)));
  });

const checkAd = (id) =>
  new Promise((resolve) => {
    db.collection('sellingProducts')
      .doc(id)
      .get()
      .then((doc) => resolve(doc.exists));
  });

const ProtectedRoute = ({
  children: Comp,
  path,
  routeCheck,
  redirectto,
  ...rest
}) => {
  const [state, setState] = useState(0);
  useEffect(() => {
    (async function () {
      try {
        let isValid = true;
        if (routeCheck.includes('auth')) {
          isValid = await checkAuth();
          if (!isValid) toast('Please Login to access the Page');
        }

        if (isValid && routeCheck.includes('ad')) {
          const id = rest?.computedMatch?.params?.id;
          if (id) isValid = await checkAd(id);
          if (!isValid) toast('The selected item does not exist');
        }
        setState(isValid ? 1 : -1);
      } catch {
        setState(-1);
      }
    })();
  }, [routeCheck, rest?.computedMatch?.params]);

  if (state === 0) {
    return <div>Loading..</div>;
  }

  return (
    <Route
      path={path}
      {...rest}
      render={(props) =>
        state === 1 ? (
          <div>
            <Comp {...props} />
          </div>
        ) : (
          <Redirect to={redirectto} />
        )
      }
    />
  );
};

export default App;
