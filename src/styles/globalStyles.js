import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin:0;
  text-decoration:none;
  list-style-type:none;
}

body {
  font-family: ${(props) => props.theme.font.body};
  font-size: calc(0.95em + min(6px, 0.5vw));
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.font.dark};
}

h1 {
  font-size: 2em;
}

label, p {
  ${'' /* font-family: ${(props) => props.theme.font.title}; */}
  color: ${(props) => props.theme.font.dark};
}  

`

export default GlobalStyle
