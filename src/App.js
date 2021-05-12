import "./App.css";
import "./styles/fonts.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import theme from './styles/theme'
import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
    * {
  box-sizing: border-box;
  padding: 0;
  margin:0
}
`;

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div className="App">
          <Switch>
            <Route path={"/register"} component={Register} />
            <Route path={"/login"} component={Login} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
