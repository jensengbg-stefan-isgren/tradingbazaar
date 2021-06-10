import styled from 'styled-components'
import { setSearchText, setSearchCat } from 'features/adsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const SearchContainer = () => {
  const inputRef = useRef(null)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const searchText = useSelector((state) => state.ads.searchText) || ''

  useEffect(() => {
    inputRef.current.addEventListener('keyup', function (e) {
      if (e.key === 'Enter' && searchText && location.pathname !== '/')
        history.push('/')
    })
  }, [searchText, history, location.pathname])

  return (
    <StyledSearchContainer>
      <CategoryContainer />
      <input
        ref={inputRef}
        value={searchText}
        onChange={(e) => {
          dispatch(setSearchText(e.target.value))
        }}
        placeholder="What are you looking for today?"
        type="text"
      />
    </StyledSearchContainer>
  )
}

const CategoryContainer = () => {
  const dispatch = useDispatch()
  const searchCat = useSelector((state) => state.ads.searchCat) || ''

  const { categories } = useSelector((state) => state.categories)

  return (
    <>
      {categories ? (
        <select
          onChange={(e) => dispatch(setSearchCat(e.target.value))}
          name="categories"
          id="categories"
          value={searchCat}
        >
          <option value={0}>All Categories</option>
          {categories.map((category) => {
            return (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            )
          })}
        </select>
      ) : (
        ''
      )}
    </>
  )
}

const StyledSearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  select,
  input {
    background-color: ${({ theme }) => theme.input.background};
    color: ${({ theme }) => theme.input.textColor};
    min-height: 3.5em;
    padding: 0.5em;
    border: 0px solid ${({ theme }) => theme.input.borderColor};
    outline: none;

    ::placeholder {
      color: ${({ theme }) => theme.input.textColor};
    }
  }

  input {
    min-width: 25em;
    padding-left: 1em;
  }

  select {
    border: 0px solid ${({ theme }) => theme.input.borderColor};
    border-right: none;
    color: black;
    background-color: ${({ theme }) => theme.select.background};
    color: ${({ theme }) => theme.input.textColor};
  }

  option {
    background-color: ${({ theme }) => theme.select.background};
  }

  @media (max-width: 700px) {
    flex-direction: column;

    select,
    input {
      width: 100%;
    }
  }
`
export default SearchContainer
