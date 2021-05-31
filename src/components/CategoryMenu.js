import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

const MainMenu = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 64px;
  padding: 2em 1em;
  left: 0px;
  width: 20em;
  min-height: calc(100vh - 64px);
  background-color: white;
  position: absolute;
  transition: transform 0.2s ease-in-out;
  transform: translateX(-100%);
  z-index: 999;

  &.sliding {
    transform: translateX(0%);
  }

  .category-container {
    width:100%;

    li {
    width:100%;
    font-size: .9em;
    font-family:${(props) => props.theme.font.body};

    &:hover {
      cursor: pointer;
      background-color: pink;
    }
  }

  }


  .input-container {
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      outline: none;
      border: 1px solid lightgrey;
      padding: 1em;
      width: 100%;
      height: 3em;
      font-family: ${(props) => props.theme.font.body};
    }
    :focus {
      border: 1px solid darkgray;
    }
  }

  .menu-search-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin-bottom: 0.5em;
    }
  }

  &.sliding-left {
    transform: translateX(0%);
  }
`;

const CategoryMenu = ({ toggleCatMenu }) => {
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);

  return (
    <React.Fragment>
      <MainMenu className={toggleCatMenu ? `sliding` : ""}>
        <h3>Categories</h3>
        {categories ? (
          <div className="category-container">
            <ul>{categories.map((category) => 
            {
            return  <Link to={`/filteredproducts/${category.name}`} ><li key={category.name}>{category.name}</li></Link>
            })}</ul>
          </div>
        ) : (
          ""
        )}
      </MainMenu>
    </React.Fragment>
  );
};

export default CategoryMenu;
