import Navbar from "components/Navbar";
import React from "react";
import {useSelector} from 'react-redux';
import NavbarMobile from "components/NavbarMobile";
import NavbarProfile from "components/NavbarProfile";
import { useMediaQuery } from "functions/UseMediaQuery";
import NavbarMobileProfile from "components/NavbarProfileMobile";

function MainNav() {
  const showMobileNav = useMediaQuery("(max-width:1000px)");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const showNavigation = () => {
    if (isAuthenticated) {
      if (showMobileNav) {
        return <NavbarMobileProfile />;
      } else {
        return <NavbarProfile />;
      }
    } else {
      if (showMobileNav) {
        return <NavbarMobile />;
      } else {
        return <Navbar />;
      }
    }
  };

  return <>{showNavigation()}</>;
}
export default MainNav;
