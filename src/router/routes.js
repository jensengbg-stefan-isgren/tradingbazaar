import SellingProducts from '../pages/SellingProducts'
import ResetCredentials from '../components/ResetCredentials'
import AddAd from '../pages/AddAd'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import MainNav from 'pages/MainNav'
import ActiveItems from 'pages/ActiveItems'
import Settings from 'components/Settings/Settings'
import ProfileSettings from 'components/Settings/ProfileSettings'
import ActiveAds from 'pages/ActiveAds'
import WishList from 'pages/WishList'
import ProductDetailsCard from 'components/ProductDetailsCard'
import FilteredProducts from 'components/FilteredProducts'
import Footer from 'components/Footer'
import Page404 from 'pages/404'

export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <SellingProducts />,
    navbar: MainNav,
    beforeRoute: [],
    redirect: '/',
    footer: () => <Footer />,
  },
  {
    path: '/profile/active-items',
    exact: true,
    main: () => <ActiveItems />,
    navbar: MainNav,
    beforeRoute: ['auth'],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/profile/wish-list',
    exact: true,
    main: () => <WishList />,
    navbar: MainNav,
    beforeRoute: ['auth'],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/profile/active',
    exact: true,
    main: () => <ActiveAds />,
    navbar: MainNav,
    beforeRoute: ['auth'],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/profile/settings',
    exact: true,
    main: () => <Settings />,
    navbar: MainNav,
    beforeRoute: ['auth'],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/profile/settings/account',
    exact: true,
    main: () => <ProfileSettings />,
    navbar: MainNav,
    beforeRoute: ['auth'],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/login',
    main: () => <Login />,
    navbar: () => <></>,
    beforeRoute: [],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/register',
    main: () => <Register />,
    navbar: () => <></>,
    beforeRoute: [],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/addad',
    main: () => <AddAd />,
    navbar: MainNav,
    // navbar: () => <></>,
    beforeRoute: ['auth'],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/profile/overview',
    main: () => <Profile />,
    navbar: MainNav,
    beforeRoute: ['auth'],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/resetcredentials',
    main: () => <ResetCredentials />,
    navbar: () => <></>,
    beforeRoute: [],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/item/:id',
    main: () => <ProductDetailsCard />,
    navbar: MainNav,
    beforeRoute: ['ad'],
    redirect: '/404',
    footer: () => '',
  },
  {
    path: '*',
    main: () => <Page404 />,
    navbar: () => <></>,
    beforeRoute: [],
    redirect: '/',
    footer: () => '',
  },
  {
    path: '/filteredproducts/:category',
    main: () => <FilteredProducts />,
    beforeRoute: [],
    navbar: MainNav,
    footer: () => '',
  },
]
