import { Link } from 'react-router-dom'
import styled,{keyframes} from 'styled-components'
import {useEffect} from 'react'
import {useSelector} from 'react-redux'


const fadeIn = keyframes`
  from {
    opacity: .4;
  }

  to {
    opacity:1;
  }
`;

const fadeOut = keyframes`
  from {
    background-color: white;
  }

  to {
    background-color: transparent;
  }
`;


const Navigation = styled.nav`


  .no-nav {
    animation: ${fadeOut} 300ms;
  }


  .show-nav {
    animation: ${fadeIn} 300ms ;
    background-color:#F7F7F2;
  }

  .container {

    

    height: 4em;
    display: flex;
    padding: 0 1em;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index:1000;
    top:0;
    width:100%;
    font-size: 16px;
    background-color: "";

    .logo {
      display: grid;
      place-content: flex-start;
    }

    select {
      height: 40px;
      background-color: ${(props) => props.theme.color.main};
      color: white;
      outline: none;
      border: none;
      font-family: ${(props) => props.theme.font.body};
      font-weight: 600;
      font-size: 0.8em;
      padding-left: 0.5em;
    }

    p {
      font-family: ${(props) => props.theme.font.title};
      color: ${(props) => props.theme.color.main};
      font-size: 2em;
    }
 

  }

  .search-container {
    width: 100%;
    grid-gap: 5em;
    display: grid;
    place-content: center;
    grid-template-columns: 10em 16em;

    }

  }

  a {
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    place-content: flex-end;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.color.main};
  font-size: 1.4em;
  padding:.5em;

  :nth-child(2) {
    margin-left: 1em;
  }

&:hover {
  border-radius: 4px;
  background:#f7f7f2
}

`

const StyledInput = styled.input`
  border: 3px solid ${(props) => props.theme.color.main};
  height: 40px;
  outline: none;
  padding-left: 0.5em;
  font-family: ${(props) => props.theme.font.body};
  color: ${(props) => props.theme.color.body};

  ::placeholder {
    font-family: ${(props) => props.theme.font.body};
    color: ${(props) => props.theme.color.body};
  }
`

const Navbar = () => {

const {categories } = useSelector((state) => state.categories)
const isVisible = useSelector(state => state.nav.isVisible)


useEffect(() => {
  return () => {
    
  }
}, [])


  return (
    <Navigation >
      <div className={`container ${!isVisible ? "show-nav" : "no-nav"}`}>
        <div className="logo">
          <p>TradingBazaar</p>
        </div>
      {!isVisible ?  <div className="search-container"  >
          <select name="category" id="category">
            <option>All Categories</option>
           {categories.map((category) => {
             return <option key={category.name} value={category.name}>{category.name}</option>
           })}
          </select>
          <StyledInput placeholder="What are you looking for today?" />
        </div> : ""}
        <div className="nav-links">
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </div>
      </div>
    </Navigation>
  )
}

export default Navbar
