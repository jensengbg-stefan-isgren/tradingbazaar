import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = styled.nav`
  .container {
    height: 4em;
    padding: 0 2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    select {
      width: 100px;
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

  a {
    margin: 0 1em;
    text-decoration: none;
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${(props) => props.theme.font.title};
  color: ${(props) => props.theme.color.main};
  font-size: 1.4em;
`

const StyledInput = styled.input`
  border: 3px solid ${(props) => props.theme.color.main};
  height: 40px;
  width: 400px;
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
            <option value="">nojjan</option>
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
