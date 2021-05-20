import SellingProducts from "../pages/SellingProducts";
import ResetCredentials from "../components/ResetCredentials";
import AddAd from "../pages/AddAd";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import MainNav from '../pages/MainNav'
import ProfileSettings from 'components/Settings/Settings'

export const routes = [
  {
    path: "/",
    exact: true,
    main: () => <SellingProducts />,
    navbar: () => <MainNav />,
  },
  {
    path: "/profile/settings",
    exact: true,
    main: () => <ProfileSettings/>,
    navbar: () => <MainNav />,
  },
  {
    path: "/login",
    main: () => <Login />,
    navbar: () => "",
  },
  {
    path: "/register",
    main: () => <Register />,
    navbar: () => "",
  },
  {
    path: "/addad",
    main: () => <AddAd />,
    navbar: () => <MainNav />,
  },
  {
    path: "/profile/overview",
    main: () => <Profile />,
    navbar: () => <MainNav />,
  },
  {
    path: "/resetcredentials",
    main: () => <ResetCredentials/>,
    navbar: () => "",
  },
];


