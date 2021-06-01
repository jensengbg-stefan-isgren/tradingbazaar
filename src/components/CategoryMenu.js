import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainMenu = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 63px;
  padding: 2em 0em;
  padding-left:.5em;
  left: 0px;
  width: 20em;
  min-height: calc(100vh - 64px);
  background-color: #f7f7f2;
  position: absolute;
  transition: transform 0.2s ease-in-out;
  transform: translateX(-100%);
  z-index: 999;
  


  &.sliding {
    transform: translateX(0%);
  }

  .title-container {
    display:flex;
    justify-content:center;
    width:100%;
    margin-bottom:2em;

  }


  .category-container {
    width:100%;
  }

  }

  .category-list {
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: flex-start;
    width:100%;
    height: 100%;
    font-size: .7em;
    height:calc(100vh - 64px);

    padding-bottom:2em;
    

    li {
    text-decoration: none;
    width:100%;
    font-size: 1.2em;
    font-family:${(props) => props.theme.font.body};
    color: black;

    &:hover {
      cursor: pointer;
      background-color: pink;
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
  }
`;

const CategoryMenu = ({ toggleCatMenu }) => {
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);

  return (
    <React.Fragment>
      <MainMenu className={toggleCatMenu ? `sliding` : ""}>
        {categories ? (
        
            <ul className="category-list">
              {categories.map((category) => {
                return (
                  <Link to={`/filteredproducts/${category.name}`}>
                    <li key={category.name}>{category.name}</li>
                  </Link>
                );
              })}
            </ul>
        
        ) : (
          ""
        )}
      </MainMenu>
    </React.Fragment>
  );
};

export default CategoryMenu;
