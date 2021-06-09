import styled from 'styled-components'
import { setSearchText } from 'features/adsSlice'
import useSearch from 'hooks/useSearch'
import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react'

const SearchContainer = () => {
  //   const { searchResults, category } = useSearch()
  const dispatch = useDispatch()
  const searchText = useSelector((state) => state.ads.searchText) || ''

  return (
    <StyledSearchContainer>
      <CategoryContainer />
      <input
        value={searchText}
        onChange={(e) => {
          // searchResults(e.target.value, category)
          dispatch(setSearchText(e.target.value))
        }}
        // placeholder="What are you looking for today?"
        type="text"
      />
    </StyledSearchContainer>
  )
}

/* {categories ? (
              <select
                onChange={(e) => setCategory(e.target.value)}
                name="categories"
                id="categories"
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
            )} */

const CategoryContainer = () => {
  const { setCategory } = useSearch()

  // const [searchValue, setSearchValue] = useState('')
  const { categories } = useSelector((state) => state.categories)

  return (
    <>
      {categories ? (
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="categories"
          id="categories"
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
  padding: 0 1em;
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

  @media (max-width: 768px) {
    flex-direction: column;

    select,
    input {
      width: 100%;
    }
  }
`
export default SearchContainer
