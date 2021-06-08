import useSearch from 'hooks/useSearch'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const InputSearch = () => {
  const { searchResults } = useSearch()
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    let timer = 0
    function clearTimer() {
      if (timer) {
        clearTimeout(timer)
        timer = 0
      }
    }
    clearTimer()

    if (searchString) {
      timer = setTimeout(() => {
        searchResults(searchString)
      }, 800)
    } else searchResults(searchString)

    return () => {
      clearTimer()
    }
  }, [searchString, searchResults])

  return (
    <StyledInput
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
      placeholder="What are you looking for today?"
    />
  )
}

const StyledInput = styled.input`
  background-color: ${({ theme }) => theme.input.background};
  height: 40px;
  width: 70%;
  border: 1px solid ${({ theme }) => theme.input.borderColor};
  color: ${({ theme }) => theme.input.textColor};

  ::placeholder {
    color: ${({ theme }) => theme.input.textColor};
  }
`

export default InputSearch
