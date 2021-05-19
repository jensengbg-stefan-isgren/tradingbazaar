import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
body {
  font-family: ${(props) => props.theme.font.body};
}

* {
  box-sizing: border-box;
  padding: 0;
  margin:0;
  text-decoration:none;
  list-style-type:none;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.font.dark};
}

label {
  ${'' /* font-family: ${(props) => props.theme.font.title}; */}
  color: ${(props) => props.theme.font.dark};
}  

`

export default GlobalStyle
