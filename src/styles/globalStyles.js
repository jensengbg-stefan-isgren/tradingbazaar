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
  background-color: #F7F7F2;
  font-family: ${(props) => props.theme.font.body};
  font-size: calc(0.9em + min(4px, 0.3vw));
  overflow-x: hidden;


::-webkit-scrollbar {
  width: .5em;
}
 
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}

}

h1, h2, h3, h4, h5, h6 {
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.font.dark};
}

h1 {
  font-size: 2em;
}

a {
  text-decoration:none;
}

label, p {
  ${'' /* font-family: ${(props) => props.theme.font.title}; */}
  color: ${(props) => props.theme.font.dark};
}  



`

export default GlobalStyle
