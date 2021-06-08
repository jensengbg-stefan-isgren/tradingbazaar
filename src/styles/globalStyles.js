import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin:0;
  text-decoration:none;
  list-style-type:none;
}

button,li {
  cursor: pointer;
}

body {
  background-color: ${({theme}) => theme.background};
  font-size: calc(0.9em + min(4px, 0.3vw));
  overflow-x: hidden;
  


::-webkit-scrollbar {
  width: .3em;
}
 
::-webkit-scrollbar-track {
  background-color: ${({theme}) => theme.background};
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
::-webkit-scrollbar-thumb {
  background-color: ${({theme})=> theme.toggleSwitch.background};
  outline: 1px solid slategrey;
}

}

.category-list > a {
  font-family: ${({theme}) => theme.font.body};
}

.menu-container > li {
  color: ${({theme}) => theme.font.color.main};
  font-family: ${({theme}) => theme.font.title};
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${({theme}) => theme.font.title};
  color: ${({theme}) => theme.font.color.main};
}

input {
  outline:none;
  font-family: ${({theme}) => theme.font.body};

  ::placeholder {
    font-family: ${({theme}) => theme.font.body};
  }
}

h1 {
  font-size: 2em;
}

a {
  font-family: ${({theme}) => theme.font.title};
  text-decoration:none;
  color: ${({theme}) => theme.font.color.main};
}

label, p {
  color: ${({theme}) => theme.font.color.main};
  font-family: ${({theme}) => theme.font.body}
}  

em {
  font-family: ${({theme}) => theme.font.title};
  color: ${({theme}) => theme.font.color.main};
}

.logo-title {
  font-family: ${({theme}) => theme.font.title};
  color: ${({theme}) => theme.font.color.main};
  font-size: 2em;
  cursor: pointer;
}


`

export default GlobalStyle
