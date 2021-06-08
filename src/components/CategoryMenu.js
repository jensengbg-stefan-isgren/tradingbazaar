import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFilteredProducts } from "features/productSlice";
import {db} from 'services/firebase'

const CategoryMenu = ({ toggleCatMenu, setToggleCatMenu, catMenu }) => {
  const handleClick = useCallback(
    async (e) => {
      if (catMenu.current === e.target) {
        setToggleCatMenu((toggleCatMenu) => !toggleCatMenu);
      } else if (menu.current.contains(e.target)) {
        // inside click
        return;
      } else {
        setToggleCatMenu(false);
      }
    },
    [catMenu, setToggleCatMenu]
  );

  const menu = useRef();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);


  const searchCategory = async(e) => {
    console.log(e)
    let snapShot = await db.collection('categories').where('name','==', `${e}`).get()
    snapShot.forEach((doc) => {
      console.log(doc.data())

    })
  }
  

  return (
    <React.Fragment>
      <MainMenu ref={menu} className={toggleCatMenu ? `sliding` : ""}>
        <div className="title-container">
          <h3>Categories</h3>
          <div className="search-container">
            <input onChange={(e) => searchCategory(e.target.value)} type="text" placeholder="Search category" />
          </div>
        </div>
        {categories ? (
          <ul className="category-list">
            {categories.map((category) => {
              return (
                <Link
                  onClick={() => dispatch(fetchFilteredProducts(category.name))}
                  key={category.name}
                  to={`/filteredproducts/${category.name}`}
                >
                  <li>{category.name}</li>
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

const MainMenu = styled.div`

  display: flex;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  top: 63px;
  /* padding: 2em 0em;
  padding-left:.5em; */
  left: 0px;
  width: 20em;
  min-height: calc(100vh - 64px);
  background-color: ${({theme}) => theme.profileMenu.background};
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
    margin-bottom:1em;
    padding-top:2em;
    flex-direction: column;
    align-items: center;

      .search-container {
        width:100%;
        margin-top:1em;
        display:flex;
        justify-content: center;


        input {
          width:90%;
          background-color:  ${({theme}) => theme.input.background};
    color: ${({theme}) => theme.input.textColor};
    min-height: 2.5em;
    padding: 0.5em;
    border: 1px solid ${({theme}) => theme.input.borderColor};
    outline: none;

    ::placeholder {
      color: ${({theme}) => theme.input.textColor};
    }
    }
      }
  }


  .category-container {
    width:100%;
  
  }

  }

  .category-list {
    display:flex;
    flex-direction: column;
    justify-content:flex-start;
    align-items: flex-start;
    width:100%;
    font-size: .7em;
    height:calc(100vh - 150px);
    overflow: scroll;
    padding-bottom:5em;
    padding-top:1em;
    overflow-x: hidden;
    
    a {
      width:100%;
    }

    li {
      margin-left: .5em;
    padding:.5em;
    text-decoration: none;
    width:100%;
    font-size: 1.2em;
    color: ${({theme}) => theme.menu.textColor};

    &:hover {
      cursor: pointer;
      background-color: ${({theme}) => theme.menu.hover};
      color: ${({theme}) => theme.menu.hoverColor};
    }

    @media (max-width: 1000px) {
    font-size: 1.2em;
    padding:.5em;
    margin-left:.5em;
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

  ::-webkit-scrollbar {
  width: .5em;
}
 
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: ${({theme}) => theme.background};
}
 
::-webkit-scrollbar-thumb {
  background-color: ${({theme})=> theme.toggleSwitch.background};
  outline: 0px solid slategrey;
}

  }



`;

export default CategoryMenu;
