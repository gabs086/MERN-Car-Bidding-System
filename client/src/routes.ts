import { Route } from 'react-router-dom';
import { lazyWithRetries } from '@/utils/index';
import ProtectedRoute from '@/components/widgets/ProtectedComponent';

export const HOME = '/';
export const REGISTER = '/register';
export const DASHBOARD = '/dashboard';

export const routes = [
   {
      name: 'Home',
      path: HOME,
      component: lazyWithRetries(() => import('./pages/Home')),
   },
   {
      name: 'Register',
      path: REGISTER,
      component: lazyWithRetries(() => import('./pages/Register')),
   },
   {
      name: 'Bank_Accounts',
      path: DASHBOARD,
      component: lazyWithRetries(() => import('./pages/Dashboard/Index')),
      protected: true,
   },
   // {
   //     name: 'PageNotFound',
   //     path: '*',
   //     component: lazy(() => retryLazyLoad((_) => import('./pages/PageNotFound'))),
   //     parentComponent: Route,
   //     layout: false,
   // },
];
