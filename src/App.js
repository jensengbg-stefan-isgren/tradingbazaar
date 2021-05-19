import "./App.css";
import "./styles/fonts.css";

import theme from "./styles/theme";

import React from "react";
import GlobalStyle from "styles/globalStyles";
import { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainNav from "pages/MainNav";
import Navbar from "components/Navbar";
import routes from './router/routes'

const App = () => {
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
                  children={<><route.navbar /> <route.main/></>}
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
