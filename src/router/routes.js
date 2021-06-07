import SellingProducts from '../pages/SellingProducts';
import ResetCredentials from '../components/ResetCredentials';
import AddAd from '../pages/AddAd';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import MainNav from '../pages/MainNav';
import ActiveItems from 'pages/ActiveItems';
import Settings from 'components/Settings/Settings';
import ProfileSettings from 'components/Settings/ProfileSettings';
import ActiveAds from 'pages/ActiveAds';
import WishList from 'pages/WishList';
import Page404 from 'pages/404';
import ProductDetailsCard from 'components/ProductDetailsCard';

export const routes = [
  {
    path: '/',
    exact: true,
    main: () => <SellingProducts />,
    navbar: () => <MainNav />,
    beforeRoute: [],
    redirect: '/',
  },
  {
    path: '/profile/active-items',
    exact: true,
    main: () => <ActiveItems />,
    navbar: () => <MainNav />,
    beforeRoute: ['auth'],
    redirect: '/',
  },
  {
    path: '/profile/wish-list',
    exact: true,
    main: () => <WishList />,
    navbar: () => <MainNav />,
    beforeRoute: ['auth'],
    redirect: '/',
  },
  {
    path: '/profile/active',
    exact: true,
    main: () => <ActiveAds />,
    navbar: () => <MainNav />,
    beforeRoute: ['auth'],
    redirect: '/',
  },
  {
    path: '/profile/settings',
    exact: true,
    main: () => <Settings />,
    navbar: () => <MainNav />,
    beforeRoute: ['auth'],
    redirect: '/',
  },
  {
    path: '/profile/settings/account',
    exact: true,
    main: () => <ProfileSettings />,
    navbar: () => <MainNav />,
    beforeRoute: ['auth'],
    redirect: '/',
  },
  {
    path: '/login',
    main: () => <Login />,
    navbar: () => '',
    beforeRoute: [],
    redirect: '/',
  },
  {
    path: '/register',
    main: () => <Register />,
    navbar: () => '',
    beforeRoute: [],
    redirect: '/',
  },
  {
    path: '/addad',
    main: () => <AddAd />,
    navbar: () => <MainNav />,
    beforeRoute: ['auth'],
    redirect: '/',
  },
  {
    path: '/profile/overview',
    main: () => <Profile />,
    navbar: () => <MainNav />,
    beforeRoute: ['auth'],
    redirect: '/',
  },
  {
    path: '/resetcredentials',
    main: () => <ResetCredentials />,
    navbar: () => '',
    beforeRoute: [],
    redirect: '/',
  },
  {
    path: '/item/:id',
    main: () => <ProductDetailsCard />,
    navbar: () => <MainNav />,
    beforeRoute: ['ad'],
    redirect: '/404',
  },
  {
    path: '*',
    main: () => <Page404 />,
    navbar: () => '',
    beforeRoute: [],
    redirect: '/',
  },
];
