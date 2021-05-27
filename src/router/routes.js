import SellingProducts from '../pages/SellingProducts'
import ResetCredentials from '../components/ResetCredentials'
import AddAd from '../pages/AddAd'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import MainNav from '../pages/MainNav'
import ActiveItems from 'components/ActiveItems'
import Settings from 'components/Settings/Settings'
import ProfileSettings from 'components/Settings/ProfileSettings'
import ActiveAds from 'components/ActiveAds'
import WishList from 'pages/WishList'
import ProductDetailsCard from 'components/ProductDetailsCard'

export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <SellingProducts />,
    navbar: () => <MainNav />,
  },
  {
    path: '/profile/active-items',
    exact: true,
    main: () => <ActiveItems />,
    navbar: () => <MainNav />,
  },
  {
    path: '/profile/wish-list',
    exact: true,
    main: () => <WishList />,
    navbar: () => <MainNav />,
  },
  {
    path: '/profile/active',
    exact: true,
    main: () => <ActiveAds />,
    navbar: () => <MainNav />,
  },
  {
    path: '/profile/settings',
    exact: true,
    main: () => <Settings />,
    navbar: () => <MainNav />,
  },
  {
    path: '/profile/settings/account',
    exact: true,
    main: () => <ProfileSettings />,
    navbar: () => <MainNav />,
  },
  {
    path: '/login',
    main: () => <Login />,
    navbar: () => '',
  },
  {
    path: '/register',
    main: () => <Register />,
    navbar: () => '',
  },
  {
    path: '/addad',

    main: () => <AddAd />,
    navbar: () => <MainNav />,
  },
  {
    path: '/profile/overview',
    main: () => <Profile />,
    navbar: () => <MainNav />,
  },
  {
    path: '/resetcredentials',
    main: () => <ResetCredentials />,
    navbar: () => '',
  },
  {
    path: '/item/:id',
    main: () => <ProductDetailsCard />,
    navbar: () => <MainNav />,
  },
]
