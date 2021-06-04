import SellingProducts from '../pages/SellingProducts'
import ResetCredentials from '../components/ResetCredentials'
import AddAd from '../pages/AddAd'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import MainNav from '../pages/MainNav'
import ActiveItems from 'pages/ActiveItems'
import Settings from 'components/Settings/Settings'
import ProfileSettings from 'components/Settings/ProfileSettings'
import ActiveAds from 'pages/ActiveAds'
import WishList from 'pages/WishList'
import ProductDetailsCard from 'components/ProductDetailsCard'

export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <SellingProducts />,
    navbar: () => <MainNav />,
    auth: false,
    redirect: '/',
  },
  {
    path: '/profile/active-items',
    exact: true,
    main: () => <ActiveItems />,
    navbar: () => <MainNav />,
    auth: true,
  },
  {
    path: '/profile/wish-list',
    exact: true,
    main: () => <WishList />,
    navbar: () => <MainNav />,
    auth: true,
  },
  {
    path: '/profile/active',
    exact: true,
    main: () => <ActiveAds />,
    navbar: () => <MainNav />,
    auth: true,
  },
  {
    path: '/profile/settings',
    exact: true,
    main: () => <Settings />,
    navbar: () => <MainNav />,
    auth: true,
  },
  {
    path: '/profile/settings/account',
    exact: true,
    main: () => <ProfileSettings />,
    navbar: () => <MainNav />,
    auth: true,
  },
  {
    path: '/login',
    main: () => <Login />,
    navbar: () => '',
    auth: false,
  },
  {
    path: '/register',
    main: () => <Register />,
    navbar: () => '',
    auth: false,
  },
  {
    path: '/addad',

    main: () => <AddAd />,
    navbar: () => <MainNav />,
    auth: true,
  },
  {
    path: '/profile/overview',
    main: () => <Profile />,
    navbar: () => <MainNav />,
    auth: true,
  },
  {
    path: '/resetcredentials',
    main: () => <ResetCredentials />,
    navbar: () => '',
    auth: false,
  },
  {
    path: '/item/:id',
    main: () => <ProductDetailsCard />,
    navbar: () => <MainNav />,
    auth: false,
  },
]
