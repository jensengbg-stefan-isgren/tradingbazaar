import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = styled.nav`
  .container {
    height: 4em;
    display: grid;
    padding: 0 1em;
    justify-content: center;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);

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

  :nth-child(2) {
    margin-left: 1em;
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
  return (
    <Navigation>
      <div className="container">
        <div className="logo">
          <p>TradingBazaar</p>
        </div>
        <div className="search-container">
          <select name="category" id="category">
            <option value="">Categories</option>
          </select>
          <StyledInput placeholder="What are you looking for today?" />
        </div>
        <div className="nav-links">
          <StyledLink to="/login">Login</StyledLink>
          <StyledLink to="/register">Register</StyledLink>
        </div>
      </div>
    </Navigation>
  )
}

export default Navbar
