import styled from 'styled-components'

export const Wrapper = styled.div`
  height:100%;
  width:100%;
  background-color: white;
  border: 1px solid grey;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  padding-left:1em;
  cursor: pointer;

  h3 {
    font-size: 1em;
    font-family: ${(props) => props.theme.font.body}
  }
`

export default Wrapper
