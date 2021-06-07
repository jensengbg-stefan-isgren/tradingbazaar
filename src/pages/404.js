import { useHistory } from 'react-router'
import styled from 'styled-components'

const NoMatch = () => {
  const history = useHistory()
  return (
    <Styled404>
      {/* <div> */}
      <h1>
        404 - <span>Page not Found</span>
      </h1>

      <button onClick={() => history.push('/')}>Back Home</button>
      {/* </div> */}
    </Styled404>
  )
}

const Styled404 = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > button {
    margin: 1em;
    padding: 0.7em;
  }
`

export default NoMatch
