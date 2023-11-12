import { Route } from 'react-router-dom';
import { lazyWithRetries } from '@/utils/index';

export const HOME = '/';
export const REGISTER = '/register';
export const BANK_ACCOUNTS_PAGE = '/bank-accounts';

export const routes = [
  {
    name: 'Home',
    path: HOME,
    component: lazyWithRetries(() => import('./pages/Home')),
    parentComponent: Route,
  },
  {
    name: 'Register',
    path: REGISTER,
    component: lazyWithRetries(() => import('./pages/Register')),
    parentComponent: Route,
  },
  // {
  //     name: 'Bank_Accounts',
  //     path: BANK_ACCOUNTS_PAGE,
  //     component: lazy(() => retryLazyLoad((_) => import('./pages/BankAccounts'))),
  //     parentComponent: Route,
  //     layout: true,
  // },
  // {
  //     name: 'PageNotFound',
  //     path: '*',
  //     component: lazy(() => retryLazyLoad((_) => import('./pages/PageNotFound'))),
  //     parentComponent: Route,
  //     layout: false,
  // },
];
